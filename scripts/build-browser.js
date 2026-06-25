import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const dictPath = path.join(repoRoot, 'dict', 'cmudict.dict');
const ipaSourcePath = path.join(repoRoot, 'src', 'ipa2pinyin.js');
const outputPath = path.join(repoRoot, 'english2pinyin.browser.js');

function normalizeDictWord(word) {
  return String(word).toLowerCase().replace(/\(\d+\)$/, '');
}

function stripComment(line) {
  return line.split('#')[0].trim();
}

function parseDict(content) {
  const entries = new Map();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = stripComment(rawLine);
    if (!line) {
      continue;
    }

    const match = line.match(/^(\S+)\s+(.+)$/);
    if (!match) {
      continue;
    }

    const word = normalizeDictWord(match[1]);
    const ipa = match[2].trim();

    if (!entries.has(word) && ipa) {
      entries.set(word, ipa);
    }
  }

  return entries;
}

function inlineIpaSource(source) {
  return source
    .replace(/export\s+function\s+ipa2pinyin\s*\(/, 'function ipa2pinyin(')
    .replace(/export\s+default\s+ipa2pinyin\s*;?\s*$/, '')
    .trim();
}

function buildBrowserModule(entries, ipaSource) {
  const serializedEntries = JSON.stringify([...entries.entries()]);
  const inlinedIpaSource = inlineIpaSource(ipaSource);

  return `(function (global) {
${inlinedIpaSource}

const CMUDICT_ENTRIES = new Map(${serializedEntries});

function normalizeDictWord(word) {
  return String(word).toLowerCase().replace(/\\(\\d+\\)$/, '');
}

async function english2ipa(word) {
  const key = normalizeDictWord(word).trim();
  if (!key) {
    return null;
  }

  return CMUDICT_ENTRIES.get(key) ?? null;
}

async function english2pinyin(word, options = {}) {
  const ipa = await english2ipa(word);
  if (ipa == null) {
    if (options.throwIfMissing) {
      throw new Error(\`Word not found in CMUdict: \${String(word)}\`);
    }
    return '';
  }

  return ipa2pinyin(ipa);
}

global.ipa2pinyin = ipa2pinyin;
global.english2ipa = english2ipa;
global.english2pinyin = english2pinyin;
})(typeof globalThis !== 'undefined' ? globalThis : window);
`;
}

async function main() {
  const [dictContent, ipaSource] = await Promise.all([
    readFile(dictPath, 'utf8'),
    readFile(ipaSourcePath, 'utf8')
  ]);
  const entries = parseDict(dictContent);
  const moduleSource = buildBrowserModule(entries, ipaSource);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, moduleSource, 'utf8');

  console.log(`Built browser module with ${entries.size} entries: ${path.relative(repoRoot, outputPath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
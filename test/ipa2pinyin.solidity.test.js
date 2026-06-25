/**
 * ENGLISH2PINYIN
 * Author: Davy Chen <davy.chen@163.com>
 * Profile: https://www.linkedin.com/in/davychxn/
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { ipa2pinyin } from '../src/ipa2pinyin.js';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(testDir, '..');
const dictPath = path.join(repoRoot, 'dict', 'cmudict.dict');
const lexiconPath = path.join(repoRoot, 'lexicon', 'pinyin-lexicon-r.txt');

function stripComment(line) {
  return line.split('#')[0].trim();
}

function parseDictLine(rawLine) {
  const line = stripComment(rawLine);
  if (!line) {
    return null;
  }

  const match = line.match(/^(\S+)\s+(.+)$/);
  if (!match) {
    return null;
  }

  return {
    word: match[1],
    ipa: match[2].trim()
  };
}

function parseLexicon(content) {
  const validPinyin = new Set();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    const [firstColumn] = line.split(/\s+/);
    if (firstColumn) {
      validPinyin.add(firstColumn);
    }
  }

  return validPinyin;
}

test('ipa2pinyin only emits pinyin listed in lexicon/pinyin-lexicon-r.txt for CMUdict entries', () => {
  const dictContent = readFileSync(dictPath, 'utf8');
  const lexiconContent = readFileSync(lexiconPath, 'utf8');

  const validPinyin = parseLexicon(lexiconContent);
  const invalidOutputs = [];
  let checkedEntries = 0;

  for (const rawLine of dictContent.split(/\r?\n/)) {
    const parsed = parseDictLine(rawLine);
    if (!parsed) {
      continue;
    }

    checkedEntries += 1;
    const pinyin = ipa2pinyin(parsed.ipa);
    const tokens = pinyin.split(/\s+/).filter(Boolean);
    const invalidTokens = tokens.filter((token) => !validPinyin.has(token));

    if (invalidTokens.length > 0) {
      invalidOutputs.push({
        word: parsed.word,
        ipa: parsed.ipa,
        pinyin,
        invalidTokens
      });
    }
  }

  const incorrectEntries = invalidOutputs.length;
  const correctEntries = checkedEntries - incorrectEntries;

  console.log([
    `Checked English words: ${checkedEntries}`,
    `Correct: ${correctEntries}`,
    `Incorrect: ${incorrectEntries}`
  ].join('\n'));

  const sampleFailures = invalidOutputs
    .slice(0, 20)
    .map(({ word, ipa, pinyin, invalidTokens }) => (
      `${word} => ${ipa} => ${pinyin} [invalid: ${invalidTokens.join(', ')}]`
    ))
    .join('\n');

  assert.equal(
    invalidOutputs.length,
    0,
    [
      `Checked English words: ${checkedEntries}.`,
      `Correct: ${correctEntries}.`,
      `Incorrect: ${incorrectEntries}.`,
      `Found ${invalidOutputs.length} entries producing pinyin outside lexicon/pinyin-lexicon-r.txt.`,
      sampleFailures && `Sample failures:\n${sampleFailures}`
    ].filter(Boolean).join('\n\n')
  );
});
/**
 * ENGLISH2PINYIN
 * Author: Davy Chen <davy.chen@163.com>
 * Profile: https://www.linkedin.com/in/davychxn/
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import ipa2pinyin from './ipa2pinyin.js';

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_DICT_PATH = path.resolve(moduleDir, '../dict/cmudict.dict');

const dictCache = new Map();

function normalizeDictWord(word) {
  return String(word).toLowerCase().replace(/\(\d+\)$/, '');
}

async function loadCmudict(dictPath = DEFAULT_DICT_PATH) {
  const resolvedPath = path.resolve(dictPath);

  if (!dictCache.has(resolvedPath)) {
    dictCache.set(
      resolvedPath,
      readFile(resolvedPath, 'utf8').then((content) => {
        const entries = new Map();
        const lines = content.split(/\r?\n/);

        for (const rawLine of lines) {
          const line = rawLine.split('#')[0].trim();
          if (!line) {
            continue;
          }

          const match = line.match(/^(\S+)\s+(.+)$/);
          if (!match) {
            continue;
          }

          const word = normalizeDictWord(match[1]);
          const ipa = match[2].trim();

          // Keep the first pronunciation when multiple variants exist.
          if (!entries.has(word) && ipa) {
            entries.set(word, ipa);
          }
        }

        return entries;
      })
    );
  }

  return dictCache.get(resolvedPath);
}

export async function english2ipa(word, options = {}) {
  const key = normalizeDictWord(word).trim();
  if (!key) {
    return null;
  }

  const dict = await loadCmudict(options.dictPath);
  return dict.get(key) ?? null;
}

export async function english2pinyin(word, options = {}) {
  const ipa = await english2ipa(word, options);
  if (ipa == null) {
    if (options.throwIfMissing) {
      throw new Error(`Word not found in CMUdict: ${String(word)}`);
    }
    return '';
  }

  return ipa2pinyin(ipa);
}

export default english2pinyin;

/**
 * ENGLISH2PINYIN
 * Author: Davy Chen <davy.chen@163.com>
 * Profile: https://www.linkedin.com/in/davychxn/
 */

const IPA_MAP_STAND_ALONE = {
  AH: 'a5', EY: 'ei5', Z: 'zi5', F: 'fu5', AO: 'ao5', R: 'r5', T: 'te5', UW: 'wu5',
  W: 'wu5', N: 'en5', IH: 'yi5', P: 'po5', L: 'ao5', AA: 'a5', B: 'bo5', ER: 'r5',
  G: 'ge5', K: 'ke5', IY: 'yi5', S: 'si5', EH: 'ai5', TH: 'zi5', M: 'mu5', D: 'de5',
  V: 'wu5', AE: 'ai5', OW: 'ou5', NG: 'eng5', SH: 'shi5', ZH: 'zhi5', Y: 'yi5',
  HH: 'he5', AW: 'ao5', AY: 'ai5', JH: 'zhi5', CH: 'chi5', UH: 'wu5', DH: 'zi5', OY: 'ai5'
};

const IPA_MAP_PHONEME_START = {
  AH: 'a5', EY: 'ei5', Z: 'z', F: 'f', AO: 'ao5', R: 'r', T: 't', UW: 'wu5',
  W: 'w', N: 'n', IH: 'yi5', P: 'p', L: 'l', AA: 'a5', B: 'b', ER: 'r',
  G: 'g', K: 'k', IY: 'yi5', S: 's', EH: 'ai5', TH: 'z', M: 'm', D: 'd',
  V: 'w', AE: 'ai5', OW: 'ou5', NG: 'eng5', SH: 'sh', ZH: 'zh', Y: 'y',
  HH: 'h', AW: 'ao5', AY: 'ai5', JH: 'zh', CH: 'ch', UH: 'wu5', DH: 'z', OY: 'ai5'
};

const IPA_STRESS_MAP = {
  AH: 'a', EY: 'ei', Z: 'zi', F: 'fu', AO: 'ao', R: 'r', T: 'te', UW: 'u',
  W: 'u', N: 'en', IH: 'i', P: 'po', L: 'ao', AA: 'a', B: 'be', ER: 'e',
  G: 'ge', K: 'ke', IY: 'i', S: 'si', EH: 'ai', TH: 'zi', M: 'mu', D: 'de',
  V: 'u', AE: 'ai', OW: 'ou', NG: 'eng', SH: 'shi', ZH: 'zhi', Y: 'i',
  HH: 'he', AW: 'ao', AY: 'ai', JH: 'zhi', CH: 'chi', UH: 'u', DH: 'zi', OY: 'ai'
};

const VOWEL_STRESS_MAP2 = {
  a: {
    Z: 'za', F: 'fa', T: 'ta', P: 'pa', L: 'la', B: 'ba', G: 'ga', K: 'ka', S: 'sa', TH: 'za',
    D: 'da', V: 'wa', SH: 'sha', ZH: 'zha', HH: 'ha', JH: 'zha', CH: 'cha', DH: 'za', W: 'wa',
    Y: 'ya', M: 'ma', N: 'na', R: 'ruo'
  },
  e: {
    Z: 'ze', F: 'fo', T: 'te', P: 'po', L: 'le', B: 'bo', G: 'ge', K: 'ke', S: 'se', TH: 'ze',
    D: 'de', V: 'wo', SH: 'she', ZH: 'zhe', HH: 'he', JH: 'zhe', CH: 'che', DH: 'ze', W: 'wo',
    Y: 'ye', M: 'me', N: 'ne', R: 're'
  },
  i: {
    Z: 'zei', F: 'fei', T: 'ti', P: 'pi', L: 'li', B: 'bi', G: 'gei', K: 'kei', S: 'xi', TH: 'zei',
    D: 'di', V: 'wei', SH: 'shei', ZH: 'zhei', HH: 'hei', JH: 'zhei', CH: 'chui', DH: 'zei', W: 'wei',
    Y: 'yi', M: 'mi', N: 'ni', R: 'rui'
  },
  u: {
    Z: 'zu', F: 'fu', T: 'tu', P: 'pu', L: 'lu', B: 'bu', G: 'gu', K: 'ku', S: 'su', TH: 'zu',
    D: 'du', V: 'wu', SH: 'shu', ZH: 'zhu', HH: 'hu', JH: 'zhu', CH: 'chu', DH: 'zu', W: 'wu',
    Y: 'yu', M: 'mu', N: 'nu', R: 'ru'
  },
  ei: {
    Z: 'zei', F: 'fei', T: 'tui', P: 'pei', L: 'lei', B: 'bei', G: 'gei', K: 'kui', S: 'sui', TH: 'zei',
    D: 'dei', V: 'wei', SH: 'shui', ZH: 'zhui', HH: 'hei', JH: 'zhui', CH: 'chui', DH: 'zui', W: 'wei',
    Y: 'ye', M: 'mei', N: 'nei', R: 'rui'
  },
  ao: {
    Z: 'zao', F: 'fan', T: 'tao', P: 'pao', L: 'lao', B: 'bao', G: 'gao', K: 'kao', S: 'sao', TH: 'zao',
    D: 'dao', V: 'wo', SH: 'shao', ZH: 'zhao', HH: 'hao', JH: 'zhao', CH: 'chao', DH: 'zao', W: 'wo',
    Y: 'yao', M: 'mao', N: 'nao', R: 'rao'
  },
  ai: {
    Z: 'zai', F: 'fei', T: 'tai', P: 'pai', L: 'lai', B: 'bai', G: 'gai', K: 'kai', S: 'sai', TH: 'zai',
    D: 'dai', V: 'wai', SH: 'shai', ZH: 'zhai', HH: 'hai', JH: 'zhai', CH: 'chai', DH: 'zai', W: 'wai',
    Y: 'yan', M: 'mai', N: 'nai', R: 'ruo'
  },
  ou: {
    Z: 'zou', F: 'fou', T: 'tou', P: 'pou', L: 'lou', B: 'bao', G: 'gou', K: 'kou', S: 'sou', TH: 'zou',
    D: 'dou', V: 'wo', SH: 'shou', ZH: 'zhou', HH: 'hou', JH: 'zhou', CH: 'chou', DH: 'zou', W: 'wo',
    Y: 'you', M: 'mou', N: 'nao', R: 'rou'
  }
};

const STRESS_TONE_MAP = { 2: '4', 1: '1', 0: '5' };

const ALPHABET_TO_PINYIN = {
  a: 'ei1', b: 'bi4', c: 'xi1', d: 'di4', e: 'yi4', f: 'ai5 fu5', g: 'ji4', h: 'ei5 chi5', i: 'ai5', j: 'zhai5',
  k: 'kai4', l: 'ai5 ao5', m: 'ai5 mu5', n: 'ai5 en5', o: 'ou1', p: 'pi1', q: 'kou4', r: 'er5', s: 'ai5 si5', t: 'ti4',
  u: 'you1', v: 'wei1', w: 'da1 biao5', x: 'ku1 si5', y: 'wai4', z: 'zei4',

  A: 'ei1', B: 'bi4', C: 'xi1', D: 'di4', E: 'yi4', F: 'ai5  fu5', G: 'ji4', H: 'ei5 chi5', I: 'ai5', J: 'zhai5',
  K: 'kai4', L: 'ai5 ao5', M: 'ai5 mu5', N: 'ai5 en5', O: 'ou1', P: 'pi1', Q: 'kou4', R: 'er5', S: 'ai5 si5', T: 'ti4',
  U: 'you1', V: 'wei1', W: 'da1 biao5', X: 'ku1 si5', Y: 'wai4', Z: 'zei4',

  ａ: 'ei1', ｂ: 'bi4', ｃ: 'xi1', ｄ: 'di4', ｅ: 'yi4', ｆ: 'ai5 fu5', ｇ: 'ji4', ｈ: 'ei5 chi5', ｉ: 'ai5', ｊ: 'zhai5',
  ｋ: 'kai4', ｌ: 'ai5 ao5', ｍ: 'ai5 mu5', ｎ: 'ai5 en5', ｏ: 'ou1', ｐ: 'pi1', ｑ: 'kou4', ｒ: 'er5', ｓ: 'ai5 si5', ｔ: 'ti4',
  ｕ: 'you1', ｖ: 'wei1', ｗ: 'da1 biao5', ｘ: 'ku1 si5', ｙ: 'wai4', ｚ: 'zei4',

  Ａ: 'ei1', Ｂ: 'bi4', Ｃ: 'xi1', Ｄ: 'di4', Ｅ: 'yi4', Ｆ: 'ai5 fu5', Ｇ: 'ji4', Ｈ: 'ei5 chi5', Ｉ: 'ai5', Ｊ: 'zhai5',
  Ｋ: 'kai4', Ｌ: 'ai5 ao5', Ｍ: 'ai5 mu5', Ｎ: 'ai5 en5', Ｏ: 'ou1', Ｐ: 'pi1', Ｑ: 'kou4', Ｒ: 'er5', Ｓ: 'ai5 si5', Ｔ: 'ti4',
  Ｕ: 'you1', Ｖ: 'wei1', Ｗ: 'da1 biao5', Ｘ: 'ku1 si5', Ｙ: 'wai4', Ｚ: 'zei4'
};

const VOWELS = new Set(['AH', 'EY', 'AO', 'UW', 'IH', 'AA', 'IY', 'EH', 'AE', 'OW', 'AW', 'AY', 'UH', 'OY']);
const CONSONANTS = new Set(['Z', 'F', 'T', 'P', 'L', 'B', 'G', 'K', 'S', 'TH', 'D', 'V', 'SH', 'ZH', 'HH', 'JH', 'CH', 'DH']);
const SEMI_VOWELS = new Set(['W', 'Y']);
const NASAL_STOPS = new Set(['M', 'N', 'NG']);
const R_COLORED = new Set(['R', 'ER']);

function normalizePinyinSyllables(value) {
  return String(value ?? '').trim().split(/\s+/).filter(Boolean).join(' ');
}

export function alphabetToPinyinLetters(text) {
  const input = String(text ?? '');
  if (input === '') {
    return '';
  }

  const mapped = [];
  for (const ch of input) {
    const pinyin = ALPHABET_TO_PINYIN[ch];
    if (pinyin != null) {
      mapped.push(normalizePinyinSyllables(pinyin));
    }
  }

  return mapped.join(' ');
}

function stripStress(phone) {
  return phone.replace(/[0-2]$/, '');
}

function stressLevel(phone) {
  const match = phone.match(/([0-2])$/);
  return match ? Number(match[1]) : null;
}

function isVowelPhone(phone) {
  const base = stripStress(phone);
  return VOWELS.has(base) || base === 'Y';
}

function canLeadPair(phone) {
  const base = stripStress(phone);
  return CONSONANTS.has(base)
    || (base !== 'NG' && NASAL_STOPS.has(base))
    || SEMI_VOWELS.has(base)
    || R_COLORED.has(base);
}

function applyTone(pinyin, stress) {
  if (stress === null) {
    return pinyin;
  }

  const tone = STRESS_TONE_MAP[stress];
  if (tone == null) {
    return pinyin;
  }

  if (/\d$/.test(pinyin)) {
    return pinyin.replace(/\d$/, tone);
  }

  return `${pinyin}${tone}`;
}

export function ipa2pinyin(ipaText) {
  const input = String(ipaText ?? '').trim();
  if (input === '') {
    return '';
  }

  const tokens = input.toUpperCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) {
    return '';
  }

  // Pass 1: split into syllable-like chunks by stress markers 0/1/2.
  const chunks = [];
  let current = [];

  for (const token of tokens) {
    current.push(token);
    if (/[0-2]$/.test(token)) {
      chunks.push(current);
      current = [];
    }
  }

  if (current.length > 0) {
    chunks.push(current);
  }

  // Pass 2: keep only one lead + vowel pair; other phones become standalone.
  const units = [];

  for (const chunk of chunks) {
    const parts = chunk.filter((part) => part !== '');
    if (parts.length === 0) {
      continue;
    }

    let vowelIdx = -1;
    for (let idx = 0; idx < parts.length; idx += 1) {
      if (/[0-2]$/.test(parts[idx])) {
        vowelIdx = idx;
        break;
      }
    }

    if (vowelIdx < 0) {
      for (const part of parts) {
        units.push([part]);
      }
      continue;
    }

    if (vowelIdx === 0) {
      units.push([parts[0]]);
    } else if (!canLeadPair(parts[vowelIdx - 1])) {
      for (let i = 0; i < vowelIdx; i += 1) {
        units.push([parts[i]]);
      }
      units.push([parts[vowelIdx]]);
    } else {
      for (let i = 0; i < vowelIdx - 1; i += 1) {
        units.push([parts[i]]);
      }
      units.push([parts[vowelIdx - 1], parts[vowelIdx]]);
    }

    for (let i = vowelIdx + 1; i < parts.length; i += 1) {
      units.push([parts[i]]);
    }
  }

  const mapped = [];

  for (const unit of units) {
    if (unit.length === 2) {
      const start = stripStress(unit[0]);
      const vowelRaw = unit[1];
      const vowel = stripStress(vowelRaw);
      const stress = stressLevel(vowelRaw);
      const startMapped = IPA_MAP_PHONEME_START[start] ?? start;
      let vowelMapped = IPA_STRESS_MAP[vowel] ?? vowel;

      if (VOWEL_STRESS_MAP2[vowelMapped]?.[start] != null) {
        vowelMapped = VOWEL_STRESS_MAP2[vowelMapped][start];
      } else {
        vowelMapped = `${startMapped}${vowelMapped}`;
      }

      mapped.push(applyTone(vowelMapped, stress));
      continue;
    }

    const standaloneRaw = unit[0];
    const standalone = stripStress(standaloneRaw);
    const standaloneStress = stressLevel(standaloneRaw);

    if (isVowelPhone(standaloneRaw)) {
      mapped.push(applyTone(IPA_MAP_STAND_ALONE[standalone] ?? standalone, standaloneStress));
    } else {
      mapped.push(IPA_MAP_STAND_ALONE[standalone] ?? standalone);
    }
  }

  return mapped.join(' ');
}

export default ipa2pinyin;

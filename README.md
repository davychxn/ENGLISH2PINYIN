# ENGLISH2PINYIN

[English](README.md) | [中文](README.cn.md) | [Français](README.fr.md)

Convert English words to numbered Pinyin(mandarin/chinese phonetic system) through CMUdict IPA.

## Input and Output Examples

### English word to Pinyin (12 verified examples)

| English Word | Pinyin Output |
|---|---|
| record | ruo5 kao1 r5 de5 |
| communication | ka5 mu5 yu4 na5 kui1 sha5 en5 |
| in | yi5 en5 |
| securing | xi5 ke5 yu1 rui5 eng5 |
| prime | po5 ruo1 mu5 |
| foreign | fan1 ruo5 en5 |
| aldinger | ao1 ao5 di5 eng5 r5 |
| engleman | yi1 eng5 a5 ao5 ma5 en5 |
| legacy | lai1 ga5 xi5 |
| blotting | bo5 la1 ti5 eng5 |
| english | yi1 eng5 ge5 li5 shi5 |
| banana | ba5 nai1 na5 |

### IPA to Pinyin

| IPA Input | Pinyin Output |
|---|---|
| AE2 P L AH0 K EY1 SH AH0 N | ai4 po5 la5 kui1 sha5 en5 |
| S IH0 K Y UH1 R IH0 NG | xi5 ke5 yu1 rui5 eng5 |
| L EH1 G AH0 S IY0 | lai1 ga5 xi5 |

This is especially helpful when training FastSpeech2 speech synthesis for mixed Chinese and English text, because it reduces dataset preparation effort for text normalization and phoneme alignment while keeping pronunciation labels consistent.

## Node.js

Install locally or use in this repo:

```bash
npm install english2pinyin
```

Example:

```js
import { english2pinyin, english2ipa, ipa2pinyin } from 'english2pinyin';

console.log(english2ipa('application'));
// AE2 P L AH0 K EY1 SH AH0 N

console.log(english2pinyin('application'));
// ai4 po5 la5 kui1 sha5 en5

console.log(ipa2pinyin('S IH0 K Y UH1 R IH0 NG'));
// xi5 ke5 yu1 rui5 eng5
```

## Browser

Load the script:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>english2pinyin</title>
  <script src="./english2pinyin.browser.js"></script>
</head>
<body>
  <script>
    console.log(english2pinyin('english'));

    console.log(ipa2pinyin('AE2 P L AH0 K EY1 SH AH0 N'));
  </script>
</body>
</html>
```

Browser globals exposed by the built file:

- `english2pinyin(word)`
- `english2ipa(word)`
- `ipa2pinyin(ipa)`

## Install

```bash
npm install
```

## API

### `english2pinyin(word, options?)`

Look up a word in `dict/cmudict.dict`, then convert its IPA to numbered Pinyin.

Options:

- `throwIfMissing: true` throws if the word is not found in the dictionary.

Returns:

- `string`

### `english2ipa(word)`

Look up a word in `dict/cmudict.dict`.

Returns:

- `string | null`

### `ipa2pinyin(ipa)`

Convert a CMUdict-style IPA token string directly to numbered Pinyin.

Returns:

- `string`

## Project Files

- `src/ipa2pinyin.js`: IPA to Pinyin conversion logic
- `src/english2pinyin.js`: Node.js dictionary lookup and conversion
- `dict/cmudict.dict`: source pronunciation dictionary
- `lexicon/pinyin-lexicon-r.txt`: valid numbered Pinyin lexicon
- `english2pinyin.browser.js`: generated browser build

## Development

Run solidity test across CMUdict:

```bash
npm test
```

The test checks every dictionary pronunciation, converts it with `ipa2pinyin`, and verifies every generated Pinyin token exists in `lexicon/pinyin-lexicon-r.txt`.

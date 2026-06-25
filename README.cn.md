# ENGLISH2PINYIN

[English](README.md) | [中文](README.cn.md) | [Français](README.fr.md)

通过 CMUdict IPA 将英文单词转换为拼音（汉语/中文音标系统）。

## 输入和输出示例

### 英文单词转拼音（12 个已验证的示例）

| 英文单词 | 拼音输出 |
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

### IPA 转拼音

| IPA 输入 | 拼音输出 |
|---|---|
| AE2 P L AH0 K EY1 SH AH0 N | ai4 po5 la5 kui1 sha5 en5 |
| S IH0 K Y UH1 R IH0 NG | xi5 ke5 yu1 rui5 eng5 |
| L EH1 G AH0 S IY0 | lai1 ga5 xi5 |

这在训练 FastSpeech2 语音合成时尤其有用，特别适合中英混合文本场景，可以用更少的数据整理工作完成文本归一化和音素对齐，同时得到一致的发音标注。

## Node.js

本地安装或在此仓库中使用：

```bash
npm install english2pinyin
```

示例：

```js
import { english2pinyin, english2ipa, ipa2pinyin } from 'english2pinyin';

console.log(await english2ipa('application'));
// AE2 P L AH0 K EY1 SH AH0 N

console.log(await english2pinyin('application'));
// ai4 po5 la5 kui1 sha5 en5

console.log(ipa2pinyin('S IH0 K Y UH1 R IH0 NG'));
// xi5 ke5 yu1 rui5 eng5
```

## 浏览器

加载脚本：

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>english2pinyin</title>
  <script src="./english2pinyin.browser.js"></script>
</head>
<body>
  <script>
    english2pinyin('english').then((result) => {
      console.log(result);
    });

    console.log(ipa2pinyin('AE2 P L AH0 K EY1 SH AH0 N'));
  </script>
</body>
</html>
```

构建文件暴露的浏览器全局变量：

- `english2pinyin(word)`
- `english2ipa(word)`
- `ipa2pinyin(ipa)`

## 安装

```bash
npm install
```

## API

### `await english2pinyin(word, options?)`

在 `dict/cmudict.dict` 中查找单词，然后将其 IPA 转换为数字拼音。

选项：

- `throwIfMissing: true` 如果字典中未找到单词，则抛出异常。

返回：

- `Promise<string>`

### `await english2ipa(word)`

在 `dict/cmudict.dict` 中查找单词。

返回：

- `Promise<string | null>`

### `ipa2pinyin(ipa)`

直接将 CMUdict 风格的 IPA 令牌字符串转换为数字拼音。

返回：

- `string`

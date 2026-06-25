# ENGLISH2PINYIN

[English](README.md) | [中文](README.cn.md) | [Français](README.fr.md)

Convertir les mots anglais en pinyin numéroté (système phonétique mandarin/chinois) via CMUdict IPA.

## Exemples d'entrée et de sortie

Mot anglais en pinyin (12 exemples vérifiés) :

```text
record -> ruo5 kao1 r5 de5
communication -> ka5 mu5 yu4 na5 kui1 sha5 en5
in -> yi5 en5
securing -> xi5 ke5 yu1 rui5 eng5
prime -> po5 ruo1 mu5
foreign -> fan1 ruo5 en5
aldinger -> ao1 ao5 di5 eng5 r5
engleman -> yi1 eng5 a5 ao5 ma5 en5
legacy -> lai1 ga5 xi5
blotting -> bo5 la1 ti5 eng5
english -> yi1 eng5 ge5 li5 shi5
banana -> ba5 nai1 na5
```

IPA en pinyin :

```text
AE2 P L AH0 K EY1 SH AH0 N -> ai4 po5 la5 kui1 sha5 en5
S IH0 K Y UH1 R IH0 NG -> xi5 ke5 yu1 rui5 eng5
L EH1 G AH0 S IY0 -> lai1 ga5 xi5
```

## Node.js

Installez localement ou utilisez dans ce dépôt :

```bash
npm install english2pinyin
```

Exemple :

```js
import { english2pinyin, english2ipa, ipa2pinyin } from 'english2pinyin';

console.log(await english2ipa('application'));
// AE2 P L AH0 K EY1 SH AH0 N

console.log(await english2pinyin('application'));
// ai4 po5 la5 kui1 sha5 en5

console.log(ipa2pinyin('S IH0 K Y UH1 R IH0 NG'));
// xi5 ke5 yu1 rui5 eng5
```

## Navigateur

Chargez le script :

```html
<!DOCTYPE html>
<html lang="fr">
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

Variables globales du navigateur exposées par le fichier construit :

- `english2pinyin(word)`
- `english2ipa(word)`
- `ipa2pinyin(ipa)`

## Installation

```bash
npm install
```

## API

### `await english2pinyin(word, options?)`

Cherchez un mot dans `dict/cmudict.dict`, puis convertissez son IPA en pinyin numéroté.

Options :

- `throwIfMissing: true` lève une exception si le mot n'est pas trouvé dans le dictionnaire.

Retour :

- `Promise<string>`

### `await english2ipa(word)`

Cherchez un mot dans `dict/cmudict.dict`.

Retour :

- `Promise<string | null>`

### `ipa2pinyin(ipa)`

Convertissez directement une chaîne de token IPA de style CMUdict en pinyin numéroté.

Retour :

- `string`

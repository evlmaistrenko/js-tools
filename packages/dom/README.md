# @evlmaistrenko/tools-dom

[![NPM Version](https://img.shields.io/npm/v/%40evlmaistrenko%2Ftools-dom)](https://www.npmjs.com/package/@evlmaistrenko/tools-dom)

Utilities for [DOM](https://developer.mozilla.org/ru/docs/Web/API/Document_Object_Model).

## Usage

```bash
npm i @evlmaistrenko/tools-dom
```

```javascript
import * as domTools from "@evlmaistrenko/tools-dom";

// Change input's value:
const input = document.getElementById("input");
input.addEventListener("input", (event) => {
  console.log(event.target.value);
});
domTools.change(input, "new value");
```

## Api docs

- [Typedoc](https://evlmaistrenko.github.io/js-tools/dom/typedoc/)

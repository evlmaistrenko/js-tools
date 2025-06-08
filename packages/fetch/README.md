# @evlmaistrenko/tools-fetch

[![NPM Version](https://img.shields.io/npm/v/%40evlmaistrenko%2Ftools-fetch)](https://www.npmjs.com/package/@evlmaistrenko/tools-fetch)

Utilities for [FetchAPI](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
.

## Usage

```bash
npm i @evlmaistrenko/tools-fetch
```

```javascript
import * as fetchTools from "@evlmaistrenko/tools-fetch";

// Check for error
try {
  await fetch("<some-url>").then((response) =>
    fetchTools.ResponseError.check(response),
  );
} catch (error) {
  if (!(error instanceof fetchTools.ResponseError)) throw error;
  console.log(error.response.status, error.parsed?.message);
}
```

### Extending `ResponseError`

Assuming that your response body contains comma-separated list of errors.

```typescript
import * as fetchTools from "@evlmaistrenko/tools-fetch";

class MyResponseError extends fetchTools.ResponseErrorBase<{
  errors: string[];
}> {
  async parse() {
    const json = await this.response.json();
    this.parsedValue = json.errors.split(", ");
  }
}
```

## Api docs

- [Typedoc](https://evlmaistrenko.github.io/js-tools/fetch/typedoc/)

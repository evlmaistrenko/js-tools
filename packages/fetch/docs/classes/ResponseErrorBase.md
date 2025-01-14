[**@evlmaistrenko/tools-fetch**](../README.md)

---

[@evlmaistrenko/tools-fetch](../README.md) / ResponseErrorBase

# Class: `abstract` ResponseErrorBase\<TParsed\>

Represents error of `fetch` response

## Extends

- `Error`

## Extended by

- [`ResponseError`](ResponseError.md)

## Type Parameters

• **TParsed**

## Constructors

### new ResponseErrorBase()

> **new ResponseErrorBase**\<`TParsed`\>(`response`): [`ResponseErrorBase`](ResponseErrorBase.md)\<`TParsed`\>

#### Parameters

##### response

`Response`

Corresponded response

#### Returns

[`ResponseErrorBase`](ResponseErrorBase.md)\<`TParsed`\>

#### Overrides

`Error.constructor`

## Properties

### parsedValue?

> `protected` `optional` **parsedValue**: `TParsed`

Store for parsed response body

---

### response

> `readonly` **response**: `Response`

Corresponded response

## Accessors

### parsed

#### Get Signature

> **get** **parsed**(): `undefined` \| `TParsed`

Parsed response body. In general available only after executing `this.parse`

##### Returns

`undefined` \| `TParsed`

## Methods

### parse()

> `abstract` `protected` **parse**(): `Promise`\<`void`\>

Parses response body

#### Returns

`Promise`\<`void`\>

---

### check()

> `static` **check**(`response`, `parse`): `Promise`\<`void`\>

Checks response for errors

#### Parameters

##### response

`Response`

Response to check

##### parse

`boolean` = `true`

Whether to parse response body

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await fetch("<some-url>").then((error) => ResponseError.check(error));
```

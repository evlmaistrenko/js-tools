[**@evlmaistrenko/tools-fetch**](../README.md)

---

[@evlmaistrenko/tools-fetch](../README.md) / ResponseError

# Class: ResponseError

Implementation with some basic parsing

## Extends

- [`ResponseErrorBase`](ResponseErrorBase.md)\<\{ `message`: `string`; \}\>

## Constructors

### new ResponseError()

> **new ResponseError**(`response`): [`ResponseError`](ResponseError.md)

#### Parameters

##### response

`Response`

Corresponded response

#### Returns

[`ResponseError`](ResponseError.md)

#### Inherited from

[`ResponseErrorBase`](ResponseErrorBase.md).[`constructor`](ResponseErrorBase.md#constructors)

## Properties

### parsedValue?

> `protected` `optional` **parsedValue**: `object`

Store for parsed response body

#### message?

> `optional` **message**: `string`

#### Inherited from

[`ResponseErrorBase`](ResponseErrorBase.md).[`parsedValue`](ResponseErrorBase.md#parsedvalue)

---

### response

> `readonly` **response**: `Response`

Corresponded response

#### Inherited from

[`ResponseErrorBase`](ResponseErrorBase.md).[`response`](ResponseErrorBase.md#response-1)

## Accessors

### parsed

#### Get Signature

> **get** **parsed**(): `undefined` \| `TParsed`

Parsed response body. In general available only after executing `this.parse`

##### Returns

`undefined` \| `TParsed`

#### Inherited from

[`ResponseErrorBase`](ResponseErrorBase.md).[`parsed`](ResponseErrorBase.md#parsed)

## Methods

### parse()

> `protected` **parse**(): `Promise`\<`void`\>

Parses text or json body

#### Returns

`Promise`\<`void`\>

#### Overrides

[`ResponseErrorBase`](ResponseErrorBase.md).[`parse`](ResponseErrorBase.md#parse)

---

### check()

> `static` **check**(`response`, `parse`): `Promise`\<`Response`\>

Checks response for errors

#### Parameters

##### response

`Response`

Response to check

##### parse

`boolean` = `true`

Whether to parse response body

#### Returns

`Promise`\<`Response`\>

Response

#### Example

```ts
await fetch("<some-url>").then((error) => ResponseError.check(error));
```

#### Inherited from

[`ResponseErrorBase`](ResponseErrorBase.md).[`check`](ResponseErrorBase.md#check)

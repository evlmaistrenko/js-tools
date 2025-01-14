[**@evlmaistrenko/tools-mongomq**](../README.md)

---

[@evlmaistrenko/tools-mongomq](../README.md) / Queue

# Class: Queue\<TPayload\>

Queue of messages

## Example

```ts
import { collection } from "<yourDatabase>";

const queue = new Queue(collection);
```

## Type Parameters

• **TPayload** = `any`

## Constructors

### new Queue()

> **new Queue**\<`TPayload`\>(`collection`): [`Queue`](Queue.md)\<`TPayload`\>

#### Parameters

##### collection

`Collection`\<[`MessageDocument`](../type-aliases/MessageDocument.md)\<`TPayload`\>\>

#### Returns

[`Queue`](Queue.md)\<`TPayload`\>

## Properties

### collection

> `protected` `readonly` **collection**: `Collection`\<[`MessageDocument`](../type-aliases/MessageDocument.md)\<`TPayload`\>\>

## Methods

### messages()

> **messages**(`concurrency`): `AsyncGenerator`\<(`callback`) => `Promise`\<`void`\>\>

Receives messages from queue

#### Parameters

##### concurrency

`number` = `Infinity`

Maximum number of concurrently considering messages

#### Returns

`AsyncGenerator`\<(`callback`) => `Promise`\<`void`\>\>

#### Example

```ts
for await (let consume of queue.messages())
  consume(async (message) => {
    // do something with `message.payload`
  }).catch((error) => {
    // process `error`
  });
```

---

### publish()

> **publish**(`payload`, `delayedTo`?): `Promise`\<`void`\>

Publishes massage to queue

#### Parameters

##### payload

`TPayload`

Payload of message

##### delayedTo?

`Date`

If you need to defer receiving to some date

#### Returns

`Promise`\<`void`\>

#### Example

```ts
await queue.publish({ some: "value" });
```

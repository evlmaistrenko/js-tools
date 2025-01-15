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

> **new Queue**\<`TPayload`\>(`messagesCollection`): [`Queue`](Queue.md)\<`TPayload`\>

#### Parameters

##### messagesCollection

`Collection`\<[`MessageDocument`](../type-aliases/MessageDocument.md)\<`TPayload`\>\>

#### Returns

[`Queue`](Queue.md)\<`TPayload`\>

## Properties

### messagesCollection

> `protected` `readonly` **messagesCollection**: `Collection`\<[`MessageDocument`](../type-aliases/MessageDocument.md)\<`TPayload`\>\>

---

### messagesStream?

> `protected` `optional` **messagesStream**: `ChangeStream`\<[`MessageDocument`](../type-aliases/MessageDocument.md)\<`TPayload`\>, `ChangeStreamDocument`\<[`MessageDocument`](../type-aliases/MessageDocument.md)\<`TPayload`\>\>\>

ChangeStream of `messagesCollection`

#### Since

1.1.1

---

### messagesStreamConsumersCount

> `protected` **messagesStreamConsumersCount**: `number` = `0`

How many `messages` generator iterating at this time

#### Since

1.1.1

---

### messagesStreamTriggers

> `protected` **messagesStreamTriggers**: `PromiseWithResolvers`\<`void`\>[] = `[]`

Promises with resolvers for `messagesStream` events

#### Since

1.1.1

## Accessors

### delayedMessagesTrigger

#### Get Signature

> **get** `protected` **delayedMessagesTrigger**(): `Promise`\<`void`\>

Promise that resolves when closest delayed message is ready to consume

##### Since

1.1.1

##### Returns

`Promise`\<`void`\>

---

### messagesTrigger

#### Get Signature

> **get** `protected` **messagesTrigger**(): `Promise`\<`void`\>

Promise that resolves when `change` event fired

##### Since

1.1.1

##### Returns

`Promise`\<`void`\>

## Methods

### closeMessagesStream()

> `protected` **closeMessagesStream**(): `Promise`\<`void`\>

Closes `messagesStream` if there is no `messages` generators iterating

#### Returns

`Promise`\<`void`\>

#### Since

1.1.1

---

### createMessagesIndexes()

> `protected` **createMessagesIndexes**(): `Promise`\<`void`\>

Creates indexes for `messagesCollection`

#### Returns

`Promise`\<`void`\>

#### Since

1.1.1

---

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

[**@evlmaistrenko/tools-mongomq**](../README.md)

---

[@evlmaistrenko/tools-mongomq](../README.md) / MessageDocument

# Type Alias: MessageDocument\<TPayload\>

> **MessageDocument**\<`TPayload`\>: `object`

Message

## Type Parameters

• **TPayload**

## Type declaration

### consumedAt?

> `optional` **consumedAt**: `Date`

When consumed

### delayedTo?

> `optional` **delayedTo**: `Date`

Tells to delay receiving by consumers to some date

### payload

> **payload**: `TPayload`

Payload

### publishedAt

> **publishedAt**: `Date`

When added to queue

### receivedAt?

> `optional` **receivedAt**: `Date`

When received by consumer

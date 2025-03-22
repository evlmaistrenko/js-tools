[**@evlmaistrenko/tools-dom**](../README.md)

---

[@evlmaistrenko/tools-dom](../README.md) / change

# Function: change()

> **change**(`input`, `value`): `void`

Changes input's value and fires `input` event (React's `onChange`).

## Parameters

### input

`HTMLInputElement`

Input

### value

`string`

New value

## Returns

`void`

## Example

```ts
input.addEventListener("input", (event) => {
  // Use `event.target.value`.
});
change(input, "new value");
```

# useElementSize
Read the height and width of an element

## Motivation
Determines the width and height (in pixels) of an element through [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). This is more performant and easier to use than listening to a `resize` event and reading the element's size through `getBoundingClientRect` or `getComputedStyle`, which run on the main thread and can trash layout. Note that the hook is only updated when the element's size changes, not when the window's size changes.

## Polyfill
At the time of writing, `ResizeObserver` is not yet [supported by all current browsers](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver#Browser_compatibility). There is a [polyfill](https://www.npmjs.com/package/resize-observer-polyfill) available through polyfill.io.

with @kaliberjs/build
```
{polyfill(['default', 'ResizeObserver'])}
```

or
```
https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver
```

## Installation

```
yarn add @kaliber/use-element-size
```

## Usage
```jsx
import { useElementSize }  from '@kaliber/use-element-size'

function Component() {
  const elementRef = React.useRef()
  const { width, height } = useElementSize(elementRef)
  return <div ref={elementRef}>{width}px × {height}px</div>
}
```

![](https://media.giphy.com/media/GFFZmiHkm6h9u/source.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.
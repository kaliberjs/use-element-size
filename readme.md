# useElementSize
Read the height and width of an element

## Motivation
Determines the width and height (in pixels) of an element through [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver). This is more performant and easier to use than listening to a `resize` event and reading the element's size through `getBoundingClientRect` or `getComputedStyle`, which run on the main thread and can trash layout. Note that the hook is only updated when the element's size changes, not when the window's size changes.

## Box sizing
This library reports the [border-box](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) size, which includes the elements padding and border.

## Installation

```
yarn add @kaliber/use-element-size
```

## Usage
### Basic
```jsx
import { useElementSize }  from '@kaliber/use-element-size'

function Component() {
  const { size: { width, height }, ref: elementRef } = useElementSize()
  return <div ref={elementRef}>{width}px × {height}px</div>
}
```
### Animate height
```css
.component {
  overflow: hidden;
  transition: height 0.5s;
}
```
```jsx
import { useElementSize } from '@kaliber/use-element-size'

export function Expand({ children, expanded }) {
  const { size: { height }, ref: innerRef } = useElementSize()

  return (
    <div 
      className={styles.component} 
      style={{ height: expanded ? height + 'px' : '0px' }}
    >
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}
```

![](https://media.giphy.com/media/GFFZmiHkm6h9u/source.gif)

## Disclaimer
This library is intended for internal use, we provide __no__ support, use at your own risk. It does not import React, but expects it to be provided, which [@kaliber/build](https://kaliberjs.github.io/build/) can handle for you.

This library is not transpiled.

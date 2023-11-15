import { useObservedRef } from '@kaliber/use-observed-ref'

const defaultSize = { width: 0, height: 0 }

// assumes the resize-observer-polyfill is loaded, this can be done through polyfill.io
export function useElementSize() {
  const [size, setSize] = React.useState(defaultSize)
  const createObserver = React.useCallback(
    () => {
      // @ts-ignore
      return new window.ResizeObserver(([entry]) => {
        setSize(getSizeFromEntry(entry))
      })
    },
    []
  );

  const reset = React.useCallback(() => { setSize(defaultSize) }, [])
  const ref = useObservedRef({ createObserver, reset, disabled: false })

  return { size, ref }
}

function getSizeFromEntry(entry) {
  if (entry.borderBoxSize && Array.isArray(entry.borderBoxSize)) {
    const [{ inlineSize, blockSize }] = entry.borderBoxSize
    return roundedWidthAndHeight(inlineSize, blockSize)
  } else if (entry.contentRect && entry.contentRect instanceof DOMRectReadOnly) {
    const { width, height } = entry.contentRect
    return roundedWidthAndHeight(width, height)
  } else {
    return roundedWidthAndHeight(entry.target.offsetWidth, entry.target.offsetHeight)
  }
}

function roundedWidthAndHeight(width, height) {
  return { width: Math.floor(width), height: Math.floor(height) }
}

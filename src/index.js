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
    const [{ inlineSize: width, blockSize: height }] = entry.borderBoxSize
    return { width, height }
  } else if (entry.contentRect && entry.contentRect instanceof DOMRectReadOnly) {
    const { width, height } = entry.contentRect
    return { width, height }
  }

  return {
    width: entry.target.offsetWidth,
    height: entry.target.offsetHeight
  }
}

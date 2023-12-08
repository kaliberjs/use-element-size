import { useObservedRef } from '@kaliber/use-observed-ref'

const defaultSize = { width: 0, height: 0 }

export function useElementSize() {
  const [size, setSize] = React.useState(defaultSize)

  const createObserver = React.useCallback(
    () => {
      let previousSize = defaultSize

      const observer = new window.ResizeObserver(([entry]) => {
        const size = getSizeFromEntry(entry)

        setSize(size)

        // Suspend during the animation frame, to prevent errors
        // https://blog.elantha.com/resizeobserver-loop-limit-exceeded/
        if (previousSize.width !== size.width || previousSize.height !== size.height) {
          observer.unobserve(entry.target)

          requestAnimationFrame(() => { 
            if (entry.target) observer.observe(entry.target) 
          })
        }

        previousSize = size
      })

      return observer
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

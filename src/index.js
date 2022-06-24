import { useObservedRef } from '@kaliber/use-observed-ref'

const defaultSize = { width: 0, height: 0 }

// assumes the resize-observer-polyfill is loaded, this can be done through polyfill.io
export function useElementSize() {
  const animationFrameRef = React.useRef(null)
  const [size, setSize] = React.useState(defaultSize)
  const createObserver = React.useCallback(
    () => {
      // @ts-ignore
      return new window.ResizeObserver(([entry]) => {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = requestAnimationFrame(() => {
          animationFrameRef.current = null
          setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
        })
      })
    },
    []
  );

  const reset = React.useCallback(
    () => { 
      setSize(defaultSize) 
      animationFrameRef.current && cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }, 
    []
  )
  const ref = useObservedRef({ createObserver, reset, disabled: false })

  return { size, ref }
}

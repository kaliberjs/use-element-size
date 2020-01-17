// assumes the resize-observer-polyfill is loaded, this can be done through polyfill.io
export function useElementSize(elementRef) {
  const [size, setSize] = React.useState({ width: 0, height: 0 })
  const observerRef = React.useRef(null)

  React.useEffect(
    () => {
      // @ts-ignore
      observerRef.current = new window.ResizeObserver(callback)
      return () => { observerRef.current.disconnect() }
    },
    []
  )

  React.useEffect(
    () => {
      const element = elementRef.current
      observerRef.current.observe(element)
      return () => { observerRef.current.unobserve(element) }
    },
    [elementRef]
  )

  return size

  function callback([entry]) {
    setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
  }
}
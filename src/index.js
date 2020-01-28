// assumes the resize-observer-polyfill is loaded, this can be done through polyfill.io
export function useElementSize() {

  const [size, setSize] = React.useState({ width: 0, height: 0 })
  const observerRef = React.useRef(null)
  const targetRef = React.useRef(null)

  React.useEffect(() => cleanup, [])

  const ref = React.useCallback(
    node => {
      // @ts-ignore
      if (!observerRef.current) observerRef.current = new window.ResizeObserver(callback)
      if (targetRef.current) observerRef.current.unobserve(targetRef.current)
      targetRef.current = node
      if (node) observerRef.current.observe(node)
    },
    []
  )

  return { size, ref }

  function cleanup() {
    if (observerRef.current) observerRef.current.disconnect()
  }

  function callback([entry]) {
    setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
  }
}
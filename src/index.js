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
  )

  const reset = React.useCallback(() => { setSize(defaultSize) }, [])
  // eslint-disable-next-line @kaliber/naming-policy
  const ref = useObservedRef({ createObserver, reset, disabled: false })

  return { size, ref }
}

/**
 * @arg {{
 *   borderBoxSize?: [{ inlineSize: number, blockSize: number }] | {},
 *   contentRect?: DOMRectReadOnly | {},
 *   target: Element,
 * }} entry
 */
function getSizeFromEntry(entry) {
  if (entry.borderBoxSize && Array.isArray(entry.borderBoxSize)) {
    const [{ inlineSize, blockSize }] = entry.borderBoxSize
    return roundedWidthAndHeight(inlineSize, blockSize)
  } else if (entry.contentRect && entry.contentRect instanceof DOMRectReadOnly) {
    const { width, height } = entry.contentRect
    return roundedWidthAndHeight(width, height)
  } else {
    if (!(entry.target instanceof HTMLElement))
      throw new Error(`Observer entry target (${entry.target.nodeName}) is not an html element`)
    return roundedWidthAndHeight(entry.target.offsetWidth, entry.target.offsetHeight)
  }
}

/**
 * @arg {number} width
 * @arg {number} height
 */
function roundedWidthAndHeight(width, height) {
  return { width: Math.floor(width), height: Math.floor(height) }
}

import { useElementSize } from '@kaliber/use-element-size'
import styles from './Expand.css'

export function Expand({ children, expanded }) {
  const innerRef = React.useRef(null)
  const { height } = useElementSize(innerRef)

  return (
    <div className={styles.component} style={{ height: (expanded ? height : 0) + 'px' }}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}

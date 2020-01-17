import { useElementSize }  from '@kaliber/use-element-size'
import styles from './App.css'

export default function App() {
  const elementRef = React.useRef(null)
  const { width, height } = useElementSize(elementRef)
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className={styles.app}>
      <div ref={elementRef} className={styles.box}>
        <div className={styles.legend}>
          Resize browser
          <br />
          {Math.round(width)}px x {Math.round(height)}px
        </div>

        <Expand {...{ expanded }}>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores magnam officiis nisi reiciendis architecto voluptate quam nobis cumque, modi quae aliquid possimus excepturi eveniet. Hic quos laudantium rerum magnam at!</p>
          <p>Dolores magnam officiis nisi reiciendis architecto voluptate quam nobis cumque, modi quae aliquid possimus excepturi eveniet. Hic quos laudantium rerum magnam at!</p>
          <p>Hic quos laudantium rerum magnam at! Dolores magnam officiis nisi reiciendis architecto voluptate quam nobis cumque, modi quae aliquid possimus excepturi eveniet. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </Expand>

        <button className={styles.button} onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
    </div>
  )
}

export function Expand({ children, expanded }) {
  const innerRef = React.useRef(null)
  const { height } = useElementSize(innerRef)

  return (
    <div className={styles.componentExpand} style={{ height: (expanded ? height : 0) + 'px' }}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}

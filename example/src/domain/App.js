import { useElementSize } from '@kaliber/use-element-size'
import { useSpring, animated } from 'react-spring'
import styles from './App.css'

export default function App() {
  const { size: { width, height }, ref: elementRef } = useElementSize()
  const [expanded, setExpanded] = React.useState(false)

  return (
    <div className={styles.app}>
      <div className={styles.box} ref={elementRef}>
        <div className={styles.legend}>
          Resize browser
          <br />
          {Math.round(width)}px x {Math.round(height)}px
        </div>

        <Stretch />

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

function Expand({ children, expanded }) {
  const { size: { height }, ref: innerRef } = useElementSize()

  return (
    <div className={styles.componentExpand} style={{ height: (expanded ? height : 0) + 'px' }}>
      <div ref={innerRef}>
        {children}
      </div>
    </div>
  )
}

function Stretch() {
  const { size: { width }, ref: elementRef } = useElementSize()
  const animatedProps = useSpring({
    opacity: 300 / Math.max(1, width)
  })

  return (
    <div ref={elementRef}>
      <animated.div className={styles.componentStretch} style={animatedProps}/>
    </div>
  )
}

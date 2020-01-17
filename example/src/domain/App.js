import { useElementSize }  from '@kaliber/use-element-size'
import styles from './App.css'

export default function App() {
  const elementRef = React.useRef(null)
  const { width, height } = useElementSize(elementRef)

  return (
    <div className={styles.app}>
      <div className={styles.box} ref={elementRef}>
        <div className={styles.legend}>
          Resize browser
          <br />
          {Math.round(width)}px x {Math.round(height)}px
        </div>
      </div>
    </div>
  )
}

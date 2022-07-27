import cn from 'classnames'
import styles from './Chart.module.css'

export const Polygon = ({ points, title, className }) => (
  <polygon points={points} className={cn(styles.chart__polygon, className)}>
    <title>{title}</title>
  </polygon>
)

export const Line = ({ p1, p2, className }) => {
  const [x1, y1] = p1
  const [x2, y2] = p2

  return (
    <line className={className} x1={x1} y1={y1} x2={x2} y2={y2} />
  )
}

import PropTypes from 'prop-types'
import { Line } from './Atoms'
import styles from './Chart.module.css'

const XAxis = ({ timeSeries, chartConfig }) => {
  const { width, height, xMargin, yMargin, spacer } = chartConfig
  const numPoints = timeSeries.length - 1
  const xMultiple = (width - xMargin - spacer) / numPoints

  return (
    <g>
      {/* left-right x-axis line */}
      <Line
        className={styles.chart__axis}
        p1={[xMargin, height - yMargin]}
        p2={[width - spacer, height - yMargin]}
      />

      {/* tick marks & labels for each time in series */}
      {timeSeries.map(([time]) => {
        const xPosition = time * xMultiple
        return (
          <g key={time}>
            <Line
              className={styles['chart__axis-tick']}
              p1={[xPosition + xMargin, height - yMargin]}
              p2={[xPosition + xMargin, height - yMargin + 2]}
            />
            <text
              className={styles['chart__labels--x-axis']}
              x={xPosition + xMargin}
              y={height - 5}
            >
              {time}
            </text>
          </g>
        )
      })}
    </g>
  )
}

XAxis.propTypes = {
  timeSeries: PropTypes.arrayOf(PropTypes.array).isRequired,
  chartConfig: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    xMargin: PropTypes.number,
    yMargin: PropTypes.number,
    spacer: PropTypes.number
  }).isRequired
}

export default XAxis

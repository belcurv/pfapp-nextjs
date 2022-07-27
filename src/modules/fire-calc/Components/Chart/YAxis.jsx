import PropTypes from 'prop-types'
import { Line } from './Atoms'
import { formatAsCurrency } from '@/common/utils/math'
import styles from './Chart.module.css'

const YAxis = ({ timeSeries, chartYMax, chartConfig }) => {
  const { width, height, xMargin, yMargin, spacer } = chartConfig

  // no less than 10 Y axis labels for aesthetics
  const numPoints = Math.min(timeSeries.length - 1, 10)

  // calculate relative space between each Y axis label
  const ySpacing = (height - yMargin - spacer) / numPoints

  const axisLabels = Array.from({ length: numPoints + 1 }, (val, i) => ({
    value: formatAsCurrency(i * chartYMax / numPoints),
    position: height - yMargin - (ySpacing * i)
  }))

  return (
    <g>
      {/* top-bottom y-axis line */}
      <Line
        className={styles.chart__axis}
        p1={[xMargin, spacer]}
        p2={[xMargin, height - yMargin]}
      />

      {/* tick marks & labels for each time in series */}
      {axisLabels.map(({ value, position }, i) => {
        return (
          <g key={i}>
            <Line
              className={styles['chart__horiz-rule']}
              p1={[xMargin, position]}
              p2={[width - spacer, position]}
            />
            <text
              className={styles['chart__labels--y-axis']}
              x={xMargin - 5}
              y={position + 4}
            >
              {value}
            </text>
          </g>
        )
      })}
    </g>
  )
}

YAxis.propTypes = {
  timeSeries: PropTypes.arrayOf(PropTypes.array).isRequired,
  chartYMax: PropTypes.number.isRequired,
  chartConfig: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    xMargin: PropTypes.number,
    yMargin: PropTypes.number,
    spacer: PropTypes.number
  }).isRequired
}

export default YAxis

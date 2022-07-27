import PropTypes from 'prop-types'
import { formatAsCurrency } from '@/common/utils/math'
import { Line } from './Atoms'
import styles from './Chart.module.css'

const GoalLine = ({ chartYMax, requiredSavings, chartConfig }) => {
  const { width, height, xMargin, yMargin, spacer } = chartConfig
  const yMultiple = requiredSavings / chartYMax
  const goalValue = height - yMargin - ((height - yMargin - spacer) * yMultiple)

  return (
    <g>
      <Line
        className={styles['chart__goal-line']}
        p1={[xMargin, goalValue]}
        p2={[width - spacer, goalValue]}
      />
      <text
        className={styles['chart__goal-text']}
        x={xMargin + 3}
        y={goalValue + 12}
      >
        {formatAsCurrency(requiredSavings)}
      </text>
    </g>
  )
}

GoalLine.propTypes = {
  chartYMax: PropTypes.number.isRequired,
  requiredSavings: PropTypes.number.isRequired,
  chartConfig: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    xMargin: PropTypes.number,
    yMargin: PropTypes.number,
    spacer: PropTypes.number
  }).isRequired
}

export default GoalLine

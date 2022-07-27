import { calcualteFutureValue } from '@/common/utils/math'
import AreaChart from './AreaChart'
import GoalLine from './GoalLine'
import XAxis from './XAxis'
import YAxis from './YAxis'

import styles from './Chart.module.css'

// SVG namespace for use when creating SVG elements
export const NAMESPACE = 'http://www.w3.org/2000/svg'
const CHART_Y_INTERVAL = 50000

export default function Chart ({ requiredSavings, rateOfReturn, timeHorizon, annualSavings, currentSavings }) {
  // define chart layout attributes
  const chartConfig = {
    width: 600,
    height: 400,
    xMargin: 80,
    yMargin: 20,
    spacer: 10
  }

  const timeSeries = buildTimeSeries(rateOfReturn, annualSavings, currentSavings, timeHorizon)
  const chartYMax = getChartYMax(requiredSavings, timeSeries[timeSeries.length - 1][1])

  return (
    <>
      <svg
        className={styles.chart}
        xmlns={NAMESPACE}
        width='100%'
        height='100%'
        viewBox={`0 0 ${chartConfig.width} ${chartConfig.height}`}
      >
        <AreaChart
          timeSeries={timeSeries}
          chartYMax={chartYMax}
          chartConfig={chartConfig}
        />
        <GoalLine
          chartYMax={chartYMax}
          requiredSavings={requiredSavings}
          chartConfig={chartConfig}
        />
        <XAxis
          timeSeries={timeSeries}
          chartConfig={chartConfig}
        />
        <YAxis
          timeSeries={timeSeries}
          chartYMax={chartYMax}
          chartConfig={chartConfig}
        />
      </svg>
    </>
  )
}

// - helpers

/**
 * Returns array of tuples for charting
 * @param   {number}  rate    - as whole number; converted to decimal internally
 * @param   {number}  pmt     - as positive number; converted to negative internally
 * @param   {number}  pv      - as positive number; converted to negative internally
 * @param   {number}  nper    - years
 * @returns {Array<number[]>} - array of [time, balance] tuples
 */
function buildTimeSeries (rate, pmt, pv, nper) {
  if (nper <= 1) nper = 1 // avoid zero or negative nper values
  if (pmt > 0) pmt *= -1 // TVM math needs pmt to be negative
  if (pv > 0) pv *= -1 // TVM math needs pv to be negative
  rate = rate / 100 // TVM math needs rate as a fraction

  return Array.from(
    { length: nper + 1 }, // add 1 to include year zero and final year
    (_, year) => [year, calcualteFutureValue({ rate, pmt, pv, nper: year }).toFixed(2)])
}

/**
 * Returns max Y axis value as a multiple of $50,000 to make the chart look nice
 * @param   {number}  requiredSavings
 * @param   {number}  achievedSavings
 * @returns {number}
*/
function getChartYMax (requiredSavings, achievedSavings) {
  const largerNumber = Math.max(requiredSavings, achievedSavings)
  return (Math.floor(largerNumber / CHART_Y_INTERVAL) + 1) * CHART_Y_INTERVAL
}

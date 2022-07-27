import PropTypes from 'prop-types'
import { formatAsCurrency } from '@/common/utils/math'
import { Polygon } from './Atoms'

const AreaChart = ({ timeSeries, chartYMax, chartConfig }) => {
  const { width, height, xMargin, yMargin, spacer } = chartConfig
  const numberOfPoints = timeSeries.length - 1

  // multipliers scale the output x & y coords
  const xMultiple = (width - xMargin - spacer) / numberOfPoints
  const yMultiple = (height - yMargin - spacer) / chartYMax

  // build tuples based on SVG 0,0 coordinate system
  const formattedCoordinates = timeSeries.map(([time, value]) => [
    (time * xMultiple) + xMargin,
    (height - (value * yMultiple)) - yMargin
  ])

  return (
    <g>
      {formattedCoordinates
        // render n-1 polygons because each polygon covers 2 points
        .slice(0, formattedCoordinates.length - 1)
        .map(([x, y], i) => {
          // prepare x,y coordinates for 4 points
          const x1 = x
          const y1 = height - yMargin
          const x2 = x
          const y2 = y
          const x3 = x + xMultiple
          const y3 = formattedCoordinates[i + 1][1] // the value of the next pooint
          const x4 = x + xMultiple
          const y4 = height - yMargin

          // <polygon> wants a 'points' prop consisting of x,y pairs as a string
          const points = `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`
          // currency value tool-tip on hover
          const title = formatAsCurrency(timeSeries[i + 1][1])

          return (
            <Polygon key={x} points={points} title={title} />
          )
        })}
    </g>
  )
}

AreaChart.propTypes = {
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

export default AreaChart

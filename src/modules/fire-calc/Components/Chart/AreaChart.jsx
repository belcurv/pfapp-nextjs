import PropTypes from 'prop-types'
import { formatAsCurrency } from '@/common/utils/math'
import { Polygon } from './Atoms'

const AreaChart = ({ timeSeries, chartYMax, chartConfig }) => {
  const { width, height, xMargin, yMargin, spacer } = chartConfig
  const numberOfPoints = timeSeries.length - 1

  // to scale points based on chart dimensions and X, Y
  const xMultiple = (width - xMargin - spacer) / numberOfPoints
  const yMultiple = (height - yMargin - spacer) / chartYMax

  // build tuples based on SVG 0,0 coordinate system
  const scaledTimeSeries = timeSeries.map(([time, value]) => [
    (time * xMultiple) + xMargin,
    (height - (value * yMultiple)) - yMargin
  ])

  const coordinates = scaledTimeSeries
    // render n-1 polygons because each polygon spans current -> next val
    .slice(0, scaledTimeSeries.length - 1)
    // generate 4 corners as X,Y pairs
    .map(([time, value], i) => {
      const x0 = time
      const y0 = height - yMargin
      const x1 = time
      const y1 = value
      const x2 = time + xMultiple
      const y2 = scaledTimeSeries[i + 1][1] // the value of the next point
      const x3 = time + xMultiple
      const y3 = height - yMargin

      // <polygon> wants a 'points' prop consisting of x,y pairs as a string
      return `${x0},${y0} ${x1},${y1} ${x2},${y2} ${x3},${y3}`
    })

  return (
    <g>
      {coordinates.map((points, i) => {
        // the un-scaled dollar value at time i; add hover tooltip
        const title = formatAsCurrency(timeSeries[i + 1][1])
        return (
          <Polygon key={i} points={points} title={title} />
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

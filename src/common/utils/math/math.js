import dayjs from 'dayjs'
import memo from 'nano-memoize'

// - hook

export function useMathUtils () {
  return {
    formatAsCurrency,
    formatAsPercentage,
    calculateRequiredSavings,
    calculateAge,
    calcualteFutureValue,
    calculateRequiredRate
  }
}

// - helpers

export function toDecimalPercentage (percentage) {
  return percentage > 1 ? percentage / 1000 : percentage
}

/**
 * @param    {number|string}  value
 * @returns  {string}
 */
export function formatAsCurrency (value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * @param    {number|string}  value
 * @returns  {string}
 */
export function formatAsPercentage (value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    currency: 'USD',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3
  }).format(value)
}

/**
 * @param    {Object}  args
 * @param    {number}  args.annualExpenses
 * @param    {number}  args.withdrawalRate
 * @returns  {number}
 */
export function calculateRequiredSavings ({ annualExpenses, withdrawalRate }) {
  return annualExpenses / withdrawalRate
}

/**
 * @param    {Date|string|number}  birthDate
 * @returns  {number}
 */
export function calculateAge (birthDate) {
  return dayjs().startOf('date').diff(birthDate, 'year')
}

/**
 * TVM future value
 * @param    {Object}  args
 * @param    {number}  args.rate  Annual interest rate
 * @param    {number}  args.nper  Number of periods in years
 * @param    {number}  args.pmt   Annual payment (should be NEGATIVE number)
 * @param    {number}  args.pv    Present value (POSITIVE number)
 * @param    {number}  args.type  When to apply rate
 * @returns  {number}
 */
export function calcualteFutureValue ({ rate, nper, pmt, pv, type = 0 }) {
  const power = Math.pow(1 + rate, nper)
  let fv
  if (rate) {
    rate = toDecimalPercentage(rate)
    fv = (pmt * (1 + rate * type) * (1 - power) / rate) - pv * power
  } else {
    fv = -1 * (pv + pmt * nper)
  }
  return Math.abs(fv)
}

/**
 * Find rate via binary search. Close enough!
 * @param   {Object}  args
 * @param   {number}  args.nper   Number of periods in years
 * @param   {number}  args.pmt    Annual payment (should be NEGATIVE number)
 * @param   {number}  args.pv     Present value (POSITIVE number)
 * @param   {number}  args.fv     Target future value
 * @param   {number}  args.type   TVM FV type
 * @returns {number}              Rate as decimal (ie. .07 ... not 7%)
 */
export const calculateRequiredRate = memo(({ nper, pmt, pv, fv = 0, type = 0 }) => {
  const FINANCIAL_PRECISION = 0.0001
  let maxIterations = 128
  let low = 0
  let high = 2
  let rate = 0.05 // initial guess
  let delta = 1

  while (low < high && maxIterations > 0 && delta > FINANCIAL_PRECISION) {
    const testFv = calcualteFutureValue({ rate, nper, pmt: -pmt, pv: -pv, type })

    if (testFv < fv) {
      low = rate + FINANCIAL_PRECISION
    } else {
      high = rate - FINANCIAL_PRECISION
    }

    rate = (high + low) / 2
    delta = Math.abs((testFv - fv) / testFv)
    maxIterations--
  }

  return rate
})

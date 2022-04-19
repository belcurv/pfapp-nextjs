import dayjs from 'dayjs'

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
 * TVM Rate solver
 * Credit: http://stackoverflow.com/questions/12064793/simple-financial-rate-function-in-javascript
 * @param   {Object}  args
 * @param   {number}  args.nper   Number of periods in years
 * @param   {number}  args.pmt    Annual payment (should be NEGATIVE number)
 * @param   {number}  args.pv     Present value (POSITIVE number)
 * @param   {number}  args.fv     Target future value
 * @param   {number}  args.type   TVM FV type
 * @param   {number}  args.guess  Rate launch point
 * @returns {number}              Rate as decimal (ie. .07 ... not 7%)
 */
export function calculateRequiredRate ({ nper, pmt, pv, fv = 0, type = 0, guess = 0.01 }) {
  const FINANCIAL_MAX_ITERATIONS = 128 // Bet accuracy with 128
  const FINANCIAL_PRECISION = 0.0000001 // 1.0e-8

  let y
  let y0
  let y1
  let x0
  let x1 = 0
  let f = 0
  let i = 0
  let rate = guess

  if (Math.abs(rate) < FINANCIAL_PRECISION) {
    y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv
  } else {
    f = Math.exp(nper * Math.log(1 + rate))
    y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv
  }
  y0 = pv + pmt * nper + fv
  y1 = pv * f + pmt * (1 / rate + type) * (f - 1) + fv

  // find root by Newton secant method
  i = x0 = 0.0
  x1 = rate
  while ((Math.abs(y0 - y1) > FINANCIAL_PRECISION) && (i < FINANCIAL_MAX_ITERATIONS)) {
    rate = (y1 * x0 - y0 * x1) / (y1 - y0)
    x0 = x1
    x1 = rate

    if (Math.abs(rate) < FINANCIAL_PRECISION) {
      y = pv * (1 + nper * rate) + pmt * (1 + rate * type) * nper + fv
    } else {
      f = Math.exp(nper * Math.log(1 + rate))
      y = pv * f + pmt * (1 / rate + type) * (f - 1) + fv
    }

    y0 = y1
    y1 = y
    i += 1
  }

  return rate
}

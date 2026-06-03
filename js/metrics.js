/**
 * Compute annualised return from a series of period values.
 * @param {number[]} values - ordered portfolio values (oldest first)
 * @returns {number[]} period returns as decimals
 */
export function periodReturns(values) {
  if (values.length < 2) return [];
  const returns = [];
  for (let i = 1; i < values.length; i++) {
    returns.push((values[i] - values[i - 1]) / values[i - 1]);
  }
  return returns;
}

/**
 * Arithmetic mean of an array.
 */
export function mean(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

/**
 * Population standard deviation.
 */
export function stddev(arr) {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  const variance = arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length;
  return Math.sqrt(variance);
}

/**
 * Sharpe ratio (annualised, assuming monthly periods).
 * @param {number[]} values - monthly portfolio values
 * @param {number} riskFreeRate - annual risk-free rate (default 0.02 = 2%)
 */
export function sharpeRatio(values, riskFreeRate = 0.02) {
  const returns = periodReturns(values);
  if (returns.length === 0) return 0;
  const monthlyRfr = riskFreeRate / 12;
  const excessReturns = returns.map(r => r - monthlyRfr);
  const sd = stddev(excessReturns);
  if (sd === 0) return 0;
  return (mean(excessReturns) / sd) * Math.sqrt(12);
}

/**
 * Maximum drawdown: largest peak-to-trough decline in a value series.
 * @param {number[]} values
 * @returns {number} drawdown as a negative decimal (e.g. -0.25 = -25%)
 */
export function maxDrawdown(values) {
  if (values.length < 2) return 0;
  let peak = values[0];
  let maxDD = 0;
  for (const v of values) {
    if (v > peak) peak = v;
    const dd = (v - peak) / peak;
    if (dd < maxDD) maxDD = dd;
  }
  return maxDD;
}

/**
 * Annualised volatility from monthly value series.
 * @param {number[]} values
 * @returns {number} annualised volatility as a decimal
 */
export function annualisedVolatility(values) {
  const returns = periodReturns(values);
  if (returns.length < 2) return 0;
  return stddev(returns) * Math.sqrt(12);
}

/**
 * Profit and loss for a single holding.
 * @param {number} qty - quantity held
 * @param {number} buyPrice - cost per unit in EUR
 * @param {number} currentPrice - current price per unit in EUR
 * @returns {{ invested: number, value: number, pnl: number, pnlPct: number }}
 */
export function holdingPnL(qty, buyPrice, currentPrice) {
  const invested = qty * buyPrice;
  const value = qty * currentPrice;
  const pnl = value - invested;
  const pnlPct = invested === 0 ? 0 : pnl / invested;
  return { invested, value, pnl, pnlPct };
}

/**
 * Aggregate portfolio totals from an array of assets.
 * Each asset: { qty, buyPrice, currentPrice }
 */
export function portfolioTotals(assets) {
  let totalInvested = 0;
  let totalValue = 0;
  for (const a of assets) {
    const { invested, value } = holdingPnL(a.qty, a.buyPrice, a.currentPrice);
    totalInvested += invested;
    totalValue += value;
  }
  const totalPnL = totalValue - totalInvested;
  const totalPnLPct = totalInvested === 0 ? 0 : totalPnL / totalInvested;
  return { totalInvested, totalValue, totalPnL, totalPnLPct };
}

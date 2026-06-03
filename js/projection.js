/**
 * Compute compound growth projection year-by-year.
 * @param {number} capital - starting capital in EUR
 * @param {number} monthly - monthly contribution in EUR
 * @param {number} annualRate - annual return as decimal (e.g. 0.08 = 8%)
 * @param {number} years - investment horizon in years
 * @returns {{ year: number, value: number }[]}
 */
export function computeProjection(capital, monthly, annualRate, years) {
  const monthlyRate = annualRate / 12;
  const result = [];
  let balance = capital;
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + monthlyRate) + monthly;
    }
    result.push({ year: y, value: Math.round(balance * 100) / 100 });
  }
  return result;
}

/**
 * Read milestone values from a projection series.
 * @param {{ year: number, value: number }[]} projection
 * @param {number[]} milestoneYears - e.g. [5, 10, 20]
 * @returns {Record<number, number>}
 */
export function milestones(projection, milestoneYears) {
  const result = {};
  for (const y of milestoneYears) {
    const entry = projection.find(p => p.year === y);
    result[y] = entry ? entry.value : null;
  }
  return result;
}

/**
 * Compute the total interest earned over the projection period.
 */
export function totalInterestEarned(capital, monthly, projection) {
  if (projection.length === 0) return 0;
  const totalContributions = capital + monthly * 12 * projection.length;
  return projection[projection.length - 1].value - totalContributions;
}

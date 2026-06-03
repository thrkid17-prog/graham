/**
 * Total net worth = current account balance + investment value + emergency fund.
 */
export function totalNetWorth(currentBalance, investmentValue, emergencyBalance) {
  return currentBalance + investmentValue + emergencyBalance;
}

/**
 * Investable net worth excludes the current (daily) account.
 */
export function investableNetWorth(investmentValue, emergencyBalance) {
  return investmentValue + emergencyBalance;
}

/**
 * Emergency fund coverage in months.
 * Returns null if monthlyExpenses is 0.
 */
export function emergencyCoverageMonths(balance, monthlyExpenses) {
  if (monthlyExpenses === 0) return null;
  return balance / monthlyExpenses;
}

/**
 * Progress toward emergency fund target (0–1, clamped).
 * @param {number} balance - current fund balance
 * @param {number} monthlyExpenses - monthly spending
 * @param {number} targetMonths - coverage target (e.g. 3, 6, 12)
 */
export function emergencyFundProgress(balance, monthlyExpenses, targetMonths) {
  const target = monthlyExpenses * targetMonths;
  if (target === 0) return 1;
  return Math.min(1, balance / target);
}

/**
 * Goal progress percentage (0–100), clamped.
 */
export function goalProgress(current, target) {
  if (target <= 0) return 100;
  return Math.min(100, (current / target) * 100);
}

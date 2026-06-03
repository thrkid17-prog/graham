/**
 * Property equity = current value − remaining loan.
 */
export function propertyEquity(currentValue, remainingLoan) {
  return currentValue - remainingLoan;
}

/**
 * Loan-to-value ratio.
 */
export function loanToValue(remainingLoan, currentValue) {
  if (currentValue === 0) return 0;
  return remainingLoan / currentValue;
}

/**
 * Net monthly cashflow for a property.
 */
export function monthlyCashflow(rent, mortgage) {
  return rent - mortgage;
}

/**
 * Capital gain since purchase.
 */
export function capitalGain(purchasePrice, currentValue) {
  return currentValue - purchasePrice;
}

/**
 * Gross rental yield (annual rent / current value).
 */
export function grossRentalYield(monthlyRent, currentValue) {
  if (currentValue === 0) return 0;
  return (monthlyRent * 12) / currentValue;
}

/**
 * Summarise a portfolio of properties.
 * Each property: { name, purchasePrice, currentValue, monthlyRent, mortgage, remainingLoan }
 */
export function portfolioSummary(properties) {
  let totalValue = 0;
  let totalEquity = 0;
  let totalCashflow = 0;
  let totalDebt = 0;

  for (const p of properties) {
    totalValue += p.currentValue;
    totalEquity += propertyEquity(p.currentValue, p.remainingLoan);
    totalCashflow += monthlyCashflow(p.monthlyRent, p.mortgage);
    totalDebt += p.remainingLoan;
  }

  return { totalValue, totalEquity, totalCashflow, totalDebt };
}

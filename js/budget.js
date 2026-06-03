/**
 * Savings rate = (income - expenses) / income.
 * Returns 0 if income is 0 to avoid division by zero.
 */
export function savingsRate(income, expenses) {
  if (income === 0) return 0;
  return (income - expenses) / income;
}

/**
 * Filter expense records to a specific year+month.
 * Each expense: { date: 'YYYY-MM-DD', ... }
 */
export function filterByMonth(expenses, year, month) {
  return expenses.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
}

/**
 * Sum expenses by category.
 * Returns { [category]: total }
 */
export function categoryTotals(expenses) {
  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] ?? 0) + e.amount;
  }
  return totals;
}

/**
 * Total amount across an array of expense records.
 */
export function totalExpenses(expenses) {
  return expenses.reduce((s, e) => s + e.amount, 0);
}

/**
 * Rolling 6-month expense totals, newest month last.
 * @param {Array} expenses - all expense records
 * @param {number} year - reference year
 * @param {number} month - reference month (1-12)
 * @returns {{ label: string, total: number }[]} array of 6 entries
 */
export function last6MonthTotals(expenses, year, month) {
  const results = [];
  for (let i = 5; i >= 0; i--) {
    let m = month - i;
    let y = year;
    while (m <= 0) { m += 12; y -= 1; }
    const label = `${y}-${String(m).padStart(2, '0')}`;
    const total = totalExpenses(filterByMonth(expenses, y, m));
    results.push({ label, total });
  }
  return results;
}

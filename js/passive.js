/**
 * Filter passive income records to a specific year+month.
 * Each record: { date: 'YYYY-MM-DD', amount, type }
 */
export function filterByMonth(records, year, month) {
  return records.filter(r => {
    const d = new Date(r.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });
}

/**
 * Filter records to a specific year.
 */
export function filterByYear(records, year) {
  return records.filter(r => new Date(r.date).getFullYear() === year);
}

/**
 * Total income across records.
 */
export function totalIncome(records) {
  return records.reduce((s, r) => s + r.amount, 0);
}

/**
 * Breakdown by type: { [type]: total }
 */
export function incomeByType(records) {
  const breakdown = {};
  for (const r of records) {
    breakdown[r.type] = (breakdown[r.type] ?? 0) + r.amount;
  }
  return breakdown;
}

/**
 * Annual total (sum all records for given year).
 */
export function annualTotal(records, year) {
  return totalIncome(filterByYear(records, year));
}

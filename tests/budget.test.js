import { describe, it, expect } from '@jest/globals';
import {
  savingsRate,
  filterByMonth,
  categoryTotals,
  totalExpenses,
  last6MonthTotals,
} from '../js/budget.js';

const sampleExpenses = [
  { date: '2025-06-01', amount: 900, category: 'housing' },
  { date: '2025-06-15', amount: 200, category: 'food' },
  { date: '2025-06-20', amount: 50,  category: 'transport' },
  { date: '2025-05-10', amount: 300, category: 'food' },
  { date: '2025-04-05', amount: 100, category: 'leisure' },
];

describe('savingsRate', () => {
  it('computes rate correctly', () => {
    expect(savingsRate(2000, 1500)).toBeCloseTo(0.25);
  });

  it('returns 0 when income is 0', () => {
    expect(savingsRate(0, 500)).toBe(0);
  });

  it('returns 1 when expenses are 0', () => {
    expect(savingsRate(2000, 0)).toBe(1);
  });

  it('can return a negative rate when expenses exceed income', () => {
    expect(savingsRate(1000, 1500)).toBeCloseTo(-0.5);
  });
});

describe('filterByMonth', () => {
  it('returns only records for the given month', () => {
    const june = filterByMonth(sampleExpenses, 2025, 6);
    expect(june).toHaveLength(3);
    june.forEach(e => expect(e.date.startsWith('2025-06')).toBe(true));
  });

  it('returns empty array when no records match', () => {
    expect(filterByMonth(sampleExpenses, 2025, 1)).toHaveLength(0);
  });

  it('is specific to year, not just month', () => {
    const expenses = [
      { date: '2024-06-01', amount: 100, category: 'food' },
      { date: '2025-06-01', amount: 200, category: 'food' },
    ];
    expect(filterByMonth(expenses, 2025, 6)).toHaveLength(1);
  });
});

describe('categoryTotals', () => {
  it('groups amounts by category', () => {
    const june = filterByMonth(sampleExpenses, 2025, 6);
    const totals = categoryTotals(june);
    expect(totals['housing']).toBe(900);
    expect(totals['food']).toBe(200);
    expect(totals['transport']).toBe(50);
  });

  it('returns empty object for empty input', () => {
    expect(categoryTotals([])).toEqual({});
  });

  it('sums multiple entries in the same category', () => {
    const expenses = [
      { category: 'food', amount: 100 },
      { category: 'food', amount: 50 },
      { category: 'housing', amount: 900 },
    ];
    const totals = categoryTotals(expenses);
    expect(totals['food']).toBe(150);
  });
});

describe('totalExpenses', () => {
  it('sums all amounts', () => {
    const june = filterByMonth(sampleExpenses, 2025, 6);
    expect(totalExpenses(june)).toBe(1150);
  });

  it('returns 0 for empty array', () => {
    expect(totalExpenses([])).toBe(0);
  });
});

describe('last6MonthTotals', () => {
  it('returns exactly 6 entries', () => {
    const results = last6MonthTotals(sampleExpenses, 2025, 6);
    expect(results).toHaveLength(6);
  });

  it('labels are in chronological order', () => {
    const results = last6MonthTotals(sampleExpenses, 2025, 6);
    expect(results[0].label).toBe('2025-01');
    expect(results[5].label).toBe('2025-06');
  });

  it('wraps correctly across year boundary', () => {
    const results = last6MonthTotals(sampleExpenses, 2025, 3);
    expect(results[0].label).toBe('2024-10');
    expect(results[5].label).toBe('2025-03');
  });

  it('correctly totals expenses per month', () => {
    const results = last6MonthTotals(sampleExpenses, 2025, 6);
    const june = results.find(r => r.label === '2025-06');
    const may  = results.find(r => r.label === '2025-05');
    expect(june.total).toBe(1150);
    expect(may.total).toBe(300);
  });

  it('returns 0 for months with no data', () => {
    const results = last6MonthTotals(sampleExpenses, 2025, 6);
    const jan = results.find(r => r.label === '2025-01');
    expect(jan.total).toBe(0);
  });
});

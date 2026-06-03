import { describe, it, expect } from '@jest/globals';
import {
  filterByMonth,
  filterByYear,
  totalIncome,
  incomeByType,
  annualTotal,
} from '../js/passive.js';

const records = [
  { date: '2025-06-10', amount: 12.50, type: 'dividend' },
  { date: '2025-06-25', amount: 650,   type: 'rental' },
  { date: '2025-05-15', amount: 8.00,  type: 'staking' },
  { date: '2025-05-20', amount: 200,   type: 'rental' },
  { date: '2024-12-31', amount: 5.00,  type: 'interest' },
];

describe('filterByMonth', () => {
  it('returns records for the correct month', () => {
    const june = filterByMonth(records, 2025, 6);
    expect(june).toHaveLength(2);
  });

  it('is year-specific', () => {
    const dec2025 = filterByMonth(records, 2025, 12);
    expect(dec2025).toHaveLength(0);
    const dec2024 = filterByMonth(records, 2024, 12);
    expect(dec2024).toHaveLength(1);
  });
});

describe('filterByYear', () => {
  it('returns all records for the given year', () => {
    expect(filterByYear(records, 2025)).toHaveLength(4);
    expect(filterByYear(records, 2024)).toHaveLength(1);
  });

  it('returns empty array for year with no records', () => {
    expect(filterByYear(records, 2023)).toHaveLength(0);
  });
});

describe('totalIncome', () => {
  it('sums all amounts', () => {
    const june = filterByMonth(records, 2025, 6);
    expect(totalIncome(june)).toBeCloseTo(662.50);
  });

  it('returns 0 for empty input', () => {
    expect(totalIncome([])).toBe(0);
  });
});

describe('incomeByType', () => {
  it('groups income by type', () => {
    const june = filterByMonth(records, 2025, 6);
    const breakdown = incomeByType(june);
    expect(breakdown['dividend']).toBeCloseTo(12.50);
    expect(breakdown['rental']).toBe(650);
  });

  it('returns empty object for empty input', () => {
    expect(incomeByType([])).toEqual({});
  });

  it('aggregates multiple records of the same type', () => {
    const breakdown = incomeByType(filterByYear(records, 2025));
    expect(breakdown['rental']).toBeCloseTo(850); // 650 + 200
  });
});

describe('annualTotal', () => {
  it('sums all income for the given year', () => {
    expect(annualTotal(records, 2025)).toBeCloseTo(870.50);
  });

  it('returns 0 for a year with no records', () => {
    expect(annualTotal(records, 2023)).toBe(0);
  });
});

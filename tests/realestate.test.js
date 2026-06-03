import { describe, it, expect } from '@jest/globals';
import {
  propertyEquity,
  loanToValue,
  monthlyCashflow,
  capitalGain,
  grossRentalYield,
  portfolioSummary,
} from '../js/realestate.js';

describe('propertyEquity', () => {
  it('computes equity correctly', () => {
    expect(propertyEquity(200000, 120000)).toBe(80000);
  });

  it('returns negative equity when loan exceeds value', () => {
    expect(propertyEquity(100000, 110000)).toBe(-10000);
  });

  it('returns full value when no loan', () => {
    expect(propertyEquity(250000, 0)).toBe(250000);
  });
});

describe('loanToValue', () => {
  it('computes LTV ratio', () => {
    expect(loanToValue(80000, 200000)).toBeCloseTo(0.4);
  });

  it('returns 0 when current value is 0', () => {
    expect(loanToValue(50000, 0)).toBe(0);
  });

  it('returns 1 for a fully-mortgaged property', () => {
    expect(loanToValue(200000, 200000)).toBeCloseTo(1);
  });
});

describe('monthlyCashflow', () => {
  it('returns positive cashflow when rent exceeds mortgage', () => {
    expect(monthlyCashflow(800, 600)).toBe(200);
  });

  it('returns negative cashflow when mortgage exceeds rent', () => {
    expect(monthlyCashflow(500, 650)).toBe(-150);
  });

  it('returns 0 for a break-even property', () => {
    expect(monthlyCashflow(700, 700)).toBe(0);
  });
});

describe('capitalGain', () => {
  it('computes gain correctly', () => {
    expect(capitalGain(150000, 185000)).toBe(35000);
  });

  it('returns negative for a loss', () => {
    expect(capitalGain(200000, 175000)).toBe(-25000);
  });
});

describe('grossRentalYield', () => {
  it('computes yield as annual rent / value', () => {
    // £600/month on £150,000 → 4.8%
    expect(grossRentalYield(600, 150000)).toBeCloseTo(0.048);
  });

  it('returns 0 for zero value', () => {
    expect(grossRentalYield(600, 0)).toBe(0);
  });
});

describe('portfolioSummary', () => {
  const properties = [
    { purchasePrice: 150000, currentValue: 180000, monthlyRent: 800, mortgage: 600, remainingLoan: 100000 },
    { purchasePrice: 200000, currentValue: 220000, monthlyRent: 1000, mortgage: 800, remainingLoan: 150000 },
  ];

  it('sums total value', () => {
    expect(portfolioSummary(properties).totalValue).toBe(400000);
  });

  it('sums total equity', () => {
    // (180000-100000) + (220000-150000) = 80000+70000
    expect(portfolioSummary(properties).totalEquity).toBe(150000);
  });

  it('sums total monthly cashflow', () => {
    // (800-600) + (1000-800) = 200+200
    expect(portfolioSummary(properties).totalCashflow).toBe(400);
  });

  it('sums total debt', () => {
    expect(portfolioSummary(properties).totalDebt).toBe(250000);
  });

  it('returns zeros for empty portfolio', () => {
    const { totalValue, totalEquity, totalCashflow, totalDebt } = portfolioSummary([]);
    expect(totalValue).toBe(0);
    expect(totalEquity).toBe(0);
    expect(totalCashflow).toBe(0);
    expect(totalDebt).toBe(0);
  });
});

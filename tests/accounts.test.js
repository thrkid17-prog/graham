import { describe, it, expect } from '@jest/globals';
import {
  totalNetWorth,
  investableNetWorth,
  emergencyCoverageMonths,
  emergencyFundProgress,
  goalProgress,
} from '../js/accounts.js';

describe('totalNetWorth', () => {
  it('sums all three accounts', () => {
    expect(totalNetWorth(2000, 15000, 5000)).toBe(22000);
  });

  it('handles zero balances', () => {
    expect(totalNetWorth(0, 0, 0)).toBe(0);
  });

  it('handles decimal values', () => {
    expect(totalNetWorth(100.50, 200.75, 50.25)).toBeCloseTo(351.50);
  });
});

describe('investableNetWorth', () => {
  it('excludes the current account', () => {
    expect(investableNetWorth(15000, 5000)).toBe(20000);
  });

  it('returns 0 when both are empty', () => {
    expect(investableNetWorth(0, 0)).toBe(0);
  });
});

describe('emergencyCoverageMonths', () => {
  it('computes months of coverage', () => {
    expect(emergencyCoverageMonths(4500, 900)).toBeCloseTo(5);
  });

  it('returns null when monthly expenses are 0', () => {
    expect(emergencyCoverageMonths(4500, 0)).toBeNull();
  });

  it('returns a fractional value for partial coverage', () => {
    expect(emergencyCoverageMonths(1350, 900)).toBeCloseTo(1.5);
  });
});

describe('emergencyFundProgress', () => {
  it('returns 1 when fund is fully funded', () => {
    expect(emergencyFundProgress(2700, 900, 3)).toBe(1);
  });

  it('clamps to 1 when fund exceeds target', () => {
    expect(emergencyFundProgress(5000, 900, 3)).toBe(1);
  });

  it('returns partial progress', () => {
    expect(emergencyFundProgress(1350, 900, 3)).toBeCloseTo(0.5);
  });

  it('returns 1 when target is 0 (avoid div by zero)', () => {
    expect(emergencyFundProgress(1000, 0, 3)).toBe(1);
  });
});

describe('goalProgress', () => {
  it('computes progress percentage', () => {
    expect(goalProgress(5000, 10000)).toBe(50);
  });

  it('clamps to 100 when current exceeds target', () => {
    expect(goalProgress(12000, 10000)).toBe(100);
  });

  it('returns 0 for 0 current', () => {
    expect(goalProgress(0, 10000)).toBe(0);
  });

  it('returns 100 when target is 0 or negative', () => {
    expect(goalProgress(1000, 0)).toBe(100);
    expect(goalProgress(1000, -1)).toBe(100);
  });
});

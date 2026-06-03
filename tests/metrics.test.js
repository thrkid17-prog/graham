import { describe, it, expect } from '@jest/globals';
import {
  periodReturns,
  mean,
  stddev,
  sharpeRatio,
  maxDrawdown,
  annualisedVolatility,
  holdingPnL,
  portfolioTotals,
} from '../js/metrics.js';

describe('periodReturns', () => {
  it('returns empty array for fewer than 2 values', () => {
    expect(periodReturns([])).toEqual([]);
    expect(periodReturns([100])).toEqual([]);
  });

  it('computes percentage change between consecutive values', () => {
    const r = periodReturns([100, 110, 99]);
    expect(r[0]).toBeCloseTo(0.1);
    expect(r[1]).toBeCloseTo(-0.1);
  });

  it('handles a flat series (all zeros)', () => {
    expect(periodReturns([200, 200, 200])).toEqual([0, 0]);
  });
});

describe('mean', () => {
  it('returns 0 for empty array', () => expect(mean([])).toBe(0));
  it('computes average correctly', () => expect(mean([1, 2, 3, 4])).toBe(2.5));
  it('handles negatives', () => expect(mean([-2, 0, 2])).toBe(0));
});

describe('stddev', () => {
  it('returns 0 for fewer than 2 values', () => {
    expect(stddev([])).toBe(0);
    expect(stddev([5])).toBe(0);
  });

  it('computes population std dev', () => {
    // [2, 4, 4, 4, 5, 5, 7, 9] → mean=5, variance=4, σ=2
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2);
  });

  it('returns 0 for a constant series', () => {
    expect(stddev([3, 3, 3, 3])).toBeCloseTo(0);
  });
});

describe('sharpeRatio', () => {
  it('returns 0 for a single value series', () => {
    expect(sharpeRatio([1000])).toBe(0);
  });

  it('returns 0 when volatility is zero (constant returns)', () => {
    const flat = Array(13).fill(1000);
    expect(sharpeRatio(flat)).toBe(0);
  });

  it('returns a positive number for a steadily rising portfolio', () => {
    const rising = [1000, 1010, 1020, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1110, 1120];
    expect(sharpeRatio(rising)).toBeGreaterThan(0);
  });

  it('returns a negative number for a steadily falling portfolio', () => {
    const falling = [1000, 990, 980, 970, 960, 950, 940, 930, 920, 910, 900, 890, 880];
    expect(sharpeRatio(falling)).toBeLessThan(0);
  });
});

describe('maxDrawdown', () => {
  it('returns 0 for fewer than 2 values', () => {
    expect(maxDrawdown([])).toBe(0);
    expect(maxDrawdown([500])).toBe(0);
  });

  it('returns 0 for a monotonically rising series', () => {
    expect(maxDrawdown([100, 110, 120, 130])).toBe(0);
  });

  it('correctly identifies a 50% drawdown', () => {
    expect(maxDrawdown([100, 200, 100])).toBeCloseTo(-0.5);
  });

  it('handles multiple drawdowns and returns the largest', () => {
    // Peak 200, drop to 120 (-40%), then rises to 300, drops to 150 (-50%)
    expect(maxDrawdown([100, 200, 120, 300, 150])).toBeCloseTo(-0.5);
  });

  it('handles an all-declining series', () => {
    expect(maxDrawdown([100, 80, 60, 40])).toBeCloseTo(-0.6);
  });
});

describe('annualisedVolatility', () => {
  it('returns 0 for fewer than 2 values', () => {
    expect(annualisedVolatility([100])).toBe(0);
  });

  it('returns 0 for a flat series', () => {
    expect(annualisedVolatility([100, 100, 100, 100])).toBe(0);
  });

  it('is always non-negative', () => {
    const mixed = [100, 110, 90, 115, 95, 120];
    expect(annualisedVolatility(mixed)).toBeGreaterThanOrEqual(0);
  });
});

describe('holdingPnL', () => {
  it('computes profit correctly', () => {
    const { invested, value, pnl, pnlPct } = holdingPnL(2, 1000, 1500);
    expect(invested).toBe(2000);
    expect(value).toBe(3000);
    expect(pnl).toBe(1000);
    expect(pnlPct).toBeCloseTo(0.5);
  });

  it('computes loss correctly', () => {
    const { pnl, pnlPct } = holdingPnL(1, 10000, 8000);
    expect(pnl).toBe(-2000);
    expect(pnlPct).toBeCloseTo(-0.2);
  });

  it('handles zero cost basis without throwing', () => {
    const { pnlPct } = holdingPnL(1, 0, 500);
    expect(pnlPct).toBe(0);
  });

  it('handles zero quantity', () => {
    const { invested, value, pnl } = holdingPnL(0, 5000, 6000);
    expect(invested).toBe(0);
    expect(value).toBe(0);
    expect(pnl).toBe(0);
  });
});

describe('portfolioTotals', () => {
  it('aggregates multiple holdings', () => {
    const assets = [
      { qty: 1, buyPrice: 1000, currentPrice: 1200 },
      { qty: 2, buyPrice: 500,  currentPrice: 400  },
    ];
    const { totalInvested, totalValue, totalPnL, totalPnLPct } = portfolioTotals(assets);
    expect(totalInvested).toBe(2000);
    expect(totalValue).toBe(2000);
    expect(totalPnL).toBe(0);
    expect(totalPnLPct).toBeCloseTo(0);
  });

  it('returns zeros for empty portfolio', () => {
    const { totalInvested, totalValue, totalPnL } = portfolioTotals([]);
    expect(totalInvested).toBe(0);
    expect(totalValue).toBe(0);
    expect(totalPnL).toBe(0);
  });

  it('correctly calculates overall gain', () => {
    const assets = [
      { qty: 1, buyPrice: 40000, currentPrice: 60000 },
      { qty: 10, buyPrice: 100, currentPrice: 150 },
    ];
    const { totalInvested, totalValue, totalPnL } = portfolioTotals(assets);
    expect(totalInvested).toBe(41000);
    expect(totalValue).toBe(61500);
    expect(totalPnL).toBe(20500);
  });
});

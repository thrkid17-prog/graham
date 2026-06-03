import { describe, it, expect } from '@jest/globals';
import { computeProjection, milestones, totalInterestEarned } from '../js/projection.js';

describe('computeProjection', () => {
  it('returns one entry per year', () => {
    const proj = computeProjection(1000, 100, 0.08, 10);
    expect(proj).toHaveLength(10);
    expect(proj.map(p => p.year)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('grows over time with positive return', () => {
    const proj = computeProjection(1000, 0, 0.08, 5);
    for (let i = 1; i < proj.length; i++) {
      expect(proj[i].value).toBeGreaterThan(proj[i - 1].value);
    }
  });

  it('equals starting capital with 0% return and 0 monthly', () => {
    const proj = computeProjection(5000, 0, 0, 3);
    proj.forEach(p => expect(p.value).toBeCloseTo(5000));
  });

  it('returns empty array for 0 years', () => {
    expect(computeProjection(10000, 200, 0.07, 0)).toEqual([]);
  });

  it('handles zero starting capital', () => {
    const proj = computeProjection(0, 500, 0.06, 1);
    expect(proj[0].value).toBeGreaterThan(0);
  });

  it('is consistent with the compound interest formula for single lump-sum', () => {
    // FV = PV * (1 + r/12)^(12*n)
    const capital = 10000;
    const rate = 0.08;
    const years = 10;
    const proj = computeProjection(capital, 0, rate, years);
    const expected = capital * Math.pow(1 + rate / 12, 12 * years);
    expect(proj[years - 1].value).toBeCloseTo(expected, 0);
  });
});

describe('milestones', () => {
  it('returns correct values at requested years', () => {
    const proj = computeProjection(1000, 100, 0.08, 20);
    const ms = milestones(proj, [5, 10, 20]);
    expect(ms[5]).toBe(proj.find(p => p.year === 5).value);
    expect(ms[10]).toBe(proj.find(p => p.year === 10).value);
    expect(ms[20]).toBe(proj[19].value);
  });

  it('returns null for years beyond the projection', () => {
    const proj = computeProjection(1000, 0, 0.05, 5);
    const ms = milestones(proj, [10]);
    expect(ms[10]).toBeNull();
  });
});

describe('totalInterestEarned', () => {
  it('returns positive interest for a growing portfolio', () => {
    const proj = computeProjection(1000, 100, 0.08, 20);
    const interest = totalInterestEarned(1000, 100, proj);
    expect(interest).toBeGreaterThan(0);
  });

  it('returns 0 for an empty projection', () => {
    expect(totalInterestEarned(1000, 100, [])).toBe(0);
  });

  it('returns ~0 for 0% return', () => {
    const proj = computeProjection(1000, 0, 0, 5);
    expect(totalInterestEarned(1000, 0, proj)).toBeCloseTo(0);
  });
});

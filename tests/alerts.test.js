import { describe, it, expect } from '@jest/globals';
import { evaluateAlerts, markTriggered } from '../js/alerts.js';

const prices = [
  { id: 'btc', price: 85000, change24h: 0.03 },
  { id: 'eth', price: 3200,  change24h: -0.06 },
  { id: 'gold', price: 2050, change24h: 0.001 },
];

describe('evaluateAlerts', () => {
  it('fires an "above" alert when price meets threshold', () => {
    const alerts = [{ id: '1', assetId: 'btc', direction: 'above', threshold: 80000, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(1);
  });

  it('does not fire "above" when price is below threshold', () => {
    const alerts = [{ id: '1', assetId: 'btc', direction: 'above', threshold: 90000, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(0);
  });

  it('fires a "below" alert when price is at or under threshold', () => {
    const alerts = [{ id: '2', assetId: 'eth', direction: 'below', threshold: 3200, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(1);
  });

  it('does not fire "below" when price is above threshold', () => {
    const alerts = [{ id: '2', assetId: 'eth', direction: 'below', threshold: 3000, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(0);
  });

  it('fires a "pct_up" alert when 24h gain meets threshold', () => {
    const alerts = [{ id: '3', assetId: 'btc', direction: 'pct_up', threshold: 2, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(1);
  });

  it('does not fire "pct_up" when gain is below threshold', () => {
    const alerts = [{ id: '3', assetId: 'btc', direction: 'pct_up', threshold: 5, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(0);
  });

  it('fires a "pct_down" alert when 24h loss meets threshold', () => {
    const alerts = [{ id: '4', assetId: 'eth', direction: 'pct_down', threshold: 5, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(1);
  });

  it('does not fire "pct_down" when loss is below threshold', () => {
    const alerts = [{ id: '4', assetId: 'eth', direction: 'pct_down', threshold: 10, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(0);
  });

  it('skips already-triggered alerts', () => {
    const alerts = [{ id: '1', assetId: 'btc', direction: 'above', threshold: 80000, triggered: true }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(0);
  });

  it('ignores alerts for unknown assets', () => {
    const alerts = [{ id: '5', assetId: 'unknown', direction: 'above', threshold: 1, triggered: false }];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(0);
  });

  it('handles empty alerts array', () => {
    expect(evaluateAlerts([], prices)).toEqual([]);
  });

  it('handles empty prices array', () => {
    const alerts = [{ id: '1', assetId: 'btc', direction: 'above', threshold: 1, triggered: false }];
    expect(evaluateAlerts(alerts, [])).toEqual([]);
  });

  it('can trigger multiple alerts at once', () => {
    const alerts = [
      { id: '1', assetId: 'btc', direction: 'above', threshold: 80000, triggered: false },
      { id: '2', assetId: 'eth', direction: 'below', threshold: 3500,  triggered: false },
    ];
    expect(evaluateAlerts(alerts, prices)).toHaveLength(2);
  });
});

describe('markTriggered', () => {
  it('marks specified alerts as triggered', () => {
    const alerts = [
      { id: '1', triggered: false },
      { id: '2', triggered: false },
    ];
    const updated = markTriggered(alerts, ['1']);
    expect(updated[0].triggered).toBe(true);
    expect(updated[1].triggered).toBe(false);
  });

  it('does not mutate the original array', () => {
    const alerts = [{ id: '1', triggered: false }];
    markTriggered(alerts, ['1']);
    expect(alerts[0].triggered).toBe(false);
  });

  it('handles empty triggeredIds', () => {
    const alerts = [{ id: '1', triggered: false }];
    const updated = markTriggered(alerts, []);
    expect(updated[0].triggered).toBe(false);
  });
});

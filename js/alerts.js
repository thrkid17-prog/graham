/**
 * Evaluate a list of price alerts against current prices.
 *
 * Alert shape: { id, assetId, direction, threshold, message, triggered }
 * direction: 'above' | 'below' | 'pct_up' | 'pct_down'
 *
 * Price entry shape: { id, price, change24h }   (change24h as decimal, e.g. 0.05 = +5%)
 *
 * Returns alerts that should fire now (not previously triggered).
 */
export function evaluateAlerts(alerts, prices) {
  const priceMap = Object.fromEntries(prices.map(p => [p.id, p]));
  const triggered = [];

  for (const alert of alerts) {
    if (alert.triggered) continue;
    const entry = priceMap[alert.assetId];
    if (!entry) continue;

    let fires = false;
    switch (alert.direction) {
      case 'above':
        fires = entry.price >= alert.threshold;
        break;
      case 'below':
        fires = entry.price <= alert.threshold;
        break;
      case 'pct_up':
        fires = entry.change24h >= alert.threshold / 100;
        break;
      case 'pct_down':
        fires = entry.change24h <= -(alert.threshold / 100);
        break;
    }

    if (fires) triggered.push(alert);
  }

  return triggered;
}

/**
 * Mark alerts as triggered (returns new array, does not mutate).
 */
export function markTriggered(alerts, triggeredIds) {
  const idSet = new Set(triggeredIds);
  return alerts.map(a => idSet.has(a.id) ? { ...a, triggered: true } : a);
}

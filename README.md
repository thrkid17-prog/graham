!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="Neverland">
  <meta name="theme-color" content="#0B0B0F">
  <meta name="description" content="Personal wealth management dashboard">
  <meta name="format-detection" content="telephone=no">

  <title>Working For That Neverland</title>

  <!-- PWA Manifest -->
  <link rel="manifest" href="manifest.json">

  <!-- iOS icons -->
  <link rel="apple-touch-icon" href="icons/icon-180.png">
  <link rel="apple-touch-icon" sizes="192x192" href="icons/icon-192.png">
  <link rel="apple-touch-icon" sizes="512x512" href="icons/icon-512.png">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="toast-container"></div>

  <!-- Ambient background orbs -->
  <div class="bg-orb bg-orb-1"></div>
  <div class="bg-orb bg-orb-2"></div>
  <div class="bg-orb bg-orb-3"></div>

  <!-- ═══ HEADER ════════════════════════════════════════════ -->
  <header class="header">
    <div class="header-inner">
      <div class="brand">
        <div class="brand-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 17l4-8 4 4 4-6 4 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="brand-name">
          <span class="brand-site">workingforthatneverland.com</span>
        </div>
      </div>
      <div class="header-status">
        <div class="status-pill" id="status-pill">
          <span class="status-dot" id="status-dot"></span>
          <span id="status-text">Loading…</span>
        </div>
      </div>
      <div class="header-actions">
        <div id="sync-indicator" class="sync-indicator"></div>
        <button class="icon-btn" id="btn-sync" title="Cloud sync" onclick="showSyncSignInModal()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
        </button>
        <button class="icon-btn" id="btn-lock" title="Lock dashboard">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </button>
        <button class="icon-btn" id="btn-refresh">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
        </button>
        <button class="invest-btn" id="btn-invest">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Invest
        </button>
      </div>
    </div>
  </header>

  <!-- ═══ NAV TABS ══════════════════════════════════════════ -->
  <nav class="nav">
    <div class="nav-inner">
      <button class="nav-tab" data-tab="accounts">Accounts</button>
      <button class="nav-tab active" data-tab="dashboard">Dashboard</button>
      <button class="nav-tab" data-tab="assets">Assets</button>
      <button class="nav-tab" data-tab="transactions">Transactions</button>
      <button class="nav-tab" data-tab="networth">Net Worth</button>
      <button class="nav-tab" data-tab="budget">Budget</button>
      <button class="nav-tab" data-tab="realestate">Real Estate</button>
      <button class="nav-tab" data-tab="passive">Passive Income</button>
      <button class="nav-tab ai-tab" data-tab="aiinsights">✦ AI Insights</button>
      <button class="nav-tab" data-tab="alerts">Alerts</button>
      <button class="nav-tab" data-tab="projection">Projection</button>
    </div>
  </nav>

  <main class="main">

    <!-- ═══ ACCOUNTS ══════════════════════════════════════════ -->
    <section class="page" id="page-accounts">

      <!-- ── Net Worth heroes ──────────────────────────────── -->
      <div class="acc-nw-row">
        <div class="acc-nw-hero glass-card">
          <div class="acc-nw-label">Total Net Worth</div>
          <div class="acc-nw-value" id="acc-total-nw">—</div>
          <div class="acc-nw-breakdown">
            <div class="acc-nw-item"><span class="acc-nw-dot" style="background:#6C8EF5"></span><span>Current</span><span id="acc-nw-current" class="acc-nw-item-val">—</span></div>
            <div class="acc-nw-item"><span class="acc-nw-dot" style="background:#F7931A"></span><span>Investments</span><span id="acc-nw-investment" class="acc-nw-item-val">—</span></div>
            <div class="acc-nw-item"><span class="acc-nw-dot" style="background:#30d158"></span><span>Emergency</span><span id="acc-nw-emergency" class="acc-nw-item-val">—</span></div>
          </div>
        </div>
        <div class="acc-nw-hero acc-nw-investable glass-card">
          <div class="acc-nw-label">Investable Net Worth</div>
          <div class="acc-nw-value" id="acc-investable-nw">—</div>
          <div class="acc-nw-sub">Investments + Emergency only</div>
          <div class="acc-nw-sub muted" style="margin-top:2px">Long-term capital · excludes daily money</div>
        </div>
        <div class="acc-goal-hero glass-card">
          <div class="acc-nw-label" id="goal-label">Financial goal</div>
          <div class="acc-goal-values">
            <span class="acc-nw-value" id="goal-current">—</span>
            <span class="acc-goal-sep">/</span>
            <span class="acc-goal-target" id="goal-target">—</span>
          </div>
          <div class="acc-progress-track" style="margin:.5rem 0">
            <div class="acc-progress-fill" id="goal-bar-fill"></div>
          </div>
          <div class="acc-goal-footer">
            <span class="pos" id="goal-pct">—</span>
            <span class="acc-nw-sub" id="goal-remaining">—</span>
          </div>
          <details class="acc-goal-edit">
            <summary class="hint-text" style="cursor:pointer;user-select:none">Edit goal</summary>
            <div class="acc-edit-row" style="margin-top:.5rem">
              <div class="ff"><label>Goal name</label><input type="text" id="goal-edit-label" placeholder="e.g. 10k milestone"></div>
              <div class="ff"><label>Target (€)</label><input type="number" id="goal-edit-target" placeholder="10000" min="1" step="any"></div>
            </div>
            <button class="ghost-btn" style="margin-top:.5rem;width:100%" onclick="saveGoalSettings()">Save goal</button>
          </details>
        </div>
      </div>

      <!-- ── NW Chart ───────────────────────────────────────── -->
      <div class="glass-card">
        <div class="card-header">
          <span class="card-title">Net worth over time</span>
        </div>
        <div id="acc-nw-chart-wrap" style="position:relative;height:160px;padding:0 1.25rem .75rem">
          <canvas id="acc-nw-chart"></canvas>
        </div>
      </div>

      <!-- ── Money Flow Visual ───────────────────────────── -->
      <div class="money-flow-card glass-card">
        <div class="card-header">
          <span class="card-title">Money flow</span>
          <button class="invest-btn" style="padding:6px 14px;font-size:12px" onclick="openTransferModal()">↗ Transfer</button>
        </div>
        <div class="money-flow-diagram">
          <div class="mf-node mf-income">
            <div class="mf-node-icon">💰</div>
            <div class="mf-node-label">Income</div>
            <div class="mf-node-val pos" id="mf-income-val">—</div>
          </div>
          <div class="mf-arrow-group">
            <div class="mf-arrow mf-arrow-right">
              <div class="mf-arrow-line"></div>
              <div class="mf-arrow-tip">▶</div>
            </div>
          </div>
          <div class="mf-node mf-current">
            <div class="mf-node-icon">💳</div>
            <div class="mf-node-label">Current</div>
            <div class="mf-node-val" id="mf-current-val">—</div>
          </div>
          <div class="mf-split-group">
            <div class="mf-split-arrow mf-split-top">
              <div class="mf-split-line"></div>
              <div class="mf-split-tip">▶</div>
              <span class="mf-split-label" style="color:#F7931A">Investments</span>
            </div>
            <div class="mf-split-arrow mf-split-bottom">
              <div class="mf-split-line"></div>
              <div class="mf-split-tip">▶</div>
              <span class="mf-split-label" style="color:#30d158">Emergency</span>
            </div>
          </div>
          <div class="mf-dest-group">
            <div class="mf-node mf-invest">
              <div class="mf-node-icon">📊</div>
              <div class="mf-node-val" id="mf-invest-val">—</div>
            </div>
            <div class="mf-node mf-emergency">
              <div class="mf-node-icon">🛡️</div>
              <div class="mf-node-val" id="mf-emer-val">—</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Three accounts ────────────────────────────────── -->
      <div class="acc-cards-row">

        <!-- 1. Current Account -->
        <div class="acc-card glass-card" style="--acc-color:#6C8EF5">
          <div class="acc-card-header">
            <div class="acc-card-icon" style="background:rgba(108,142,245,.14)">💳</div>
            <div>
              <div class="acc-card-title">Current Account</div>
              <div class="acc-card-sub">Daily money · Income − Expenses</div>
            </div>
          </div>

          <div class="acc-card-balance" id="acc-current-balance">—</div>

          <div class="acc-stats-grid">
            <div class="acc-stat"><div class="acc-stat-label">Total income</div><div class="acc-stat-val pos" id="acc-current-income-total">—</div></div>
            <div class="acc-stat"><div class="acc-stat-label">Total expenses</div><div class="acc-stat-val neg" id="acc-current-expense-total">—</div></div>
            <div class="acc-stat"><div class="acc-stat-label">This month in</div><div class="acc-stat-val pos" id="acc-current-month-income">—</div></div>
            <div class="acc-stat"><div class="acc-stat-label">This month out</div><div class="acc-stat-val neg" id="acc-current-month-expense">—</div></div>
          </div>

          <!-- Add income -->
          <div class="acc-add-section">
            <div class="acc-add-title">+ Add income</div>
            <div class="acc-add-row">
              <input type="text"   id="acc-add-income-label"  placeholder="e.g. Salary" class="acc-add-input">
              <input type="number" id="acc-add-income-amount" placeholder="€" min="0" step="any" class="acc-add-input acc-add-amount">
              <input type="date"   id="acc-add-income-date"   class="acc-add-input acc-add-date">
              <button class="btn-xs buy" onclick="addAccTransaction('income')">Add</button>
            </div>
            <span id="acc-add-income-err" class="form-error"></span>
          </div>

          <!-- Add expense -->
          <div class="acc-add-section">
            <div class="acc-add-title neg">− Add expense</div>
            <div class="acc-add-row">
              <input type="text"   id="acc-add-expense-label"  placeholder="e.g. Rent" class="acc-add-input">
              <input type="number" id="acc-add-expense-amount" placeholder="€" min="0" step="any" class="acc-add-input acc-add-amount">
              <input type="date"   id="acc-add-expense-date"   class="acc-add-input acc-add-date">
              <button class="btn-xs" style="background:var(--neg-dim);color:var(--neg);border-color:rgba(255,69,58,.2)" onclick="addAccTransaction('expense')">Add</button>
            </div>
            <span id="acc-add-expense-err" class="form-error"></span>
          </div>

          <!-- Transaction list -->
          <div class="acc-tx-list-wrap">
            <div class="acc-add-title" style="margin-bottom:.4rem">Recent transactions</div>
            <div id="acc-tx-list"></div>
          </div>

          <div class="acc-card-actions">
            <button class="btn-xs" onclick="openTransferModal()">↗ Transfer</button>
          </div>
        </div>

        <!-- 2. Investment Account -->
        <div class="acc-card glass-card" style="--acc-color:#F7931A">
          <div class="acc-card-header">
            <div class="acc-card-icon" style="background:rgba(247,147,26,.12)">📊</div>
            <div>
              <div class="acc-card-title">Investment Account</div>
              <div class="acc-card-sub">BTC · MSCI World · Gold</div>
            </div>
          </div>

          <div class="acc-card-balance" id="acc-invest-value">—</div>

          <div class="acc-stats-grid">
            <div class="acc-stat"><div class="acc-stat-label">Total invested</div><div class="acc-stat-val" id="acc-invest-invested">—</div></div>
            <div class="acc-stat"><div class="acc-stat-label">Profit / Loss</div><div class="acc-stat-val" id="acc-invest-pnl">—</div></div>
          </div>

          <div id="acc-asset-mini-list" class="acc-asset-mini-list"></div>

          <div class="acc-card-actions">
            <button class="btn-xs buy" onclick="document.getElementById('btn-invest')?.click()">+ Invest</button>
            <button class="btn-xs" onclick="switchTab('assets')">Assets</button>
            <button class="btn-xs" onclick="switchTab('transactions')">Transactions</button>
          </div>
        </div>

        <!-- 3. Emergency Fund -->
        <div class="acc-card glass-card" style="--acc-color:#30d158">
          <div class="acc-card-header">
            <div class="acc-card-icon" style="background:rgba(48,209,88,.1)">🛡️</div>
            <div>
              <div class="acc-card-title">Emergency Fund</div>
              <div class="acc-card-sub">Safety buffer</div>
            </div>
          </div>

          <div class="acc-card-balance" id="acc-emer-balance">—</div>

          <div class="acc-stats-grid">
            <div class="acc-stat"><div class="acc-stat-label">Target</div><div class="acc-stat-val" id="acc-emer-target-val">—</div></div>
            <div class="acc-stat"><div class="acc-stat-label">Progress</div><div class="acc-stat-val pos" id="acc-emer-pct">—</div></div>
          </div>

          <div class="acc-progress-track" style="margin:.25rem 0">
            <div class="acc-progress-fill" id="acc-emer-bar-fill"></div>
          </div>
          <div style="display:flex;justify-content:space-between;padding:0 0 .75rem">
            <span class="acc-nw-sub" id="acc-emer-covered">—</span>
            <span class="acc-nw-sub" id="acc-emer-needed">—</span>
          </div>

          <!-- Emergency settings -->
          <div class="acc-add-section">
            <div class="acc-add-title">Settings</div>
            <div class="acc-edit-row">
              <div class="ff"><label>Current balance (€)</label><input type="number" id="acc-edit-emer" placeholder="1500" step="any"></div>
              <div class="ff"><label>Monthly expenses (€)</label><input type="number" id="acc-edit-monthly-exp" placeholder="900" step="any"></div>
            </div>
            <div class="ff" style="margin-top:8px">
              <label>Coverage target</label>
              <select id="acc-edit-target-months" style="background:rgba(255,255,255,.05);border:1px solid var(--glass-border2);border-radius:var(--r-sm);padding:7px 10px;font-size:12px;color:var(--text);outline:none;width:100%">
                <option value="3">3 months (recommended)</option>
                <option value="6">6 months (safer)</option>
                <option value="12">12 months (maximum)</option>
              </select>
            </div>
            <button class="ghost-btn" style="margin-top:.5rem;width:100%" onclick="saveEmergencySettings()">Save settings</button>
          </div>

          <div class="acc-card-actions">
            <button class="btn-xs buy" onclick="openTransferModal()">+ Add funds</button>
          </div>
        </div>

      </div>

      <!-- ── Transfer history ───────────────────────────────── -->
      <div class="glass-card">
        <div class="card-header">
          <span class="card-title">Transfer history</span>
          <button class="invest-btn" style="padding:6px 14px;font-size:12px" onclick="openTransferModal()">↗ New transfer</button>
        </div>
        <div id="acc-transfer-log" style="padding:.5rem 1.25rem 1rem"></div>
      </div>

    </section>

    <!-- ═══ DASHBOARD ══════════════════════════════════════════ -->
    <section class="page active" id="page-dashboard">

      <!-- Hero portfolio value -->
      <div class="hero">
        <div class="hero-label">Total portfolio value</div>
        <div class="hero-value" id="kpi-total">—</div>
        <div class="hero-meta">
          <span class="hero-pnl" id="kpi-pnl">—</span>
          <span class="hero-badge" id="kpi-badge">—</span>
          <span class="hero-invested" id="kpi-invested">—</span>
        </div>
        <div class="hero-metrics">
          <div class="hero-metric">
            <div class="hm-label">Sharpe</div>
            <div class="hm-val" id="kpi-sharpe">—</div>
          </div>
          <div class="hero-metric-divider"></div>
          <div class="hero-metric">
            <div class="hm-label">Max drawdown</div>
            <div class="hm-val" id="kpi-drawdown">—</div>
          </div>
          <div class="hero-metric-divider"></div>
          <div class="hero-metric">
            <div class="hm-label">Volatility</div>
            <div class="hm-val" id="kpi-volatility">—</div>
          </div>
          <div class="hero-metric-divider"></div>
          <div class="hero-metric">
            <div class="hm-label">Net worth</div>
            <div class="hm-val" id="dash-networth">—</div>
          </div>
        </div>
      </div>

      <!-- P&L bar -->
      <div class="pnl-bar-card">
        <div class="pnl-bar-header">
          <span class="pnl-bar-label">P&L Position</span>
          <span class="pnl-bar-value" id="pnl-bar-value">—</span>
        </div>
        <div class="pnl-track">
          <div class="pnl-fill-neg" id="pnl-fill-neg"></div>
          <div class="pnl-fill-pos" id="pnl-fill-pos"></div>
          <div class="pnl-zero"></div>
          <div class="pnl-thumb" id="pnl-thumb">
            <div class="pnl-thumb-dot"></div>
          </div>
        </div>
        <div class="pnl-bar-footer">
          <span>−50%</span><span>Break-even</span><span>+50%</span>
        </div>
      </div>

      <!-- Charts row -->
      <div class="charts-row">
        <div class="glass-card chart-card-lg">
          <div class="card-header">
            <span class="card-title">Portfolio evolution</span>
            <div class="period-group">
              <button class="period-btn active" data-p="1M">1M</button>
              <button class="period-btn" data-p="3M">3M</button>
              <button class="period-btn" data-p="ALL">All</button>
            </div>
          </div>
          <div class="chart-area" style="height:200px"><canvas id="chart-line"></canvas></div>
        </div>
        <div class="glass-card chart-card-sm">
          <div class="card-header"><span class="card-title">Allocation</span></div>
          <div class="donut-area">
            <canvas id="chart-donut"></canvas>
            <div class="donut-center-text">
              <span class="dct-label">Portfolio</span>
              <strong id="donut-total">—</strong>
            </div>
          </div>
          <div id="legend-list" class="legend-list"></div>
        </div>
      </div>

      <!-- Performance bars -->
      <div class="charts-row">
        <div class="glass-card flex-1">
          <div class="card-header"><span class="card-title">Performance vs cost basis</span></div>
          <div id="bar-wrap" class="bar-wrap" style="height:130px"><canvas id="chart-perf"></canvas></div>
        </div>
        <div class="glass-card flex-1">
          <div class="card-header"><span class="card-title">24h change</span></div>
          <div id="bar-wrap-24h" class="bar-wrap" style="height:130px"><canvas id="chart-24h"></canvas></div>
        </div>
      </div>

      <!-- Asset list -->
      <div class="glass-card">
        <div class="card-header">
          <span class="card-title">My assets</span>
          <button class="link-btn" onclick="switchTab('assets')">View all →</button>
        </div>
        <div id="asset-rows" class="asset-rows"></div>
      </div>

    </section>

    <!-- ═══ ASSETS ════════════════════════════════════════════ -->
    <section class="page" id="page-assets">
      <div class="page-head">
        <h1 class="page-title">Assets</h1>
        <button class="ghost-btn" id="btn-add-toggle">+ New asset</button>
      </div>
      <div class="add-form" id="add-form">
        <div class="form-grid">
          <div class="ff"><label>Name</label><input type="text" id="f-name" placeholder="e.g. Ethereum"></div>
          <div class="ff"><label>Type</label><select id="f-type"><option value="etf">ETF</option><option value="actions">Stocks</option><option value="crypto">Crypto</option><option value="gold">Gold</option></select></div>
          <div class="ff" id="f-ticker-wrap"><label>CoinGecko ID</label><input type="text" id="f-ticker" placeholder="e.g. bitcoin"></div>
          <div class="ff"><label>Color</label><input type="color" id="f-color" value="#6C8EF5"></div>
          <div class="ff"><label>Quantity</label><input type="number" id="f-qty" placeholder="0.001" min="0" step="any"></div>
          <div class="ff"><label>Buy price (€)</label><input type="number" id="f-buy" placeholder="62000" min="0" step="any"></div>
          <div class="ff"><label>Date</label><input type="date" id="f-date"></div>
          <div class="ff"><label>Current price (€)</label><input type="number" id="f-cur" placeholder="optional" min="0" step="any"></div>
        </div>
        <div class="form-actions">
          <button class="primary-btn" onclick="addNewAsset()">Create asset</button>
          <button class="ghost-btn" onclick="toggleAddForm()">Cancel</button>
          <span id="form-error" class="form-error"></span>
        </div>
      </div>
      <div id="asset-cards" class="asset-cards-grid"></div>
    </section>

    <!-- ═══ TRANSACTIONS ══════════════════════════════════════ -->
    <section class="page" id="page-transactions">
      <div class="page-head">
        <h1 class="page-title">Transactions</h1>
        <button class="primary-btn" onclick="openBuyModal()">+ New purchase</button>
      </div>
      <div id="tx-content"></div>
    </section>

    <!-- ═══ ALERTS ════════════════════════════════════════════ -->
    <section class="page" id="page-alerts">
      <div class="page-head"><h1 class="page-title">Alerts</h1></div>
      <div class="two-col">
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1.2rem">Create alert</div>
          <div class="form-stack">
            <div class="ff"><label>Asset</label><select id="alert-asset"></select></div>
            <div class="ff"><label>Type</label>
              <select id="alert-direction">
                <option value="above">Price rises above</option>
                <option value="below">Price falls below</option>
                <option value="pct_up">24h gain ≥ +X%</option>
                <option value="pct_down">24h drop ≤ −X%</option>
              </select>
            </div>
            <div class="ff"><label>Threshold (€ or %)</label><input type="number" id="alert-threshold" placeholder="e.g. 80000" min="0" step="any"></div>
            <div class="ff"><label>Message (optional)</label><input type="text" id="alert-msg" placeholder="e.g. BTC at my target"></div>
          </div>
          <button class="primary-btn" style="margin-top:1rem" onclick="addAlert()">Create alert</button>
          <span id="alert-error" class="form-error" style="display:block;margin-top:8px"></span>
        </div>
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Active alerts</div>
          <div id="alerts-list"><p class="empty-text">No alerts configured.</p></div>
        </div>
      </div>
      <div class="glass-card" style="padding:1.5rem;margin-top:1rem">
        <div class="card-title" style="margin-bottom:1rem">Alert history</div>
        <div id="alerts-history"><p class="empty-text">No alerts triggered yet.</p></div>
      </div>
    </section>

    <!-- ═══ PROJECTION ════════════════════════════════════════ -->
    <section class="page" id="page-projection">
      <div class="page-head"><h1 class="page-title">Projection</h1></div>
      <div class="proj-layout">
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1.2rem">Parameters</div>
          <div class="form-stack">
            <div class="ff"><label>Starting capital (€)</label><input type="number" id="proj-capital" value="10000" min="0" step="100" oninput="renderProjection()"></div>
            <div class="ff"><label>Monthly contribution (€)</label><input type="number" id="proj-monthly" value="200" min="0" step="50" oninput="renderProjection()"></div>
            <div class="ff"><label>Annual return (%)</label><input type="number" id="proj-rate" value="8" min="0" max="50" step="0.5" oninput="renderProjection()"></div>
            <div class="ff">
              <label>Horizon — <span id="proj-years-val" class="accent-text">20 years</span></label>
              <input type="range" id="proj-years" value="20" min="1" max="40" step="1" oninput="projYearsDisplay()">
            </div>
          </div>
          <div id="proj-milestones" class="milestones" style="margin-top:1.5rem"></div>
          <div id="proj-summary" style="margin-top:1rem"></div>
          <p class="hint-text" style="margin-top:1.2rem">Indicative simulation — no return guaranteed.</p>
        </div>
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Growth projection</div>
          <div style="position:relative;height:360px"><canvas id="chart-proj"></canvas></div>
        </div>
      </div>
    </section>

    <!-- ═══ NET WORTH ═══════════════════════════════════════ -->
    <section class="page" id="page-networth">
      <div class="page-head"><h1 class="page-title">Net Worth</h1></div>

      <!-- Hero net worth -->
      <div class="nw-hero glass-card">
        <div class="nw-hero-left">
          <div class="nw-hero-label">Total Net Worth</div>
          <div class="nw-hero-value" id="nw-total">—</div>
        </div>
        <div class="nw-hero-kpis">
          <div class="nw-kpi"><div class="nw-kpi-label">Total assets</div><div class="nw-kpi-val pos" id="nw-assets">—</div></div>
          <div class="nw-kpi-div"></div>
          <div class="nw-kpi"><div class="nw-kpi-label">Portfolio</div><div class="nw-kpi-val" id="nw-portfolio">—</div></div>
          <div class="nw-kpi-div"></div>
          <div class="nw-kpi"><div class="nw-kpi-label">Real estate</div><div class="nw-kpi-val" id="nw-prop">—</div></div>
          <div class="nw-kpi-div"></div>
          <div class="nw-kpi"><div class="nw-kpi-label">Cash & other</div><div class="nw-kpi-val" id="nw-manual">—</div></div>
          <div class="nw-kpi-div"></div>
          <div class="nw-kpi"><div class="nw-kpi-label">Liabilities</div><div class="nw-kpi-val neg" id="nw-liab">—</div></div>
        </div>
      </div>

      <!-- NW chart -->
      <div class="glass-card">
        <div class="card-header"><span class="card-title">Net worth over time</span></div>
        <div class="chart-area" style="height:200px"><canvas id="chart-networth"></canvas></div>
      </div>

      <div class="two-col">
        <!-- Assets -->
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Assets</div>
          <div id="nw-assets-list"></div>
          <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--glass-border)">
            <div class="card-title" style="margin-bottom:.75rem">Add asset</div>
            <div class="form-stack">
              <div class="ff"><label>Label</label><input type="text" id="nw-asset-label" placeholder="e.g. Savings account"></div>
              <div class="ff"><label>Value (€)</label><input type="number" id="nw-asset-value" placeholder="5000" min="0" step="any"></div>
            </div>
            <button class="primary-btn" style="margin-top:.75rem" onclick="addNWEntry('asset')">Add asset</button>
            <span id="nw-asset-err" class="form-error" style="display:block;margin-top:6px"></span>
          </div>
        </div>

        <!-- Liabilities -->
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Liabilities</div>
          <div id="nw-liab-list"></div>
          <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid var(--glass-border)">
            <div class="card-title" style="margin-bottom:.75rem">Add liability</div>
            <div class="form-stack">
              <div class="ff"><label>Label</label><input type="text" id="nw-liability-label" placeholder="e.g. Car loan"></div>
              <div class="ff"><label>Amount (€)</label><input type="number" id="nw-liability-value" placeholder="10000" min="0" step="any"></div>
            </div>
            <button class="primary-btn" style="margin-top:.75rem" onclick="addNWEntry('liability')">Add liability</button>
            <span id="nw-liability-err" class="form-error" style="display:block;margin-top:6px"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ BUDGET ════════════════════════════════════════════ -->
    <section class="page" id="page-budget">
      <div class="page-head"><h1 class="page-title">Budget</h1></div>

      <!-- Budget KPIs -->
      <div class="budget-kpis">
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(48,209,88,.12)">💰</div>
          <div class="bk-label">Income</div>
          <div class="bk-val" id="b-income">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(255,69,58,.1)">💸</div>
          <div class="bk-label">Expenses</div>
          <div class="bk-val" id="b-expenses">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(91,142,247,.12)">🏦</div>
          <div class="bk-label">Savings</div>
          <div class="bk-val" id="b-savings">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(212,168,67,.12)">📊</div>
          <div class="bk-label">Savings rate</div>
          <div class="bk-val" id="b-rate">—</div>
        </div>
      </div>

      <!-- Income editor -->
      <div class="glass-card" style="padding:1.25rem 1.5rem">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <span class="card-title">Monthly income</span>
          <div style="display:flex;align-items:center;gap:8px;margin-left:auto">
            <div class="ff" style="margin:0"><input type="number" id="budget-income" placeholder="1500" min="0" step="50" style="width:140px"></div>
            <button class="primary-btn" onclick="saveBudgetIncome()">Save</button>
          </div>
        </div>
      </div>

      <div class="charts-row">
        <!-- Category donut -->
        <div class="glass-card chart-card-sm">
          <div class="card-header">
            <span class="card-title">By category</span>
            <strong id="budget-cat-total" style="font-family:var(--mono);font-size:13px;color:var(--neg)">—</strong>
          </div>
          <div class="donut-area">
            <canvas id="chart-cat"></canvas>
            <div class="donut-center-text"><span class="dct-label">This month</span></div>
          </div>
          <div id="cat-legend" class="legend-list"></div>
        </div>

        <!-- Monthly bar -->
        <div class="glass-card chart-card-lg">
          <div class="card-header"><span class="card-title">Monthly expenses (6 months)</span></div>
          <div class="chart-area" style="height:210px"><canvas id="chart-monthly-exp"></canvas></div>
        </div>
      </div>

      <div class="two-col">
        <!-- Add expense form -->
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Add expense</div>
          <div class="form-stack">
            <div class="ff"><label>Label</label><input type="text" id="exp-label" placeholder="e.g. Electricity"></div>
            <div class="ff"><label>Amount (€)</label><input type="number" id="exp-amount" placeholder="85" min="0" step="any"></div>
            <div class="ff"><label>Category</label>
              <select id="exp-category">
                <option value="housing">🏠 Housing</option>
                <option value="food">🛒 Food</option>
                <option value="transport">🚗 Transport</option>
                <option value="subs">📱 Subscriptions</option>
                <option value="leisure">🎮 Leisure</option>
                <option value="investments">📈 Investments</option>
                <option value="other">💼 Other</option>
              </select>
            </div>
            <div class="ff"><label>Date</label><input type="date" id="exp-date"></div>
          </div>
          <button class="primary-btn" style="margin-top:.75rem" onclick="addExpense()">Add expense</button>
          <span id="exp-error" class="form-error" style="display:block;margin-top:6px"></span>
        </div>

        <!-- Expense list -->
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">This month's expenses</div>
          <div id="expense-list"></div>
        </div>
      </div>
    </section>

    <!-- ═══ REAL ESTATE ═══════════════════════════════════════ -->
    <section class="page" id="page-realestate">
      <div class="page-head"><h1 class="page-title">Real Estate</h1></div>

      <!-- Summary KPIs -->
      <div class="budget-kpis">
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(212,168,67,.12)">🏘️</div>
          <div class="bk-label">Total value</div>
          <div class="bk-val" id="re-total-value">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(48,209,88,.12)">📈</div>
          <div class="bk-label">Total equity</div>
          <div class="bk-val pos" id="re-total-equity">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(91,142,247,.12)">💵</div>
          <div class="bk-label">Monthly cashflow</div>
          <div class="bk-val" id="re-total-cashflow">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(255,69,58,.1)">🏦</div>
          <div class="bk-label">Total debt</div>
          <div class="bk-val neg" id="re-total-debt">—</div>
        </div>
      </div>

      <!-- Properties grid -->
      <div id="properties-grid" class="properties-grid"></div>

      <!-- Add property form -->
      <div class="glass-card" style="padding:1.5rem">
        <div class="card-title" style="margin-bottom:1rem">Add property</div>
        <div class="form-grid" style="grid-template-columns:repeat(3,1fr)">
          <div class="ff"><label>Property name</label><input type="text" id="prop-name" placeholder="e.g. Apartment Paris"></div>
          <div class="ff"><label>Purchase price (€)</label><input type="number" id="prop-purchase" placeholder="150000" min="0" step="any"></div>
          <div class="ff"><label>Current value (€)</label><input type="number" id="prop-current" placeholder="165000" min="0" step="any"></div>
          <div class="ff"><label>Monthly rent (€)</label><input type="number" id="prop-rent" placeholder="650" min="0" step="any"></div>
          <div class="ff"><label>Mortgage payment (€)</label><input type="number" id="prop-mortgage" placeholder="520" min="0" step="any"></div>
          <div class="ff"><label>Remaining loan (€)</label><input type="number" id="prop-loan" placeholder="100000" min="0" step="any"></div>
        </div>
        <div class="form-actions" style="margin-top:.75rem">
          <button class="primary-btn" onclick="addProperty()">Add property</button>
          <span id="prop-error" class="form-error"></span>
        </div>
      </div>
    </section>

    <!-- ═══ PASSIVE INCOME ════════════════════════════════════ -->
    <section class="page" id="page-passive">
      <div class="page-head"><h1 class="page-title">Passive Income</h1></div>

      <div class="budget-kpis">
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(48,209,88,.12)">📅</div>
          <div class="bk-label">This month</div>
          <div class="bk-val pos" id="pass-month">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(91,142,247,.12)">📆</div>
          <div class="bk-label">This year</div>
          <div class="bk-val pos" id="pass-year">—</div>
        </div>
        <div class="b-kpi glass-card">
          <div class="bk-icon" style="background:rgba(212,168,67,.12)">🔄</div>
          <div class="bk-label">Annual total</div>
          <div class="bk-val pos" id="pass-annual">—</div>
        </div>
      </div>

      <div class="charts-row">
        <!-- Breakdown by type -->
        <div class="glass-card" style="padding:1.5rem;flex:1">
          <div class="card-title" style="margin-bottom:1rem">This month by type</div>
          <div id="pass-breakdown"></div>
        </div>
        <!-- Stacked bar chart -->
        <div class="glass-card chart-card-lg">
          <div class="card-header"><span class="card-title">Monthly passive income (6 months)</span></div>
          <div class="chart-area" style="height:210px"><canvas id="chart-passive"></canvas></div>
        </div>
      </div>

      <div class="two-col">
        <!-- Add income form -->
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Record income</div>
          <div class="form-stack">
            <div class="ff"><label>Label</label><input type="text" id="pass-label" placeholder="e.g. ETF dividend"></div>
            <div class="ff"><label>Amount (€)</label><input type="number" id="pass-amount" placeholder="12.50" min="0" step="any"></div>
            <div class="ff"><label>Type</label>
              <select id="pass-type">
                <option value="dividend">📊 Dividend</option>
                <option value="rental">🏠 Rental income</option>
                <option value="staking">⚡ Staking</option>
                <option value="interest">🏦 Interest</option>
                <option value="other">💼 Other</option>
              </select>
            </div>
            <div class="ff"><label>Date</label><input type="date" id="pass-date"></div>
          </div>
          <button class="primary-btn" style="margin-top:.75rem" onclick="addPassiveIncome()">Record</button>
          <span id="pass-error" class="form-error" style="display:block;margin-top:6px"></span>
        </div>

        <!-- Recent entries -->
        <div class="glass-card" style="padding:1.5rem">
          <div class="card-title" style="margin-bottom:1rem">Recent income</div>
          <div id="pass-list"></div>
        </div>
      </div>
    </section>

    <!-- ═══ AI INSIGHTS ═════════════════════════════════════ -->
    <section class="page" id="page-aiinsights">

      <!-- Header -->
      <div class="ai-page-head">
        <div>
          <h1 class="page-title">✦ AI Insights</h1>
          <p class="page-subtitle">Educational analysis powered by Claude · Not financial advice</p>
        </div>
        <div class="ai-head-actions">
          <span id="ai-last-run" class="hint-text"></span>
          <button class="invest-btn" id="ai-run-btn" onclick="runFullAnalysis()">✦ Run Full Analysis</button>
        </div>
      </div>

      <!-- ─── ROW 1: Score + Key ────────────────────────────── -->
      <div class="ai-top-row">

        <!-- Financial Score -->
        <div class="glass-card ai-score-card">
          <div class="card-header">
            <span class="card-title">🏅 Financial Score</span>
            <span class="hint-text">Computed from your data</span>
          </div>
          <div id="ai-score-section" style="padding:.5rem 1.25rem 1.25rem"></div>
        </div>

        <!-- API Key + Snapshot -->
        <div class="ai-right-col">
          <!-- API Key -->
          <div class="glass-card ai-key-card" id="ai-key-section">
            <div class="ai-key-row">
              <span class="ai-key-icon">🔑</span>
              <div class="ai-key-info">
                <div class="ai-key-title">Anthropic API Key</div>
                <div class="ai-key-sub">Stored locally — only sent to api.anthropic.com</div>
              </div>
              <span id="ai-key-status" class="ai-key-status">No key</span>
            </div>
            <div class="ai-key-inputs">
              <input type="password" id="ai-key-input" placeholder="sk-ant-api03-…" autocomplete="off">
              <button class="primary-btn" onclick="saveApiKey()">Save</button>
              <button class="ghost-btn" onclick="clearApiKey()">Clear</button>
            </div>
            <div class="ai-key-help">
              Get your free key at <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>
            </div>
          </div>

          <!-- Portfolio snapshot -->
          <div class="glass-card ai-snapshot-card">
            <div class="card-header"><span class="card-title">📋 Portfolio snapshot sent to AI</span></div>
            <div id="ai-context-preview" style="padding:.25rem 1.25rem 1rem"></div>
          </div>
        </div>
      </div>

      <!-- ─── ROW 2: Projection ────────────────────────────── -->
      <div class="glass-card">
        <div class="card-header">
          <span class="card-title">📈 Portfolio Projection</span>
          <span class="hint-text">Simulated — not a guarantee</span>
        </div>
        <div class="ai-proj-layout">
          <div class="ai-proj-controls">
            <div class="ff">
              <label>Monthly investment (€)</label>
              <input type="number" id="ai-proj-monthly" value="50" min="0" step="10" oninput="renderAIProjection()">
            </div>
            <div class="ff">
              <label>Annual return (%)</label>
              <input type="number" id="ai-proj-rate" value="7" min="0" max="30" step="0.5" oninput="renderAIProjection()">
            </div>
            <div class="ff">
              <label>Horizon (years)</label>
              <input type="number" id="ai-proj-years" value="20" min="1" max="40" step="1" oninput="renderAIProjection()">
            </div>
            <div class="ai-proj-milestones">
              <div class="ai-ms"><div class="ai-ms-y">5y</div><div class="ai-ms-v" id="ai-ms-5">—</div></div>
              <div class="ai-ms"><div class="ai-ms-y">10y</div><div class="ai-ms-v" id="ai-ms-10">—</div></div>
              <div class="ai-ms"><div class="ai-ms-y">20y</div><div class="ai-ms-v" id="ai-ms-20">—</div></div>
            </div>
            <div class="ai-proj-summary-row" id="ai-proj-summary"></div>
          </div>
          <div class="ai-proj-chart-wrap">
            <canvas id="ai-proj-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- ─── ROW 3: AI Analysis Cards ─────────────────────── -->
      <div class="ai-section-head">
        <span class="card-title" style="font-size:12px">AI Analysis</span>
        <span class="hint-text">Each card uses Claude to analyze your real data</span>
      </div>

      <div class="ai-grid">
        <div class="ai-card" id="ai-portfolio">
          <div class="ai-card-title">📊 Portfolio Allocation</div>
          <div class="ai-empty-state">
            <div>Click <strong>Run Full Analysis</strong> or<br>
            <button class="ghost-btn" style="margin-top:.5rem;font-size:11px;padding:4px 10px" onclick="runSingleSection('ai-portfolio')">Analyze this section</button></div>
          </div>
        </div>
        <div class="ai-card" id="ai-risk">
          <div class="ai-card-title">⚡ Risk Analysis</div>
          <div class="ai-empty-state">
            <div><button class="ghost-btn" style="font-size:11px;padding:4px 10px" onclick="runSingleSection('ai-risk')">Analyze this section</button></div>
          </div>
        </div>
        <div class="ai-card" id="ai-dca">
          <div class="ai-card-title">🔄 DCA Strategy</div>
          <div class="ai-empty-state">
            <div><button class="ghost-btn" style="font-size:11px;padding:4px 10px" onclick="runSingleSection('ai-dca')">Analyze this section</button></div>
          </div>
        </div>
        <div class="ai-card" id="ai-budget">
          <div class="ai-card-title">💰 Budget & Savings</div>
          <div class="ai-empty-state">
            <div><button class="ghost-btn" style="font-size:11px;padding:4px 10px" onclick="runSingleSection('ai-budget')">Analyze this section</button></div>
          </div>
        </div>
        <div class="ai-card" id="ai-market">
          <div class="ai-card-title">🌍 Market Summary</div>
          <div class="ai-empty-state">
            <div><button class="ghost-btn" style="font-size:11px;padding:4px 10px" onclick="runSingleSection('ai-market')">Analyze this section</button></div>
          </div>
        </div>
        <div class="ai-card" id="ai-suggestions">
          <div class="ai-card-title">💡 Smart Suggestions</div>
          <div class="ai-empty-state">
            <div><button class="ghost-btn" style="font-size:11px;padding:4px 10px" onclick="runSingleSection('ai-suggestions')">Analyze this section</button></div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="ai-disclaimer">
        <span>⚠️</span>
        <span>AI analysis is for <strong>educational purposes only</strong> and does not constitute financial advice. Always consult a qualified advisor before making investment decisions.</span>
      </div>

      <!-- ─── ROW 4: AI Chat ────────────────────────────────── -->
      <div class="glass-card ai-chat-card">
        <div class="ai-chat-header">
          <div>
            <div class="card-title">💬 Ask your AI analyst</div>
            <div class="hint-text" style="margin-top:3px">Your full financial snapshot is loaded — ask anything</div>
          </div>
          <button class="ghost-btn" onclick="clearChat()">Clear</button>
        </div>
        <div id="ai-chat-feed" class="ai-chat-feed"></div>
        <div class="ai-chat-input-row">
          <input type="text" id="ai-chat-input" class="ai-chat-input"
            placeholder="e.g. What's my biggest risk? How can I reach 10 000 € faster?"
            onkeydown="if(event.key==='Enter'&&!event.shiftKey)sendAIChat()">
          <button class="invest-btn" onclick="sendAIChat()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

    </section>

  </main>

  <!-- ═══ MOBILE BOTTOM NAV ════════════════════════════════ -->
  <nav class="mobile-nav" id="mobile-nav" aria-label="Main navigation">
    <button class="mobile-nav-item active" data-tab="accounts" onclick="switchTab('accounts')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      <span>Accounts</span>
    </button>
    <button class="mobile-nav-item" data-tab="dashboard" onclick="switchTab('dashboard')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      <span>Portfolio</span>
    </button>
    <button class="mobile-nav-item" data-tab="assets" onclick="switchTab('assets')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
      <span>Assets</span>
    </button>
    <button class="mobile-nav-item" data-tab="aiinsights" onclick="switchTab('aiinsights')">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <span>AI</span>
    </button>
    <button class="mobile-nav-item" data-tab="more" id="mobile-more-btn" onclick="toggleMobileMenu()">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      <span>More</span>
    </button>
  </nav>

  <!-- Mobile "More" drawer -->
  <div class="mobile-drawer-bg" id="mobile-drawer-bg" onclick="toggleMobileMenu()"></div>
  <div class="mobile-drawer" id="mobile-drawer">
    <div class="mobile-drawer-handle"></div>
    <div class="mobile-drawer-title">More</div>
    <div class="mobile-drawer-items">
      <button class="mobile-drawer-item" onclick="switchTab('transactions');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
        Transactions
      </button>
      <button class="mobile-drawer-item" onclick="switchTab('budget');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        Budget
      </button>
      <button class="mobile-drawer-item" onclick="switchTab('networth');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        Net Worth
      </button>
      <button class="mobile-drawer-item" onclick="switchTab('realestate');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Real Estate
      </button>
      <button class="mobile-drawer-item" onclick="switchTab('passive');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Passive Income
      </button>
      <button class="mobile-drawer-item" onclick="switchTab('projection');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        Projection
      </button>
      <button class="mobile-drawer-item" onclick="switchTab('alerts');toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        Alerts
      </button>
      <button class="mobile-drawer-item mobile-drawer-lock" onclick="if(typeof lockApp==='function')lockApp();toggleMobileMenu()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Lock app
      </button>
    </div>
  </div>

  <script src="js/auth.js"></script>

  <!-- Firebase SDK (compat) — only activates if FIREBASE_CONFIG is filled in sync.js -->
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>
  <script src="js/sync.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
  <script src="js/data.js"></script>
  <script src="js/api.js"></script>
  <script src="js/alerts.js"></script>
  <script src="js/transactions.js"></script>
  <script src="js/charts.js"></script>
  <script src="js/metrics.js"></script>
  <script src="js/projection.js"></script>
  <script src="js/budget.js"></script>
  <script src="js/networth.js"></script>
  <script src="js/realestate.js"></script>
  <script src="js/passive.js"></script>
  <script src="js/accounts.js"></script>
  <script src="js/ai-insights.js"></script>
  <script src="js/app.js"></script>

  <!-- Register Service Worker -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' })
          .then(r => console.log('[SW] Registered:', r.scope))
          .catch(e => console.warn('[SW] Failed:', e));
      });
    }
  </script>

  <!-- Mobile drawer JS -->
  <script>
    function toggleMobileMenu() {
      const drawer = document.getElementById('mobile-drawer');
      const bg     = document.getElementById('mobile-drawer-bg');
      const isOpen = drawer.classList.contains('open');
      if (isOpen) { drawer.classList.remove('open'); bg.classList.remove('visible'); }
      else         { drawer.classList.add('open');    bg.classList.add('visible'); }
    }
    document.addEventListener('DOMContentLoaded', () => {
      const orig = window.switchTab;
      window.switchTab = function(tab) {
        orig(tab);
        document.querySelectorAll('.mobile-nav-item[data-tab]').forEach(b =>
          b.classList.toggle('active', b.dataset.tab === tab));
        const drawer = document.getElementById('mobile-drawer');
        const bg     = document.getElementById('mobile-drawer-bg');
        if (drawer) drawer.classList.remove('open');
        if (bg)     bg.classList.remove('visible');
      };
    });
  </script>
</body>
</html>

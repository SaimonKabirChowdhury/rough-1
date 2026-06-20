const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AdvisorOS - AI Productivity Dashboard</title>
    <style>
      :root {
        --blue-950: #09224a;
        --blue-900: #0b2d63;
        --blue-800: #0f3d85;
        --blue-700: #1457d9;
        --blue-600: #1b6ff2;
        --blue-500: #2f83ff;
        --blue-100: #dcebff;
        --blue-50: #f2f7ff;
        --white: #ffffff;
        --ink: #10233f;
        --muted: #60718c;
        --soft: #eef4ff;
        --line: #dce8fb;
        --success: #16a36f;
        --warning: #f59e0b;
        --danger: #e24d4d;
        --shadow: 0 20px 60px rgba(15, 61, 133, 0.14);
        --radius-xl: 28px;
        --radius-lg: 20px;
        --radius-md: 14px;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        min-height: 100vh;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--ink);
        background:
          radial-gradient(circle at top left, rgba(47, 131, 255, 0.20), transparent 36rem),
          linear-gradient(135deg, #f7fbff 0%, #ffffff 45%, #eef6ff 100%);
      }

      button, input, select, textarea {
        font: inherit;
      }

      button {
        border: 0;
        cursor: pointer;
      }

      .app {
        display: grid;
        grid-template-columns: 280px minmax(0, 1fr);
        min-height: 100vh;
      }

      .sidebar {
        position: sticky;
        top: 0;
        height: 100vh;
        padding: 28px 22px;
        color: #eaf3ff;
        background:
          linear-gradient(180deg, rgba(9, 34, 74, 0.96), rgba(15, 61, 133, 0.95)),
          radial-gradient(circle at 20% 0%, rgba(47, 131, 255, 0.45), transparent 16rem);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 32px;
      }

      .brand-mark {
        display: grid;
        width: 46px;
        height: 46px;
        place-items: center;
        border-radius: 16px;
        background: linear-gradient(135deg, var(--blue-500), #9ec8ff);
        box-shadow: 0 12px 28px rgba(47, 131, 255, 0.35);
        font-weight: 900;
      }

      .brand h1 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -0.04em;
      }

      .brand p {
        margin: 3px 0 0;
        font-size: 12px;
        color: #b8d4f9;
      }

      .nav {
        display: grid;
        gap: 8px;
      }

      .nav button {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        padding: 13px 14px;
        border-radius: 16px;
        color: #d7e9ff;
        background: transparent;
        text-align: left;
      }

      .nav button.active,
      .nav button:hover {
        color: white;
        background: rgba(255,255,255,0.12);
      }

      .sidebar-card {
        margin-top: 28px;
        padding: 18px;
        border: 1px solid rgba(255,255,255,0.14);
        border-radius: 22px;
        background: rgba(255,255,255,0.10);
        backdrop-filter: blur(18px);
      }

      .sidebar-card p {
        margin: 0 0 12px;
        color: #d9eaff;
        font-size: 13px;
        line-height: 1.45;
      }

      .mini-progress {
        height: 9px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(255,255,255,0.18);
      }

      .mini-progress span {
        display: block;
        width: 62%;
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, #9ec8ff, white);
      }

      main {
        padding: 28px;
      }

      .topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 22px;
      }

      .search {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        max-width: 620px;
        padding: 12px 16px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255,255,255,0.80);
        box-shadow: 0 12px 36px rgba(15, 61, 133, 0.06);
      }

      .search input {
        width: 100%;
        border: 0;
        outline: 0;
        background: transparent;
        color: var(--ink);
      }

      .profile-pill {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px 8px 8px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: white;
      }

      .avatar {
        display: grid;
        width: 36px;
        height: 36px;
        place-items: center;
        border-radius: 50%;
        color: white;
        background: linear-gradient(135deg, var(--blue-600), var(--blue-900));
        font-weight: 800;
      }

      .grid {
        display: grid;
        grid-template-columns: minmax(0, 1.4fr) minmax(360px, 0.8fr);
        gap: 22px;
      }

      .hero {
        position: relative;
        overflow: hidden;
        padding: 28px;
        border-radius: var(--radius-xl);
        color: white;
        background:
          radial-gradient(circle at 78% 18%, rgba(255,255,255,0.24), transparent 10rem),
          linear-gradient(135deg, var(--blue-900), var(--blue-600));
        box-shadow: var(--shadow);
      }

      .hero::after {
        content: "";
        position: absolute;
        right: -80px;
        bottom: -90px;
        width: 260px;
        height: 260px;
        border: 34px solid rgba(255,255,255,0.11);
        border-radius: 50%;
      }

      .hero-content {
        position: relative;
        z-index: 1;
      }

      .date-line {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(255,255,255,0.15);
        color: #e8f4ff;
        font-size: 13px;
      }

      .hero h2 {
        max-width: 720px;
        margin: 18px 0 10px;
        font-size: clamp(32px, 5vw, 54px);
        line-height: 0.96;
        letter-spacing: -0.06em;
      }

      .hero p {
        max-width: 670px;
        margin: 0;
        color: #dcecff;
        line-height: 1.6;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 22px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        padding: 12px 16px;
        border-radius: 14px;
        color: white;
        background: var(--blue-600);
        font-weight: 750;
        box-shadow: 0 10px 28px rgba(27, 111, 242, 0.25);
      }

      .btn.secondary {
        color: var(--blue-800);
        background: white;
      }

      .btn.ghost {
        color: var(--blue-800);
        background: var(--blue-50);
        box-shadow: none;
      }

      .btn.small {
        padding: 9px 12px;
        border-radius: 12px;
        font-size: 13px;
      }

      .stats {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 14px;
        margin-top: 22px;
      }

      .stat {
        padding: 16px;
        border: 1px solid rgba(255,255,255,0.16);
        border-radius: 18px;
        background: rgba(255,255,255,0.13);
        backdrop-filter: blur(12px);
      }

      .stat b {
        display: block;
        font-size: 26px;
        letter-spacing: -0.04em;
      }

      .stat span {
        color: #d6eaff;
        font-size: 12px;
      }

      .panel {
        border: 1px solid var(--line);
        border-radius: var(--radius-xl);
        background: rgba(255,255,255,0.88);
        box-shadow: 0 18px 50px rgba(15, 61, 133, 0.08);
      }

      .panel.pad {
        padding: 22px;
      }

      .section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
      }

      .section-title h3 {
        margin: 0;
        font-size: 20px;
        letter-spacing: -0.035em;
      }

      .section-title p {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 13px;
      }

      .jarvis {
        padding: 22px;
        border-radius: var(--radius-xl);
        color: white;
        background:
          linear-gradient(180deg, rgba(11, 45, 99, 0.94), rgba(9, 34, 74, 0.96)),
          radial-gradient(circle at 12% 18%, rgba(47,131,255,0.75), transparent 11rem);
        box-shadow: var(--shadow);
      }

      .orb {
        position: relative;
        display: grid;
        width: 74px;
        height: 74px;
        margin-bottom: 18px;
        place-items: center;
        border: 1px solid rgba(255,255,255,0.28);
        border-radius: 50%;
        background: radial-gradient(circle, #d8ecff 0 18%, #52a1ff 19% 38%, rgba(47,131,255,0.16) 39% 100%);
        box-shadow: 0 0 32px rgba(82,161,255,0.85);
      }

      .orb::before,
      .orb::after {
        content: "";
        position: absolute;
        inset: -8px;
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 50%;
      }

      .orb::after {
        inset: -18px;
        border-color: rgba(82,161,255,0.20);
      }

      .jarvis h3 {
        margin: 0 0 8px;
        font-size: 24px;
        letter-spacing: -0.04em;
      }

      .jarvis p {
        margin: 0 0 16px;
        color: #cfe5ff;
        line-height: 1.5;
      }

      .brief-list {
        display: grid;
        gap: 10px;
      }

      .brief-item {
        display: flex;
        gap: 10px;
        padding: 12px;
        border-radius: 14px;
        background: rgba(255,255,255,0.10);
      }

      .brief-item span:first-child {
        display: grid;
        flex: 0 0 24px;
        height: 24px;
        place-items: center;
        border-radius: 50%;
        background: rgba(255,255,255,0.16);
      }

      .task-board {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-top: 22px;
      }

      .task-col {
        padding: 16px;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: white;
      }

      .task-col h4 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0 12px;
        font-size: 15px;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 9px;
        border-radius: 999px;
        color: var(--blue-800);
        background: var(--blue-50);
        font-size: 12px;
        font-weight: 750;
      }

      .task {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: start;
        gap: 10px;
        padding: 11px 0;
        border-top: 1px solid #eef4fd;
      }

      .task:first-of-type {
        border-top: 0;
      }

      .task input {
        width: 18px;
        height: 18px;
        margin-top: 3px;
        accent-color: var(--blue-600);
      }

      .task strong {
        display: block;
        font-size: 14px;
      }

      .task small {
        color: var(--muted);
      }

      .chip {
        padding: 5px 8px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
      }

      .chip.high { color: #a33a00; background: #fff3df; }
      .chip.med { color: #0f5f9b; background: #e8f5ff; }
      .chip.low { color: #167255; background: #e8fff7; }

      .capture {
        display: grid;
        gap: 12px;
      }

      .input-row {
        display: flex;
        gap: 10px;
      }

      .input-row input,
      .input-row select,
      textarea,
      .field {
        width: 100%;
        min-width: 0;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: white;
        color: var(--ink);
        outline: 0;
        padding: 12px 14px;
      }

      textarea {
        min-height: 88px;
        resize: vertical;
      }

      .columns {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
      }

      .feature-card {
        padding: 18px;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: white;
      }

      .feature-card h4 {
        margin: 0 0 8px;
        font-size: 16px;
      }

      .feature-card p {
        margin: 0 0 14px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.5;
      }

      .event-list,
      .plan-list,
      .client-list,
      .reminder-list {
        display: grid;
        gap: 12px;
      }

      .event,
      .plan-item,
      .client-card,
      .reminder {
        padding: 14px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: white;
      }

      .event-head,
      .client-head,
      .reminder-head {
        display: flex;
        align-items: start;
        justify-content: space-between;
        gap: 12px;
      }

      .event h4,
      .client-card h4,
      .reminder h4 {
        margin: 0 0 4px;
        font-size: 15px;
      }

      .event p,
      .client-card p,
      .reminder p,
      .plan-item p {
        margin: 0;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.45;
      }

      .event-actions {
        display: flex;
        gap: 8px;
        margin-top: 12px;
      }

      .tabs {
        display: inline-flex;
        padding: 4px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: white;
      }

      .tabs button {
        padding: 8px 12px;
        border-radius: 999px;
        color: var(--muted);
        background: transparent;
        font-size: 13px;
        font-weight: 750;
      }

      .tabs button.active {
        color: white;
        background: var(--blue-600);
      }

      .client-area {
        display: grid;
        grid-template-columns: 300px minmax(0, 1fr);
        gap: 18px;
      }

      .client-card.active {
        border-color: var(--blue-500);
        box-shadow: 0 14px 34px rgba(47, 131, 255, 0.14);
      }

      .finance-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
      }

      .metric {
        padding: 14px;
        border-radius: 16px;
        background: var(--blue-50);
      }

      .metric span {
        color: var(--muted);
        font-size: 12px;
      }

      .metric b {
        display: block;
        margin-top: 6px;
        color: var(--blue-900);
        font-size: 20px;
        letter-spacing: -0.035em;
      }

      .bar-wrap {
        display: grid;
        gap: 12px;
        margin: 18px 0;
      }

      .bar-line {
        display: grid;
        grid-template-columns: 160px 1fr 72px;
        align-items: center;
        gap: 12px;
      }

      .bar-track {
        height: 11px;
        overflow: hidden;
        border-radius: 999px;
        background: #eaf2ff;
      }

      .bar-track span {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--blue-600), #82b9ff);
      }

      .leak-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .leak {
        padding: 14px;
        border-radius: 18px;
        background: #fff8ef;
        border: 1px solid #ffe4bf;
      }

      .leak b {
        display: block;
        color: #9a4b00;
        margin-bottom: 5px;
      }

      .leak span {
        color: #7a5a35;
        font-size: 13px;
        line-height: 1.45;
      }

      .section {
        display: none;
      }

      .section.active {
        display: block;
      }

      .toast {
        position: fixed;
        right: 24px;
        bottom: 24px;
        z-index: 10;
        max-width: 360px;
        padding: 14px 16px;
        border-radius: 16px;
        color: white;
        background: var(--blue-900);
        box-shadow: var(--shadow);
        opacity: 0;
        transform: translateY(12px);
        transition: 0.2s ease;
        pointer-events: none;
      }

      .toast.show {
        opacity: 1;
        transform: translateY(0);
      }

      .hide-mobile {
        display: inline;
      }

      @media (max-width: 1180px) {
        .app {
          grid-template-columns: 92px minmax(0, 1fr);
        }

        .sidebar {
          padding: 22px 14px;
        }

        .brand div:last-child,
        .nav span:last-child,
        .sidebar-card {
          display: none;
        }

        .brand {
          justify-content: center;
        }

        .nav button {
          justify-content: center;
        }

        .grid,
        .client-area {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 820px) {
        .app {
          display: block;
        }

        .sidebar {
          position: static;
          height: auto;
          padding: 14px;
        }

        .brand div:last-child,
        .nav span:last-child {
          display: block;
        }

        .brand {
          justify-content: flex-start;
          margin-bottom: 12px;
        }

        .nav {
          grid-template-columns: repeat(5, minmax(0, 1fr));
          overflow-x: auto;
        }

        .nav button {
          justify-content: flex-start;
          min-width: 160px;
        }

        main {
          padding: 18px;
        }

        .topbar {
          align-items: stretch;
          flex-direction: column;
        }

        .task-board,
        .stats,
        .columns,
        .finance-grid,
        .leak-grid {
          grid-template-columns: 1fr;
        }

        .bar-line {
          grid-template-columns: 1fr;
          gap: 6px;
        }

        .hide-mobile {
          display: none;
        }
      }
    </style>
  </head>
  <body>
    <div class="app">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">A</div>
          <div>
            <h1>AdvisorOS</h1>
            <p>AI productivity for AAG / ASG style advisors</p>
          </div>
        </div>

        <nav class="nav" aria-label="Main navigation">
          <button class="active" data-section="dashboard"><span>◉</span><span>Command Center</span></button>
          <button data-section="clients"><span>◇</span><span>Client Intelligence</span></button>
          <button data-section="calendar"><span>▣</span><span>Calendar Planner</span></button>
          <button data-section="events"><span>◎</span><span>Webinars & Network</span></button>
          <button data-section="automation"><span>✦</span><span>AI Reminders</span></button>
        </nav>

        <div class="sidebar-card">
          <p><b>Focus score</b><br>62% of today's advisor actions are complete. Keep the next action small and visible.</p>
          <div class="mini-progress"><span id="sideProgress"></span></div>
        </div>
      </aside>

      <main>
        <div class="topbar">
          <label class="search">
            <span>⌕</span>
            <input id="globalSearch" placeholder="Ask: What should I do next? Search client, task, meeting..." />
          </label>
          <div class="profile-pill">
            <div class="avatar">SK</div>
            <div>
              <b>Advisor workspace</b><br>
              <small>Blue focus mode</small>
            </div>
          </div>
        </div>

        <section id="dashboard" class="section active">
          <div class="grid">
            <div>
              <section class="hero">
                <div class="hero-content">
                  <div class="date-line">📅 <span id="todayDate">Today</span></div>
                  <h2>Good morning. Your advisor cockpit is ready.</h2>
                  <p>Jarvis-style brief for money-management advisors: deadlines, follow-ups, meetings, client money leaks, and the next best action in one minimal dashboard.</p>
                  <div class="hero-actions">
                    <button class="btn secondary" id="focusBtn">Start 25-min focus block</button>
                    <button class="btn" id="briefBtn">Generate morning brief</button>
                    <button class="btn secondary" data-nav-target="clients">Analyze client expense</button>
                  </div>
                  <div class="stats">
                    <div class="stat"><b id="doneCount">0/0</b><span>Checklist complete</span></div>
                    <div class="stat"><b>4</b><span>Priority follow-ups</span></div>
                    <div class="stat"><b>2</b><span>Client meetings</span></div>
                    <div class="stat"><b>RM 840</b><span>Leak detected</span></div>
                  </div>
                </div>
              </section>

              <section class="panel pad" style="margin-top:22px;">
                <div class="section-title">
                  <div>
                    <h3>Today's ADHD-friendly checklist</h3>
                    <p>Four clear buckets. Small actions. Visible progress.</p>
                  </div>
                  <span class="badge" id="progressBadge">0% done</span>
                </div>

                <div class="task-board" id="taskBoard"></div>
              </section>
            </div>

            <aside class="jarvis">
              <div class="orb" aria-hidden="true"></div>
              <h3>AI morning brief</h3>
              <p id="jarvisText">You have 8 advisor actions today. Highest leverage: call warm leads before lunch, prepare Sarah's protection review, and clear one policy deadline.</p>
              <div class="brief-list">
                <div class="brief-item"><span>1</span><span>Client Sarah has high food delivery and subscriptions. Suggest budget reset before recommending new premium.</span></div>
                <div class="brief-item"><span>2</span><span>Two leads went cold for 10+ days. AI suggests a soft value-based follow-up, not a sales push.</span></div>
                <div class="brief-item"><span>3</span><span>Nearby wealth webinar at 6:30 PM may help networking. One tap to log it in calendar.</span></div>
              </div>

              <div style="height:18px;"></div>
              <div class="panel pad" style="background:rgba(255,255,255,0.10); border-color:rgba(255,255,255,0.12); box-shadow:none;">
                <div class="section-title">
                  <div>
                    <h3 style="color:white;">Quick AI capture</h3>
                    <p style="color:#cfe5ff;">Chat, voice, or manual input.</p>
                  </div>
                </div>
                <div class="capture">
                  <textarea id="aiInput" placeholder="Example: Follow up with Daniel about medical card next Tuesday, high priority."></textarea>
                  <div class="input-row">
                    <select id="categoryInput">
                      <option>Follow Ups</option>
                      <option>Deadlines</option>
                      <option>Client Meeting</option>
                      <option>Team Meetings</option>
                    </select>
                    <button class="btn small secondary" id="voiceBtn">🎙 Voice</button>
                    <button class="btn small" id="addTaskBtn">Add</button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="clients" class="section">
          <div class="section-title">
            <div>
              <h3>Client intelligence and expense leak detection</h3>
              <p>Turn client expense logging into automated AI tasks: detect leaks, suggest budget, debt, emergency fund, affordability and review actions.</p>
            </div>
            <button class="btn small" id="runAnalysisBtn">Run AI leak scan</button>
          </div>

          <div class="client-area">
            <div class="panel pad">
              <div class="section-title">
                <div>
                  <h3>Client profiles</h3>
                  <p>Personal memory for stronger relationship.</p>
                </div>
              </div>
              <div class="client-list" id="clientList"></div>
            </div>

            <div class="panel pad">
              <div class="client-head">
                <div>
                  <h3 id="clientName" style="margin:0;">Client</h3>
                  <p id="clientPersona">Profile summary</p>
                </div>
                <span class="badge" id="clientStage">Review due</span>
              </div>

              <div class="finance-grid" style="margin-top:18px;">
                <div class="metric"><span>Income</span><b id="incomeMetric">RM 0</b></div>
                <div class="metric"><span>Expenses</span><b id="expenseMetric">RM 0</b></div>
                <div class="metric"><span>Debt</span><b id="debtMetric">RM 0</b></div>
                <div class="metric"><span>Free cashflow</span><b id="cashMetric">RM 0</b></div>
              </div>

              <div class="bar-wrap" id="expenseBars"></div>

              <div class="section-title" style="margin-top:20px;">
                <div>
                  <h3>AI detected money leaks</h3>
                  <p>The advisor can convert each insight into a follow-up task.</p>
                </div>
              </div>
              <div class="leak-grid" id="leakGrid"></div>

              <div class="section-title" style="margin-top:22px;">
                <div>
                  <h3>Automated advisor tasks</h3>
                  <p>Generated from income, fixed expenses, variable expenses, debt, insurance, family commitments, savings, and goals.</p>
                </div>
              </div>
              <div class="plan-list" id="aiClientTasks"></div>
            </div>
          </div>
        </section>

        <section id="calendar" class="section">
          <div class="section-title">
            <div>
              <h3>AI calendar plan</h3>
              <p>Create a plan for today, this week, or this month without overloading the advisor.</p>
            </div>
            <div class="tabs" id="plannerTabs">
              <button class="active" data-plan="today">Today</button>
              <button data-plan="week">This week</button>
              <button data-plan="month">This month</button>
            </div>
          </div>

          <div class="columns">
            <div class="feature-card">
              <h4>Morning</h4>
              <p>High-focus client work before distractions.</p>
              <div class="plan-list" id="morningPlan"></div>
            </div>
            <div class="feature-card">
              <h4>Afternoon</h4>
              <p>Meetings, admin, proposal preparation.</p>
              <div class="plan-list" id="afternoonPlan"></div>
            </div>
            <div class="feature-card">
              <h4>Evening</h4>
              <p>Networking, learning, follow-ups after client work hours.</p>
              <div class="plan-list" id="eveningPlan"></div>
            </div>
          </div>
        </section>

        <section id="events" class="section">
          <div class="section-title">
            <div>
              <h3>Nearby webinars and networking suggestions</h3>
              <p>Advisor sees relevant events, chooses attend or ignore. Attending logs it to the calendar plan.</p>
            </div>
            <span class="badge">3 suggested near Petaling Jaya / KL</span>
          </div>
          <div class="event-list" id="eventList"></div>
        </section>

        <section id="automation" class="section">
          <div class="section-title">
            <div>
              <h3>Proactive automated reminders</h3>
              <p>AI decides what to remind, when to remind, and which tone to use based on client stage and urgency.</p>
            </div>
            <button class="btn small" id="generateReminderBtn">Generate reminder queue</button>
          </div>

          <div class="columns">
            <div class="feature-card">
              <h4>Reminder rules</h4>
              <p>Timeout logic for follow-ups, renewals, birthdays, cold leads, document pending and client review.</p>
              <label class="field" style="display:flex; justify-content:space-between; align-items:center; gap:10px;">
                AI decides send time
                <input type="checkbox" checked style="width:20px; height:20px; accent-color:var(--blue-600);">
              </label>
              <div style="height:10px;"></div>
              <select class="field">
                <option>Smart tone: warm and helpful</option>
                <option>Professional tone</option>
                <option>Short WhatsApp tone</option>
              </select>
            </div>
            <div class="feature-card">
              <h4>Example automation</h4>
              <p>If a lead has no reply for 4 days, send soft educational message. If documents are pending for 2 days, send checklist. If review is due, propose two meeting slots.</p>
              <button class="btn small ghost" id="simulateBtn">Simulate next best reminder</button>
            </div>
            <div class="feature-card">
              <h4>Learning connection</h4>
              <p>When an advisor struggles with a client topic, the system recommends a mini learning module before the meeting.</p>
              <button class="btn small ghost" data-nav-target="dashboard">Back to dashboard</button>
            </div>
          </div>

          <div class="panel pad" style="margin-top:20px;">
            <div class="section-title">
              <div>
                <h3>Reminder queue</h3>
                <p>These are AI-generated but advisor-approved before sending.</p>
              </div>
            </div>
            <div class="reminder-list" id="reminderList"></div>
          </div>
        </section>
      </main>
    </div>

    <div class="toast" id="toast">Saved</div>

    <script>
      const tasks = {
        "Deadlines": [
          { title: "Submit policy amendment for Sarah", meta: "Due 11:30 AM · documents ready", priority: "high", done: false },
          { title: "Review Daniel's medical quotation", meta: "Before 3:00 PM meeting", priority: "med", done: false }
        ],
        "Follow Ups": [
          { title: "Send soft check-in to cold lead Amir", meta: "No reply for 9 days · use value message", priority: "high", done: false },
          { title: "Ask Mei for income/expense confirmation", meta: "Needed for budget recommendation", priority: "med", done: true }
        ],
        "Client Meeting": [
          { title: "Prepare Sarah protection review", meta: "Focus on affordability and emergency fund", priority: "high", done: false },
          { title: "Call Jason about debt repayment plan", meta: "15-min call · after lunch", priority: "low", done: false }
        ],
        "Team Meetings": [
          { title: "ASG team huddle", meta: "10:00 AM · weekly pipeline updates", priority: "med", done: true },
          { title: "Share webinar notes with junior advisor", meta: "After event · 5 bullet summary", priority: "low", done: false }
        ]
      };

      const clients = [
        {
          name: "Sarah Lim",
          persona: "29 · marketing executive · wants medical protection without harming monthly savings.",
          stage: "Review due",
          income: 5000,
          fixed: 1850,
          variable: 1650,
          debt: 650,
          insurance: 320,
          family: 500,
          savings: 350,
          goals: "RM 30,000 wedding fund in 24 months",
          leaks: [
            ["Food delivery", "RM 420/month above normal pattern. Suggest weekly meal budget."],
            ["Subscriptions", "8 active subscriptions. Possible RM 110/month reduction."],
            ["Emergency fund gap", "Only 1.4 months covered. Target 3 months before upselling."]
          ]
        },
        {
          name: "Daniel Tan",
          persona: "34 · sales manager · family with one child · worried about hospital bills and debt.",
          stage: "Docs pending",
          income: 7200,
          fixed: 2600,
          variable: 1900,
          debt: 1300,
          insurance: 540,
          family: 900,
          savings: 500,
          goals: "Child education and home upgrade",
          leaks: [
            ["High-interest debt", "Credit card balance should be prioritized before extra investment."],
            ["Car installment pressure", "Debt ratio is reducing protection affordability."],
            ["Protection gap", "Family commitments suggest reviewing life coverage."]
          ]
        },
        {
          name: "Mei Wong",
          persona: "41 · small business owner · irregular income · wants retirement stability.",
          stage: "New opportunity",
          income: 8800,
          fixed: 3100,
          variable: 2100,
          debt: 400,
          insurance: 700,
          family: 1200,
          savings: 1300,
          goals: "Retirement plan and business emergency buffer",
          leaks: [
            ["Irregular cash buffer", "Business income needs separate 6-month emergency reserve."],
            ["Mixed expenses", "Business and personal expenses should be separated."],
            ["Review frequency", "Quarterly reviews recommended due to income variability."]
          ]
        }
      ];

      const plans = {
        today: {
          morning: ["10:00 · Team huddle and pipeline review", "10:45 · Submit Sarah amendment deadline", "11:15 · Call two warm leads"],
          afternoon: ["2:00 · Prepare Daniel quotation", "3:00 · Client meeting with Daniel", "4:15 · Update CRM notes"],
          evening: ["6:30 · Attend wealth webinar", "8:00 · Send follow-up summaries", "8:30 · Plan tomorrow's first task"]
        },
        week: {
          morning: ["Mon-Wed · Prospecting block before meetings", "Thu · Client review preparation", "Fri · Team learning session"],
          afternoon: ["3 client reviews", "2 policy document sessions", "Expense leak analysis for top 5 clients"],
          evening: ["One networking event", "Two referral check-ins", "Weekly reflection and pipeline cleanup"]
        },
        month: {
          morning: ["Monthly renewal audit", "Segment clients by review urgency", "Build top 20 follow-up list"],
          afternoon: ["12 client review meetings", "Launch education content campaign", "Train junior advisor on expense analysis"],
          evening: ["Attend 3 networking sessions", "Host one mini webinar", "Monthly KPI review and next-month plan"]
        }
      };

      const events = [
        { title: "KL Wealth Planning Mini Webinar", type: "Webinar", time: "Today · 6:30 PM", place: "Online / KL", why: "Relevant before retirement planning conversations." },
        { title: "Petaling Jaya Young Professionals Network", type: "Networking", time: "Tomorrow · 7:00 PM", place: "PJ coworking hub", why: "Good for warm prospecting and referrals." },
        { title: "AIA-style Protection Conversation Workshop", type: "Training", time: "Saturday · 10:00 AM", place: "Near KL Sentral", why: "Useful for medical card objection handling." }
      ];

      const reminders = [
        { title: "Sarah Lim · review reminder", meta: "Send at 8:15 PM. Tone: supportive. Mention budget reset and two available meeting slots." },
        { title: "Amir · cold lead recovery", meta: "Send tomorrow 10:20 AM. Share short educational tip, no pressure to buy." },
        { title: "Daniel Tan · document pending", meta: "Send in 2 hours. Attach checklist: IC, income proof, existing policy photo." }
      ];

      let activeClient = 0;

      function money(value) {
        return "RM " + value.toLocaleString("en-MY");
      }

      function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(function() { toast.classList.remove("show"); }, 2200);
      }

      function renderDate() {
        const now = new Date();
        document.getElementById("todayDate").textContent = now.toLocaleDateString("en-MY", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });
      }

      function renderTasks() {
        const board = document.getElementById("taskBoard");
        board.innerHTML = "";
        Object.keys(tasks).forEach(function(category) {
          const col = document.createElement("div");
          col.className = "task-col";
          const list = tasks[category];
          const done = list.filter(function(t) { return t.done; }).length;
          col.innerHTML = "<h4>" + category + "<span class='badge'>" + done + "/" + list.length + "</span></h4>";
          list.forEach(function(task, index) {
            const row = document.createElement("label");
            row.className = "task";
            row.innerHTML =
              "<input type='checkbox' " + (task.done ? "checked" : "") + " data-category='" + category + "' data-index='" + index + "'>" +
              "<span><strong>" + task.title + "</strong><small>" + task.meta + "</small></span>" +
              "<span class='chip " + (task.priority === "high" ? "high" : task.priority === "med" ? "med" : "low") + "'>" + task.priority + "</span>";
            col.appendChild(row);
          });
          board.appendChild(col);
        });

        board.querySelectorAll("input[type='checkbox']").forEach(function(input) {
          input.addEventListener("change", function() {
            tasks[input.dataset.category][Number(input.dataset.index)].done = input.checked;
            renderTasks();
          });
        });

        updateProgress();
      }

      function updateProgress() {
        let total = 0;
        let done = 0;
        Object.keys(tasks).forEach(function(category) {
          total += tasks[category].length;
          done += tasks[category].filter(function(t) { return t.done; }).length;
        });
        const percent = total ? Math.round((done / total) * 100) : 0;
        document.getElementById("doneCount").textContent = done + "/" + total;
        document.getElementById("progressBadge").textContent = percent + "% done";
        document.getElementById("sideProgress").style.width = percent + "%";
      }

      function renderClients() {
        const list = document.getElementById("clientList");
        list.innerHTML = "";
        clients.forEach(function(client, index) {
          const card = document.createElement("button");
          card.className = "client-card" + (index === activeClient ? " active" : "");
          card.style.textAlign = "left";
          card.innerHTML = "<h4>" + client.name + "</h4><p>" + client.persona + "</p><div style='height:10px'></div><span class='badge'>" + client.stage + "</span>";
          card.addEventListener("click", function() {
            activeClient = index;
            renderClients();
            renderClientDetail();
          });
          list.appendChild(card);
        });
      }

      function renderClientDetail() {
        const client = clients[activeClient];
        const totalExpenses = client.fixed + client.variable + client.debt + client.insurance + client.family + client.savings;
        const cash = client.income - totalExpenses;
        document.getElementById("clientName").textContent = client.name;
        document.getElementById("clientPersona").textContent = client.persona + " Goal: " + client.goals + ".";
        document.getElementById("clientStage").textContent = client.stage;
        document.getElementById("incomeMetric").textContent = money(client.income);
        document.getElementById("expenseMetric").textContent = money(totalExpenses);
        document.getElementById("debtMetric").textContent = money(client.debt);
        document.getElementById("cashMetric").textContent = money(cash);

        const categories = [
          ["Fixed", client.fixed],
          ["Variable", client.variable],
          ["Debt", client.debt],
          ["Insurance", client.insurance],
          ["Family", client.family],
          ["Savings", client.savings]
        ];
        const bars = document.getElementById("expenseBars");
        bars.innerHTML = "";
        categories.forEach(function(item) {
          const width = Math.max(6, Math.round((item[1] / client.income) * 100));
          const row = document.createElement("div");
          row.className = "bar-line";
          row.innerHTML = "<strong>" + item[0] + "</strong><div class='bar-track'><span style='width:" + width + "%'></span></div><small>" + money(item[1]) + "</small>";
          bars.appendChild(row);
        });

        const leakGrid = document.getElementById("leakGrid");
        leakGrid.innerHTML = "";
        client.leaks.forEach(function(leak) {
          const div = document.createElement("div");
          div.className = "leak";
          div.innerHTML = "<b>" + leak[0] + "</b><span>" + leak[1] + "</span>";
          leakGrid.appendChild(div);
        });

        const taskList = document.getElementById("aiClientTasks");
        const generated = [
          "Build budget: income " + money(client.income) + " → cap variable spending before new product recommendation.",
          "Debt check: prioritize high-interest debt before increasing monthly premiums.",
          "Emergency fund: calculate 3-6 months of core expenses and set savings target.",
          "Affordability: recommend protection level that does not overload cashflow.",
          "Review cycle: schedule next review in 90 days or after income change."
        ];
        taskList.innerHTML = "";
        generated.forEach(function(text) {
          const item = document.createElement("div");
          item.className = "plan-item";
          item.innerHTML = "<p>" + text + "</p>";
          taskList.appendChild(item);
        });
      }

      function renderPlans(mode) {
        const plan = plans[mode];
        ["morning", "afternoon", "evening"].forEach(function(slot) {
          const target = document.getElementById(slot + "Plan");
          target.innerHTML = "";
          plan[slot].forEach(function(text) {
            const item = document.createElement("div");
            item.className = "plan-item";
            item.innerHTML = "<p>" + text + "</p>";
            target.appendChild(item);
          });
        });
      }

      function renderEvents() {
        const list = document.getElementById("eventList");
        list.innerHTML = "";
        events.forEach(function(event) {
          const card = document.createElement("div");
          card.className = "event";
          card.innerHTML =
            "<div class='event-head'><div><h4>" + event.title + "</h4><p>" + event.time + " · " + event.place + "</p></div><span class='badge'>" + event.type + "</span></div>" +
            "<p style='margin-top:10px;'>" + event.why + "</p>" +
            "<div class='event-actions'><button class='btn small attend'>Attend</button><button class='btn small ghost ignore'>Ignore</button></div>";
          card.querySelector(".attend").addEventListener("click", function() {
            plans.today.evening.unshift(event.time + " · " + event.title);
            showToast("Event logged to calendar plan");
          });
          card.querySelector(".ignore").addEventListener("click", function() {
            card.style.opacity = "0.45";
            showToast("Ignored for now");
          });
          list.appendChild(card);
        });
      }

      function renderReminders() {
        const list = document.getElementById("reminderList");
        list.innerHTML = "";
        reminders.forEach(function(reminder) {
          const row = document.createElement("div");
          row.className = "reminder";
          row.innerHTML = "<div class='reminder-head'><div><h4>" + reminder.title + "</h4><p>" + reminder.meta + "</p></div><button class='btn small ghost'>Approve</button></div>";
          row.querySelector("button").addEventListener("click", function() {
            showToast("Reminder approved");
          });
          list.appendChild(row);
        });
      }

      function activateSection(id) {
        document.querySelectorAll(".section").forEach(function(section) {
          section.classList.toggle("active", section.id === id);
        });
        document.querySelectorAll(".nav button").forEach(function(btn) {
          btn.classList.toggle("active", btn.dataset.section === id);
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      document.querySelectorAll(".nav button").forEach(function(btn) {
        btn.addEventListener("click", function() {
          activateSection(btn.dataset.section);
        });
      });

      document.querySelectorAll("[data-nav-target]").forEach(function(btn) {
        btn.addEventListener("click", function() {
          activateSection(btn.dataset.navTarget);
        });
      });

      document.getElementById("addTaskBtn").addEventListener("click", function() {
        const text = document.getElementById("aiInput").value.trim();
        const category = document.getElementById("categoryInput").value;
        if (!text) {
          showToast("Write or speak a task first");
          return;
        }
        tasks[category].push({ title: text, meta: "Captured by AI · review later", priority: "med", done: false });
        document.getElementById("aiInput").value = "";
        renderTasks();
        showToast("Task added to " + category);
      });

      document.getElementById("voiceBtn").addEventListener("click", function() {
        document.getElementById("aiInput").value = "Voice captured: Follow up with Sarah after lunch about expense leak review.";
        showToast("Voice note converted to task text");
      });

      document.getElementById("briefBtn").addEventListener("click", function() {
        document.getElementById("jarvisText").textContent = "Brief updated: finish one deadline first, then make two follow-up calls, then prepare Daniel's client meeting. AI recommends no more than 3 priority blocks today.";
        showToast("Morning brief generated");
      });

      document.getElementById("focusBtn").addEventListener("click", function() {
        showToast("Focus block started: next action is Sarah policy amendment");
      });

      document.getElementById("runAnalysisBtn").addEventListener("click", function() {
        renderClientDetail();
        showToast("AI scan complete: leaks converted into advisor tasks");
      });

      document.getElementById("plannerTabs").querySelectorAll("button").forEach(function(tab) {
        tab.addEventListener("click", function() {
          document.getElementById("plannerTabs").querySelectorAll("button").forEach(function(t) { t.classList.remove("active"); });
          tab.classList.add("active");
          renderPlans(tab.dataset.plan);
        });
      });

      document.getElementById("generateReminderBtn").addEventListener("click", function() {
        reminders.unshift({ title: "Mei Wong · quarterly review", meta: "AI suggests Friday 11:00 AM. Mention irregular income and business/personal expense separation." });
        renderReminders();
        showToast("Reminder queue refreshed");
      });

      document.getElementById("simulateBtn").addEventListener("click", function() {
        showToast("Next best reminder: send Daniel a document checklist at 4:30 PM");
      });

      document.getElementById("globalSearch").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          const query = event.target.value.trim();
          if (query) {
            document.getElementById("jarvisText").textContent = "AI answer: " + query + " → focus on the smallest next action, log it under the right category, and schedule a reminder if it involves a client.";
            event.target.value = "";
            showToast("Advisor AI answered on dashboard");
            activateSection("dashboard");
          }
        }
      });

      renderDate();
      renderTasks();
      renderClients();
      renderClientDetail();
      renderPlans("today");
      renderEvents();
      renderReminders();
    </script>
  </body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    void env;
    void ctx;

    if (new URL(request.url).pathname !== "/") {
      return new Response("Not found", { status: 404 });
    }

    return new Response(page, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};

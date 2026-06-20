import "./style.css";

const tasks = {
  Deadlines: [
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
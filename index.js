 const ALL_ISSUES_API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const SINGLE_ISSUE_API = "https://phi-lab-server.vercel.app/api/v1/lab/issue/";
const SEARCH_ISSUE_API = "https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=";

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin123";

let allIssues = [];
let currentTab = "all";

const loginView = document.getElementById("loginView");
const dashboardView = document.getElementById("dashboardView");
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginError = document.getElementById("loginError");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const issueCount = document.getElementById("issueCount");
const issuesContainer = document.getElementById("issuesContainer");
const loadingWrapper = document.getElementById("loadingWrapper");
const emptyState = document.getElementById("emptyState");

const tabButtons = document.querySelectorAll(".tab-btn");

const issueModal = document.getElementById("issueModal");
const modalTitle = document.getElementById("modalTitle");
const modalStatusBadge = document.getElementById("modalStatusBadge");
const modalOpenedBy = document.getElementById("modalOpenedBy");
const modalCreatedAt = document.getElementById("modalCreatedAt");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");
const closeModalBtn = document.getElementById("closeModalBtn");
const topCloseModalBtn = document.getElementById("topCloseModalBtn");

document.addEventListener("DOMContentLoaded", () => {
  setupEvents();
});

function setupEvents() {

  loginForm.addEventListener("submit", handleLogin);

  searchBtn.addEventListener("click", handleSearch);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentTab = btn.dataset.tab;
      updateActiveTab();
      applyFilter();
    });
  });

  closeModalBtn.addEventListener("click", () => issueModal.close());
  topCloseModalBtn.addEventListener("click", () => issueModal.close());
}

function handleLogin(e) {

  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {

    loginError.classList.add("hidden");

    loginView.classList.add("hidden");
    dashboardView.classList.remove("hidden");

    fetchIssues();

  } else {

    loginError.classList.remove("hidden");

  }
}

async function fetchIssues() {

  try {

    showLoading(true);

    const res = await fetch(ALL_ISSUES_API);
    const data = await res.json();

    allIssues = data.data || [];

    applyFilter();

  } catch (err) {

    console.log(err);

  } finally {

    showLoading(false);

  }

}

async function handleSearch() {

  const text = searchInput.value.trim();

  if (!text) {
    fetchIssues();
    return;
  }

  try {

    showLoading(true);

    const res = await fetch(`${SEARCH_ISSUE_API}${text}`);
    const data = await res.json();

    allIssues = data.data || [];

    applyFilter();

  } catch (err) {

    console.log(err);

  } finally {

    showLoading(false);

  }

}

function applyFilter() {

  let filtered = [...allIssues];

  if (currentTab === "open") {
    filtered = filtered.filter(i => i.status === "open");
  }

  if (currentTab === "closed") {
    filtered = filtered.filter(i => i.status === "closed");
  }

  issueCount.textContent = filtered.length;

  renderIssues(filtered);
}

function updateActiveTab() {

  tabButtons.forEach(btn => {

    btn.classList.remove("active-tab");

    if (btn.dataset.tab === currentTab) {
      btn.classList.add("active-tab");
    }

  });

}

function showLoading(show) {

  if (show) {
    loadingWrapper.classList.remove("hidden");
    issuesContainer.classList.add("hidden");
  } else {
    loadingWrapper.classList.add("hidden");
    issuesContainer.classList.remove("hidden");
  }

}

function renderIssues(issues) {

  issuesContainer.innerHTML = "";

  if (!issues.length) {

    emptyState.classList.remove("hidden");
    return;

  }

  emptyState.classList.add("hidden");

  issues.forEach(issue => {

    const card = document.createElement("div");

    card.className = `issue-card ${issue.status}`;

    card.innerHTML = `

      <div class="p-4 sm:p-5">

        <div class="flex items-start justify-between mb-4">

          <div>
            ${
              issue.status === "open"
                ? '<span class="status-dot open"></span>'
                : '<span class="status-dot closed"></span>'
            }
          </div>

          <span class="priority-badge ${getPriorityClass(issue.priority)}">
            ${issue.priority}
          </span>

        </div>

        <h3 class="issue-title">${issue.title}</h3>

        <p class="issue-desc mt-3">${issue.description}</p>

        <div class="flex flex-wrap gap-2 mt-4">
          ${(issue.labels || []).map(label => createLabel(label)).join("")}
        </div>

      </div>

      <div class="border-t border-slate-200 px-4 py-4">

        <p class="meta-text">#${issue.id} by ${issue.author}</p>

        <p class="meta-text mt-1">${formatDate(issue.createdAt)}</p>

      </div>
    `;

    card.addEventListener("click", () => openModal(issue.id));

    issuesContainer.appendChild(card);

  });

}

async function openModal(id) {

  try {

    const res = await fetch(`${SINGLE_ISSUE_API}${id}`);
    const data = await res.json();

    const issue = data.data;

    modalTitle.textContent = issue.title;
    modalDescription.textContent = issue.description;

    modalStatusBadge.textContent = issue.status;
    modalStatusBadge.className = `status-badge ${
      issue.status === "open" ? "status-open" : "status-closed"
    }`;

    modalOpenedBy.textContent = `Opened by ${issue.author}`;
    modalCreatedAt.textContent = formatDate(issue.createdAt);

    modalAssignee.textContent = issue.assignee || "Unassigned";
    modalPriority.textContent = issue.priority;

    modalLabels.innerHTML = (issue.labels || [])
      .map(label => createLabel(label))
      .join("");

    issueModal.showModal();

  } catch (err) {

    console.log(err);

  }

}

function createLabel(label) {

  const name = label.toLowerCase();

  if (name === "bug")
    return `
    <span class="label-badge label-bug">
      <svg class="label-icon" viewBox="0 0 24 24" fill="none">
        <path d="M9 7V6a3 3 0 1 1 6 0v1M8 10h8M9 7h6a3 3 0 0 1 3 3v3a6 6 0 1 1-12 0v-3a3 3 0 0 1 3-3Z"
        stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      BUG
    </span>
    `;

  if (name === "help wanted")
    return `
    <span class="label-badge label-help-wanted">
      <svg class="label-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/>
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
      </svg>
      HELP WANTED
    </span>
    `;

  if (name === "enhancement")
    return `
    <span class="label-badge label-enhancement">
      <svg class="label-icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L14.5 9L21 9.5L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9.5L9.5 9L12 3Z"
        stroke="currentColor" stroke-width="1.8"/>
      </svg>
      ENHANCEMENT
    </span>
    `;

  if (name === "good first issue")
    return `
    <span class="label-badge label-good-first-issue">
      <svg class="label-icon" viewBox="0 0 24 24" fill="none">
        <path d="M12 4V20M4 12H20"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      GOOD FIRST ISSUE
    </span>
    `;

  if (name === "documentation")
    return `
    <span class="label-badge label-documentation">
      <svg class="label-icon" viewBox="0 0 24 24" fill="none">
        <path d="M6 3H14L18 7V21H6V3Z"
        stroke="currentColor" stroke-width="2"/>
        <path d="M14 3V7H18"
        stroke="currentColor" stroke-width="2"/>
      </svg>
      DOCUMENTATION
    </span>
    `;

  return `<span class="label-badge label-default">${label}</span>`;
}

function getPriorityClass(priority) {

  if (!priority) return "priority-low";

  const p = priority.toLowerCase();

  if (p === "high") return "priority-high";
  if (p === "medium") return "priority-medium";

  return "priority-low";
}

function formatDate(date) {

  const d = new Date(date);

  return d.toLocaleDateString("en-US");
}
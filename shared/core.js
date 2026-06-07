/* ============================================================
   WebQ core pro — Shared Core Logic
   ============================================================ */

// ============================================================
// 1. STATE MANAGEMENT
// ============================================================
const STATE = {
  completedQuestions: new Set(),
  bookmarkedQuestions: new Set(),
  currentPage: 1,
  itemsPerPage: 10,
  searchQuery: '',
  activeTypeFilters: new Set(),
  activeTopicFilters: new Set(),
  showIncompleteOnly: false,
  showBookmarkedOnly: false,
  showAllAnswers: false,

  currentModuleData: null,
  sessionAnswered: 0,
  debounceTimer: null
};

// ============================================================
// 2. LOCAL STORAGE — Progress Persistence
// ============================================================
async function migrateData() {
  try {
    const dbProgress = await dbManager.get('webq_progress');
    if (!dbProgress) {
      const raw = localStorage.getItem('webq_progress');
      if (raw) await dbManager.set('webq_progress', JSON.parse(raw));
    }
    const dbBookmarks = await dbManager.get('webq_bookmarks');
    if (!dbBookmarks) {
      const raw = localStorage.getItem('webq_bookmarks');
      if (raw) await dbManager.set('webq_bookmarks', JSON.parse(raw));
    }
  } catch (e) {
    console.warn('Migration failed', e);
  }
}

async function loadProgress() {
  try {
    await migrateData();
    const raw = await dbManager.get('webq_progress');
    if (raw && Array.isArray(raw)) {
      STATE.completedQuestions = new Set(raw);
    }
  } catch (e) {
    console.warn('Failed to load progress:', e);
  }
}

function saveProgress() {
  try {
    const arr = Array.from(STATE.completedQuestions);
    dbManager.set('webq_progress', arr).catch(e => console.warn('DB set error', e));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

async function loadBookmarks() {
  try {
    const raw = await dbManager.get('webq_bookmarks');
    if (raw && Array.isArray(raw)) {
      STATE.bookmarkedQuestions = new Set(raw);
    }
  } catch (e) {
    console.warn('Failed to load bookmarks:', e);
  }
}

function saveBookmarks() {
  try {
    const arr = Array.from(STATE.bookmarkedQuestions);
    dbManager.set('webq_bookmarks', arr).catch(e => console.warn('DB set error', e));
  } catch (e) {
    console.warn('Failed to save bookmarks:', e);
  }
}

function getSessionAnswered() {
  try {
    return parseInt(sessionStorage.getItem('webq_session_answered') || '0', 10);
  } catch (e) {
    return 0;
  }
}

function incrementSessionAnswered() {
  try {
    const count = getSessionAnswered() + 1;
    sessionStorage.setItem('webq_session_answered', count.toString());
    STATE.sessionAnswered = count;
  } catch (e) { /* ignore */ }
}

// ============================================================
// 3. PROGRESS TRACKING
// ============================================================
function markAsDone(questionId) {
  if (STATE.completedQuestions.has(questionId)) return;
  STATE.completedQuestions.add(questionId);
  saveProgress();
  incrementSessionAnswered();
  
  // Update streak
  STATE.currentStreak = (parseInt(sessionStorage.getItem('webq_current_streak') || '0', 10)) + 1;
  sessionStorage.setItem('webq_current_streak', STATE.currentStreak.toString());
  
  const maxStreak = parseInt(localStorage.getItem('webq_max_streak') || '0', 10);
  if (STATE.currentStreak > maxStreak) {
      localStorage.setItem('webq_max_streak', STATE.currentStreak.toString());
  }

  updateProgressUI();
  showToast('Marked as done ✓', 'success', () => markAsUndone(questionId));
  updateMarkDoneButton(questionId, true);
}

function markAsUndone(questionId) {
  STATE.completedQuestions.delete(questionId);
  saveProgress();
  updateProgressUI();
  showToast('Unmarked — restored', 'info');
  updateMarkDoneButton(questionId, false);
}

function toggleBookmark(questionId) {
  if (STATE.bookmarkedQuestions.has(questionId)) {
    STATE.bookmarkedQuestions.delete(questionId);
    showToast('Removed from bookmarks', 'info');
  } else {
    STATE.bookmarkedQuestions.add(questionId);
    showToast('Added to bookmarks', 'success');
  }
  saveBookmarks();
  
  const card = document.querySelector(`[data-question-id="${questionId}"]`);
  if (card) {
    const btn = card.querySelector('.bookmark-btn');
    if (btn) {
      if (STATE.bookmarkedQuestions.has(questionId)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    }
  }
}

function updateMarkDoneButton(questionId, isDone) {
  const card = document.querySelector(`[data-question-id="${questionId}"]`);
  if (!card) return;
  const btn = card.querySelector('.mark-done-btn');
  if (!btn) return;
  if (isDone) {
    btn.classList.add('done');
    btn.querySelector('.check-icon').innerHTML = '✓';
    card.classList.add('completed');
  } else {
    btn.classList.remove('done');
    btn.querySelector('.check-icon').innerHTML = '';
    card.classList.remove('completed');
  }
}

function getModuleProgress(moduleData) {
  if (!moduleData) return { completed: 0, total: 0, percent: 0 };
  const allQuestions = getAllQuestions(moduleData);
  const total = allQuestions.length;
  let completed = 0;
  allQuestions.forEach(q => {
    if (STATE.completedQuestions.has(q.id)) completed++;
  });
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

function getGlobalProgress() {
  let totalAll = 0;
  let completedAll = 0;

  if (typeof MIDTERM_DATA !== 'undefined') {
    const p = getModuleProgress(MIDTERM_DATA);
    totalAll += p.total;
    completedAll += p.completed;
  }
  if (typeof QUESTIONS_DATA !== 'undefined') {
    const p = getModuleProgress(QUESTIONS_DATA);
    totalAll += p.total;
    completedAll += p.completed;
  }
  if (typeof FINAL_DATA !== 'undefined') {
    const p = getModuleProgress(FINAL_DATA);
    totalAll += p.total;
    completedAll += p.completed;
  }

  const percent = totalAll > 0 ? Math.round((completedAll / totalAll) * 100) : 0;
  return { completed: completedAll, total: totalAll, percent };
}

function updateProgressUI() {
  // Update sidebar progress bar
  const globalProg = getGlobalProgress();
  const fillEl = document.querySelector('.sidebar-progress-fill');
  const labelEl = document.querySelector('.sidebar-progress-percent');
  const countEl = document.querySelector('.sidebar-progress-count');

  if (fillEl) fillEl.style.width = globalProg.percent + '%';
  if (labelEl) labelEl.textContent = globalProg.percent + '%';
  if (countEl) countEl.textContent = globalProg.completed + '/' + globalProg.total;

  // Update session counter
  const sessionEl = document.getElementById('session-count');
  if (sessionEl) sessionEl.textContent = STATE.sessionAnswered;

  // Update bookmarks counts
  const bookmarksCount = STATE.bookmarkedQuestions.size;
  const sidebarBookmarksEl = document.getElementById('sidebar-bookmarks-count');
  if (sidebarBookmarksEl) sidebarBookmarksEl.textContent = bookmarksCount;
  const cardBookmarksEl = document.getElementById('bookmarks-count-card');
  if (cardBookmarksEl) cardBookmarksEl.textContent = bookmarksCount;
}

// ============================================================
// 4. UTILITY — Get All Questions from a Module
// ============================================================
function getAllQuestions(moduleData) {
  const all = [];
  if (moduleData.mcq) all.push(...moduleData.mcq);
  if (moduleData.complete) all.push(...moduleData.complete);
  if (moduleData.tf) all.push(...moduleData.tf);
  if (moduleData.short) all.push(...moduleData.short);
  return all;
}

function getFilteredQuestions(moduleData) {
  let questions = getAllQuestions(moduleData);

  // Filter by type
  if (STATE.activeTypeFilters.size > 0) {
    questions = questions.filter(q => STATE.activeTypeFilters.has(q.type));
  }

  // Filter by topic
  if (STATE.activeTopicFilters.size > 0) {
    questions = questions.filter(q => STATE.activeTopicFilters.has(q.topic));
  }

  // Search filter
  if (STATE.searchQuery.trim()) {
    const query = STATE.searchQuery.toLowerCase().trim();
    questions = questions.filter(q => {
      const qText = (q.question || '').toLowerCase();
      const answerContent = q.answer !== undefined ? String(q.answer) : (q.answerText || '');
      const aText = answerContent.toLowerCase();
      const topic = (q.topic || '').toLowerCase();
      const options = (q.options || []).join(' ').toLowerCase();
      return qText.includes(query) || aText.includes(query) || topic.includes(query) || options.includes(query);
    });
  }

  // Incomplete only filter
  if (STATE.showIncompleteOnly) {
    questions = questions.filter(q => !STATE.completedQuestions.has(q.id));
  }

  // Bookmarked only filter
  if (STATE.showBookmarkedOnly) {
    questions = questions.filter(q => STATE.bookmarkedQuestions.has(q.id));
  }

  return questions;
}

function toggleBookmarkedOnly() {
  STATE.showBookmarkedOnly = !STATE.showBookmarkedOnly;
  STATE.currentPage = 1;
  const btn = document.getElementById('bookmarked-btn');
  if (btn) {
    if (STATE.showBookmarkedOnly) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-secondary');
    } else {
      btn.classList.add('btn-secondary');
      btn.classList.remove('btn-primary');
    }
  }
  renderCurrentView();
}

function getTopicsForModule(moduleData) {
  const topics = new Set();
  getAllQuestions(moduleData).forEach(q => {
    if (q.topic) topics.add(q.topic);
  });
  return Array.from(topics).sort();
}

function getTypesForModule(moduleData) {
  const types = new Set();
  getAllQuestions(moduleData).forEach(q => {
    if (q.type) types.add(q.type);
  });
  return Array.from(types);
}

// ============================================================
// 5. XSS SANITIZATION
// ============================================================
function sanitizeHTML(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeForDisplay(text) {
  // Preserve the text content while making HTML-like content safe for display
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================
// 6. RENDERING — Question Cards
// ============================================================
function renderQuestionCard(question, index) {
  const isDone = STATE.completedQuestions.has(question.id);
  const isBookmarked = STATE.bookmarkedQuestions.has(question.id);
  const typeLabel = getTypeLabel(question.type);
  const badgeClass = getBadgeClass(question.type);

  let card = `
    <div class="question-card ${isDone ? 'completed' : ''}" data-question-id="${question.id}" data-type="${question.type}" style="animation-delay: ${Math.min(index * 0.05, 0.5)}s">
      <div class="question-card-header">
        <div class="question-meta">
          <span class="question-number">#${index + 1}</span>
          <span class="question-type-badge ${badgeClass}">${typeLabel}</span>
          <span class="question-topic-badge">${escapeForDisplay(question.topic)}</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${question.id}')" aria-label="Bookmark" title="Bookmark Question">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="bookmark-svg">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </button>
          <button class="mark-done-btn ${isDone ? 'done' : ''}" onclick="toggleMarkDone('${question.id}')" aria-label="Mark as done">
            <span class="check-icon">${isDone ? '✓' : ''}</span>
            <span>${isDone ? 'Done' : 'Mark Done'}</span>
          </button>
        </div>
      </div>
      <div class="question-text">${escapeForDisplay(question.question).replace(/\n/g, '<br>')}</div>
  `;

  // Render based on type
  if (question.type === 'mcq') {
    card += renderMCQOptions(question);
  } else if (question.type === 'tf') {
    card += renderTFOptions(question);
  }

  // Answer block
  const answerContent = question.answer !== undefined
    ? (typeof question.answer === 'boolean' ? (question.answer ? 'True' : 'False') : escapeForDisplay(String(question.answer)))
    : escapeForDisplay(question.answerText || '');

  card += `
      <button class="toggle-answer-btn" onclick="toggleAnswer(this)" aria-label="Toggle answer">
        ${STATE.showAllAnswers ? 'Hide Answer' : 'Show Answer'}
      </button>
      <div class="answer-block ${STATE.showAllAnswers ? 'visible' : ''}">
        <div class="answer-label">✓ Answer</div>
        <div class="answer-text">${answerContent}</div>
      </div>
    </div>
  `;

  return card;
}

function renderMCQOptions(question) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  let html = '<div class="mcq-options">';
  question.options.forEach((opt, i) => {
    html += `
      <div class="mcq-option" data-index="${i}" data-question-id="${question.id}" onclick="selectMCQOption(this, ${question.correctIndex})">
        <span class="option-letter">${letters[i]}</span>
        <span class="option-text">${escapeForDisplay(opt)}</span>
      </div>
    `;
  });
  html += '</div>';
  return html;
}

function renderTFOptions(question) {
  const correctVal = question.answer;
  return `
    <div class="tf-options">
      <button class="tf-btn true-btn" data-question-id="${question.id}" onclick="selectTFOption(this, true, ${correctVal})">
        ✓ True
      </button>
      <button class="tf-btn false-btn" data-question-id="${question.id}" onclick="selectTFOption(this, false, ${correctVal})">
        ✗ False
      </button>
    </div>
  `;
}

function getTypeLabel(type) {
  const labels = {
    mcq: 'Multiple Choice',
    complete: 'Complete',
    tf: 'True / False',
    short: 'Short Answer'
  };
  return labels[type] || type;
}

function getBadgeClass(type) {
  const classes = {
    mcq: 'badge-mcq',
    complete: 'badge-complete',
    tf: 'badge-tf',
    short: 'badge-short'
  };
  return classes[type] || '';
}

// ============================================================
// 7. MCQ & TF INTERACTION
// ============================================================
function selectMCQOption(el, correctIndex) {
  const parent = el.closest('.mcq-options');
  const allOptions = parent.querySelectorAll('.mcq-option');
  const selectedIndex = parseInt(el.getAttribute('data-index'), 10);

  // Check if already answered
  if (parent.classList.contains('answered')) return;
  parent.classList.add('answered');

  allOptions.forEach((opt, i) => {
    opt.classList.add('disabled');
    if (i === correctIndex) {
      opt.classList.add('correct');
    }
    if (i === selectedIndex && i !== correctIndex) {
      opt.classList.add('incorrect');
    }
  });

  // Auto-show answer
  const card = el.closest('.question-card');
  const answerBlock = card.querySelector('.answer-block');
  if (answerBlock) answerBlock.classList.add('visible');

  // If correct, auto-mark as done
  if (selectedIndex === correctIndex) {
    const qId = el.getAttribute('data-question-id');
    if (!STATE.completedQuestions.has(qId)) {
      markAsDone(qId);
    }
  }
}

function selectTFOption(el, selectedValue, correctValue) {
  const parent = el.closest('.tf-options');

  // Check if already answered
  if (parent.classList.contains('answered')) return;
  parent.classList.add('answered');

  const allBtns = parent.querySelectorAll('.tf-btn');
  allBtns.forEach(btn => btn.classList.add('disabled'));

  if (selectedValue === correctValue) {
    el.classList.add('correct');
  } else {
    el.classList.add('incorrect');
    // Highlight the correct one
    const correctBtn = selectedValue ? parent.querySelector('.false-btn') : parent.querySelector('.true-btn');
    if (correctBtn) correctBtn.classList.add('correct');
  }

  // Auto-show answer
  const card = el.closest('.question-card');
  const answerBlock = card.querySelector('.answer-block');
  if (answerBlock) answerBlock.classList.add('visible');

  // If correct, auto-mark as done
  if (selectedValue === correctValue) {
    const qId = el.getAttribute('data-question-id');
    if (!STATE.completedQuestions.has(qId)) {
      markAsDone(qId);
    }
  }
}

// ============================================================
// 8. ANSWER TOGGLING
// ============================================================
function toggleAnswer(btn) {
  const card = btn.closest('.question-card');
  const block = card.querySelector('.answer-block');
  if (!block) return;
  const isVisible = block.classList.contains('visible');
  block.classList.toggle('visible');
  btn.textContent = isVisible ? 'Show Answer' : 'Hide Answer';
}

function toggleAllAnswers() {
  STATE.showAllAnswers = !STATE.showAllAnswers;
  const blocks = document.querySelectorAll('.answer-block');
  const btns = document.querySelectorAll('.toggle-answer-btn');

  blocks.forEach(block => {
    if (STATE.showAllAnswers) {
      block.classList.add('visible');
    } else {
      block.classList.remove('visible');
    }
  });

  btns.forEach(btn => {
    btn.textContent = STATE.showAllAnswers ? 'Hide Answer' : 'Show Answer';
  });

  const toggleBtn = document.getElementById('toggle-all-answers-btn');
  if (toggleBtn) {
    toggleBtn.textContent = STATE.showAllAnswers ? '🙈 Hide All Answers' : '👁 Show All Answers';
    toggleBtn.classList.toggle('active', STATE.showAllAnswers);
  }
}

function toggleMarkDone(questionId) {
  if (STATE.completedQuestions.has(questionId)) {
    markAsUndone(questionId);
  } else {
    markAsDone(questionId);
  }
}

// ============================================================
// 9. SEARCH ENGINE (Debounced)
// ============================================================
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    clearTimeout(STATE.debounceTimer);
    STATE.debounceTimer = setTimeout(() => {
      STATE.searchQuery = this.value;
      STATE.currentPage = 1;
      renderCurrentView();
    }, 250);
  });
}

// ============================================================
// 10. FILTER SYSTEM
// ============================================================
function setupFilters(moduleData) {
  renderTypeFilters(moduleData);
  renderTopicFilters(moduleData);
}

function renderTypeFilters(moduleData) {
  const container = document.getElementById('type-filters');
  if (!container) return;

  const types = getTypesForModule(moduleData);
  const typeInfo = {
    mcq: { label: 'Multiple Choice', cssClass: 'type-mcq', icon: '◆' },
    complete: { label: 'Complete', cssClass: 'type-complete', icon: '✎' },
    tf: { label: 'True / False', cssClass: 'type-tf', icon: '⇄' },
    short: { label: 'Short Answer', cssClass: 'type-short', icon: '✦' }
  };

  let html = '';
  types.forEach(type => {
    const info = typeInfo[type] || { label: type, cssClass: '', icon: '•' };
    html += `
      <label class="filter-chip ${info.cssClass} active" data-type="${type}">
        <input type="checkbox" checked onchange="toggleTypeFilter('${type}', this.checked)">
        <span class="chip-dot"></span>
        ${info.label}
      </label>
    `;
  });
  container.innerHTML = html;
}

function renderTopicFilters(moduleData) {
  const container = document.getElementById('topic-filters');
  if (!container) return;

  const topics = getTopicsForModule(moduleData);
  let html = '';
  topics.forEach(topic => {
    html += `
      <label class="filter-chip active" data-topic="${topic}">
        <input type="checkbox" checked onchange="toggleTopicFilter(this.closest('.filter-chip').getAttribute('data-topic'), this.checked)">
        ${escapeForDisplay(topic)}
      </label>
    `;
  });
  container.innerHTML = html;
}

function toggleTypeFilter(type, isChecked) {
  const chip = document.querySelector(`.filter-chip[data-type="${type}"]`);
  if (chip) chip.classList.toggle('active', isChecked);

  rebuildActiveFilters();
  STATE.currentPage = 1;
  renderCurrentView();
}

function toggleTopicFilter(topic, isChecked) {
  const chips = document.querySelectorAll('#topic-filters .filter-chip');
  chips.forEach(c => {
    if (c.getAttribute('data-topic') === topic) c.classList.toggle('active', isChecked);
  });

  rebuildActiveFilters();
  STATE.currentPage = 1;
  renderCurrentView();
}

function rebuildActiveFilters() {
  // Type filters: collect only checked types
  STATE.activeTypeFilters.clear();
  const typeChips = document.querySelectorAll('#type-filters .filter-chip');
  let anyTypeUnchecked = false;
  typeChips.forEach(c => {
    const input = c.querySelector('input[type="checkbox"]');
    if (input && input.checked) {
      STATE.activeTypeFilters.add(c.getAttribute('data-type'));
    } else {
      anyTypeUnchecked = true;
    }
  });
  // If all checked, clear (means no filter = show all)
  if (!anyTypeUnchecked) STATE.activeTypeFilters.clear();

  // Topic filters
  STATE.activeTopicFilters.clear();
  const topicChips = document.querySelectorAll('#topic-filters .filter-chip');
  let anyTopicUnchecked = false;
  topicChips.forEach(c => {
    const input = c.querySelector('input[type="checkbox"]');
    if (input && input.checked) {
      STATE.activeTopicFilters.add(c.getAttribute('data-topic'));
    } else {
      anyTopicUnchecked = true;
    }
  });
  if (!anyTopicUnchecked) STATE.activeTopicFilters.clear();
}

function toggleIncompleteOnly() {
  STATE.showIncompleteOnly = !STATE.showIncompleteOnly;
  STATE.currentPage = 1;

  const btn = document.getElementById('incomplete-btn');
  if (btn) {
    btn.classList.toggle('active', STATE.showIncompleteOnly);
    btn.textContent = STATE.showIncompleteOnly ? '📋 Show All' : '📋 Show Incomplete Only';
  }

  renderCurrentView();
}



// ============================================================
// 11. PAGINATION
// ============================================================
function renderPagination(totalItems) {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(totalItems / STATE.itemsPerPage);
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '';

  // Prev button
  html += `<button class="page-btn" ${STATE.currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${STATE.currentPage - 1})">‹</button>`;

  // Page numbers
  const maxVisible = 5;
  let startPage = Math.max(1, STATE.currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  if (startPage > 1) {
    html += `<button class="page-btn" onclick="goToPage(1)">1</button>`;
    if (startPage > 2) html += `<span class="page-info">…</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<button class="page-btn ${i === STATE.currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += `<span class="page-info">…</span>`;
    html += `<button class="page-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }

  // Next button
  html += `<button class="page-btn" ${STATE.currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${STATE.currentPage + 1})">›</button>`;

  container.innerHTML = html;
}

function goToPage(page) {
  const filtered = getFilteredQuestions(STATE.currentModuleData);
  const totalPages = Math.ceil(filtered.length / STATE.itemsPerPage);
  if (page < 1 || page > totalPages) return;
  STATE.currentPage = page;
  renderCurrentView();
  // Scroll to top of questions
  const grid = document.getElementById('questions-grid');
  if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================
// 12. MAIN RENDER FUNCTION
// ============================================================
function renderCurrentView() {
  if (!STATE.currentModuleData) return;

  const filtered = getFilteredQuestions(STATE.currentModuleData);
  const total = filtered.length;

  // Pagination slice
  const startIdx = (STATE.currentPage - 1) * STATE.itemsPerPage;
  const endIdx = startIdx + STATE.itemsPerPage;
  const pageItems = filtered.slice(startIdx, endIdx);

  // Render questions
  const grid = document.getElementById('questions-grid');
  if (grid) {
    if (pageItems.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">No questions found</div>
          <div class="empty-state-desc">Try adjusting your filters or search query to find what you're looking for.</div>
        </div>
      `;
    } else {
      grid.innerHTML = pageItems.map((q, i) => renderQuestionCard(q, startIdx + i)).join('');
    }
  }

  // Update search stats
  const statsEl = document.getElementById('search-stats');
  if (statsEl) {
    const allTotal = getAllQuestions(STATE.currentModuleData).length;
    statsEl.textContent = `Showing ${total} of ${allTotal} questions`;
    statsEl.setAttribute('aria-live', 'polite');
  }

  // Render pagination
  renderPagination(total);

  // Update progress
  updateProgressUI();
}



// ============================================================
// 16. TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type, undoCallback) {
  type = type || 'info';
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✓', error: '✗', info: 'ℹ', warning: '⚠' };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ'}</span>
    <span class="toast-message">${escapeForDisplay(message)}</span>
    ${undoCallback ? '<button class="toast-undo" onclick="this.undoFn()">Undo</button>' : ''}
  `;

  if (undoCallback) {
    const undoBtn = toast.querySelector('.toast-undo');
    if (undoBtn) {
      undoBtn.undoFn = function () {
        undoCallback();
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      };
      undoBtn.onclick = function () { this.undoFn(); };
    }
  }

  container.appendChild(toast);

  // Auto-remove after 3.5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }
  }, 3500);
}

// ============================================================
// 17. EXPORT / IMPORT PROGRESS
// ============================================================
function exportProgress() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    completedQuestions: Array.from(STATE.completedQuestions),
    bookmarkedQuestions: Array.from(STATE.bookmarkedQuestions)
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `webq-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Progress and bookmarks exported successfully', 'success');
}

function importProgress(fileInput) {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      let importedCount = 0;
      
      if (data.completedQuestions && Array.isArray(data.completedQuestions)) {
        // Merge with existing (don't overwrite)
        data.completedQuestions.forEach(id => STATE.completedQuestions.add(id));
        saveProgress();
        importedCount += data.completedQuestions.length;
      }
      
      if (data.bookmarkedQuestions && Array.isArray(data.bookmarkedQuestions)) {
        data.bookmarkedQuestions.forEach(id => STATE.bookmarkedQuestions.add(id));
        saveBookmarks();
        importedCount += data.bookmarkedQuestions.length;
      }
      
      if (importedCount > 0) {
        updateProgressUI();
        if (STATE.currentModuleData) renderCurrentView();
        showToast(`Imported progress and bookmarks — merged with existing data`, 'success');
      } else {
        showToast('No valid progress or bookmarks found in file', 'error');
      }
    } catch (err) {
      showToast('Failed to parse file: ' + err.message, 'error');
    }
  };
  reader.readAsText(file);
  fileInput.value = '';
}

function resetProgress() {
  if (confirm('Are you sure you want to reset ALL progress and bookmarks? This cannot be undone.')) {
    STATE.completedQuestions.clear();
    STATE.bookmarkedQuestions.clear();
    saveProgress();
    saveBookmarks();
    
    showToast('All progress and bookmarks have been reset. Refreshing...', 'warning');
    setTimeout(() => {
      window.location.reload();
    }, 800);
  }
}

// ============================================================
// 18. PRINT FUNCTION
// ============================================================
function printView() {
  if (!STATE.currentModuleData) {
    window.print();
    return;
  }

  // Save current state
  STATE.originalItemsPerPage = STATE.itemsPerPage;
  STATE.originalPage = STATE.currentPage;
  
  // Render ALL filtered questions on one page for printing
  STATE.itemsPerPage = 99999;
  STATE.currentPage = 1;
  renderCurrentView();

  // Apply Print Mode based on user preference
  document.body.classList.remove('print-blank-mode', 'print-study-mode');
  document.body.classList.add('print-active');
  
  if (STATE.showAllAnswers) {
    // Study Guide Mode: Show answers and maintain correct highlights
    document.body.classList.add('print-study-mode');
    
    // Inject .correct class to the actual options for visual printing
    getAllQuestions(STATE.currentModuleData).forEach(q => {
      const card = document.querySelector(`.question-card[data-question-id="${q.id}"]`);
      if (!card) return;
      
      if (q.type === 'mcq') {
        const opts = card.querySelectorAll('.mcq-option');
        if (opts[q.correctIndex]) opts[q.correctIndex].classList.add('correct');
      } else if (q.type === 'tf') {
        const btn = card.querySelector(q.answer ? '.true-btn' : '.false-btn');
        if (btn) btn.classList.add('correct');
      }
    });

    document.querySelectorAll('.answer-block').forEach(b => b.classList.add('visible'));
  } else {
    // Blank Test Mode: Hide all answers and highlights
    document.querySelectorAll('.mcq-option.correct').forEach(opt => opt.classList.remove('correct'));
    document.querySelectorAll('.mcq-option.incorrect').forEach(opt => opt.classList.remove('incorrect'));
    document.querySelectorAll('.tf-btn.correct').forEach(btn => btn.classList.remove('correct'));
    document.querySelectorAll('.tf-btn.incorrect').forEach(btn => btn.classList.remove('incorrect'));
    document.querySelectorAll('.question-card.completed').forEach(card => card.classList.remove('completed'));
    document.querySelectorAll('.answer-block').forEach(b => b.classList.remove('visible'));
    document.body.classList.add('print-blank-mode');
  }

  // Inject Professional Header
  const printHeader = document.createElement('div');
  printHeader.className = 'print-doc-header';
  
  const headerTitle = STATE.showAllAnswers 
    ? 'WebQ Core Pro — Study Guide (Answers Included)' 
    : 'WebQ Core Pro — Official Assessment';
    
  printHeader.innerHTML = `
    <div class="print-doc-title">${headerTitle}</div>
  `;
  const mainContent = document.querySelector('.main-content');
  if (mainContent) {
    mainContent.prepend(printHeader);
  }

  // Listen for the end of the print dialog to refresh the page
  window.addEventListener('afterprint', () => {
    setTimeout(() => {
      window.location.reload();
    }, 500); // Safe delay for mobile browsers
  }, { once: true });

  // Small delay to ensure DOM updates before print dialog blocks thread
  setTimeout(() => {
    window.print();
  }, 100);
}

function exitPrintView() {
  window.location.reload();
}

// ============================================================
// 19. MOBILE SIDEBAR TOGGLE
// ============================================================
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('active');
}

function closeSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

// ============================================================
// 20. MODULE PAGE INITIALIZATION
// ============================================================
async function initModulePage(moduleData, options = {}) {
  STATE.currentModuleData = moduleData;
  STATE.currentPage = 1;
  STATE.searchQuery = '';
  STATE.activeTypeFilters.clear();
  STATE.activeTopicFilters.clear();
  STATE.showIncompleteOnly = false;
  STATE.showBookmarkedOnly = options.forceBookmarkedOnly || false;
  STATE.showAllAnswers = false;
  STATE.sessionAnswered = getSessionAnswered();

  await loadProgress();
  await loadBookmarks();
  
  setupSearch();
  setupFilters(moduleData);
  renderCurrentView();
  updateProgressUI();
}

// ============================================================
// 21. DASHBOARD INITIALIZATION
// ============================================================
async function initDashboard() {
  await loadProgress();
  await loadBookmarks();
  STATE.sessionAnswered = getSessionAnswered();

  updateDashboardStats();
  updateProgressUI();
}

function updateDashboardStats() {
  // Module-specific progress
  const modules = [
    { key: 'midterm', data: typeof MIDTERM_DATA !== 'undefined' ? MIDTERM_DATA : null },
    { key: 'questions', data: typeof QUESTIONS_DATA !== 'undefined' ? QUESTIONS_DATA : null },
    { key: 'final', data: typeof FINAL_DATA !== 'undefined' ? FINAL_DATA : null }
  ];

  modules.forEach(mod => {
    if (!mod.data) return;
    const prog = getModuleProgress(mod.data);

    // Update progress ring
    const ring = document.querySelector(`.module-${mod.key} .progress-ring-fill`);
    if (ring) {
      const circumference = 2 * Math.PI * 26; // r=26
      const offset = circumference - (prog.percent / 100) * circumference;
      ring.style.strokeDasharray = circumference;
      ring.style.strokeDashoffset = offset;
    }

    // Update text
    const textEl = document.querySelector(`.module-${mod.key} .progress-ring-text`);
    if (textEl) textEl.textContent = prog.percent + '%';

    // Update stat chips
    const completedEl = document.querySelector(`.module-${mod.key} .module-completed`);
    if (completedEl) completedEl.textContent = prog.completed + ' done';
  });

  // Global stats
  const globalProg = getGlobalProgress();

  const totalEl = document.getElementById('total-questions');
  if (totalEl) totalEl.textContent = globalProg.total;

  const completedEl = document.getElementById('total-completed');
  if (completedEl) completedEl.textContent = globalProg.completed;

  const percentEl = document.getElementById('total-percent');
  if (percentEl) percentEl.textContent = globalProg.percent + '%';

  const sessionEl = document.getElementById('session-count');
  if (sessionEl) sessionEl.textContent = STATE.sessionAnswered;
}

// ============================================================
// 22. ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
  // Setup sidebar overlay close
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.addEventListener('click', closeSidebar);



  // Warn if running via file:// protocol
  if (window.location.protocol === 'file:') {
    setTimeout(() => {
      showToast('⚠️ Running locally (file://). Progress saving may not work properly. Please use a Live Server.', 'warning');
    }, 1000);
  }
});

// ============================================================
// 23. PLAYER PROFILE & KNOWLEDGE PROGRESS
// ============================================================
function getPlayerLevelAndTitle(xp) {
    const levels = [
        { xp: 0, title: 'Novice Coder' },
        { xp: 100, title: 'Apprentice' },
        { xp: 300, title: 'Web Developer' },
        { xp: 600, title: 'Code Wizard' },
        { xp: 1000, title: 'Frontend Master' },
        { xp: 2000, title: 'Fullstack Legend' }
    ];
    let currentLevel = 1;
    let title = levels[0].title;
    let prevXp = 0;
    let nextXp = levels[1].xp;
    
    for (let i = 0; i < levels.length; i++) {
        if (xp >= levels[i].xp) {
            currentLevel = i + 1;
            title = levels[i].title;
            prevXp = levels[i].xp;
            nextXp = i + 1 < levels.length ? levels[i + 1].xp : levels[i].xp;
        }
    }
    return { level: currentLevel, title: title, prevXp: prevXp, nextXp: nextXp };
}

function calculateKnowledgeProgress() {
    const progress = {};
    const modules = [
        typeof MIDTERM_DATA !== 'undefined' ? MIDTERM_DATA : null,
        typeof QUESTIONS_DATA !== 'undefined' ? QUESTIONS_DATA : null,
        typeof FINAL_DATA !== 'undefined' ? FINAL_DATA : null
    ];
    
    modules.forEach(mod => {
        if (!mod) return;
        const allQ = getAllQuestions(mod);
        allQ.forEach(q => {
            const topic = q.topic || 'General';
            if (!progress[topic]) {
                progress[topic] = { total: 0, completed: 0 };
            }
            progress[topic].total++;
            if (STATE.completedQuestions.has(q.id)) {
                progress[topic].completed++;
            }
        });
    });
    return progress;
}

function renderKnowledgeProgressUI(progressMap) {
    const container = document.getElementById('knowledge-progress-container');
    if (!container) return;
    
    let html = '';
    const topics = Object.keys(progressMap).sort();
    topics.forEach(topic => {
        const stats = progressMap[topic];
        const percent = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
        
        html += `
            <div class="knowledge-item">
                <div class="knowledge-label">
                    <span>${escapeForDisplay(topic)}</span>
                    <span class="knowledge-percent">${percent}%</span>
                </div>
                <div class="knowledge-bar-bg">
                    <div class="knowledge-bar-fill" style="width: 0%;" data-width="${percent}%"></div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    
    // Trigger animation slightly after render
    setTimeout(() => {
        const fills = container.querySelectorAll('.knowledge-bar-fill');
        fills.forEach(f => {
            f.style.width = f.getAttribute('data-width');
        });
    }, 50);
}

function renderBadgesUI(totalCompleted) {
    const container = document.getElementById('badges-container');
    if (!container) return;
    
    const badgeTiers = [
        { count: 10, name: 'First Steps', icon: '🌱' },
        { count: 50, name: 'Fast Learner', icon: '🚀' },
        { count: 100, name: 'Centurion', icon: '💯' },
        { count: 200, name: 'Grandmaster', icon: '👑' }
    ];
    let html = '';
    
    badgeTiers.forEach(tier => {
        const unlocked = totalCompleted >= tier.count;
        html += `
            <div class="badge-item ${unlocked ? 'unlocked' : 'locked'}">
                <div class="badge-icon-wrapper">
                    <div class="badge-icon">${unlocked ? tier.icon : '🔒'}</div>
                </div>
                <div class="badge-name">${tier.name}</div>
                <div class="badge-desc">${tier.count} Qs</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function injectPlayerProfileHTML() {
    if (document.getElementById('player-profile-overlay')) return;
    
    const html = `
    <div id="player-profile-overlay" class="profile-overlay" onclick="if(event.target===this) closePlayerProfile()">
        <div class="profile-modal">
            <button class="profile-close" onclick="closePlayerProfile()">×</button>
            <div class="profile-header">
                <div class="profile-avatar">👨‍💻</div>
                <div class="profile-titles">
                    <h2 id="profile-title">Novice</h2>
                    <p>Level <span id="profile-level">1</span></p>
                    <div class="profile-xp-container">
                        <div class="profile-xp-bar-bg">
                            <div class="profile-xp-bar-fill" id="profile-xp-bar"></div>
                        </div>
                        <div class="profile-xp-text"><span id="profile-xp">0</span> / <span id="profile-xp-next">100</span> XP</div>
                    </div>
                </div>
            </div>
            
            <div class="profile-stats-grid">
                <div class="profile-stat-box">
                    <div class="stat-value" id="profile-questions-done">0</div>
                    <div class="stat-label">Questions</div>
                </div>
                <div class="profile-stat-box">
                    <div class="stat-value" id="profile-accuracy">0%</div>
                    <div class="stat-label">Accuracy</div>
                </div>
                <div class="profile-stat-box">
                    <div class="stat-value" id="profile-streak">0</div>
                    <div class="stat-label">Max Streak</div>
                </div>
            </div>
            
            <div class="profile-section">
                <h3>Knowledge Progress</h3>
                <div id="knowledge-progress-container" class="knowledge-grid">
                    <!-- Dynamic topic bars will go here -->
                </div>
            </div>
            
            <div class="profile-section">
                <h3>Badges</h3>
                <div id="badges-container" class="badges-grid">
                    <!-- Badges go here -->
                </div>
            </div>
        </div>
    </div>`;
    document.body.insertAdjacentHTML('beforeend', html);
}

function openPlayerProfile() {
    injectPlayerProfileHTML();
    const overlay = document.getElementById('player-profile-overlay');
    if (!overlay) return;
    
    const totalCompleted = STATE.completedQuestions.size;
    const xp = totalCompleted * 10;
    const levelInfo = getPlayerLevelAndTitle(xp);
    
    const titleEl = document.getElementById('profile-title');
    if (titleEl) titleEl.textContent = levelInfo.title;
    
    const levelEl = document.getElementById('profile-level');
    if (levelEl) levelEl.textContent = levelInfo.level;
    
    // XP Bar
    const xpEl = document.getElementById('profile-xp');
    if (xpEl) xpEl.textContent = xp;
    
    const nextXpEl = document.getElementById('profile-xp-next');
    if (nextXpEl) nextXpEl.textContent = levelInfo.nextXp;
    
    const xpPercent = levelInfo.nextXp === levelInfo.prevXp ? 100 : Math.max(0, Math.min(100, ((xp - levelInfo.prevXp) / (levelInfo.nextXp - levelInfo.prevXp)) * 100));
    const xpBar = document.getElementById('profile-xp-bar');
    if (xpBar) xpBar.style.width = xpPercent + '%';
    
    const qsEl = document.getElementById('profile-questions-done');
    if (qsEl) qsEl.textContent = totalCompleted;
    
    const mockAccuracy = totalCompleted > 0 ? Math.min(100, 85 + Math.floor(totalCompleted / 10)) : 0;
    const accEl = document.getElementById('profile-accuracy');
    if (accEl) accEl.textContent = mockAccuracy + '%';
    
    const streakEl = document.getElementById('profile-streak');
    const maxStreak = localStorage.getItem('webq_max_streak') || 0;
    if (streakEl) streakEl.textContent = Math.max(maxStreak, parseInt(sessionStorage.getItem('webq_current_streak') || '0', 10));
    
    const kpMap = calculateKnowledgeProgress();
    renderKnowledgeProgressUI(kpMap);
    renderBadgesUI(totalCompleted);
    
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closePlayerProfile() {
    const overlay = document.getElementById('player-profile-overlay');
    if (overlay) overlay.classList.remove('active');
}

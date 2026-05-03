/**
 * SuiteManager – Single Responsibility: suite rendering and interaction.
 * Open/Closed: rendering helpers are private; only loadStage is the public entry point.
 */
class SuiteManager {
  /** @param {string} stageId */
  static loadStage(stageId) {
    UIManager.showSection('suites');
    const stage = TestDataRepository.stages[stageId];
    if (!stage) return;

    const container = document.getElementById('suites-dynamic-content');
    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2><i class="fas fa-clipboard-check me-2" aria-hidden="true"></i>${stage.name}</h2>
        <div class="d-flex gap-2 align-items-center flex-wrap">
          <input type="search" class="search-bar" id="suite-search"
            placeholder="Search test cases…" aria-label="Search test cases">
          <button class="btn btn-outline-secondary btn-sm" onclick="UIManager.showRunHistory()">
            <i class="fas fa-history me-1" aria-hidden="true"></i>Run History
          </button>
        </div>
      </div>
      <div id="suites-list">
        ${stage.suites.map(suite => this.#renderSuiteCard(suite)).join('')}
      </div>`;

    // Live search
    document.getElementById('suite-search').addEventListener('input', e => {
      this.#filterTestCases(e.target.value.trim().toLowerCase());
    });
  }

  /** @param {string} query */
  static #filterTestCases(query) {
    document.querySelectorAll('.test-case-row').forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = (!query || text.includes(query)) ? '' : 'none';
    });
    // Hide suite cards that have no visible rows
    document.querySelectorAll('.suite-card').forEach(card => {
      const visible = [...card.querySelectorAll('.test-case-row')]
        .some(r => r.style.display !== 'none');
      card.style.display = visible ? '' : 'none';
    });
  }

  /** @param {Object} suite @returns {string} */
  static #renderSuiteCard(suite) {
    return `
      <div class="suite-card" id="suite-${suite.id}">
        <div class="suite-header">
          <div>
            <h5 id="suite-title-${suite.id}">
              ${suite.title}
              <span class="badge bg-secondary ms-2" aria-label="${suite.testCases.length} test cases">
                ${suite.testCases.length} cases
              </span>
            </h5>
            <small class="text-muted">${suite.desc}</small>
          </div>
          <div class="d-flex gap-2 align-items-center">
            <button class="btn btn-sm btn-outline-info"
              onclick="SuiteManager.loadLastRun('${suite.id}')"
              aria-label="Load last run for ${suite.title}">
              <i class="fas fa-undo-alt me-1" aria-hidden="true"></i>Load Last Run
            </button>
            <button class="help-btn" onclick="HelpService.open('${suite.id}')"
              aria-label="View help for ${suite.title}" title="View instructions">
              <i class="fas fa-question-circle fa-lg" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div class="table-responsive p-3">
          <table class="table table-testcases table-hover align-middle"
            aria-labelledby="suite-title-${suite.id}">
            <thead>
              <tr>
                <th scope="col" style="width:4%">#</th>
                <th scope="col">TC ID</th>
                <th scope="col">Description</th>
                <th scope="col">Expected Result</th>
                <th scope="col" style="width:12%">Status</th>
                <th scope="col" style="width:20%">Tester Notes</th>
                <th scope="col" style="width:15%">Proof</th>
              </tr>
            </thead>
            <tbody>
              ${suite.testCases.map((tc, idx) => this.#renderRow(tc, idx + 1)).join('')}
            </tbody>
          </table>
          <div class="text-end mt-2 d-flex justify-content-end gap-2 flex-wrap">
            <button class="btn btn-success"
              onclick="SuiteManager.submitSuite('${suite.id}')"
              aria-label="Save run result for ${suite.title}">
              <i class="fas fa-save me-1" aria-hidden="true"></i>Save Run (JSON)
            </button>
            <button class="btn btn-outline-danger btn-sm"
              onclick="SuiteManager.resetSuite('${suite.id}')"
              aria-label="Reset form for ${suite.title}">
              <i class="fas fa-undo me-1" aria-hidden="true"></i>Reset
            </button>
          </div>
        </div>
      </div>`;
  }

  /** @param {Object} tc @param {number} index @returns {string} */
  static #renderRow(tc, index) {
    return `
      <tr class="test-case-row" data-tc-id="${tc.id}" data-proof-files="[]">
        <td>${index}</td>
        <td><strong>${tc.id}</strong></td>
        <td>${tc.title}</td>
        <td>${tc.expected}</td>
        <td>
          <select class="form-select form-select-sm status-dropdown"
            aria-label="Status for ${tc.id}">
            <option value="">Select…</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
            <option value="Blocked">Blocked</option>
            <option value="N/A">N/A</option>
          </select>
        </td>
        <td>
          <textarea class="form-control form-control-sm tester-note"
            rows="1" placeholder="Optional note"
            aria-label="Tester note for ${tc.id}"></textarea>
        </td>
        <td>
          <button class="btn btn-outline-secondary btn-sm btn-upload"
            onclick="SuiteManager.triggerUpload(this)" type="button"
            aria-label="Attach proof for ${tc.id}">
            <i class="fas fa-paperclip" aria-hidden="true"></i> Attach
          </button>
          <input type="file" class="d-none proof-input" multiple
            accept=".jpg,.jpeg,.png,.gif,.mp4,.mov,.har,.log,.txt,.pdf"
            onchange="SuiteManager.handleFiles(this)"
            aria-label="Upload proof files for ${tc.id}">
          <ul class="proof-list mt-1" aria-label="Attached files for ${tc.id}"></ul>
        </td>
      </tr>`;
  }

  /** @param {HTMLButtonElement} btn */
  static triggerUpload(btn) {
    btn.closest('tr').querySelector('.proof-input').click();
  }

  /** @param {HTMLInputElement} input */
  static handleFiles(input) {
    const row = input.closest('tr');
    const list = row.querySelector('.proof-list');
    list.innerHTML = '';
    Array.from(input.files).forEach(f => {
      const li = document.createElement('li');
      li.textContent = f.name;
      list.appendChild(li);
    });
    row.dataset.proofFiles = JSON.stringify(Array.from(input.files).map(f => f.name));
  }

  /** @param {string} suiteId */
  static resetSuite(suiteId) {
    const card = document.getElementById(`suite-${suiteId}`);
    if (!card) return;
    card.querySelectorAll('.status-dropdown').forEach(s => { s.value = ''; });
    card.querySelectorAll('.tester-note').forEach(n => { n.value = ''; });
    card.querySelectorAll('.proof-list').forEach(l => { l.innerHTML = ''; });
    card.querySelectorAll('.test-case-row').forEach(r => { r.dataset.proofFiles = '[]'; });
    NotificationService.show('Form cleared.');
  }

  /** @param {string} suiteId */
  static submitSuite(suiteId) {
    const card = document.getElementById(`suite-${suiteId}`);
    if (!card) return;

    const results = {};
    card.querySelectorAll('.test-case-row').forEach(row => {
      const tcId = row.dataset.tcId;
      results[tcId] = {
        status: row.querySelector('.status-dropdown').value || 'Not Executed',
        tester_note: row.querySelector('.tester-note').value.trim(),
        proof_files: JSON.parse(row.dataset.proofFiles || '[]')
      };
    });

    const suiteTitle = card.querySelector('.suite-header h5')?.textContent?.trim() || suiteId;
    const stageKey = Object.keys(TestDataRepository.stages).find(key =>
      TestDataRepository.stages[key].suites.some(s => s.id === suiteId)
    ) || 'unknown';

    const runData = {
      suite_id: suiteId,
      suite_name: suiteTitle,
      stage: stageKey,
      run_timestamp: new Date().toISOString(),
      tester: StorageService.getTesterName(),
      test_results: results
    };

    StorageService.saveRun(runData);
    DownloadService.downloadJSON(runData);
    NotificationService.show(`Suite "${suiteTitle}" saved successfully!`);
    ChartRenderer.updateAll();
    UIManager.updateProgressDashboard();
    UIManager.updateStageBadges();
  }

  /** @param {string} suiteId */
  static loadLastRun(suiteId) {
    const runs = StorageService.getRunsForSuite(suiteId);
    if (runs.length === 0) {
      NotificationService.show('No previous run found.', 'warning');
      return;
    }
    const last = runs[runs.length - 1];
    const card = document.getElementById(`suite-${suiteId}`);
    if (!card) return;

    card.querySelectorAll('.test-case-row').forEach(row => {
      const res = last.test_results[row.dataset.tcId];
      if (!res) return;
      row.querySelector('.status-dropdown').value = res.status || '';
      row.querySelector('.tester-note').value = res.tester_note || '';
      const pl = row.querySelector('.proof-list');
      pl.innerHTML = '';
      (res.proof_files || []).forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        pl.appendChild(li);
      });
      row.dataset.proofFiles = JSON.stringify(res.proof_files || []);
    });

    NotificationService.show(`Loaded run from ${new Date(last.run_timestamp).toLocaleString()}`);
  }
}

window.SuiteManager = SuiteManager;

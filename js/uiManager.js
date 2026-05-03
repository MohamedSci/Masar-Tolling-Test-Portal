/**
 * UIManager – Single Responsibility: navigation, modals, dashboard, and progress.
 */
class UIManager {
  static #STAGE_COLORS = {
    detect: 'primary',
    fuse: 'success',
    validate: 'warning',
    action: 'danger'
  };

  /** @param {'home'|'strategy'|'suites'} section */
  static showSection(section) {
    document.querySelectorAll('.stage-content').forEach(el => el.classList.remove('active'));

    const sectionMap = {
      home: 'home-content',
      strategy: 'strategy-content',
      suites: 'suites-content'
    };

    const target = document.getElementById(sectionMap[section]);
    if (target) {
      target.classList.add('active');
      target.focus();
    }

    // Update nav active state
    document.querySelectorAll('.navbar-nav .nav-link[data-section]').forEach(l => {
      l.classList.toggle('active', l.dataset.section === section);
      l.setAttribute('aria-current', l.dataset.section === section ? 'page' : 'false');
    });

    if (section === 'home') {
      this.updateProgressDashboard();
      this.updateStageBadges();
      ChartRenderer.updateAll();
    }
  }

  /** Renders the overall progress bar on the home dashboard */
  static updateProgressDashboard() {
    const dashboard = document.getElementById('progress-dashboard');
    if (!dashboard) return;

    const runs = StorageService.getRuns();
    if (runs.length === 0) {
      dashboard.innerHTML = '<div class="text-center text-muted">No test runs saved yet. Execute a test suite to see progress.</div>';
      return;
    }

    let total = 0, passed = 0, failed = 0;
    runs.forEach(run => {
      Object.values(run.test_results).forEach(r => {
        total++;
        if (r.status === 'Passed') passed++;
        else if (r.status === 'Failed') failed++;
      });
    });

    const pct = total ? Math.round((passed / total) * 100) : 0;
    const failPct = total ? Math.round((failed / total) * 100) : 0;

    dashboard.innerHTML = `
      <div class="mb-1 d-flex justify-content-between">
        <strong>Overall: ${passed}/${total} passed (${pct}%)</strong>
        <span class="text-danger">${failed} failed</span>
      </div>
      <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
        aria-label="Overall test pass rate ${pct}%">
        <div class="progress-bar bg-success" style="width:${pct}%"></div>
        <div class="progress-bar bg-danger" style="width:${failPct}%"></div>
      </div>`;
  }

  /** Renders per-stage progress badges on the home page */
  static updateStageBadges() {
    const container = document.getElementById('stage-badges');
    if (!container) return;

    const runs = StorageService.getRuns();
    const stages = TestDataRepository.stages;

    container.innerHTML = Object.entries(stages).map(([key, stage]) => {
      const totalCases = stage.suites.reduce((s, suite) => s + suite.testCases.length, 0);
      const stageRuns = runs.filter(r => r.stage === key);
      let executed = 0, passed = 0;
      stageRuns.forEach(run => {
        Object.values(run.test_results).forEach(r => {
          executed++;
          if (r.status === 'Passed') passed++;
        });
      });
      const pct = executed ? Math.round((passed / executed) * 100) : 0;
      const color = this.#STAGE_COLORS[key] || 'secondary';

      return `
        <div class="col-6 col-md-3">
          <div class="stage-badge-card">
            <div class="d-flex justify-content-between align-items-center">
              <span class="stage-name">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span class="badge bg-${color}">${totalCases} TCs</span>
            </div>
            <div class="stage-count">${executed} executed · ${passed} passed</div>
            <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"
              aria-label="${key} stage ${pct}% pass rate">
              <div class="progress-bar bg-${color}" style="width:${pct}%"></div>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  /** Opens the Run History modal */
  static showRunHistory() {
    const runs = StorageService.getRuns();
    const body = document.getElementById('run-history-body');

    if (runs.length === 0) {
      body.innerHTML = '<p class="text-muted">No runs saved yet.</p>';
    } else {
      const rows = runs.slice().reverse().map((run, i) => {
        const total = Object.keys(run.test_results).length;
        const passed = Object.values(run.test_results).filter(r => r.status === 'Passed').length;
        const failed = Object.values(run.test_results).filter(r => r.status === 'Failed').length;
        const origIdx = runs.length - 1 - i;
        return `<tr>
          <td>${run.suite_name}</td>
          <td><span class="badge bg-${this.#STAGE_COLORS[run.stage] || 'secondary'}">${run.stage}</span></td>
          <td>${new Date(run.run_timestamp).toLocaleString()}</td>
          <td>${run.tester || '—'}</td>
          <td>
            <span class="text-success fw-bold">${passed}</span> /
            <span class="text-danger">${failed}</span> /
            ${total}
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary"
              onclick="DownloadService.downloadJSON(StorageService.getRuns()[${origIdx}])"
              aria-label="Download JSON for run ${origIdx}">
              <i class="fas fa-download" aria-hidden="true"></i>
            </button>
          </td>
        </tr>`;
      }).join('');

      body.innerHTML = `
        <div class="table-responsive">
          <table class="table table-sm table-hover" aria-label="Saved test runs">
            <thead class="table-light">
              <tr>
                <th scope="col">Suite</th>
                <th scope="col">Stage</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Tester</th>
                <th scope="col">Pass / Fail / Total</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }

    new bootstrap.Modal(document.getElementById('runHistoryModal')).show();
  }

  /** Opens the Comparison modal */
  static showComparison() {
    const runs = StorageService.getRuns();
    const body = document.getElementById('comparison-body');

    if (runs.length < 2) {
      body.innerHTML = '<p class="text-muted">Need at least 2 saved runs to compare.</p>';
      new bootstrap.Modal(document.getElementById('comparisonModal')).show();
      return;
    }

    const options = runs.map((r, i) =>
      `<option value="${i}">${r.suite_name} – ${new Date(r.run_timestamp).toLocaleString()}</option>`
    ).join('');

    body.innerHTML = `
      <div class="row g-3 align-items-end">
        <div class="col-md-5">
          <label for="runASelect" class="form-label fw-semibold">Run A</label>
          <select id="runASelect" class="form-select" aria-label="Select Run A">${options}</select>
        </div>
        <div class="col-md-5">
          <label for="runBSelect" class="form-label fw-semibold">Run B</label>
          <select id="runBSelect" class="form-select" aria-label="Select Run B">
            ${runs.map((r, i) =>
              `<option value="${i}" ${i === 1 ? 'selected' : ''}>${r.suite_name} – ${new Date(r.run_timestamp).toLocaleString()}</option>`
            ).join('')}
          </select>
        </div>
        <div class="col-md-2">
          <button class="btn btn-primary w-100" onclick="ComparisonService.render()">Compare</button>
        </div>
      </div>
      <div id="comparisonResult" class="mt-3"></div>`;

    new bootstrap.Modal(document.getElementById('comparisonModal')).show();
  }

  /** Opens the Defect Report modal */
  static showDefectReport() {
    const runs = StorageService.getRuns();
    const failedMap = {};

    runs.forEach(run => {
      Object.entries(run.test_results).forEach(([id, res]) => {
        if (res.status === 'Failed') {
          if (!failedMap[id]) failedMap[id] = [];
          failedMap[id].push({
            suite: run.suite_name,
            stage: run.stage,
            timestamp: run.run_timestamp,
            note: res.tester_note,
            proofs: res.proof_files || []
          });
        }
      });
    });

    const body = document.getElementById('defect-body');
    const entries = Object.entries(failedMap);

    if (entries.length === 0) {
      body.innerHTML = '<p class="text-success"><i class="fas fa-check-circle me-2"></i>No failed cases found.</p>';
    } else {
      const rows = entries.map(([id, occs]) => `
        <tr>
          <td><strong>${id}</strong></td>
          <td>${occs.length}</td>
          <td>
            ${occs.map(o =>
              `<span class="badge bg-secondary me-1">${o.suite} (${new Date(o.timestamp).toLocaleDateString()})</span>`
            ).join('')}
          </td>
          <td>${occs.map(o => o.note).filter(Boolean).join('; ') || '—'}</td>
        </tr>`).join('');

      body.innerHTML = `
        <div class="table-responsive">
          <table class="table table-sm" aria-label="Defect report">
            <thead class="table-light">
              <tr>
                <th scope="col">TC ID</th>
                <th scope="col">Occurrences</th>
                <th scope="col">Runs</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>`;
    }

    new bootstrap.Modal(document.getElementById('defectModal')).show();
  }

  /** Proxy for defect CSV export (called from modal button) */
  static exportDefectCSV() {
    DownloadService.exportDefectCSV();
  }
}

window.UIManager = UIManager;

/**
 * DownloadService – Single Responsibility: file export (JSON, CSV).
 */
class DownloadService {
  /** @param {Object} data – run result object */
  static downloadJSON(data) {
    const ts = data.run_timestamp.replace(/[:.]/g, '-').slice(0, 19);
    this.#blob(
      JSON.stringify(data, null, 2),
      'application/json',
      `Suite_${data.suite_id}_Run_${ts}.json`
    );
  }

  /** Export all saved runs as a flat CSV */
  static exportAllCSV() {
    const runs = StorageService.getRuns();
    if (runs.length === 0) {
      NotificationService.show('No data to export.', 'warning');
      return;
    }
    const rows = [['Run Timestamp', 'Suite', 'Stage', 'Tester', 'TC ID', 'Status', 'Tester Notes', 'Proof Files']];
    runs.forEach(run => {
      Object.entries(run.test_results).forEach(([id, res]) => {
        rows.push([
          run.run_timestamp,
          run.suite_name,
          run.stage,
          run.tester || '',
          id,
          res.status,
          res.tester_note,
          (res.proof_files || []).join('; ')
        ]);
      });
    });
    this.#blob(this.#toCSV(rows), 'text/csv', 'all_test_runs.csv');
  }

  /** Export only failed test cases as CSV */
  static exportDefectCSV() {
    const runs = StorageService.getRuns();
    const rows = [['TC ID', 'Suite', 'Stage', 'Timestamp', 'Tester', 'Note', 'Proofs']];
    runs.forEach(run => {
      Object.entries(run.test_results).forEach(([id, res]) => {
        if (res.status === 'Failed') {
          rows.push([id, run.suite_name, run.stage, run.run_timestamp, run.tester || '', res.tester_note, (res.proof_files || []).join('; ')]);
        }
      });
    });
    if (rows.length === 1) {
      NotificationService.show('No defects to export.', 'warning');
      return;
    }
    this.#blob(this.#toCSV(rows), 'text/csv', 'defect_report.csv');
  }

  /** @param {string[][]} rows @returns {string} */
  static #toCSV(rows) {
    return rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  }

  /** @param {string} content @param {string} type @param {string} filename */
  static #blob(content, type, filename) {
    const blob = new Blob([content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }
}

window.DownloadService = DownloadService;

/**
 * ComparisonService – Single Responsibility: run comparison logic.
 */
class ComparisonService {
  /** Renders the comparison table inside #comparisonResult */
  static render() {
    const runs = StorageService.getRuns();
    const idxA = parseInt(document.getElementById('runASelect')?.value ?? '0', 10);
    const idxB = parseInt(document.getElementById('runBSelect')?.value ?? '1', 10);
    const runA = runs[idxA];
    const runB = runs[idxB];
    if (!runA || !runB) return;

    const tcs = [...new Set([
      ...Object.keys(runA.test_results),
      ...Object.keys(runB.test_results)
    ])].sort();

    const rows = tcs.map(id => {
      const sa = runA.test_results[id]?.status || 'N/A';
      const sb = runB.test_results[id]?.status || 'N/A';
      const na = runA.test_results[id]?.tester_note || '';
      const nb = runB.test_results[id]?.tester_note || '';
      const diffClass = sa !== sb ? 'diff-highlight' : '';
      return `<tr class="${diffClass}">
        <td><strong>${id}</strong></td>
        <td>${this.#statusBadge(sa)}</td>
        <td>${this.#statusBadge(sb)}</td>
        <td>${na}</td>
        <td>${nb}</td>
      </tr>`;
    }).join('');

    document.getElementById('comparisonResult').innerHTML = `
      <h6 class="mt-3">
        Comparing <em>${runA.suite_name}</em> (${new Date(runA.run_timestamp).toLocaleString()})
        vs <em>${runB.suite_name}</em> (${new Date(runB.run_timestamp).toLocaleString()})
      </h6>
      <div class="table-responsive">
        <table class="table table-bordered table-sm" aria-label="Run comparison">
          <thead class="table-light">
            <tr>
              <th scope="col">TC ID</th>
              <th scope="col">Status A</th>
              <th scope="col">Status B</th>
              <th scope="col">Notes A</th>
              <th scope="col">Notes B</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }

  /** @param {string} status @returns {string} */
  static #statusBadge(status) {
    const map = { Passed: 'success', Failed: 'danger', Blocked: 'warning', 'N/A': 'secondary', 'Not Executed': 'secondary' };
    const cls = map[status] || 'secondary';
    return `<span class="badge bg-${cls}">${status}</span>`;
  }
}

window.ComparisonService = ComparisonService;

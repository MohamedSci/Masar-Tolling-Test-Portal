/**
 * ChartRenderer – Single Responsibility: Chart.js rendering.
 * Manages two charts: overall doughnut and stage-wise bar.
 */
class ChartRenderer {
  static #overallChart = null;
  static #stageChart = null;

  static updateAll() {
    this.#updateOverall();
    this.#updateStage();
  }

  static #updateOverall() {
    const ctx = document.getElementById('overallChart')?.getContext('2d');
    if (!ctx) return;

    const { passed, failed, notExec } = this.#aggregateTotals();

    if (this.#overallChart) this.#overallChart.destroy();
    this.#overallChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Passed', 'Failed', 'Not Executed'],
        datasets: [{
          data: [passed, failed, notExec],
          backgroundColor: ['#198754', '#dc3545', '#6c757d'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Overall Test Status', font: { size: 14 } },
          legend: { position: 'bottom' }
        }
      }
    });
  }

  static #updateStage() {
    const ctx = document.getElementById('stageChart')?.getContext('2d');
    if (!ctx) return;

    const stageKeys = Object.keys(TestDataRepository.stages);
    const totals = Object.fromEntries(stageKeys.map(k => [k, 0]));
    const passedMap = Object.fromEntries(stageKeys.map(k => [k, 0]));

    StorageService.getRuns().forEach(run => {
      Object.values(run.test_results).forEach(r => {
        if (totals[run.stage] !== undefined) {
          totals[run.stage]++;
          if (r.status === 'Passed') passedMap[run.stage]++;
        }
      });
    });

    if (this.#stageChart) this.#stageChart.destroy();
    this.#stageChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: stageKeys.map(k => k.charAt(0).toUpperCase() + k.slice(1)),
        datasets: [
          { label: 'Total Executed', data: stageKeys.map(k => totals[k]), backgroundColor: '#0d6efd' },
          { label: 'Passed', data: stageKeys.map(k => passedMap[k]), backgroundColor: '#198754' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Stage-wise Progress', font: { size: 14 } },
          legend: { position: 'bottom' }
        },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }

  /** @returns {{ passed: number, failed: number, notExec: number }} */
  static #aggregateTotals() {
    let passed = 0, failed = 0, notExec = 0;
    StorageService.getRuns().forEach(run => {
      Object.values(run.test_results).forEach(r => {
        if (r.status === 'Passed') passed++;
        else if (r.status === 'Failed') failed++;
        else notExec++;
      });
    });
    return { passed, failed, notExec };
  }
}

window.ChartRenderer = ChartRenderer;

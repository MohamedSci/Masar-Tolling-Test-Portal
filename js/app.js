/**
 * App – Single Responsibility: application bootstrap and event wiring.
 * This is the only place that touches the DOM for event delegation.
 */
class App {
  static init() {
    // Theme
    ThemeManager.init();

    // Section navigation (Home, Test Strategy)
    document.querySelectorAll('[data-section]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        UIManager.showSection(el.dataset.section);
      });
    });

    // Stage navigation (Detect, Fuse, Validate, Action)
    document.querySelectorAll('[data-stage]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        SuiteManager.loadStage(el.dataset.stage);
      });
    });

    // Navbar action buttons
    document.getElementById('btn-run-history')
      .addEventListener('click', e => { e.preventDefault(); UIManager.showRunHistory(); });

    document.getElementById('btn-compare')
      .addEventListener('click', e => { e.preventDefault(); UIManager.showComparison(); });

    document.getElementById('btn-export-csv')
      .addEventListener('click', e => { e.preventDefault(); DownloadService.exportAllCSV(); });

    document.getElementById('btn-defects')
      .addEventListener('click', e => { e.preventDefault(); UIManager.showDefectReport(); });

    // Defect modal export button
    document.getElementById('btn-export-defect-csv')
      .addEventListener('click', () => DownloadService.exportDefectCSV());

    // Keyboard navigation: allow Enter/Space on nav links
    document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(el => {
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });

    // Initial render
    UIManager.showSection('home');

    // Prompt for tester name once
    if (!StorageService.getTesterName()) {
      const name = prompt('Enter your tester name (optional):');
      if (name && name.trim()) StorageService.setTesterName(name.trim());
    }
  }
}

document.addEventListener('DOMContentLoaded', () => App.init());

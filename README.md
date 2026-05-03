# Tolling Infrastructure Testing Portal

A professional web-based test management portal for the Multi-Tier Tolling Infrastructure system.

## Project Structure

```
/
  index.html          Entry point
  css/
    styles.css        All styles (CSS custom properties, dark mode, responsive)
  js/
    storage.js        localStorage persistence (StorageService)
    data.js           All test data – 200+ test cases (TestDataRepository)
    notification.js   Toast notifications (NotificationService)
    theme.js          Dark/light mode (ThemeManager)
    help.js           Help popup windows (HelpService)
    suiteManager.js   Suite rendering & interaction (SuiteManager)
    download.js       JSON & CSV export (DownloadService)
    charts.js         Chart.js rendering (ChartRenderer)
    comparison.js     Run comparison logic (ComparisonService)
    uiManager.js      Navigation, modals, dashboard (UIManager)
    app.js            App bootstrap & event wiring (App)
```

## Running Locally

Because the project uses multiple JS files loaded via `<script>` tags, you need a local HTTP server to avoid CORS issues:

```bash
# Option 1 – Node.js
npx serve .

# Option 2 – Python
python -m http.server 8080

# Option 3 – VS Code
# Install the "Live Server" extension, then right-click index.html → Open with Live Server
```

Then open `http://localhost:3000` (or whichever port is shown).

## Test Coverage

| Stage    | Suites | Test Cases |
|----------|--------|-----------|
| Detect   | 9      | 57        |
| Fuse     | 10     | 41        |
| Validate | 13     | 121       |
| Action   | 4      | 15        |
| **Total**| **36** | **234**   |

## Features

- Interactive test case checklist with Pass/Fail/Blocked/N/A status
- Proof file attachment per test case
- Save run results as JSON (auto-download)
- Load last run to resume where you left off
- Live search/filter across test cases
- Run history with per-run download
- Side-by-side run comparison with diff highlighting
- Defect report (all failed cases) with CSV export
- Full CSV export of all runs
- Stage progress badges on home dashboard
- Chart.js doughnut (overall) and bar (per-stage) charts
- Dark/light mode with persistence
- Print-friendly layout
- ARIA labels and keyboard navigation throughout

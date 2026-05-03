/**
 * HelpService – Single Responsibility: help popup windows.
 */
class HelpService {
  /** @param {string} suiteId */
  static open(suiteId) {
    const h = TestDataRepository.helpContent[suiteId] || {
      title: 'Help',
      steps: 'Refer to the test plan document.',
      testData: 'N/A',
      instructions: 'N/A',
      environment: 'Standard test environment'
    };

    const w = window.open('', '_blank', 'width=720,height=620,resizable=yes');
    if (!w) {
      NotificationService.show('Pop-up blocked. Please allow pop-ups for this site.', 'warning');
      return;
    }

    w.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.#escape(h.title)} – Help</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body { padding: 2rem; font-family: 'Segoe UI', system-ui, sans-serif; }
    h2 { color: #0b2b4e; }
    h5 { color: #1a4b6e; margin-top: 1.2rem; }
  </style>
</head>
<body>
  <h2>${this.#escape(h.title)}</h2>
  <hr>
  <h5>Steps to Execute</h5>
  <p>${this.#escape(h.steps)}</p>
  <h5>Test Data</h5>
  <p>${this.#escape(h.testData)}</p>
  <h5>Special Instructions</h5>
  <p>${this.#escape(h.instructions)}</p>
  <h5>Environment</h5>
  <p>${this.#escape(h.environment)}</p>
</body>
</html>`);
    w.document.close();
  }

  /** Escape HTML to prevent XSS in the popup */
  static #escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

window.HelpService = HelpService;

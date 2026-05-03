/**
 * StorageService – Single Responsibility: localStorage persistence.
 * All reads/writes to localStorage are centralised here.
 */
class StorageService {
  static #RUNS_KEY = 'testSuiteRuns';
  static #TESTER_KEY = 'testerName';
  static #DARK_KEY = 'darkMode';

  /** @returns {Array} All saved test runs */
  static getRuns() {
    try {
      return JSON.parse(localStorage.getItem(this.#RUNS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  /** @param {Object} run – A single run result object */
  static saveRun(run) {
    const runs = this.getRuns();
    runs.push(run);
    localStorage.setItem(this.#RUNS_KEY, JSON.stringify(runs));
  }

  /** @param {string} suiteId @returns {Array} Runs filtered by suite */
  static getRunsForSuite(suiteId) {
    return this.getRuns().filter(r => r.suite_id === suiteId);
  }

  /** @returns {string} Stored tester name or empty string */
  static getTesterName() {
    return localStorage.getItem(this.#TESTER_KEY) || '';
  }

  /** @param {string} name */
  static setTesterName(name) {
    localStorage.setItem(this.#TESTER_KEY, name);
  }

  /** @returns {boolean} */
  static isDarkMode() {
    return localStorage.getItem(this.#DARK_KEY) === 'true';
  }

  /** @param {boolean} enabled */
  static setDarkMode(enabled) {
    localStorage.setItem(this.#DARK_KEY, String(enabled));
  }
}

window.StorageService = StorageService;

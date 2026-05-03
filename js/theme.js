/**
 * ThemeManager – Single Responsibility: dark/light mode toggle.
 */
class ThemeManager {
  static init() {
    if (StorageService.isDarkMode()) {
      document.body.classList.add('dark-mode');
      this.#setIcon(true);
    }
    document.getElementById('themeToggle').addEventListener('click', () => this.toggle());
  }

  static toggle() {
    const enabled = document.body.classList.toggle('dark-mode');
    this.#setIcon(enabled);
    StorageService.setDarkMode(enabled);
  }

  static #setIcon(darkEnabled) {
    const btn = document.getElementById('themeToggle');
    btn.innerHTML = darkEnabled
      ? '<i class="fas fa-sun" aria-hidden="true"></i>'
      : '<i class="fas fa-moon" aria-hidden="true"></i>';
    btn.setAttribute('aria-label', darkEnabled ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

window.ThemeManager = ThemeManager;

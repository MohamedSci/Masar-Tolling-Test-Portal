/**
 * NotificationService – Single Responsibility: toast notifications.
 */
class NotificationService {
  /**
   * @param {string} message
   * @param {'success'|'danger'|'warning'|'info'} [type='success']
   */
  static show(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const el = document.createElement('div');
    el.className = `toast align-items-center text-bg-${type} border-0`;
    el.setAttribute('role', 'alert');
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast" aria-label="Close"></button>
      </div>`;
    container.appendChild(el);
    const toast = new bootstrap.Toast(el, { delay: 3000 });
    toast.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  }
}

window.NotificationService = NotificationService;

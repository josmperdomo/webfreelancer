/**
 * DEVELOPER FREELANCER - JOSÉ MANUEL PERDOMO
 * Main Interactive Engine (2026 Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initProjectFilters();
  initContactForm();
  initStatsCounter();
  initBackToTop();
});

/**
 * 1. THEME SWITCHER (Dark / Light Mode)
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  if (theme === 'dark') {
    // Show Sun icon for toggling to light
    themeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>`;
    themeBtn.setAttribute('title', 'Cambiar a modo claro');
  } else {
    // Show Moon icon for toggling to dark
    themeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>`;
    themeBtn.setAttribute('title', 'Cambiar a modo oscuro');
  }
}

/**
 * 2. MOBILE NAVIGATION MENU
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !menuBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * 3. CLIENTS / PROJECTS FILTER
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 4. INTERACTIVE CONTACT FORM
 */
function initContactForm() {
  const form = document.getElementById('contact-form') || document.querySelector('.formulario');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('input[type="text"][placeholder*="nombre" i]') || form.querySelector('#name');
    const emailInput = form.querySelector('input[type="email"]') || form.querySelector('input[placeholder*="email" i]');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');

    if (!nameInput || !nameInput.value.trim()) {
      showToast('Por favor, ingresa tu nombre.', 'error');
      nameInput && nameInput.focus();
      return;
    }

    if (!emailInput || !emailInput.value.trim() || !validateEmail(emailInput.value)) {
      showToast('Por favor, ingresa un correo electrónico válido.', 'error');
      emailInput && emailInput.focus();
      return;
    }

    // Simulate sending with loading state
    const originalText = submitBtn.value || submitBtn.textContent;
    if (submitBtn.tagName === 'INPUT') {
      submitBtn.value = 'Enviando...';
    } else {
      submitBtn.textContent = 'Enviando...';
    }
    submitBtn.disabled = true;

    setTimeout(() => {
      showToast(`¡Gracias ${nameInput.value}! Tu mensaje fue enviado con éxito. Te responderé a la brevedad.`, 'success');
      form.reset();
      if (submitBtn.tagName === 'INPUT') {
        submitBtn.value = originalText;
      } else {
        submitBtn.textContent = originalText;
      }
      submitBtn.disabled = false;
    }, 1200);
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ` : `
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `;

  toast.innerHTML = `${icon} <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/**
 * 5. STATS COUNTER ANIMATION
 */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.metric-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 1500;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = Math.max(1, Math.floor(target / steps));

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${current}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

/**
 * 6. BACK TO TOP
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

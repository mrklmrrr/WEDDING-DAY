(function () {
  'use strict';

  const cover = document.getElementById('cover');
  const mainContent = document.getElementById('main-content');
  const openBtn = document.getElementById('open-invitation');

  function openInvitation() {
    if (!cover || !mainContent) return;

    document.body.classList.remove('cover-locked');
    document.body.classList.add('is-open');

    if (openBtn) {
      openBtn.setAttribute('aria-expanded', 'true');
    }

    cover.classList.add('hidden');
    mainContent.classList.add('visible');
    mainContent.setAttribute('aria-hidden', 'false');

    window.setTimeout(function () {
      cover.style.display = 'none';
      window.scrollTo(0, 0);
    }, 700);
  }

  window.openInvitation = openInvitation;

  if (openBtn) {
    openBtn.addEventListener('click', openInvitation);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.body.classList.contains('cover-locked')) {
      openInvitation();
    }
  });

  if (location.hash === '#open') {
    openInvitation();
  }

  try {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.12 }
      );

      document.querySelectorAll('section, .couple-avatar').forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('section, .couple-avatar').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  } catch (err) {
    document.querySelectorAll('section, .couple-avatar').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  function updateCountdown() {
    const weddingDate = new Date('2026-05-01T15:00:00');
    const now = new Date();
    let diff = weddingDate - now;
    const ids = ['days', 'hours', 'minutes', 'seconds'];

    if (diff <= 0) {
      ids.forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    const seconds = Math.floor(diff / 1000);

    const values = { days: days, hours: hours, minutes: minutes, seconds: seconds };
    ids.forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.textContent = String(values[id]).padStart(2, '0');
    });
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-dresscode');
    const photosWrapper = document.getElementById('dresscode-photos');

    if (toggleBtn && photosWrapper) {
      toggleBtn.addEventListener('click', function () {
        const isOpen = photosWrapper.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        toggleBtn.textContent = isOpen ? 'Скрыть' : 'Примеры';
      });
    }
  });
})();

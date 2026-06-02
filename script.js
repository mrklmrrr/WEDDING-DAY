const cover = document.getElementById('cover');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-invitation');

function openInvitation() {
  if (!cover || !mainContent || !openBtn) return;

  openBtn.setAttribute('aria-expanded', 'true');
  cover.classList.add('hidden');
  document.body.classList.remove('cover-locked');

  mainContent.removeAttribute('hidden');

  setTimeout(() => {
    mainContent.classList.add('visible');
    cover.style.display = 'none';
    window.scrollTo(0, 0);
  }, 800);
}

if (openBtn) {
  openBtn.addEventListener('click', openInvitation);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('section, .couple-avatar').forEach((el) => observer.observe(el));

function updateCountdown() {
  const weddingDate = new Date('2026-05-01T15:00:00');
  const now = new Date();
  let diff = weddingDate - now;

  const ids = ['days', 'hours', 'minutes', 'seconds'];

  if (diff <= 0) {
    ids.forEach((id) => {
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

  const values = { days, hours, minutes, seconds };
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(values[id]).padStart(2, '0');
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-dresscode');
  const photosWrapper = document.getElementById('dresscode-photos');

  if (toggleBtn && photosWrapper) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = photosWrapper.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.textContent = isOpen ? 'Скрыть' : 'Примеры';
    });
  }
});

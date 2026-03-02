// Открытие приглашения
document.getElementById('open-invitation').addEventListener('click', () => {
  document.getElementById('cover').classList.add('hidden');
  setTimeout(() => {
    document.getElementById('main-content').classList.add('visible');
  }, 800);
});

// Плавное появление секций и аватарки
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('section, .couple-avatar').forEach(el => observer.observe(el));

// Обратный отсчёт
function updateCountdown() {
  const weddingDate = new Date('2026-05-01T15:00:00');
  const now = new Date();
  let diff = weddingDate - now;

  if (diff <= 0) {
    ['days','hours','minutes','seconds'].forEach(id => {
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

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Дресс-код — показать/скрыть фото
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-dresscode');
  const photosWrapper = document.getElementById('dresscode-photos');

  if (toggleBtn && photosWrapper) {
    toggleBtn.addEventListener('click', () => {
      photosWrapper.classList.toggle('active');
      toggleBtn.textContent = photosWrapper.classList.contains('active')
        ? 'Скрыть примеры дресс-кода'
        : 'Посмотреть примеры дресс-кода';
    });
  }
});
document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const animatedSections = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.12 });
  animatedSections.forEach((section) => observer.observe(section));
} else {
  animatedSections.forEach((section) => section.classList.add('is-visible'));
}

let progressFrame = 0;

function updatePageProgress() {
  progressFrame = 0;
  const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / scrollRange));
  document.documentElement.style.setProperty('--page-scroll', String(progress));
}

function queueProgressUpdate() {
  if (!progressFrame) progressFrame = window.requestAnimationFrame(updatePageProgress);
}

window.addEventListener('scroll', queueProgressUpdate, { passive: true });
window.addEventListener('resize', queueProgressUpdate, { passive: true });
window.addEventListener('load', queueProgressUpdate, { once: true });
updatePageProgress();

// ─── NAVBAR scroll behaviour ─────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── BURGER MENU ─────────────────────────────────
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
  });
});

// ─── REVEAL ON SCROLL ────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 0.06}s`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── MENU TABS ───────────────────────────────────
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.menu-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.querySelector(`[data-panel="${target}"]`).classList.add('active');
  });
});

// ─── GUEST COUNTER ───────────────────────────────
let guestCount = 2;
const guestDisplay = document.getElementById('guest-count');
const guestInput = document.getElementById('guests');

document.getElementById('minus').addEventListener('click', () => {
  if (guestCount > 1) {
    guestCount--;
    guestDisplay.textContent = guestCount;
    guestInput.value = guestCount;
  }
});
document.getElementById('plus').addEventListener('click', () => {
  if (guestCount < 20) {
    guestCount++;
    guestDisplay.textContent = guestCount;
    guestInput.value = guestCount;
  }
});

// ─── RESERVATION FORM ────────────────────────────
const form = document.getElementById('reserve-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  form.style.opacity = '0';
  form.style.transition = 'opacity 0.3s ease';
  setTimeout(() => {
    form.style.display = 'none';
    successMsg.classList.add('visible');
    successMsg.style.opacity = '0';
    successMsg.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => { successMsg.style.opacity = '1'; });
  }, 300);
});

// ─── SET MIN DATE TO TODAY ────────────────────────
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// ─── SMOOTH ACTIVE NAV LINK ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

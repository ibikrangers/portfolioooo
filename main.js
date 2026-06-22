// ─── CURSOR GLOW ───────────────────────────────────
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});

// ─── NAVBAR SCROLL EFFECT ──────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      document.querySelector('.nav-links')?.classList.remove('open');
      document.querySelector('.btn-nav')?.classList.remove('open');
    }
  });
});

// ─── MOBILE NAV TOGGLE ─────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
const btnNav    = document.querySelector('.btn-nav');
navToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  btnNav?.classList.toggle('open');
});

// Mobile nav styles injected dynamically
const mobileStyle = document.createElement('style');
mobileStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links.open, .btn-nav.open {
      display: flex !important;
    }
    .nav-links.open {
      position: fixed; top: 64px; left: 0; right: 0;
      flex-direction: column; gap: 0;
      background: rgba(8,11,18,0.97);
      backdrop-filter: blur(20px);
      padding: 1rem 0 2rem;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .nav-links.open li a {
      display: block; padding: 1rem 2rem; font-size: 1.1rem;
    }
    .btn-nav.open {
      position: fixed; bottom: 2rem; left: 50%;
      transform: translateX(-50%); z-index: 200;
    }
  }
`;
document.head.appendChild(mobileStyle);

// ─── SCROLL REVEAL ─────────────────────────────────
const revealElements = document.querySelectorAll(
  '.section-header, .about-card, .about-text, .project-card, .skill-category, .testimonial-card, .contact-inner'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling elements
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ─── HERO TITLE STAGGER ────────────────────────────
window.addEventListener('load', () => {
  document.querySelector('.hero-badge')?.classList.add('visible');
  const heroEl = document.querySelector('.hero-content');
  if (heroEl) {
    heroEl.style.animation = 'fadeUp .8s ease forwards';
  }
});

// ─── COUNTER ANIMATION ─────────────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const dur = 1800;
  const step = 16;
  const inc = target / (dur / step);
  const timer = setInterval(() => {
    start = Math.min(start + inc, target);
    el.textContent = (Number.isInteger(target) ? Math.floor(start) : start.toFixed(0)) + suffix;
    if (start >= target) clearInterval(timer);
  }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const stats = entry.target.querySelectorAll('.stat-num');
      stats.forEach(el => {
        const raw = el.textContent.replace(/[^0-9.]/g, '');
        const suffix = el.textContent.replace(/[0-9.]/g, '');
        animateCounter(el, parseFloat(raw), suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ─── CONTACT FORM SUBMIT ───────────────────────────
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.innerHTML = '✓ Message Sent! I\'ll be in touch soon.';
  btn.style.background = 'linear-gradient(135deg, #059669, #34d399)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    contactForm.reset();
  }, 4000);
});

// ─── ACTIVE NAV LINK HIGHLIGHT ─────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = '#a78bfa';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => activeObserver.observe(s));

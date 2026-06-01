/* Extracted JS from index.html */

/* ═══════════════════════════════════════
   CURSOR
═══════════════════════════════════════ */
const cursor     = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let mx = 0, my = 0, bx = 0, by = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animBlur() {
  bx += (mx - bx) * .12;
  by += (my - by) * .12;
  cursorBlur.style.left = bx + 'px';
  cursorBlur.style.top  = by + 'px';
  requestAnimationFrame(animBlur);
})();

/* ═══════════════════════════════════════
   NAV SCROLL
═══════════════════════════════════════ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(6,10,14,.97)'
    : 'rgba(6,10,14,.82)';
});

/* ═══════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════ */
const toggle     = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
toggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
window.closeMobile = () => mobileMenu.classList.remove('open');

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ═══════════════════════════════════════
   ACTIVE NAV LINK
═══════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');
const activeObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + id ? 'var(--snow)' : '';
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => activeObs.observe(s));

/* ═══════════════════════════════════════
   TERMINAL ANIMATION
═══════════════════════════════════════ */
const TERM_LINES = [
  { type: 'cmd',     text: 'whoami' },
  { type: 'out',     text: 'erwan-davydoff', cls: 'green' },
  { type: 'br' },
  { type: 'cmd',     text: 'nmap -sV 192.168.10.1' },
  { type: 'out',     text: 'Starting Nmap 7.94...' },
  { type: 'out',     text: '22/tcp   open  ssh    OpenSSH 9.3',  cls: 'green' },
  { type: 'out',     text: '80/tcp   open  http   nginx 1.25',   cls: 'green' },
  { type: 'out',     text: '443/tcp  open  https  (TLS 1.3)',    cls: 'green' },
  { type: 'out',     text: '8443/tcp open  FortiGate HTTPS',     cls: 'blue' },
  { type: 'br' },
  { type: 'cmd',     text: 'python3 forti_migrate.py --dry-run' },
  { type: 'out',     text: '[*] Connecting to FortiManager API...' },
  { type: 'out',     text: '[*] Auth OK — session token received', cls: 'blue' },
  { type: 'out',     text: '[+] 847 rules exported successfully',  cls: 'green' },
  { type: 'out',     text: '[+] 0 errors — migration ready.',      cls: 'green' },
  { type: 'br' },
  { type: 'comment', text: '# Bac Pro CIEL · Stage Réseau/Sécu' },
  { type: 'comment', text: '# VINCI ÉNERGIES · Île-de-France' },
  { type: 'cursor' },
];

const termOut = document.getElementById('term-output');
let tIdx = 0;

function typeTermLine() {
  if (tIdx >= TERM_LINES.length || !termOut) return;
  const line = TERM_LINES[tIdx++];
  const el = document.createElement('div');

  if (line.type === 'cmd') {
    el.className = 'tl';
    el.innerHTML = `<span class="tp">❯</span><span class="tc">${line.text}</span>`;
  } else if (line.type === 'out') {
    el.className = 'to' + (line.cls ? ' ' + line.cls : '');
    el.textContent = line.text;
  } else if (line.type === 'comment') {
    el.className = 'to';
    el.style.color = 'var(--fog)';
    el.style.fontStyle = 'italic';
    el.textContent = line.text;
  } else if (line.type === 'br') {
    el.style.height = '6px';
  } else if (line.type === 'cursor') {
    el.className = 'tl';
    el.innerHTML = `<span class="tp">❯</span><span class="cur"></span>`;
    termOut.appendChild(el);
    return;
  }

  termOut.appendChild(el);
  termOut.scrollTop = termOut.scrollHeight;
  const delay = line.type === 'cmd' ? 480 : line.type === 'br' ? 140 : 95;
  setTimeout(typeTermLine, delay);
}
setTimeout(typeTermLine, 900);

/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ═══════════════════════════════════════
   PROJECT ITEMS STAGGER
═══════════════════════════════════════ */
const projItems = document.querySelectorAll('.project-item');
const projObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 70) + 'ms';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
    }
  });
}, { threshold: 0.04 });
projItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease, background .2s, padding .2s';
  projObs.observe(el);
});

/* ═══════════════════════════════════════
   SKILL PILL GLOW EFFECT
═══════════════════════════════════════ */
document.querySelectorAll('.logo-pill').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
  });
});

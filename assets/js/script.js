/* Pristine Headlight Heroes — Interactions */
(function () {

  /* ── Nav: sticky theme & scroll ── */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  const setNavTheme = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
    let theme = 'dark';
    document.querySelectorAll('[data-nav-theme]').forEach(s => {
      const r = s.getBoundingClientRect();
      if (r.top <= 80 && r.bottom > 80) theme = s.dataset.navTheme;
    });
    nav.classList.toggle('is-dark', theme === 'dark');
    nav.classList.toggle('is-light', theme === 'light');
    const logo = nav.querySelector('.nav-logo img');
    if (logo) logo.src = theme === 'dark' ? 'assets/images/logo-white.png' : 'assets/images/logo-dark.png';
  };
  setNavTheme();
  window.addEventListener('scroll', setNavTheme, { passive: true });

  /* ── Mobile nav toggle ── */
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  /* ── Before/After comparison sliders ── */
  document.querySelectorAll('.compare').forEach(cmp => {
    const after = cmp.querySelector('.after-wrap');
    const handle = cmp.querySelector('.handle');
    if (!after || !handle) return;
    let dragging = false;

    const setPos = (x) => {
      const rect = cmp.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(3, Math.min(97, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    };

    cmp.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); });
    cmp.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
    window.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('mouseup', () => { dragging = false; });
    window.addEventListener('touchend', () => { dragging = false; });

    /* Auto-demo on hero slider */
    if (cmp.dataset.demo === '1') {
      let t = 0, raf;
      const loop = () => {
        t += 0.012;
        const pct = 50 + Math.sin(t) * 22;
        after.style.clipPath = `inset(0 0 0 ${pct}%)`;
        handle.style.left = pct + '%';
        raf = requestAnimationFrame(loop);
      };
      loop();
      ['mousedown', 'touchstart'].forEach(ev =>
        cmp.addEventListener(ev, () => cancelAnimationFrame(raf), { once: true })
      );
    }
  });

  /* ── Hero mouse spotlight ── */
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    const spotlight = document.createElement('div');
    spotlight.className = 'mouse-light';
    heroEl.appendChild(spotlight);
    heroEl.addEventListener('mousemove', e => {
      const r = heroEl.getBoundingClientRect();
      spotlight.style.left = (e.clientX - r.left) + 'px';
      spotlight.style.top = (e.clientY - r.top) + 'px';
    });

    /* Parallax on showcase wrapper */
    const wrapper = heroEl.querySelector('.compare-wrapper');
    if (wrapper) {
      heroEl.addEventListener('mousemove', e => {
        const r = heroEl.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        wrapper.style.transform = `perspective(1800px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg) scale(1.02)`;
      });
      heroEl.addEventListener('mouseleave', () => { wrapper.style.transform = ''; });
    }
  }

  /* ── Magnetic buttons ── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 8;
      const y = (e.clientY - rect.top - rect.height / 2) / 8;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── Hero intro animation ── */
  window.addEventListener('load', () => {
    document.querySelectorAll(
      '.hero-logo,.hero-badge,h1,.hero p,.hero-buttons,.hero-features,.hero-stats'
    ).forEach((el, i) => {
      el.animate(
        [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 650, delay: i * 100, fill: 'forwards', easing: 'cubic-bezier(.22,.61,.36,1)' }
      );
    });
  });

  /* ── Fade-up on scroll ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  /* ── Dropzone ── */
  const dz = document.querySelector('.dropzone');
  if (dz) {
    const input = document.getElementById('photo-input');
    const previews = document.querySelector('.previews');
    const progressBar = document.querySelector('.progress span');

    const onFiles = files => {
      if (!files || !files.length) return;
      previews.innerHTML = '';
      progressBar.style.width = '0%';
      [...files].slice(0, 8).forEach(f => {
        if (!f.type.startsWith('image/')) return;
        const div = document.createElement('div');
        div.className = 'thumb';
        div.innerHTML = `<img src="${URL.createObjectURL(f)}" alt="preview">`;
        previews.appendChild(div);
      });
      let p = 0;
      const t = setInterval(() => {
        p += 7; progressBar.style.width = Math.min(p, 100) + '%';
        if (p >= 100) clearInterval(t);
      }, 80);
    };

    dz.addEventListener('click', () => input.click());
    input.addEventListener('change', e => onFiles(e.target.files));
    ['dragover', 'dragenter'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('drag'); }));
    ['dragleave', 'drop'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove('drag'); }));
    dz.addEventListener('drop', e => onFiles(e.dataTransfer.files));
  }

  /* ── Form submit feedback ── */
  document.querySelectorAll('form[data-fake]').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Sent — we\'ll be in touch';
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; f.reset(); }, 2400);
      }, 900);
    });
  });

  /* ── Footer year ── */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ── Book Now label on small mobile ── */
  const bookBtn = document.querySelector('.nav-right .btn');
  if (window.innerWidth <= 640 && bookBtn) bookBtn.textContent = 'Book Now';

})();

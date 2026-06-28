/* Pristine Headlight Heroes — Interactions */
(function(){
  // Sticky nav theme
  const nav = document.querySelector('.nav');
  const setNavTheme = () => {
    if (!nav) return;
    const scrolled = window.scrollY > 40;
    nav.classList.toggle('scrolled', scrolled);
    // Determine which section is under the nav to switch theme
    const sections = document.querySelectorAll('[data-nav-theme]');
    let theme = 'dark';
    sections.forEach(s => {
      const r = s.getBoundingClientRect();
      if (r.top <= 80 && r.bottom > 80) theme = s.dataset.navTheme;
    });
    nav.classList.toggle('is-dark', theme === 'dark');
    nav.classList.toggle('is-dard', theme === 'dark');
    // swap logo
    const logo = nav.querySelector('.nav-logo img');
    if (logo) logo.src = theme === 'dark' ? 'assets/images/logo-white.png' : 'assets/images/logo-white.png';
  };
  setNavTheme();
  window.addEventListener('scroll', setNavTheme, {passive:true});

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links){
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });
  }

  // Before/After comparison sliders
  document.querySelectorAll('.compare').forEach(cmp => {
    const after = cmp.querySelector('.after-wrap');
    const handle = cmp.querySelector('.handle');
    let dragging = false;
    const setPos = (x) => {
      const rect = cmp.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      after.style.clipPath = `inset(0 0 0 ${pct}%)`;
      handle.style.left = pct + '%';
    };
    const start = e => { dragging = true; cmp.classList.add('drag'); };
    const move = e => { if (!dragging) return; const x = (e.touches ? e.touches[0].clientX : e.clientX); setPos(x); };
    const end = () => { dragging = false; cmp.classList.remove('drag'); };
    cmp.addEventListener('mousedown', e => { start(e); setPos(e.clientX); });
    cmp.addEventListener('touchstart', e => { start(e); setPos(e.touches[0].clientX); }, {passive:true});
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, {passive:true});
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);
    // gentle auto-demo on the hero one
    if (cmp.dataset.demo === '1'){
      let t=0, raf;
      const loop = () => {
        t += 0.012;
        const pct = 50 + Math.sin(t) * 22;
        after.style.clipPath = `inset(0 0 0 ${pct}%)`;
        handle.style.left = pct + '%';
        raf = requestAnimationFrame(loop);
      };
      loop();
      ['mousedown','touchstart'].forEach(ev => cmp.addEventListener(ev, () => cancelAnimationFrame(raf), {once:true}));
    }
  });

  // Hero parallax
  const showcase = document.querySelector('.hero .showcase');
  if (showcase){
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      showcase.style.transform=`

perspective(1800px)

rotateX(${-y*6}deg)

rotateY(${x*8}deg)

translateZ(0)

scale(1.02)

`;
    });
    hero.addEventListener('mouseleave', () => showcase.style.transform = '');
  }

  // Fade-up on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }});
  }, {threshold: 0.12});
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // Dropzone
  const dz = document.querySelector('.dropzone');
  if (dz){
    const input = document.getElementById('photo-input');
    const previews = document.querySelector('.previews');
    const progress = document.querySelector('.progress span');
    const onFiles = files => {
      if (!files || !files.length) return;
      previews.innerHTML = '';
      progress.style.width = '0%';
      [...files].slice(0,8).forEach(f => {
        if (!f.type.startsWith('image/')) return;
        const url = URL.createObjectURL(f);
        const div = document.createElement('div');
        div.className = 'thumb';
        div.innerHTML = `<img src="${url}" alt="upload preview">`;
        previews.appendChild(div);
      });
      // simulate progress
      let p = 0; const t = setInterval(() => { p += 7; progress.style.width = Math.min(p,100)+'%'; if (p>=100) clearInterval(t); }, 80);
    };
    dz.addEventListener('click', () => input.click());
    input.addEventListener('change', e => onFiles(e.target.files));
    ['dragover','dragenter'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('drag'); }));
    ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove('drag'); }));
    dz.addEventListener('drop', e => onFiles(e.dataTransfer.files));
  }

  // Form submit feedback
  document.querySelectorAll('form[data-fake]').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending…'; btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Sent — we’ll be in touch';
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; f.reset(); }, 2400);
      }, 900);
    });
  });

  // Year
  const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
})();


////////////////////////////////////////////////////////////////////



/* =========================================
   Magnetic Buttons
========================================= */

document.querySelectorAll('.btn').forEach(btn=>{

btn.addEventListener('mousemove',(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const moveX=(x-rect.width/2)/8;

const moveY=(y-rect.height/2)/8;

btn.style.transform=`translate(${moveX}px,${moveY}px)`;

});

btn.addEventListener('mouseleave',()=>{

btn.style.transform='translate(0,0)';

});

});

/* =========================================
   Mouse Spotlight
========================================= */

const hero=document.querySelector('.hero');

const spotlight=document.createElement("div");

spotlight.className="mouse-light";

hero.appendChild(spotlight);

hero.addEventListener("mousemove",(e)=>{

const rect=hero.getBoundingClientRect();

spotlight.style.left=(e.clientX-rect.left)+"px";

spotlight.style.top=(e.clientY-rect.top)+"px";

});


/* =========================================
 Hero Intro
========================================= */

window.addEventListener("load",()=>{

document.querySelectorAll(

'.hero-logo,.hero-badge,h1,p,.hero-buttons,.hero-features,.hero-stats'

).forEach((el,i)=>{

el.animate([

{

opacity:0,

transform:'translateY(35px)'

},

{

opacity:1,

transform:'translateY(0)'

}

],{

duration:700,

delay:i*120,

fill:'forwards',

easing:'cubic-bezier(.22,.61,.36,1)'

});

});

});



window.addEventListener("scroll",()=>{

const nav=document.querySelector(".nav");

if(window.scrollY>80){

nav.style.backdropFilter="blur(22px)";

nav.style.background="rgba(5,5,5,.82)";

}else{

nav.style.background="rgba(5,5,5,.45)";

}

});



// Buttont

const bookBtn = document.querySelector('.nav-right .btn');

if (window.innerWidth <= 768 && bookBtn) {
    bookBtn.textContent = "Book Now";
}
/* Alt-30 motion layer. Quiet by design: everything pauses off-screen and
   switches off for people who have asked their system for reduced motion. */
(function(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav shadow once the page has scrolled */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* Hero chart draws itself on arrival, and drifts gently with scroll */
  const hv = document.querySelector('.hero-visual');
  if (hv) {
    requestAnimationFrame(() => requestAnimationFrame(() => hv.classList.add('drawn')));
    if (!reduced) {
      const svg = hv.querySelector('svg');
      window.addEventListener('scroll', () => {
        const y = Math.min(window.scrollY, 600);
        svg.style.transform = 'translateY(' + (y * 0.12) + 'px)';
        svg.style.opacity = String(Math.max(0, 1 - y / 700));
      }, {passive:true});
    }
  }

  /* Ambient chart fields: faint line series drifting behind a section */
  function ambient(canvas) {
    const dark = canvas.dataset.tone === 'dark';
    const ctx = canvas.getContext('2d');
    const N = 5, seeds = [];
    for (let i = 0; i < N; i++) seeds.push({
      a: 0.35 + Math.random() * 0.4, f1: 0.9 + Math.random() * 0.8, f2: 2.1 + Math.random() * 1.6,
      p1: Math.random() * 6.28, p2: Math.random() * 6.28, y: 0.25 + (i / (N - 1)) * 0.55, speed: 0.06 + Math.random() * 0.05
    });
    let w = 0, h = 0, dpr = 1, running = false, raf = 0, t0 = performance.now();
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw(now) {
      if (!running) return;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      /* soft edges so the field fades into the section */
      const fade = ctx.createLinearGradient(0, 0, 0, h);
      fade.addColorStop(0, 'rgba(0,0,0,0)'); fade.addColorStop(0.2, 'rgba(0,0,0,1)');
      fade.addColorStop(0.8, 'rgba(0,0,0,1)'); fade.addColorStop(1, 'rgba(0,0,0,0)');
      const base = dark ? '255,255,255' : '29,29,31';
      /* gridlines */
      ctx.strokeStyle = 'rgba(' + base + ',' + (dark ? 0.05 : 0.045) + ')'; ctx.lineWidth = 1;
      for (let g = 1; g < 5; g++) { const y = h * g / 5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      /* lines */
      const step = Math.max(6, Math.round(w / 140));
      seeds.forEach((s, i) => {
        const accent = i === 2;
        ctx.strokeStyle = accent ? 'rgba(0,113,227,' + (dark ? 0.22 : 0.16) + ')' : 'rgba(' + base + ',' + (dark ? 0.09 : 0.07) + ')';
        ctx.lineWidth = accent ? 1.6 : 1.2;
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const u = x / w, tt = t * s.speed;
          const y = h * s.y + h * 0.16 * s.a * (Math.sin(u * 6.28 * s.f1 + tt + s.p1) * 0.6 + Math.sin(u * 6.28 * s.f2 - tt * 1.3 + s.p2) * 0.4) - u * h * 0.08 * s.a;
          x === -step ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.globalCompositeOperation = 'destination-in'; ctx.fillStyle = fade; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(draw);
    }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && !running) { running = true; size(); canvas.classList.add('on'); raf = requestAnimationFrame(draw); }
      else if (!e.isIntersecting && running) { running = false; cancelAnimationFrame(raf); }
    }), {threshold: 0.02});
    io.observe(canvas);
    window.addEventListener('resize', () => { if (running) size(); }, {passive:true});
  }
  if (!reduced) document.querySelectorAll('canvas.ambient').forEach(ambient);

  /* Staggered reveals for grids, plus count-up for stats */
  const ease = x => 1 - Math.pow(1 - x, 3);
  function countUp(el) {
    const m = el.textContent.trim().match(/^(\d[\d,]*)(\+?)$/); if (!m) return;
    const target = parseInt(m[1].replace(/,/g, ''), 10), suffix = m[2], grouped = m[1].includes(',');
    const fmt = n => grouped ? n.toLocaleString('en-US') : String(n);
    const start = target > 100 ? target - 60 : 0, dur = 1400, t0 = performance.now();
    (function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(Math.round(start + (target - start) * ease(p))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  const groups = document.querySelectorAll('.grid.rv, .features.rv, .stats.rv');
  groups.forEach(g => { g.classList.remove('rv'); g.classList.add('stagger'); });
  const gio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on'); gio.unobserve(e.target);
    if (!reduced) e.target.querySelectorAll('.stat-val').forEach(countUp);
  }), {threshold: 0.15, rootMargin: '0px 0px -40px 0px'});
  groups.forEach(g => gio.observe(g));
})();

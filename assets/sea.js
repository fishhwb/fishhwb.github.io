// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Everything living in the water: fish by depth, the dark bit with the
// anglerfish, the treasure on the sea floor, secret codes and the sound.
(function(){
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var talk = function(text){ if (window.cubez) window.cubez.say(text); };

  /* ---------- who lives where ---------- */

  var FISH = '<svg viewBox="0 0 48 28"><path d="M10 14c6-9 20-10 28 0-8 10-22 9-28 0z" fill="#ffcf3f" stroke="#161413" stroke-width="2" stroke-linejoin="round"/><path d="M10 14 2 6v16z" fill="#ff8a3d" stroke="#161413" stroke-width="2" stroke-linejoin="round"/><circle cx="31" cy="12" r="2" fill="#161413"/></svg>';
  var FISH2 = '<svg viewBox="0 0 48 28"><path d="M10 14c6-9 20-10 28 0-8 10-22 9-28 0z" fill="#12b3d6" stroke="#161413" stroke-width="2" stroke-linejoin="round"/><path d="M10 14 2 6v16z" fill="#12b3d6" stroke="#161413" stroke-width="2" stroke-linejoin="round"/><path d="M20 7v14M25 6v16" stroke="#fff" stroke-width="2"/><circle cx="31" cy="12" r="2" fill="#161413"/></svg>';
  var JELLY = '<svg viewBox="0 0 60 90"><path d="M6 32C6 10 54 10 54 32c0 4-4 6-8 4s-6 2-10 0-6 2-10 0-6 2-10 0-10 0-10-4z" fill="rgba(255,120,190,.35)" stroke="#ff9ccc" stroke-width="2"/><path d="M16 38c-4 10 4 18 0 30M26 38c4 12-4 22 0 40M36 38c-4 12 4 20 0 34M46 38c4 10-4 16 0 26" fill="none" stroke="#ff9ccc" stroke-width="1.6" stroke-linecap="round"/></svg>';
  var LANTERN = '<svg viewBox="0 0 56 26"><path d="M12 13c7-9 22-10 32 0-10 10-25 9-32 0z" fill="#0b1f33" stroke="#4b6680" stroke-width="1.5"/><path d="M12 13 3 5v16z" fill="#0b1f33" stroke="#4b6680" stroke-width="1.5"/><circle cx="37" cy="11" r="2.4" fill="#cfe"/><g fill="#5ff0ff"><circle cx="18" cy="16" r="1.4"/><circle cx="23" cy="17" r="1.4"/><circle cx="28" cy="17" r="1.4"/><circle cx="33" cy="16" r="1.4"/></g></svg>';

  var who = {
    stream: [FISH, FISH, FISH2, FISH, FISH2],
    videos: [JELLY, JELLY],
    music: [JELLY, JELLY, JELLY],
    models: [LANTERN, LANTERN, LANTERN],
    code: [LANTERN, LANTERN, LANTERN, LANTERN],
  };

  Object.keys(who).forEach(function(id){
    var sec = document.getElementById(id);
    if (!sec) return;
    var tank = document.createElement('div');
    tank.className = 'critters';
    tank.setAttribute('aria-hidden', 'true');
    who[id].forEach(function(svg){
      var c = document.createElement('div');
      var jelly = svg === JELLY;
      var back = Math.random() < 0.5;
      c.className = 'critter' + (jelly ? ' jelly' : '') + (svg === LANTERN ? ' glowy' : '') + (back && !jelly ? ' back' : '');
      c.innerHTML = svg;
      c.style.top = (8 + Math.random() * 80) + '%';
      c.style.setProperty('--size', (jelly ? 44 + Math.random() * 30 : 28 + Math.random() * 22) + 'px');
      c.style.animationDuration = (jelly ? 50 + Math.random() * 30 : 22 + Math.random() * 20) + 's';
      c.style.animationDelay = (-Math.random() * 60) + 's';
      tank.appendChild(c);
    });
    sec.insertBefore(tank, sec.firstChild);
  });

  /* ---------- the abyss: dark apart from the lure ---------- */

  var abyss = document.querySelector('.abyss');
  if (abyss) {
    var angler = abyss.querySelector('.angler');
    // where the lure sits inside the angler svg, in px at its drawn size
    var LURE_X = 150, LURE_Y = 14;
    var tx = 0, ty = 0, lx = 0, ly = 0, inside = false, t0 = performance.now();
    var aim = function(x, y){ var r = abyss.getBoundingClientRect(); tx = x - r.left; ty = y - r.top; inside = true; };
    abyss.addEventListener('pointermove', function(e){ aim(e.clientX, e.clientY); });
    abyss.addEventListener('pointerdown', function(e){ aim(e.clientX, e.clientY); });
    abyss.addEventListener('pointerleave', function(){ inside = false; });
    var onScreen = false;
    new IntersectionObserver(function(es){ onScreen = es[0].isIntersecting; }).observe(abyss);
    (function glow(now){
      requestAnimationFrame(glow);
      if (!onScreen) return;
      var w = abyss.clientWidth, h = abyss.clientHeight;
      if (!inside) {
        // no pointer in here: the fish goes for a wander on its own
        var s = (now - t0) / 1000;
        tx = w * (0.5 + 0.34 * Math.sin(s * 0.35));
        ty = h * (0.5 + 0.28 * Math.sin(s * 0.53));
      }
      var k = calm ? 1 : 0.08;
      lx += (tx - lx) * k; ly += (ty - ly) * k;
      abyss.style.setProperty('--lx', lx + 'px');
      abyss.style.setProperty('--ly', ly + 'px');
      var flip = tx < lx - 2 ? -1 : 1;
      angler.style.transform = 'translate(' + (lx - LURE_X * flip) + 'px,' + (ly - LURE_Y) + 'px) scaleX(' + flip + ')';
    })(performance.now());
  }

  /* ---------- treasure ---------- */

  var chest = document.querySelector('.chest');
  if (chest) {
    var opened = false;
    try { opened = localStorage.getItem('fishhwb-treasure') === '1'; } catch (e) {}
    if (opened) chest.classList.add('open');
    chest.addEventListener('click', function(){
      var first = !chest.classList.contains('open');
      chest.classList.add('open');
      try { localStorage.setItem('fishhwb-treasure', '1'); } catch (e) {}
      for (var i = 0; i < 14; i++) {
        var c = document.createElement('i');
        c.className = 'coin';
        c.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
        c.style.setProperty('--dy', (-60 - Math.random() * 120) + 'px');
        c.style.animationDelay = (Math.random() * 0.2) + 's';
        chest.appendChild(c);
        setTimeout(c.remove.bind(c), 1600);
      }
      talk(first
        ? "You found the treasure! It's 14 gold coins and a slightly damp sticker. Don't spend it all at once."
        : "Still just coins. I checked.");
    });
  }

  /* ---------- secret codes ---------- */

  var typed = '';
  var KONAMI = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a';
  var keys = [];
  addEventListener('keydown', function(e){
    if (/input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable) return;
    keys.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    keys = keys.slice(-10);
    if (keys.join(' ') === KONAMI) { keys = []; swarm(); }
    if (e.key.length === 1) {
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (/id-?10-?t$/.test(typed)) { typed = ''; idiot(); }
    }
  });

  function idiot(){
    document.body.classList.remove('glitch');
    void document.body.offsetWidth;
    document.body.classList.add('glitch');
    setTimeout(function(){ document.body.classList.remove('glitch'); }, 700);
    talk("ID-10-T error detected. I checked the logs. It's you.");
  }

  function swarm(){
    var layer = document.createElement('div');
    layer.className = 'swarm';
    layer.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 30; i++) {
      var f = document.createElement('div');
      f.className = 'critter';
      f.innerHTML = i % 3 ? FISH : FISH2;
      f.style.top = (Math.random() * 92) + '%';
      f.style.setProperty('--size', (24 + Math.random() * 26) + 'px');
      f.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      f.style.animationDelay = (Math.random() * 1.5) + 's';
      layer.appendChild(f);
    }
    document.body.appendChild(layer);
    setTimeout(function(){ layer.remove(); }, 6500);
    talk('+30 fish. Cheat codes still work in 2026.');
  }

  /* ---------- sound: waves up top, muffled rumble at the bottom ---------- */

  var btn = document.querySelector('.sound');
  var audio = null;
  var depth = window.fishDepth || 0;

  function start(){
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    var ctx = new AC();
    // brown noise: sounds like water rather than hiss
    var len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), last = 0;
    for (var i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    var src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    var filter = ctx.createBiquadFilter(); filter.type = 'lowpass';
    var swell = ctx.createGain(); swell.gain.value = 0.5;
    var lfo = ctx.createOscillator(); lfo.frequency.value = 0.09;
    var lfoAmt = ctx.createGain();
    lfo.connect(lfoAmt).connect(swell.gain);
    var out = ctx.createGain(); out.gain.value = 0;
    src.connect(filter).connect(swell).connect(out).connect(ctx.destination);
    src.start(); lfo.start();
    out.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
    var a = { ctx: ctx, filter: filter, lfoAmt: lfoAmt, out: out };
    tune(a);
    (function blip(){
      a.timer = setTimeout(blip, 1500 + Math.random() * 5000);
      if (ctx.state !== 'running') return;
      var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = 'sine';
      o.frequency.setValueAtTime(250 + Math.random() * 200, t);
      o.frequency.exponentialRampToValueAtTime(900 + Math.random() * 600, t + 0.12);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      o.connect(g).connect(filter);
      o.start(t); o.stop(t + 0.16);
    })();
    return a;
  }

  function tune(a){
    var p = Math.min(1, depth / 4500);
    var t = a.ctx.currentTime;
    a.filter.frequency.setTargetAtTime(120 + 1500 * Math.pow(1 - p, 2), t, 0.4);
    a.lfoAmt.gain.setTargetAtTime(0.45 * (1 - p), t, 0.4);
  }

  addEventListener('depth', function(e){
    depth = e.detail.depth;
    if (audio) tune(audio);
  });

  if (btn) btn.addEventListener('click', function(){
    var on = btn.getAttribute('aria-pressed') === 'true';
    if (!on) {
      if (!audio) audio = start();
      if (!audio) return;
      audio.ctx.resume();
      audio.out.gain.setTargetAtTime(0.5, audio.ctx.currentTime, 0.3);
    } else if (audio) {
      audio.out.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.2);
      setTimeout(function(){ if (btn.getAttribute('aria-pressed') === 'false') audio.ctx.suspend(); }, 800);
    }
    btn.setAttribute('aria-pressed', String(!on));
  });
})();

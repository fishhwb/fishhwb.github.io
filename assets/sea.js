// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Everything living in the water: fish by depth, the dark bit with the
// anglerfish, the treasure on the sea floor, secret codes and the sound.
(function(){
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var talk = function(text){ if (window.cubez) window.cubez.say(text); };

  /* ---------- who lives where ---------- */

  // Shared gradients and clip paths, defined once for every critter.
  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
  defs.setAttribute('aria-hidden', 'true');
  defs.style.position = 'absolute';
  defs.innerHTML =
    '<defs>' +
    '<linearGradient id="sea-clown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a13"/><stop offset=".55" stop-color="#ff8f2e"/><stop offset="1" stop-color="#ffc071"/></linearGradient>' +
    '<linearGradient id="sea-clownfin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff7a1f"/><stop offset=".7" stop-color="#ff9a3d"/><stop offset="1" stop-color="#161413"/></linearGradient>' +
    '<linearGradient id="sea-tang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f5fff"/><stop offset=".6" stop-color="#3f8dff"/><stop offset="1" stop-color="#8cc8ff"/></linearGradient>' +
    '<linearGradient id="sea-tangtail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffc21a"/><stop offset="1" stop-color="#ffe066"/></linearGradient>' +
    '<radialGradient id="sea-jelly" cx=".45" cy=".3" r=".75"><stop offset="0" stop-color="#ffd6ef" stop-opacity=".85"/><stop offset=".5" stop-color="#ff7ac4" stop-opacity=".55"/><stop offset="1" stop-color="#a24bff" stop-opacity=".35"/></radialGradient>' +
    '<linearGradient id="sea-lantern" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23405f"/><stop offset=".55" stop-color="#132741"/><stop offset="1" stop-color="#0a1626"/></linearGradient>' +
    '<linearGradient id="sea-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fd8ff" stop-opacity="0"/><stop offset=".5" stop-color="#bfe8ff" stop-opacity=".45"/><stop offset="1" stop-color="#9fd8ff" stop-opacity="0"/></linearGradient>' +
    '<clipPath id="sea-clown-body"><path d="M30 38C38 16 74 8 96 18c12 6 18 14 18 20 0 8-8 16-20 20-22 8-54 2-64-20z"/></clipPath>' +
    '<clipPath id="sea-tang-body"><path d="M28 38C34 14 70 6 96 16c14 6 20 16 18 24-2 10-12 18-26 22-26 8-54-2-60-24z"/></clipPath>' +
    '</defs>';
  document.body.appendChild(defs);

  var INK = 'stroke="#161413" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"';

  // clownfish
  var CLOWN = '<svg viewBox="0 0 120 72">' +
    '<path d="M50 18C56 4 80 0 94 14 80 12 64 14 50 18z" fill="url(#sea-clownfin)" ' + INK + '/>' +
    '<path d="M58 58c4 10 16 12 24 2z" fill="url(#sea-clownfin)" ' + INK + '/>' +
    '<g class="tail"><path d="M33 38C23 30 15 18 5 13c5 13 5 37 0 50 10-5 18-17 28-25z" fill="url(#sea-clownfin)" ' + INK + '/>' +
    '<path d="M12 22c6 5 12 10 18 15M9 38h20M12 54c6-5 12-10 18-15" fill="none" stroke="#161413" stroke-width="1.2" opacity=".35"/></g>' +
    '<path d="M30 38C38 16 74 8 96 18c12 6 18 14 18 20 0 8-8 16-20 20-22 8-54 2-64-20z" fill="url(#sea-clown)"/>' +
    '<g clip-path="url(#sea-clown-body)">' +
    '<path d="M84 8c-8 10-8 40 2 60l12-2c-10-18-10-44-2-58z" fill="#fff" ' + INK + '/>' +
    '<path d="M58 6c-6 14-6 44 2 62l12-1c-8-18-8-46-2-61z" fill="#fff" ' + INK + '/>' +
    '<path d="M34 20c-4 8-4 26 0 34l8-2c-4-8-4-22 0-30z" fill="#fff" ' + INK + '/>' +
    '<path d="M40 22C56 12 84 10 100 20" fill="none" stroke="#fff" stroke-width="3" opacity=".45"/>' +
    '</g>' +
    '<path d="M30 38C38 16 74 8 96 18c12 6 18 14 18 20 0 8-8 16-20 20-22 8-54 2-64-20z" fill="none" ' + INK + '/>' +
    '<path class="fin" d="M78 42c-6 8-14 10-18 8 4-6 10-10 18-8z" fill="#ff9a3d" ' + INK + '/>' +
    '<path d="M108 43c2 1 4 1 6-1" fill="none" ' + INK + '/>' +
    '<circle cx="103" cy="35" r="2.6" fill="#ff5a8a" opacity=".5"/>' +
    '<circle cx="97" cy="30" r="7" fill="#fff" ' + INK + '/><circle cx="98.6" cy="30.6" r="4.3" fill="#161413"/><circle cx="100.2" cy="28.6" r="1.6" fill="#fff"/>' +
    '</svg>';

  // blue tang
  var TANG = '<svg viewBox="0 0 120 72">' +
    '<path d="M38 22C54 6 86 4 104 18h-8C82 10 58 12 38 22z" fill="#2a63e8" ' + INK + '/>' +
    '<path d="M44 58c14 10 38 10 50 2" fill="#2a63e8" ' + INK + '/>' +
    '<g class="tail"><path d="M31 38L7 16c5 12 5 32 0 44z" fill="url(#sea-tangtail)" ' + INK + '/>' +
    '<path d="M9 22l16 14M9 54l16-14" fill="none" stroke="#161413" stroke-width="3" opacity=".8"/></g>' +
    '<path d="M28 38C34 14 70 6 96 16c14 6 20 16 18 24-2 10-12 18-26 22-26 8-54-2-60-24z" fill="url(#sea-tang)"/>' +
    '<g clip-path="url(#sea-tang-body)">' +
    '<path d="M42 26c16-12 42-12 56 0-14-2-26 2-34 12 8 4 20 6 28 4-12 8-36 8-48 0-6-6-6-12-2-16z" fill="#15183a"/>' +
    '<path d="M40 20C56 12 84 10 102 20" fill="none" stroke="#fff" stroke-width="3" opacity=".35"/>' +
    '</g>' +
    '<path d="M28 38C34 14 70 6 96 16c14 6 20 16 18 24-2 10-12 18-26 22-26 8-54-2-60-24z" fill="none" ' + INK + '/>' +
    '<path class="fin" d="M80 44c-6 8-14 10-18 8 4-6 10-10 18-8z" fill="#ffd23f" ' + INK + '/>' +
    '<path d="M108 45c2 1 4 0 6-2" fill="none" ' + INK + '/>' +
    '<circle cx="99" cy="31" r="7" fill="#fff" ' + INK + '/><circle cx="100.6" cy="31.6" r="4.3" fill="#161413"/><circle cx="102.2" cy="29.6" r="1.6" fill="#fff"/>' +
    '</svg>';

  // moon jelly, drifting
  var JELLY = '<svg viewBox="0 0 100 160">' +
    '<g class="tentacles" fill="none" stroke-linecap="round">' +
    '<path d="M18 56c-6 20 8 34 0 56s6 30 2 44" stroke="#ffc6e6" stroke-width="1.3" opacity=".7"/>' +
    '<path d="M82 56c6 20-8 34 0 56s-6 30-2 44" stroke="#ffc6e6" stroke-width="1.3" opacity=".7"/>' +
    '<path d="M30 60c-4 18 6 30 0 50s4 26 0 40" stroke="#ffc6e6" stroke-width="1.2" opacity=".6"/>' +
    '<path d="M70 60c4 18-6 30 0 50s-4 26 0 40" stroke="#ffc6e6" stroke-width="1.2" opacity=".6"/>' +
    '<path d="M42 58c-8 12 6 18-2 30s8 18 0 30 4 14 0 22" stroke="#ff8fce" stroke-width="5" opacity=".55"/>' +
    '<path d="M58 58c8 12-6 18 2 30s-8 18 0 30-4 14 0 22" stroke="#ff8fce" stroke-width="5" opacity=".55"/>' +
    '<path d="M50 58c-6 16 6 26 0 44s4 20 0 30" stroke="#ffd6ef" stroke-width="3" opacity=".6"/>' +
    '</g>' +
    '<g class="bell">' +
    '<path d="M8 54C8 20 28 6 50 6s42 14 42 48c-6 4-12 0-18 4-6 3-12-2-18 2-6-4-12 1-18-2-6-4-12 0-18-4-6 4-10 0-12 0z" fill="url(#sea-jelly)" stroke="#ffb3dd" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M34 34c0-8 6-12 10-8s0 12-4 14-6 0-6-6zM56 26c4-6 12-4 12 2s-6 10-10 8-4-6-2-10z" fill="#ff5fb4" opacity=".5"/>' +
    '<path d="M22 30c4-12 14-18 24-18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>' +
    '<circle cx="66" cy="18" r="2" fill="#fff" opacity=".6"/><circle cx="74" cy="28" r="1.4" fill="#fff" opacity=".5"/><circle cx="28" cy="44" r="1.6" fill="#fff" opacity=".45"/>' +
    '</g></svg>';

  // lanternfish: little lights along the belly
  var LANTERN = '<svg viewBox="0 0 110 50">' +
    '<g class="tail"><path d="M24 25L5 9c5 10 5 22 0 32z" fill="url(#sea-lantern)" stroke="#5f7d9c" stroke-width="1.5" stroke-linejoin="round"/></g>' +
    '<path d="M50 13l8-10c2 4 8 7 14 8z" fill="#132741" stroke="#5f7d9c" stroke-width="1.5" stroke-linejoin="round"/>' +
    '<path d="M22 25C30 10 70 6 94 14c10 4 14 8 14 12-2 6-10 10-20 12-24 6-56 2-66-13z" fill="url(#sea-lantern)" stroke="#5f7d9c" stroke-width="1.5" stroke-linejoin="round"/>' +
    '<path d="M30 20c16-8 44-10 62-4" fill="none" stroke="url(#sea-sheen)" stroke-width="4" stroke-linecap="round"/>' +
    '<path class="fin" d="M74 28c-4 6-10 8-14 6 3-4 8-7 14-6z" fill="#1d3550" stroke="#5f7d9c" stroke-width="1.2"/>' +
    '<g class="lights" fill="#7ff6ff"><circle cx="36" cy="32" r="1.8"/><circle cx="44" cy="34" r="1.8"/><circle cx="52" cy="35" r="1.8"/><circle cx="60" cy="35.5" r="1.8"/><circle cx="68" cy="35" r="1.8"/><circle cx="76" cy="34" r="1.8"/><circle cx="84" cy="32.5" r="1.8"/><circle cx="46" cy="27" r="1.2" opacity=".7"/><circle cx="58" cy="27.5" r="1.2" opacity=".7"/><circle cx="70" cy="27" r="1.2" opacity=".7"/></g>' +
    '<circle cx="95" cy="21" r="6.5" fill="#0a1320" stroke="#8fb0cc" stroke-width="1.5"/><circle cx="96" cy="21" r="3.6" fill="#1b3a57"/><circle cx="97.5" cy="19.5" r="1.4" fill="#bff8ff"/>' +
    '<path d="M104 28c-2 1-4 1-6 0" fill="none" stroke="#8fb0cc" stroke-width="1.2" stroke-linecap="round"/>' +
    '</svg>';

  var sizes = { clown: [46, 30], tang: [48, 30], jelly: [62, 36], lantern: [40, 22] };
  var FISH = CLOWN, FISH2 = TANG;

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
      var kind = svg === CLOWN ? 'clown' : svg === TANG ? 'tang' : jelly ? 'jelly' : 'lantern';
      var back = Math.random() < 0.5;
      c.className = 'critter ' + kind + (jelly ? ' jelly' : '') + (svg === LANTERN ? ' glowy' : '') + (back && !jelly ? ' back' : '');
      c.innerHTML = svg;
      c.style.top = (8 + Math.random() * 80) + '%';
      c.style.setProperty('--size', (sizes[kind][0] + Math.random() * sizes[kind][1]) + 'px');
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
      f.style.setProperty('--size', (36 + Math.random() * 34) + 'px');
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

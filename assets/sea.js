// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Sea-life system: jellyfish + lanternfish only. Surface fish, anglerfish and
// the abyss scan/spotlight interaction have been removed intentionally.
(function(){
  'use strict';

  var talk = function(text){ if (window.cubez) window.cubez.say(text); };

  /* ---------- sea life ---------- */

  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('width', '0');
  defs.setAttribute('height', '0');
  defs.setAttribute('aria-hidden', 'true');
  defs.style.position = 'absolute';
  defs.innerHTML =
    '<defs>' +
    '<radialGradient id="sea-jelly" cx=".45" cy=".3" r=".75"><stop offset="0" stop-color="#ffd6ef" stop-opacity=".85"/><stop offset=".5" stop-color="#ff7ac4" stop-opacity=".55"/><stop offset="1" stop-color="#a24bff" stop-opacity=".35"/></radialGradient>' +
    '<linearGradient id="sea-lantern" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#23405f"/><stop offset=".55" stop-color="#132741"/><stop offset="1" stop-color="#0a1626"/></linearGradient>' +
    '<linearGradient id="sea-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fd8ff" stop-opacity="0"/><stop offset=".5" stop-color="#bfe8ff" stop-opacity=".45"/><stop offset="1" stop-color="#9fd8ff" stop-opacity="0"/></linearGradient>' +
    '</defs>';
  document.body.appendChild(defs);

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

  var sizes = { jelly: [62, 36], lantern: [40, 22] };
  var who = {
    videos: [JELLY, JELLY],
    music: [JELLY, JELLY, JELLY],
    models: [LANTERN, LANTERN, LANTERN],
    code: [LANTERN, LANTERN, LANTERN, LANTERN]
  };

  // A little more life without additional animation loops or heavy canvases.
  // Keep the original jellyfish and lanternfish artwork unchanged.
  var motionReduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!motionReduced){
    who.videos.push(JELLY);
    who.music.push(JELLY);
    who.models.push(LANTERN);
  }

  Object.keys(who).forEach(function(id){
    var sec = document.getElementById(id);
    if(!sec) return;
    var tank = document.createElement('div');
    tank.className = 'critters';
    tank.setAttribute('aria-hidden', 'true');

    who[id].forEach(function(svg){
      var jelly = svg === JELLY;
      var kind = jelly ? 'jelly' : 'lantern';
      var c = document.createElement('div');
      var back = Math.random() < 0.5;
      c.className = 'critter ' + kind + (jelly ? ' jelly' : ' glowy') + (back && !jelly ? ' back' : '');
      c.innerHTML = svg;
      c.style.top = (8 + Math.random() * 80) + '%';
      c.style.setProperty('--size', (sizes[kind][0] + Math.random() * sizes[kind][1]) + 'px');
      c.style.animationDuration = (jelly ? 50 + Math.random() * 30 : 22 + Math.random() * 20) + 's';
      c.style.animationDelay = (-Math.random() * 60) + 's';
      tank.appendChild(c);
    });

    sec.insertBefore(tank, sec.firstChild);
  });

  /* ---------- treasure ---------- */

  var chest = document.querySelector('.chest');
  if(chest){
    var opened = false;
    try { opened = localStorage.getItem('fishhwb-treasure') === '1'; } catch(e) {}
    if(opened) chest.classList.add('open');

    chest.addEventListener('click', function(){
      var first = !chest.classList.contains('open');
      chest.classList.add('open');
      try { localStorage.setItem('fishhwb-treasure', '1'); } catch(e) {}

      for(var i=0;i<14;i++){
        var coin = document.createElement('i');
        coin.className = 'coin';
        coin.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
        coin.style.setProperty('--dy', (-60 - Math.random() * 120) + 'px');
        coin.style.animationDelay = (Math.random() * .2) + 's';
        chest.appendChild(coin);
        setTimeout(coin.remove.bind(coin), 1600);
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
    if(/input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable) return;
    keys.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    keys = keys.slice(-10);
    if(keys.join(' ') === KONAMI){ keys = []; swarm(); }
    if(e.key.length === 1){
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if(/id-?10-?t$/.test(typed)){ typed = ''; idiot(); }
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

    for(var i=0;i<24;i++){
      var f = document.createElement('div');
      f.className = 'critter lantern glowy';
      f.innerHTML = LANTERN;
      f.style.top = (Math.random() * 92) + '%';
      f.style.setProperty('--size', (34 + Math.random() * 28) + 'px');
      f.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      f.style.animationDelay = (Math.random() * 1.5) + 's';
      layer.appendChild(f);
    }

    document.body.appendChild(layer);
    setTimeout(function(){ layer.remove(); }, 6500);
    talk('+24 lanternfish. Cheat codes still work in 2026.');
  }

  /* ---------- sound ---------- */

  var btn = document.querySelector('.sound');
  var audio = null;
  var depth = window.fishDepth || 0;

  function start(){
    var AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return null;

    var ctx = new AC();
    var len = ctx.sampleRate * 4;
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = buf.getChannelData(0);
    var last = 0;

    for(var i=0;i<len;i++){
      last = (last + .02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = last * 3.5;
    }

    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    var filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';

    var swell = ctx.createGain();
    swell.gain.value = .5;

    var lfo = ctx.createOscillator();
    lfo.frequency.value = .09;
    var lfoAmt = ctx.createGain();
    lfo.connect(lfoAmt).connect(swell.gain);

    var out = ctx.createGain();
    out.gain.value = 0;
    src.connect(filter).connect(swell).connect(out).connect(ctx.destination);
    src.start();
    lfo.start();
    out.gain.linearRampToValueAtTime(.5, ctx.currentTime + 1.5);

    var a = {ctx:ctx, filter:filter, lfoAmt:lfoAmt, out:out};
    tune(a);

    (function blip(){
      a.timer = setTimeout(blip, 1500 + Math.random() * 5000);
      if(ctx.state !== 'running') return;
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      var t = ctx.currentTime;
      o.type = 'sine';
      o.frequency.setValueAtTime(250 + Math.random() * 200, t);
      o.frequency.exponentialRampToValueAtTime(900 + Math.random() * 600, t + .12);
      g.gain.setValueAtTime(.0001, t);
      g.gain.exponentialRampToValueAtTime(.05, t + .02);
      g.gain.exponentialRampToValueAtTime(.0001, t + .14);
      o.connect(g).connect(filter);
      o.start(t);
      o.stop(t + .16);
    })();

    return a;
  }

  function tune(a){
    var p = Math.min(1, depth / 4500);
    var t = a.ctx.currentTime;
    a.filter.frequency.setTargetAtTime(120 + 1500 * Math.pow(1 - p, 2), t, .4);
    a.lfoAmt.gain.setTargetAtTime(.45 * (1 - p), t, .4);
  }

  addEventListener('depth', function(e){
    depth = e.detail.depth;
    if(audio) tune(audio);
  });

  if(btn){
    btn.addEventListener('click', function(){
      var on = btn.getAttribute('aria-pressed') === 'true';
      if(!on){
        if(!audio) audio = start();
        if(!audio) return;
        audio.ctx.resume();
        audio.out.gain.setTargetAtTime(.5, audio.ctx.currentTime, .3);
      }else if(audio){
        audio.out.gain.setTargetAtTime(0, audio.ctx.currentTime, .2);
        setTimeout(function(){
          if(btn.getAttribute('aria-pressed') === 'false') audio.ctx.suspend();
        }, 800);
      }
      btn.setAttribute('aria-pressed', String(!on));
    });
  }
})();

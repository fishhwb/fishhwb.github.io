// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Cube'z: the little head in the corner. Idles, blinks, and pipes up when
// there's a new video or the stream goes live.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CHANNEL = 'dedzedoffishal';
const YT_ID = 'UCtcFAWZJeiEp_DOKy8U_YYg';
const LIVE_URL = 'https://decapi.me/twitch/uptime/' + CHANNEL;
const VIDEO_URL = 'https://decapi.me/youtube/latest_video?id=' + YT_ID;

const root = document.querySelector('.buddy');
const head = root.querySelector('.buddy-head');
const bubble = root.querySelector('.bubble');
const msg = bubble.querySelector('.bubble-msg');
const link = bubble.querySelector('.bubble-link');
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

const store = {
  get(k){ try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v){ try { localStorage.setItem(k, v); } catch {} },
  sget(k){ try { return sessionStorage.getItem(k); } catch { return null; } },
  sset(k, v){ try { sessionStorage.setItem(k, v); } catch {} },
};

/* ---------- the head ---------- */

let mesh, morph = {}, react = () => {};
// sulk: 1 when he's turned his back on you. cold: 1 in the abyss.
let sulk = 0, cold = 0;
const canvas = head.querySelector('canvas');

try {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 10);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(1, 2, 3);
  scene.add(key);

  const pivot = new THREE.Group();
  scene.add(pivot);

  const size = () => {
    const w = canvas.clientWidth || 120;
    renderer.setSize(w, w, false);
  };
  size();
  addEventListener('resize', size);

  new GLTFLoader().load(new URL('cubez-head.glb', import.meta.url).href, (gltf) => {
    const model = gltf.scene;
    model.traverse((o) => { if (o.morphTargetDictionary && !mesh) mesh = o; });
    // size from the resting shape: the "Head" shape key drops it 1.6 units
    // and would blow up the bounds
    const box = mesh
      ? new THREE.Box3().setFromBufferAttribute(mesh.geometry.attributes.position).applyMatrix4(mesh.matrixWorld)
      : new THREE.Box3().setFromObject(model);
    const centre = box.getCenter(new THREE.Vector3());
    const dim = box.getSize(new THREE.Vector3());
    model.position.sub(centre);
    pivot.add(model);
    camera.position.set(0, 0, Math.max(dim.x, dim.y, dim.z) * 2.8);
    camera.lookAt(0, 0, 0);
    if (mesh) {
      mesh.frustumCulled = false;
      // only the mouth shapes and the blink move anything on this model
      morph = Object.fromEntries(Object.entries(mesh.morphTargetDictionary)
        .filter(([name]) => /^Mouth |^Eyes Closed$/.test(name)));
    }
    root.classList.add('ready');
    loop();
  }, undefined, fail);

  // morph targets ease toward these values every frame
  const target = {};
  const set = (name, v) => { if (name in morph) target[name] = v; };
  const pulse = (name, ms) => { set(name, 1); setTimeout(() => set(name, 0), ms); };

  let hop = 0, turn = 0, mouseX = 0, mouseY = 0, scrollKick = 0, lastY = scrollY;
  addEventListener('pointermove', (e) => {
    mouseX = e.clientX / innerWidth - 0.5;
    mouseY = e.clientY / innerHeight - 0.5;
  }, { passive: true });
  addEventListener('scroll', () => {
    scrollKick = Math.max(-1, Math.min(1, scrollKick + (scrollY - lastY) / 300));
    lastY = scrollY;
  }, { passive: true });

  // blink every few seconds
  (function blink(){
    pulse('Eyes Closed', 140);
    setTimeout(blink, 2500 + Math.random() * 4000);
  })();

  // grin when you hover
  head.addEventListener('pointerenter', () => set('Mouth E', 0.8));
  head.addEventListener('pointerleave', () => set('Mouth E', 0));

  // news: a hop and a bit of chatter
  react = () => {
    hop = 1;
    const mouths = ['Mouth A', 'Mouth O', 'Mouth E', 'Mouth U', 'Mouth A'];
    mouths.forEach((m, i) => setTimeout(() => pulse(m, 160), 250 + i * 200));
  };

  const clock = new THREE.Clock();
  function loop(){
    requestAnimationFrame(loop);
    if (document.hidden) return;
    const t = clock.getElapsedTime();
    const still = calm ? 0 : 1;
    scrollKick *= 0.92;
    hop *= 0.94;
    turn += (sulk * Math.PI - turn) * 0.08;
    const shiver = cold * still * Math.sin(t * 55) * 0.035;
    pivot.rotation.y = (Math.sin(t * 0.7) * 0.25 + mouseX * 0.6) * still * (1 - sulk) + turn;
    pivot.rotation.x = (mouseY * 0.3 + scrollKick * 0.35) * still;
    pivot.rotation.z = Math.sin(t * 0.9) * 0.05 * still + shiver;
    pivot.position.y = (Math.sin(t * 1.6) * 0.008 + Math.sin(hop * Math.PI) * 0.05) * still;
    if (mesh) {
      for (const [name, i] of Object.entries(morph)) {
        const cur = mesh.morphTargetInfluences[i];
        mesh.morphTargetInfluences[i] = cur + ((target[name] || 0) - cur) * 0.35;
      }
    }
    renderer.render(scene, camera);
  }
} catch (e) {
  fail(e);
}

function fail(){
  root.classList.add('ready', 'flat');
}

/* ---------- the bubble ---------- */

let current = null;

function say(note){
  current = note;
  msg.textContent = note.text;
  link.hidden = !note.href;
  msg.style.marginBottom = note.href ? '' : '0';
  link.textContent = note.label || '';
  link.href = note.href || '#';
  if (note.external) { link.target = '_blank'; link.rel = 'noopener'; }
  else { link.removeAttribute('target'); link.removeAttribute('rel'); }
  bubble.hidden = false;
  root.classList.toggle('live', note.kind === 'live');
  react();
}

function hush(){
  if (current && current.seen) current.seen();
  current = null;
  bubble.hidden = true;
  root.classList.remove('live');
}

bubble.querySelector('.bubble-x').addEventListener('click', hush);
link.addEventListener('click', () => setTimeout(hush, 50));

let latest = null, live = false;

let pokes = 0, pokeTimer, dragged = false;

head.addEventListener('click', () => {
  if (dragged) { dragged = false; return; }
  if (root.classList.contains('gone')) return;
  // poke him too much and he gets the hump
  pokes++;
  clearTimeout(pokeTimer);
  pokeTimer = setTimeout(() => { pokes = 0; }, 5000);
  if (pokes === 10) {
    sulk = 1;
    setTimeout(() => { sulk = 0; }, 4000);
    return say({ kind: 'grump', text: 'Stop poking me. I will bite. I have no teeth, but I will.' });
  }
  if (pokes === 20) {
    pokes = 0;
    say({ kind: 'grump', text: "Right. I'm going for a swim." });
    setTimeout(() => { hush(); root.classList.add('gone'); }, 1800);
    setTimeout(() => { root.classList.remove('gone'); say({ kind: 'grump', text: "I'm back. Don't do that again." }); }, 15000);
    return;
  }
  if (pokes > 10) return;
  if (!bubble.hidden) return hush();
  if (live) return say(liveNote());
  if (latest) return say({ kind: 'idle', text: 'Nothing new right now. Latest upload: ' + latest.title, label: 'watch it', href: latest.url, external: true });
  say({ kind: 'idle', text: "Nothing new right now. I'll shout when something drops.", label: 'go to the videos', href: '#videos' });
});

function liveNote(){
  return { kind: 'live', text: "I'm live on Twitch right now!", label: 'watch the stream', href: '#stream',
    seen: () => store.sset('fishhwb-live-seen', '1') };
}

/* ---------- checking for news ---------- */

async function text(url){
  const r = await fetch(url, { cache: 'no-store' });
  if (!r.ok) throw new Error(r.status);
  return (await r.text()).trim();
}

async function checkLive(){
  try {
    const t = await text(LIVE_URL);
    const was = live;
    live = t.length < 80 && !/offline|error|not found|invalid|rate/i.test(t);
    if (live && !was && !store.sget('fishhwb-live-seen')) say(liveNote());
    if (!live && current && current.kind === 'live') hush();
  } catch {}
}

async function checkVideo(){
  try {
    const m = (await text(VIDEO_URL)).match(/^(.*) - (https:\/\/youtu\.be\/([\w-]+))$/);
    if (!m) return;
    latest = { title: m[1], url: m[2], id: m[3] };
    if (store.get('fishhwb-seen-video') === latest.id || live || (current && current.kind !== 'joke')) return;
    const id = latest.id;
    say({ kind: 'video', text: 'New video: ' + latest.title, label: 'watch on youtube', href: latest.url, external: true,
      seen: () => store.set('fishhwb-seen-video', id) });
  } catch {}
}

function every(fn, ms){
  fn();
  setInterval(() => { if (!document.hidden) fn(); }, ms);
}

/* ---------- dragging him about ---------- */

(function(){
  let sx, sy, ox, oy, down = false;
  const place = (x, y) => {
    const w = root.offsetWidth, h = root.offsetHeight;
    x = Math.max(4, Math.min(innerWidth - w - 4, x));
    y = Math.max(4, Math.min(innerHeight - h - 4, y));
    Object.assign(root.style, { left: x + 'px', top: y + 'px', right: 'auto', bottom: 'auto' });
    // keep the speech bubble on screen
    root.classList.toggle('below', y < 200);
    root.classList.toggle('lefty', x < 240);
  };
  head.addEventListener('pointerdown', (e) => {
    const r = root.getBoundingClientRect();
    down = true; dragged = false;
    sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
    head.setPointerCapture(e.pointerId);
  });
  head.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!dragged && Math.hypot(dx, dy) < 6) return;
    dragged = true;
    root.classList.add('dragging');
    place(ox + dx, oy + dy);
  });
  const up = () => {
    if (!down) return;
    down = false;
    root.classList.remove('dragging');
    if (dragged) {
      const r = root.getBoundingClientRect();
      store.sset('fishhwb-buddy', JSON.stringify({ x: r.left, y: r.top }));
    }
  };
  head.addEventListener('pointerup', up);
  head.addEventListener('pointercancel', up);
  try {
    const saved = JSON.parse(store.sget('fishhwb-buddy'));
    if (saved) place(saved.x, saved.y);
  } catch {}
  addEventListener('resize', () => {
    if (root.style.left) { const r = root.getBoundingClientRect(); place(r.left, r.top); }
  });
})();

/* ---------- talking about the dive ---------- */

const zoneLines = {
  'twilight zone': ['Getting a bit dim down here.', "Sunlight's gone. I'm not scared. You're scared."],
  'midnight zone': ["Can't see a thing. Good job I'm a cube, I don't need eyes. I do have eyes.", 'Midnight zone. Everything down here is ugly. Apart from me.'],
  'the abyss': ["It's freezing down here. Why did we come down here.", "400 times the pressure. I've had worse Mondays."],
  'sea floor': ['Sea floor. Heard someone buried something round here...', 'Bottom. Now you have to swim all the way back up.'],
  'sunlight zone': ['Air! Lovely.', 'Back at the surface. Missed you, sun.'],
};
let zone = 'sunlight zone', zoneTimer, beenDeep = false;
const spoken = new Set(JSON.parse(store.sget('fishhwb-zones') || '[]'));

addEventListener('depth', (e) => {
  const d = e.detail.depth;
  cold = d >= 4000 ? 1 : 0;
  const z = e.detail.bottom ? 'sea floor' : e.detail.zone;
  if (z === zone) return;
  zone = z;
  if (z !== 'sunlight zone') beenDeep = true;
  clearTimeout(zoneTimer);
  // only pipe up if they stay in the zone for a second, once per zone per visit
  zoneTimer = setTimeout(() => {
    if (spoken.has(z) || (z === 'sunlight zone' && !beenDeep)) return;
    if (current && current.kind !== 'joke' && current.kind !== 'zone') return;
    spoken.add(z);
    store.sset('fishhwb-zones', JSON.stringify([...spoken]));
    const lines = zoneLines[z];
    quick(lines[Math.floor(Math.random() * lines.length)], 'zone');
  }, 1200);
});

// a line that clears itself
let quickTimer;
function quick(text, kind = 'quip', ms = 7000){
  say({ kind, text });
  clearTimeout(quickTimer);
  quickTimer = setTimeout(() => { if (current && current.kind === kind && !bubble.matches(':hover')) hush(); }, ms);
}
window.cubez = { say: (text) => quick(text, 'quip', 8000) };

/* ---------- stream times ---------- */

function scheduleNews(s){
  if (!s || live) return;
  const now = Date.now();
  const when = new Intl.DateTimeFormat(undefined, { weekday: 'long', hour: 'numeric', minute: '2-digit' });
  if (s.next && s.next.start > now && s.next.start - now < 30 * 60e3 && !store.sget('fishhwb-soon')) {
    const mins = Math.max(1, Math.round((s.next.start - now) / 60e3));
    store.sset('fishhwb-soon', '1');
    return say({ kind: 'soon', text: 'Stream starts in ' + mins + ' minute' + (mins === 1 ? '' : 's') + '. Grab a drink.', label: 'go to the stream', href: '#stream' });
  }
  if (s.last && now - s.last.end < 2 * 3600e3 && !store.sget('fishhwb-missed')) {
    store.sset('fishhwb-missed', '1');
    const next = s.next ? ' Next one: ' + when.format(s.next.start) + ', your time.' : '';
    say({ kind: 'missed', text: 'You just missed the stream.' + next, label: 'catch the vods', href: '#videos' });
  }
}
addEventListener('schedule', (e) => setTimeout(() => scheduleNews(e.detail), 6000));
if (window.fishSchedule) setTimeout(() => scheduleNews(window.fishSchedule), 6000);

/* ---------- new dev log posts ---------- */

function devlogNews(post){
  if (!post || live || (current && current.kind !== 'joke')) return;
  const id = post.date + ' ' + post.title;
  // only shout about recent posts, and only once
  if (store.get('fishhwb-seen-log') === id || Date.now() - new Date(post.date + 'T12:00:00') > 14 * 864e5) return;
  say({ kind: 'devlog', text: 'New dev log: ' + post.title, label: 'read it', href: '#devlog',
    seen: () => store.set('fishhwb-seen-log', id) });
}
addEventListener('devlog', (e) => setTimeout(() => devlogNews(e.detail), 9000));
if (window.fishDevlog) setTimeout(() => devlogNews(window.fishDevlog), 9000);

/* ---------- the odd bad joke ---------- */

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "There are 10 types of people. Those who understand binary and those who don't.",
  "I'd tell you a UDP joke but you might not get it.",
  "It works on my machine. Ship the machine.",
  "A SQL query walks into a bar, walks up to two tables and asks: can I join you?",
  "99 little bugs in the code. Take one down, patch it around. 127 little bugs in the code.",
  "Why was the JavaScript dev sad? He didn't Node how to Express himself.",
  "I'm not lazy, I'm in energy saving mode.",
  "!false. It's funny because it's true.",
  "Git commit -m \"fixed it\". Narrator: he did not fix it.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "My code doesn't have bugs. It has surprise features.",
  "Why did the fish get bad marks? Because it was below sea level.",
  "What do you call a fish with no eyes? A fsh.",
  "I told my computer I needed a break. It gave me a KitKat and a blue screen.",
  "Semicolons; the reason I have trust issues",
  "Real programmers count from 0.",
  "CSS is easy. It's like riding a bike, except the bike is on fire and so is everything else.",
  "Why did the developer go broke? He used up all his cache.",
  "Knock knock. Race condition. Who's there?",
  "Have you tried turning it off and on again? I have. Twice. I'm still a cube.",
  "I'm a head with no body. Still more put together than your node_modules.",
];
let jokeTimer;
let lastJoke = -1;

function joke(){
  if (!document.hidden && bubble.hidden) {
    let i;
    do { i = Math.floor(Math.random() * jokes.length); } while (i === lastJoke);
    lastJoke = i;
    say({ kind: 'joke', text: jokes[i] });
    clearTimeout(jokeTimer);
    jokeTimer = setTimeout(() => { if (current && current.kind === 'joke' && !bubble.matches(':hover')) hush(); }, 9000);
  }
  // every minute and a half to three minutes, give or take
  setTimeout(joke, 90000 + Math.random() * 90000);
}
setTimeout(joke, 40000 + Math.random() * 30000);

// give the page a moment before the head starts talking
setTimeout(() => {
  every(checkLive, 2 * 60 * 1000);
  setTimeout(() => every(checkVideo, 10 * 60 * 1000), 1500);
}, 2500);

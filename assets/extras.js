// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Stream schedule (in the visitor's own time), projects pulled from GitHub,
// the CubeZ download button, and the guestbook.
(function(){
  var DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  /* ---------- schedule ---------- */

  // How far a time zone is ahead of UTC at a given moment, in ms.
  function offset(tz, t){
    var p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
      .formatToParts(new Date(t)).forEach(function(x){ p[x.type] = +x.value; });
    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(t / 1000) * 1000;
  }
  // A wall-clock time in `tz` to a real moment.
  function wall(tz, y, m, d, h, min){
    var guess = Date.UTC(y, m, d, h, min);
    var t = guess - offset(tz, guess);
    return guess - offset(tz, t);
  }

  function upcoming(data){
    var tz = data.timezone || 'Europe/London';
    var now = Date.now(), out = [];
    var today = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric' })
      .formatToParts(new Date(now)).forEach(function(x){ today[x.type] = +x.value; });
    (data.slots || []).forEach(function(s){
      var want = DAYS.indexOf(String(s.day).slice(0, 3).toLowerCase());
      var hm = String(s.start).split(':');
      if (want < 0 || hm.length < 2) return;
      // look back a day (so a stream that's running now counts) and forward a week
      for (var k = -1; k < 8; k++) {
        var base = new Date(Date.UTC(today.year, today.month - 1, today.day + k));
        if (base.getUTCDay() !== want) continue;
        var start = wall(tz, base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate(), +hm[0], +hm[1]);
        var end = start + (s.hours || 2) * 3600e3;
        out.push({ start: start, end: end, what: s.what || '' });
      }
    });
    return out.sort(function(a, b){ return a.start - b.start; });
  }

  var sched = document.querySelector('.schedule');
  if (sched) fetch('assets/schedule.json', { cache: 'no-store' }).then(function(r){ return r.json(); }).then(function(data){
    var all = upcoming(data);
    if (!all.length) return;
    var now = Date.now();
    var next = all.filter(function(s){ return s.end > now; });
    var past = all.filter(function(s){ return s.end <= now; });
    window.fishSchedule = { next: next[0] || null, last: past[past.length - 1] || null };
    dispatchEvent(new CustomEvent('schedule', { detail: window.fishSchedule }));

    var day = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
    var time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
    var list = sched.querySelector('.slots');
    // one row per weekly slot, in the order they next come round
    next.slice(0, (data.slots || []).length).forEach(function(s, i){
      var li = document.createElement('li');
      if (i === 0) li.className = s.start <= now ? 'now' : 'next';
      var d = document.createElement('b'); d.textContent = day.format(s.start);
      var t = document.createElement('span'); t.textContent = time.format(s.start) + ' to ' + time.format(s.end);
      var label = s.start <= now ? 'on now' : i === 0 ? 'next up' : '';
      if (s.what) label = label ? label + ' · ' + s.what : s.what;
      var w = document.createElement('small'); w.textContent = label;
      li.append(d, t, w);
      list.appendChild(li);
    });
    var zone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'your time zone';
    sched.querySelector('.tz').textContent = 'Shown in your time (' + zone.replace(/_/g, ' ') + '). Plans change, Discord gets told first.';
    sched.hidden = false;
    dispatchEvent(new Event('resize'));
  }).catch(function(){});

  /* ---------- projects from GitHub ---------- */

  var repoBox = document.querySelector('.repos');
  var dl = document.querySelector('.cubez-dl');

  function getJSON(url){
    var key = 'gh:' + url;
    try { var hit = sessionStorage.getItem(key); if (hit) return Promise.resolve(JSON.parse(hit)); } catch (e) {}
    return fetch(url, { headers: { Accept: 'application/vnd.github+json' } }).then(function(r){
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function(j){
      try { sessionStorage.setItem(key, JSON.stringify(j)); } catch (e) {}
      return j;
    });
  }

  if (repoBox) Promise.all(['fishhwb', 'dedzedofficial'].map(function(u){
    return getJSON('https://api.github.com/users/' + u + '/repos?sort=pushed&per_page=100').catch(function(){ return []; });
  })).then(function(lists){
    var seen = {};
    var repos = [].concat.apply([], lists).filter(function(r){
      if (!r || r.fork || r.archived || seen[r.full_name]) return false;
      seen[r.full_name] = 1;
      return !/\.github\.io$/i.test(r.name) && r.name !== '.github';
    }).sort(function(a, b){ return new Date(b.pushed_at) - new Date(a.pushed_at); });

    var cubez = repos.filter(function(r){ return /^cube'?z/i.test(r.name); })[0];
    if (cubez && dl) getJSON('https://api.github.com/repos/' + cubez.full_name + '/releases/latest').then(function(rel){
      var asset = (rel.assets || []).filter(function(a){ return /\.(exe|msi|zip|dmg|appimage)$/i.test(a.name); })[0];
      dl.href = asset ? asset.browser_download_url : rel.html_url;
      dl.textContent = 'Download ' + (rel.tag_name || 'latest');
      dl.hidden = false;
    }).catch(function(){});

    if (!repos.length) return;
    var grid = repoBox.querySelector('.repo-grid');
    var month = new Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' });
    repos.slice(0, 6).forEach(function(r){
      var a = document.createElement('a');
      a.className = 'repo';
      a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener';
      var n = document.createElement('b'); n.textContent = r.name;
      var p = document.createElement('p'); p.textContent = r.description || 'No description. Probably a good one though.';
      var m = document.createElement('small');
      m.textContent = [r.language, r.stargazers_count ? '★ ' + r.stargazers_count : '', 'updated ' + month.format(new Date(r.pushed_at))].filter(Boolean).join(' · ');
      a.append(n, p, m);
      grid.appendChild(a);
    });
    repoBox.hidden = false;
    dispatchEvent(new Event('resize'));
  });

  /* ---------- guestbook (giscus, backed by GitHub Discussions) ---------- */

  var book = document.getElementById('guestbook');
  if (book && book.dataset.repoId && book.dataset.categoryId) {
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    var cfg = {
      repo: book.dataset.repo, 'repo-id': book.dataset.repoId,
      category: book.dataset.category, 'category-id': book.dataset.categoryId,
      mapping: 'specific', term: 'Guestbook', strict: '1', 'reactions-enabled': '1',
      'emit-metadata': '0', 'input-position': 'top', theme: 'transparent_dark', lang: 'en', loading: 'lazy',
    };
    Object.keys(cfg).forEach(function(k){ s.setAttribute('data-' + k, cfg[k]); });
    book.querySelector('.book').appendChild(s);
    book.hidden = false;
    dispatchEvent(new Event('resize'));
  }
})();

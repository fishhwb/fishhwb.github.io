// FISH HWB site extras: schedule, projects, VRChat worlds, dev log and guestbook.
(function(){
  'use strict';

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function getJSON(url, cache){
    var key = 'fish-json:' + url;
    if (cache !== false) {
      try { var hit = sessionStorage.getItem(key); if (hit) return Promise.resolve(JSON.parse(hit)); } catch (e) {}
    }
    return fetch(url, { headers: { Accept: 'application/vnd.github+json' }, cache: cache === false ? 'no-store' : 'default' })
      .then(function(r){ if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function(data){
        if (cache !== false) try { sessionStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
        return data;
      });
  }

  // Keep the brand/icon header, remove the row of text navigation buttons.
  var headLinks = document.querySelector('.site-head .links');
  if (headLinks) headLinks.remove();
  var soundLabel = document.querySelector('.site-head .sound span');
  if (soundLabel) soundLabel.remove();

  [].forEach.call(document.querySelectorAll('a[href="#code"]'), function(a){ a.setAttribute('href', '#projects'); });
  var codeCard = document.querySelector('.does a[href="#projects"]');
  if (codeCard) {
    var codeKicker = codeCard.querySelector('span');
    var codeTitle = codeCard.querySelector('h2');
    var codeCopy = codeCard.querySelector('p');
    if (codeKicker) codeKicker.textContent = '/projects';
    if (codeTitle) codeTitle.textContent = 'Projects';
    if (codeCopy) codeCopy.textContent = 'Open-source tools, experiments and VRChat worlds.';
  }

  /* ---------- schedule ---------- */
  var DAYS = ['sun','mon','tue','wed','thu','fri','sat'];
  function offset(tz, t){
    var p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
      .formatToParts(new Date(t)).forEach(function(x){ p[x.type] = +x.value; });
    return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(t / 1000) * 1000;
  }
  function wall(tz, y, m, d, h, min){
    var guess = Date.UTC(y,m,d,h,min), t = guess - offset(tz, guess);
    return guess - offset(tz, t);
  }
  function upcoming(data){
    var tz = data.timezone || 'Europe/London', now = Date.now(), out = [], today = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric' })
      .formatToParts(new Date(now)).forEach(function(x){ today[x.type] = +x.value; });
    (data.slots || []).forEach(function(s){
      var want = DAYS.indexOf(String(s.day).slice(0,3).toLowerCase()), hm = String(s.start).split(':');
      if (want < 0 || hm.length < 2) return;
      for (var k=-1;k<8;k++) {
        var base = new Date(Date.UTC(today.year,today.month-1,today.day+k));
        if (base.getUTCDay() !== want) continue;
        var start = wall(tz,base.getUTCFullYear(),base.getUTCMonth(),base.getUTCDate(),+hm[0],+hm[1]);
        out.push({ start:start, end:start+(s.hours||2)*3600e3, what:s.what||'' });
      }
    });
    return out.sort(function(a,b){ return a.start-b.start; });
  }
  var sched = document.querySelector('.schedule');
  if (sched) fetch('assets/schedule.json', {cache:'no-store'}).then(function(r){return r.json();}).then(function(data){
    var all = upcoming(data), now = Date.now();
    if (!all.length) return;
    var next = all.filter(function(s){return s.end>now;}), past = all.filter(function(s){return s.end<=now;});
    window.fishSchedule = {next:next[0]||null,last:past[past.length-1]||null};
    dispatchEvent(new CustomEvent('schedule',{detail:window.fishSchedule}));
    var list = sched.querySelector('.slots'), day = new Intl.DateTimeFormat(undefined,{weekday:'long'}), time = new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit'});
    list.textContent='';
    next.slice(0,(data.slots||[]).length).forEach(function(s,i){
      var li=el('li',i===0?(s.start<=now?'now':'next'):''), d=el('b','',day.format(s.start)), t=el('span','',time.format(s.start)+' to '+time.format(s.end));
      var label=s.start<=now?'on now':i===0?'next up':''; if(s.what) label=label?label+' · '+s.what:s.what;
      li.append(d,t,el('small','',label)); list.appendChild(li);
    });
    var zone=Intl.DateTimeFormat().resolvedOptions().timeZone||'your time zone';
    sched.querySelector('.tz').textContent='Shown in your time ('+zone.replace(/_/g,' ')+'). Plans change, Discord gets told first.';
    sched.hidden=false; dispatchEvent(new Event('resize'));
  }).catch(function(){});

  /* ---------- public GitHub projects + VRChat worlds ---------- */
  var section = document.getElementById('code');
  if (section) {
    section.id = 'projects';
    var secHead = section.querySelector('.sec-head');
    if (secHead) {
      var h2 = secHead.querySelector('h2'); if (h2) h2.textContent = 'Projects';
      var topLink = secHead.querySelector('.more');
      if (topLink) { topLink.href = 'https://github.com/dedzedofficial'; topLink.textContent = 'github.com/dedzedofficial ↗'; }
    }
    var grid = section.querySelector('.projects'), oldRepos = section.querySelector('.repos');
    if (oldRepos) oldRepos.remove();
    if (grid) { grid.removeAttribute('style'); grid.textContent = ''; grid.appendChild(el('p','project-loading','Loading public projects…')); }

    var fallback = {
      'dedzedofficial/Meshy-Importer-for-Blender-Unity': 'Imports and locally decodes Meshy .meshy models for Unity, Blender, Godot and Unreal Engine.',
      'dedzedofficial/Optimize-Your-Project': 'A free Unity and Blender optimization toolkit that turns repetitive cleanup and performance work into guarded, clear actions.',
      'dedzedofficial/Blender-XR': 'Free, open-source VR mesh modelling and scene building inside Blender using a controller-first OpenXR workflow.',
      'fishhwb/fishhwb.github.io': 'The FISH HWB website and public project hub.'
    };

    Promise.all(['dedzedofficial','fishhwb'].map(function(owner){
      return getJSON('https://api.github.com/users/'+owner+'/repos?sort=pushed&per_page=100').catch(function(){return [];});
    })).then(function(lists){
      var seen={}, repos=[].concat.apply([],lists).filter(function(r){
        if(!r||r.fork||r.archived||r.private||seen[r.full_name]) return false;
        seen[r.full_name]=1;
        return r.name!=='.github';
      }).sort(function(a,b){return new Date(b.pushed_at)-new Date(a.pushed_at);});
      if (!repos.length) repos = Object.keys(fallback).map(function(full){
        return {full_name:full,name:full.split('/')[1],html_url:'https://github.com/'+full,description:fallback[full],language:'Open source',pushed_at:''};
      });
      if (grid) {
        grid.textContent='';
        repos.forEach(function(r){
          var card=el('article','project'), title=el('h3','',r.name), tags=el('div','tags');
          tags.appendChild(el('span','',r.language||'open source'));
          if (r.license && r.license.spdx_id) tags.appendChild(el('span','',r.license.spdx_id));
          var copy=el('p','',fallback[r.full_name]||r.description||'Public FISH HWB project. Open the repository for documentation, releases and source code.');
          var btns=el('div','btns'), link=el('a','button alt','GitHub ↗');
          link.href=r.html_url||('https://github.com/'+r.full_name); link.target='_blank'; link.rel='noopener'; btns.appendChild(link);
          card.append(title,tags,copy,btns); grid.appendChild(card);
        });
      }
      dispatchEvent(new Event('resize'));
    }).catch(function(){
      if(grid) grid.innerHTML='<p>Projects are available at <a class="more" href="https://github.com/dedzedofficial" target="_blank" rel="noopener">github.com/dedzedofficial ↗</a>.</p>';
    });

    var worlds = el('div','world-projects'), worldsHead = el('div','world-projects-head'), worldGrid = el('div','world-grid');
    worldsHead.append(el('h3','sub','VRChat worlds'), el('p','','Names, descriptions and thumbnails refresh from VRChat metadata.'));
    worlds.append(worldsHead,worldGrid); section.querySelector('.wrap').appendChild(worlds);
    fetch('assets/vrchat-worlds.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(data){
      var items=(data.worlds||[]).filter(function(w){return w&&w.id;});
      if(!items.length){ worlds.hidden=true; return; }
      worldGrid.textContent='';
      items.forEach(function(w){
        var a=el('a','world-card'); a.href=w.url||('https://vrchat.com/home/world/'+encodeURIComponent(w.id)); a.target='_blank'; a.rel='noopener';
        var image=w.thumbnailImageUrl||w.imageUrl||'';
        if(image){ var img=el('img',''); img.src=image; img.alt=''; img.loading='lazy'; a.appendChild(img); }
        var body=el('div','world-card-body');
        body.append(el('h4','',w.name||'VRChat world'),el('p','',w.description||'Open this world in VRChat.'));
        body.appendChild(el('small','',w.capacity?'VRChat · up to '+w.capacity+' players':'VRChat world'));
        a.appendChild(body); worldGrid.appendChild(a);
      });
      worlds.hidden=false; dispatchEvent(new Event('resize'));
    }).catch(function(){ worlds.hidden=true; });
  }

  var foot = document.querySelector('footer .foot');
  if (foot && !foot.querySelector('.legal-links')) {
    var legal = el('div','legal-links'), terms=el('a','','Terms'), privacy=el('a','','Privacy');
    terms.href='terms-of-service/'; privacy.href='privacy-policy/'; legal.append(terms,document.createTextNode(' · '),privacy); foot.appendChild(legal);
  }

  var style=el('style');
  style.textContent='#projects{background:linear-gradient(#0a2440,#08203a);color:#eef4f5}.project{background:#07192e!important;color:#f4fbff!important;border-color:#d8efff!important}.project h3{color:#fff!important}.project p{color:#d9e8f2!important}.project .tags span{color:#fff!important;border-color:#9dc8e2!important}.project .button.alt{background:#f4fbff!important;color:#07192e!important;border-color:#f4fbff!important}.world-card{background:#07192e!important;color:#f4fbff!important;border-color:#9dc8e2!important}.world-card h4{color:#fff!important}.world-card p{color:#d9e8f2!important}.world-card small{color:#b9d5e5!important;opacity:1!important}.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}.project{min-width:0}.project-loading{opacity:.7}.world-projects{margin-top:3rem}.world-projects-head{display:flex;gap:1rem;align-items:baseline;justify-content:space-between;flex-wrap:wrap}.world-projects-head p{opacity:.72;margin:0}.world-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}.world-card{display:block;overflow:hidden;border:1px solid currentColor;border-radius:1rem;text-decoration:none;color:inherit;background:rgba(255,255,255,.035)}.world-card img{width:100%;aspect-ratio:16/9;display:block;object-fit:cover}.world-card-body{padding:1rem}.world-card h4{margin:0 0 .4rem;font-size:1.1rem}.world-card p{margin:.3rem 0 .8rem}.world-card small{opacity:.65}.legal-links{display:flex;gap:.35rem}.legal-links a{color:inherit}.site-head .nav{justify-content:space-between}';
  document.head.appendChild(style);

  /* ---------- dev log + Patreon ---------- */
  var log=document.getElementById('devlog');
  if(log) fetch('assets/devlog.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(data){
    if(/^https:\/\/(www\.)?patreon\.com\//.test(data.patreon||'')){
      var pl=log.querySelector('.patreon-link'); if(pl){pl.href=data.patreon;pl.hidden=false;}
      var ps=log.querySelector('.patreon-soon'); if(ps) ps.hidden=true;
    }
    var posts=(data.posts||[]).filter(function(p){return p&&p.title;}).sort(function(a,b){return String(b.date).localeCompare(String(a.date));});
    if(!posts.length){var empty=log.querySelector('.posts-empty');if(empty)empty.hidden=false;return;}
    var list=log.querySelector('.posts'),more=log.querySelector('.posts-more'),tags=log.querySelector('.log-tags'),filter='',showAll=false;
    var fmt=new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'});
    function draw(){
      list.textContent=''; var shown=posts.filter(function(p){return !filter||p.tag===filter;});
      shown.slice(0,showAll?shown.length:5).forEach(function(p){
        var li=el('li','post'),meta=el('div','post-meta'),d=new Date(p.date+'T12:00:00'),time=el('time','',isNaN(d)?p.date:fmt.format(d)); time.dateTime=p.date; meta.appendChild(time);
        if(p.tag)meta.appendChild(el('span','tag',p.tag)); if(p.locked)meta.appendChild(el('span','tag locked','patrons only'));
        li.append(meta,el('h3','',p.title),el('p','',p.text||''));
        if(/^https?:\/\//.test(p.link||'')){var a=el('a','more',!/patreon\.com/.test(p.link)?'read more ↗':p.locked?'unlock it on patreon ↗':'read it on patreon ↗');a.href=p.link;a.target='_blank';a.rel='noopener';li.appendChild(a);} list.appendChild(li);
      });
      if(more)more.hidden=showAll||shown.length<=5; dispatchEvent(new Event('resize'));
    }
    var names=posts.map(function(p){return p.tag;}).filter(function(t,i,all){return t&&all.indexOf(t)===i;});
    if(tags&&names.length>1)['all'].concat(names).forEach(function(name){var b=el('button','',name);b.type='button';b.textContent=name;b.setAttribute('aria-pressed',String(name==='all'));b.addEventListener('click',function(){filter=name==='all'?'':name;[].forEach.call(tags.children,function(x){x.setAttribute('aria-pressed',String(x===b));});draw();});tags.appendChild(b);});
    if(more)more.addEventListener('click',function(){showAll=true;draw();}); draw(); window.fishDevlog=posts[0]; dispatchEvent(new CustomEvent('devlog',{detail:posts[0]}));
  }).catch(function(){});

  var book=document.getElementById('guestbook');
  if(book&&book.dataset.repoId&&book.dataset.categoryId){
    var s=document.createElement('script'); s.src='https://giscus.app/client.js';s.async=true;s.crossOrigin='anonymous';
    var cfg={repo:book.dataset.repo,'repo-id':book.dataset.repoId,category:book.dataset.category,'category-id':book.dataset.categoryId,mapping:'specific',term:'Guestbook',strict:'1','reactions-enabled':'1','emit-metadata':'0','input-position':'top',theme:'transparent_dark',lang:'en',loading:'lazy'};
    Object.keys(cfg).forEach(function(k){s.setAttribute('data-'+k,cfg[k]);}); book.querySelector('.book').appendChild(s);book.hidden=false;dispatchEvent(new Event('resize'));
  }
})();

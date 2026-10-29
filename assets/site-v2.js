// FISH HWB selected upgrades.
// Uses generated local JSON for project/gallery data so visitors do not depend on GitHub API calls.
(function(){
  'use strict';

  var nativeFetch = window.fetch.bind(window);
  var projectDataPromise = nativeFetch('assets/projects.json', {cache:'no-store'})
    .then(function(r){ return r.ok ? r.json() : {repos:[]}; })
    .catch(function(){ return {repos:[]}; });

  // Keep legacy extras.js working while stopping it from calling GitHub directly.
  window.fetch = function(input, init){
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var m = url.match(/^https:\/\/api\.github\.com\/users\/(dedzedofficial|fishhwb)\/repos(?:\?|$)/i);
    if (!m) return nativeFetch(input, init);
    var owner = m[1].toLowerCase();
    return projectDataPromise.then(function(data){
      var repos = (data.repos || []).filter(function(r){
        var login = r.owner && r.owner.login ? r.owner.login : String(r.full_name || '').split('/')[0];
        return String(login).toLowerCase() === owner;
      });
      return new Response(JSON.stringify(repos), {status:200, headers:{'Content-Type':'application/json'}});
    });
  };

  function el(tag, cls, text){
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function safeDate(value){
    if (!value) return '';
    var d = new Date(value);
    return isNaN(d) ? '' : new Intl.DateTimeFormat(undefined,{day:'numeric',month:'short',year:'numeric'}).format(d);
  }
  function say(text){ if (window.cubez && window.cubez.say) window.cubez.say(text); }

  /* ---------- lazy embeds ---------- */
  function lazyMedia(){
    var frames = [].slice.call(document.querySelectorAll('iframe[data-src]'));
    if (!frames.length) return;
    frames.forEach(function(f){ var p=f.closest('.frame'); if(p)p.dataset.lazyMedia='1'; });
    if (!('IntersectionObserver' in window)) {
      frames.forEach(function(f){ f.src=f.dataset.src; f.removeAttribute('data-src'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var f=entry.target;
        if(f.dataset.src){ f.src=f.dataset.src; f.removeAttribute('data-src'); }
        io.unobserve(f);
      });
    },{rootMargin:'900px 0px'});
    frames.forEach(function(f){io.observe(f);});
  }

  /* ---------- project hub ---------- */
  var FALLBACK = {
    'dedzedofficial/Meshy-Importer-for-Blender-Unity':'Imports and locally decodes Meshy .meshy models for Unity, Blender, Godot and Unreal Engine.',
    'dedzedofficial/Optimize-Your-Project':'A free Unity and Blender optimisation toolkit for repetitive cleanup and performance work.',
    'dedzedofficial/Blender-XR':'Open-source VR mesh modelling and scene building using a controller-first OpenXR workflow.',
  };
  function statusClass(status){ return /archive/i.test(status||'') ? 'status archived' : 'status'; }
  function renderProjects(data){
    var section=document.getElementById('projects')||document.getElementById('code');
    if(!section) return;
    var repos=(data.repos||[]).filter(function(r){return r && r.name && r.name!=='.github';});
    if(!repos.length) return;
    var grid=section.querySelector('.projects');
    if(!grid) return;
    grid.className='projects projects-v2'; grid.removeAttribute('style'); grid.textContent='';
    var note=section.querySelector('.project-hub-note');
    if(!note){ note=el('p','project-hub-note','Project data, releases and downloads are generated on GitHub and served locally.'); grid.parentNode.insertBefore(note,grid); }
    repos.forEach(function(r){
      var card=el('article','project-v2');
      if(r.socialImage){ var media=el('div','project-v2-media'),img=el('img');img.src=r.socialImage;img.alt='';img.loading='lazy';media.appendChild(img);card.appendChild(media); }
      var body=el('div','project-v2-body'), title=el('h3','',r.name), meta=el('div','meta');
      meta.appendChild(el('span',statusClass(r.status),r.status||'Active'));
      if(r.language) meta.appendChild(el('span','',r.language));
      if(r.license && (r.license.spdx_id||r.license.name)) meta.appendChild(el('span','',r.license.spdx_id||r.license.name));
      (r.topics||[]).slice(0,2).forEach(function(t){meta.appendChild(el('span','',t));});
      var copy=el('p','',r.summary||FALLBACK[r.full_name]||r.description||'Public FISH HWB project.');
      var release=el('div','release');
      if(r.release && r.release.tag_name){ release.textContent='Latest: '+r.release.tag_name+(r.release.published_at?' · '+safeDate(r.release.published_at):''); }
      else release.textContent=r.pushed_at?'Updated '+safeDate(r.pushed_at):'Open source project';
      var actions=el('div','actions');
      if(r.install_url){var installer=el('a','','Browser installer');installer.href=r.install_url;actions.appendChild(installer);}
      if(r.page){var page=el('a','','Project page');page.href=r.page;actions.appendChild(page);}
      var gh=el('a','alt','GitHub ↗');gh.href=r.html_url;gh.target='_blank';gh.rel='noopener';actions.appendChild(gh);
      if(r.release && r.release.download_url){var dl=el('a','','Download');dl.href=r.release.download_url;dl.target='_blank';dl.rel='noopener';actions.appendChild(dl);}
      body.append(title,meta,copy,release,actions);card.appendChild(body);grid.appendChild(card);
    });
  }

  /* ---------- richer VRChat worlds ---------- */
  function renderWorlds(){
    var section=document.getElementById('projects')||document.getElementById('code');
    if(!section) return;
    nativeFetch('assets/vrchat-worlds.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(data){
      var items=(data.worlds||[]).filter(function(w){return w&&w.id;}); if(!items.length)return;
      var host=section.querySelector('.world-projects');
      if(!host){host=el('div','world-projects');var head=el('div','world-projects-head');head.append(el('h3','sub','VRChat worlds'),el('p','','Live metadata refreshed automatically.'));host.append(head,el('div','world-grid'));section.querySelector('.wrap').appendChild(host);}
      var grid=host.querySelector('.world-grid');grid.textContent='';host.hidden=false;
      items.forEach(function(w){
        var card=el('article','world-card-v2');
        if(w.thumbnailImageUrl||w.imageUrl){var img=el('img');img.src=w.thumbnailImageUrl||w.imageUrl;img.alt='';img.loading='lazy';card.appendChild(img);}
        var body=el('div','world-card-v2-body');body.appendChild(el('h4','',w.name||'VRChat world'));
        body.appendChild(el('p','',w.description||'Open this world in VRChat.'));
        var meta=el('div','world-meta');
        if(w.capacity)meta.appendChild(el('span','',w.capacity+' players'));
        if(w.platforms&&w.platforms.length)meta.appendChild(el('span','',w.platforms.join(' + ')));
        if(w.visits!=null)meta.appendChild(el('span','',Number(w.visits).toLocaleString()+' visits'));
        if(w.favorites!=null)meta.appendChild(el('span','',Number(w.favorites).toLocaleString()+' favourites'));
        if(w.updatedAt)meta.appendChild(el('span','','updated '+safeDate(w.updatedAt)));
        var actions=el('div','world-actions'),open=el('a','','VRChat page ↗');open.href=w.url||('https://vrchat.com/home/world/'+encodeURIComponent(w.id));open.target='_blank';open.rel='noopener';
        var copy=el('button','','Copy world ID');copy.type='button';copy.addEventListener('click',function(){navigator.clipboard&&navigator.clipboard.writeText(w.id);copy.textContent='Copied';setTimeout(function(){copy.textContent='Copy world ID';},1500);});
        actions.append(open,copy);body.append(meta,actions);card.appendChild(body);grid.appendChild(card);
      });
      dispatchEvent(new Event('resize'));
    }).catch(function(){});
  }

  /* ---------- automatic 3D gallery ---------- */
  function renderGallery(){
    var grid=document.querySelector('#models .gallery'); if(!grid)return;
    nativeFetch('assets/gallery.json',{cache:'no-store'}).then(function(r){return r.json();}).then(function(data){
      var items=(data.items||[]); grid.className='gallery gallery-v2'; grid.textContent='';
      if(!items.length){grid.appendChild(el('div','gallery-v2-empty','Drop renders or 3D files into assets/3d/. Images appear automatically; HWB files get interactive viewers.'));return;}
      items.filter(function(item){return item.type==='image'||(item.type==='model'&&item.ext==='hwb');}).forEach(function(item){
        var card=el('article','gallery-item'),preview=el('div','preview'),body=el('div','gallery-item-body');
        if(item.type==='image'){
          var img=el('img');img.src=item.preview||item.path;img.alt=item.title||'3D render';img.loading='lazy';preview.appendChild(img);
        } else if(item.type==='model'){
          preview.dataset.model=item.path;preview.dataset.key=item.key||'';preview.dataset.ext=item.ext||'';preview.dataset.title=item.title||'3D model';
          if(item.preview){var thumb=el('img','model-thumb');thumb.src=item.preview;thumb.alt='';thumb.loading='lazy';preview.appendChild(thumb);}
          var spinner=el('span','hwb-loader');var headImg=el('img');headImg.src='assets/fishhwb-mascot.webp';headImg.alt='';headImg.loading='lazy';spinner.appendChild(headImg);preview.appendChild(spinner);
          preview.appendChild(el('span','model-loading','3D preview loads when visible'));
          var full=el('button','hwb-fullscreen','Fullscreen');full.type='button';full.setAttribute('aria-label','Toggle fullscreen model view');full.addEventListener('click',function(){if(document.fullscreenElement===preview){document.exitFullscreen();}else if(preview.requestFullscreen){preview.requestFullscreen();}});preview.appendChild(full);
          preview.appendChild(el('span','model-hint','drag to orbit · wheel to zoom'));
          observeModel(preview);
        } else {
          var source=el('div','model-loading','Browser preview unavailable for '+String(item.ext||'this format').toUpperCase()+'. Download the source file instead.');preview.appendChild(source);
        }
        body.appendChild(el('b','',item.title||'Untitled'));
        var small=el('small','',item.label||((item.ext||'file').toUpperCase()));
        if(item.type==='source'){small.appendChild(document.createTextNode(' · '));var a=el('a','','download');a.href=item.path;a.download='';small.appendChild(a);}
        body.appendChild(small);card.append(preview,body);grid.appendChild(card);
      });
      dispatchEvent(new Event('resize'));
    }).catch(function(){grid.innerHTML='<div class="gallery-v2-empty">3D gallery metadata is unavailable.</div>';});
  }
  var modelObserver;
  function observeModel(node){
    if(!('IntersectionObserver' in window)){loadModel(node);return;}
    if(!modelObserver)modelObserver=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){loadModel(e.target);modelObserver.unobserve(e.target);}});},{rootMargin:'500px'});
    modelObserver.observe(node);
  }
  async function loadModel(host){
    if(host.dataset.loaded)return;host.dataset.loaded='1';
    var loading=host.querySelector('.model-loading'); if(loading)loading.textContent='loading model…';
    try{
      var THREE=await import('three'), controlsMod=await import('three/addons/controls/OrbitControls.js'), ext=(host.dataset.ext||'').toLowerCase(), Loader;
      if(ext!=='hwb'||!host.dataset.key)throw new Error('HWB only');
      Loader=(await import('three/addons/loaders/GLTFLoader.js')).GLTFLoader;
      var canvas=el('canvas'),renderer=new THREE.WebGLRenderer({canvas:canvas,alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
      var scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.01,1000);scene.add(new THREE.HemisphereLight(0xe8f8ff,0x08203a,2.2));var key=new THREE.DirectionalLight(0xffffff,2);key.position.set(2,3,4);scene.add(key);
      var loader=new Loader();
      var encrypted=await nativeFetch(host.dataset.model).then(function(r){if(!r.ok)throw Error('Model unavailable');return r.arrayBuffer();});
      var keyText=await nativeFetch(host.dataset.key,{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('Key unavailable');return r.text();});
      var rawKey=keyText.trim().slice(-44);
      var decrypt=(await import('./hwb.js')).decryptHWB;
      var glb=await decrypt(encrypted,rawKey);
      loader.parse(glb,'',function(result){
        var object=result.scene;
        scene.add(object);var box=new THREE.Box3().setFromObject(object),size=box.getSize(new THREE.Vector3()),centre=box.getCenter(new THREE.Vector3()),span=Math.max(size.x,size.y,size.z)||1;object.position.sub(centre);camera.position.set(span*1.5,span*.8,span*2.1);camera.near=Math.max(span/1000,.001);camera.far=span*100;camera.updateProjectionMatrix();
        var controls=new controlsMod.OrbitControls(camera,canvas);controls.enableDamping=true;controls.target.set(0,0,0);controls.minDistance=span*.35;controls.maxDistance=span*8;
        var resize=function(){var w=host.clientWidth||300,h=host.clientHeight||300;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};resize();new ResizeObserver(resize).observe(host);
        var thumb=host.querySelector('.model-thumb');if(thumb)thumb.remove();if(loading)loading.remove();var spinner=host.querySelector('.hwb-loader');if(spinner)spinner.remove();host.insertBefore(canvas,host.firstChild);
        if(result.animations&&result.animations.length){var mixer=new THREE.AnimationMixer(object),clips=result.animations;var button=el('button','hwb-animation','Pause animation');button.type='button';button.setAttribute('aria-pressed','true');clips.forEach(function(clip){mixer.clipAction(clip).play();});var playing=true;button.addEventListener('click',function(){playing=!playing;button.textContent=playing?'Pause animation':'Play animation';button.setAttribute('aria-pressed',String(playing));});host.appendChild(button);var clock=new THREE.Clock();host.dataset.hasAnimation='1';host._hwbTick=function(){var dt=Math.min(clock.getDelta(),.1);if(playing)mixer.update(dt);};}
        (function loop(){if(!document.contains(host))return;requestAnimationFrame(loop);if(document.hidden||!host.getClientRects().length)return requestAnimationFrame(loop);if(host._hwbTick)host._hwbTick();controls.update();renderer.render(scene,camera);})();
      },undefined,function(){if(loading)loading.textContent='Could not render this model. Preview unavailable.';var spinner=host.querySelector('.hwb-loader');if(spinner)spinner.remove();});
    }catch(e){if(loading)loading.textContent='3D preview unavailable in this browser.';var spinner=host.querySelector('.hwb-loader');if(spinner)spinner.remove();}
  }

  /* ---------- Cube'z companion v2 ---------- */
  function upgradeBuddy(data){
    var root=document.querySelector('.buddy'),head=root&&root.querySelector('.buddy-head');if(!root||!head)return;
    var bubbles=el('span','buddy-bubbles');bubbles.innerHTML='<i></i><i></i><i></i>';root.appendChild(bubbles);
    var tools=el('button','buddy-tools','⋯');tools.type='button';tools.setAttribute('aria-label',"Cube'z menu");
    var menu=el('div','buddy-menu');menu.hidden=true;
    function item(text,href){var a=el('a','',text);a.href=href;menu.appendChild(a);return a;}
    item('Projects','#projects');item('3D gallery','#models');item('Latest videos','#videos');
    var whats=el('button','','What’s new?');whats.type='button';whats.addEventListener('click',function(){var repo=(data.repos||[]).find(function(r){return r.release&&r.release.tag_name;})||(data.repos||[])[0];say(repo?(repo.name+' is the latest project update'+(repo.release&&repo.release.tag_name?' — '+repo.release.tag_name:'')+'.'):"I haven't got a fresh project update right now.");menu.hidden=true;});menu.insertBefore(whats,menu.firstChild);
    var random=el('button','','Random dive');random.type='button';random.addEventListener('click',function(){var ids=['stream','videos','music','models','projects','devlog','discord'];var target=document.getElementById(ids[Math.floor(Math.random()*ids.length)]);if(target)target.scrollIntoView({behavior:'smooth'});menu.hidden=true;});menu.appendChild(random);
    tools.addEventListener('click',function(e){e.stopPropagation();menu.hidden=!menu.hidden;});menu.addEventListener('click',function(e){e.stopPropagation();});root.append(tools,menu);
    document.addEventListener('click',function(){menu.hidden=true;});
    addEventListener('depth',function(e){var d=e.detail.depth;root.classList.toggle('buddy-zone-twilight',d>=200&&d<1000);root.classList.toggle('buddy-zone-midnight',d>=1000&&d<4000);root.classList.toggle('buddy-zone-abyss',d>=4000);});
    var music=document.getElementById('music');if(music&&'IntersectionObserver'in window)new IntersectionObserver(function(es){root.classList.toggle('buddy-music',es[0].isIntersecting);},{threshold:.35}).observe(music);
  }

  /* ---------- ambient life ---------- */
  function addPlankton(){
    ['videos','music','models','projects'].forEach(function(id){var section=document.getElementById(id);if(!section||section.querySelector('.v2-plankton'))return;var layer=el('div','v2-plankton');layer.setAttribute('aria-hidden','true');for(var i=0;i<28;i++){var p=el('i');p.style.left=Math.random()*100+'%';p.style.top=Math.random()*100+'%';p.style.setProperty('--drift',(8+Math.random()*14)+'s');p.style.setProperty('--dx',(-25+Math.random()*50)+'px');p.style.setProperty('--dy',(-20-Math.random()*60)+'px');layer.appendChild(p);}section.insertBefore(layer,section.firstChild);});
  }

  /* ---------- optimized mascot ---------- */
  function useOptimizedMascot(){var probe=new Image();probe.onload=function(){[].forEach.call(document.querySelectorAll('img[src$="fishhwb-mascot.png"]'),function(img){img.src='assets/fishhwb-mascot.webp';});};probe.src='assets/fishhwb-mascot.webp';}

  document.addEventListener('DOMContentLoaded',function(){
    lazyMedia();renderGallery();addPlankton();useOptimizedMascot();
    projectDataPromise.then(function(data){
      upgradeBuddy(data);
      // extras.js starts its local JSON requests after this script. Give it a moment to
      // finish, then make the richer project/world render the final DOM state.
      setTimeout(function(){renderProjects(data);renderWorlds();}, 900);
    });
  });
})();

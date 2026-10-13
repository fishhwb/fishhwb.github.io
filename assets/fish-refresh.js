// 2026 FISH HWB sea-life art v5.
// Unifies every creature around the Aurora Jelly's translucent, bioluminescent visual language.
(function(){
  ['v3','v4'].forEach(function(v){
    var old = document.querySelector('link[data-fish-art-'+v+']');
    if(old) old.remove();
  });
  var artStyle = document.querySelector('link[data-fish-art-v5]');
  if(!artStyle){
    artStyle = document.createElement('link');
    artStyle.rel = 'stylesheet';
    artStyle.href = 'assets/fish-art-v5.css';
    artStyle.dataset.fishArtV5 = '1';
    document.head.appendChild(artStyle);
  }

  var count = 0;
  function uid(prefix){ count += 1; return prefix + '-' + count; }
  function variant(){ return count % 3; }
  function palette(v){
    return v === 1
      ? { glow:'#7cf7ff', mid:'#53d6ff', deep:'#4c49d8', soft:'#dffcff' }
      : v === 2
        ? { glow:'#ffc45d', mid:'#ff8fb8', deep:'#b94c8f', soft:'#fff1cf' }
        : { glow:'#ff7ed8', mid:'#bd70ff', deep:'#6d46d8', soft:'#ffe4f7' };
  }

  function auroraReef(id, v){
    var p = palette(v);
    return '<svg class="fish-art aurora-reef" viewBox="0 0 270 160" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="'+id+'-body" cx="64%" cy="36%" r="78%"><stop offset="0" stop-color="#fff" stop-opacity=".84"/><stop offset=".18" stop-color="'+p.glow+'" stop-opacity=".72"/><stop offset=".56" stop-color="'+p.mid+'" stop-opacity=".48"/><stop offset="1" stop-color="'+p.deep+'" stop-opacity=".16"/></radialGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".35" stop-color="'+p.glow+'" stop-opacity=".5"/><stop offset="1" stop-color="'+p.deep+'" stop-opacity=".03"/></linearGradient>' +
        '<radialGradient id="'+id+'-core"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".3" stop-color="'+p.glow+'" stop-opacity=".62"/><stop offset="1" stop-color="'+p.glow+'" stop-opacity="0"/></radialGradient>' +
        '<filter id="'+id+'-glow"><feGaussianBlur stdDeviation="2.4"/></filter>' +
        '<clipPath id="'+id+'-clip"><path d="M55 81C58 40 96 20 143 24c50 4 85 34 84 68-2 38-40 64-90 60-48-4-85-29-82-71z"/></clipPath>' +
      '</defs>' +
      '<g class="tail"><path d="M60 81C40 67 22 51 7 34c8 20 10 34 8 47-1 14-6 29-15 46 20-12 39-27 61-43z" fill="url(#'+id+'-fin)"/><path d="M14 47c15 10 28 21 41 34M10 81h46M13 116c16-10 29-21 42-33" fill="none" stroke="'+p.soft+'" stroke-opacity=".2" stroke-width="1"/></g>' +
      '<path class="dorsal" d="M83 46C99 8 145 3 187 26c-32-4-62 6-88 27z" fill="url(#'+id+'-fin)"/>' +
      '<path class="streamer" d="M128 31C146 2 169-4 192 4c-16 13-24 30-27 51-2 14-3 30-3 49-8-28-19-52-34-73z" fill="url(#'+id+'-fin)" opacity=".86"/>' +
      '<path class="ventral" d="M105 143c22 7 44 8 67 1-18 17-40 24-62 19-5-6-7-12-5-20z" fill="url(#'+id+'-fin)"/>' +
      '<path class="aurora-body" d="M55 81C58 40 96 20 143 24c50 4 85 34 84 68-2 38-40 64-90 60-48-4-85-29-82-71z" fill="url(#'+id+'-body)" stroke="'+p.glow+'" stroke-opacity=".26" stroke-width="1.2"/>' +
      '<g clip-path="url(#'+id+'-clip)">' +
        '<ellipse class="inner-core" cx="145" cy="88" rx="47" ry="34" fill="url(#'+id+'-core)" opacity=".5"/>' +
        '<path class="inner-vein" d="M76 85c35-15 81-15 121 2" fill="none" stroke="'+p.glow+'" stroke-opacity=".3" stroke-width="2"/>' +
        '<path class="aurora-band" d="M78 51c32-17 80-19 119-3" fill="none" stroke="'+p.soft+'" stroke-opacity=".28" stroke-width="8" stroke-linecap="round"/>' +
        '<g fill="'+p.soft+'" opacity=".34"><circle cx="98" cy="62" r="1.4"/><circle cx="116" cy="50" r="1"/><circle cx="133" cy="72" r="1.2"/><circle cx="157" cy="55" r="1.1"/><circle cx="177" cy="75" r="1.3"/><circle cx="118" cy="105" r="1.1"/><circle cx="152" cy="115" r="1.4"/></g>' +
      '</g>' +
      '<path class="pectoral" d="M159 98c-19 3-36 14-49 31 23 1 43-7 57-24z" fill="url(#'+id+'-fin)"/>' +
      '<path d="M194 63c-5 11-5 26 1 36" fill="none" stroke="'+p.soft+'" stroke-opacity=".22" stroke-width="1.1"/>' +
      '<ellipse cx="209" cy="62" rx="5.2" ry="5.6" fill="'+p.soft+'" fill-opacity=".5"/><ellipse class="fish-pupil" cx="210" cy="62.5" rx="2" ry="2.5" fill="'+p.deep+'"/><circle cx="211" cy="61" r=".7" fill="#fff"/>' +
      '<path d="M223 87c4 .7 8 0 11-2.5" fill="none" stroke="'+p.soft+'" stroke-opacity=".32" stroke-width="1.1" stroke-linecap="round"/>' +
    '</svg>';
  }

  function auroraGlider(id, v){
    var p = palette(v);
    return '<svg class="fish-art aurora-glider" viewBox="0 0 300 130" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1=".2" x2="1" y2=".7"><stop offset="0" stop-color="'+p.deep+'" stop-opacity=".22"/><stop offset=".28" stop-color="'+p.mid+'" stop-opacity=".55"/><stop offset=".58" stop-color="'+p.glow+'" stop-opacity=".7"/><stop offset=".82" stop-color="'+p.deep+'" stop-opacity=".4"/><stop offset="1" stop-color="#0c1832" stop-opacity=".2"/></linearGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".56"/><stop offset=".38" stop-color="'+p.glow+'" stop-opacity=".44"/><stop offset="1" stop-color="'+p.deep+'" stop-opacity=".02"/></linearGradient>' +
        '<radialGradient id="'+id+'-core"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".28" stop-color="'+p.glow+'" stop-opacity=".5"/><stop offset="1" stop-color="'+p.glow+'" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<g class="tail"><path d="M63 65L11 26c12 18 15 31 14 40-1 10-5 23-16 38l55-34z" fill="url(#'+id+'-fin)"/><path d="M18 37l40 27M14 66h43M18 95l40-27" fill="none" stroke="'+p.soft+'" stroke-opacity=".18" stroke-width=".9"/></g>' +
      '<path class="dorsal" d="M94 38c38-23 93-24 139-4-45-5-88 0-128 17z" fill="url(#'+id+'-fin)"/>' +
      '<path class="ventral" d="M113 95c36 12 81 13 121 3-37 20-82 24-115 13z" fill="url(#'+id+'-fin)"/>' +
      '<path class="aurora-body" d="M58 65c21-29 73-44 134-35 51 7 87 25 98 42-10 19-49 36-101 38-61 2-109-12-131-45z" fill="url(#'+id+'-body)" stroke="'+p.glow+'" stroke-opacity=".2" stroke-width="1.1"/>' +
      '<ellipse class="inner-core" cx="172" cy="68" rx="58" ry="25" fill="url(#'+id+'-core)" opacity=".34"/>' +
      '<path class="inner-vein" d="M81 71c51-12 112-9 164 7" fill="none" stroke="'+p.glow+'" stroke-opacity=".25" stroke-width="1.7"/>' +
      '<path class="aurora-band" d="M79 47c53-15 121-12 174 9" fill="none" stroke="'+p.soft+'" stroke-opacity=".22" stroke-width="7" stroke-linecap="round"/>' +
      '<g class="scale-specks" fill="'+p.soft+'" opacity=".27"><circle cx="104" cy="59" r="1"/><circle cx="121" cy="49" r="1.2"/><circle cx="140" cy="63" r=".9"/><circle cx="160" cy="48" r="1.1"/><circle cx="183" cy="58" r="1.2"/><circle cx="205" cy="47" r=".9"/><circle cx="222" cy="66" r="1.1"/><circle cx="128" cy="82" r="1"/><circle cx="174" cy="88" r="1.2"/><circle cx="216" cy="85" r=".9"/></g>' +
      '<path class="pectoral" d="M183 73c-20 5-38 14-51 28 23 1 42-5 57-21z" fill="url(#'+id+'-fin)"/>' +
      '<path d="M238 50c-4 8-3 20 2 28" fill="none" stroke="'+p.soft+'" stroke-opacity=".2" stroke-width="1"/>' +
      '<ellipse cx="258" cy="54" rx="4.8" ry="5.1" fill="'+p.soft+'" fill-opacity=".44"/><ellipse class="fish-pupil" cx="259" cy="54.2" rx="1.8" ry="2.2" fill="'+p.deep+'"/><circle cx="260" cy="53" r=".65" fill="#fff"/>' +
      '<path d="M276 72c4 .7 7 0 10-2" fill="none" stroke="'+p.soft+'" stroke-opacity=".3" stroke-width="1" stroke-linecap="round"/>' +
    '</svg>';
  }

  // Kept deliberately unchanged from the previous pass.
  function auroraJelly(id, v){
    var glow = v === 1 ? '#7cf7ff' : v === 2 ? '#ffc45d' : '#ff7ed8';
    var deep = v === 1 ? '#4c49d8' : v === 2 ? '#b94c8f' : '#6d46d8';
    return '<svg class="fish-art aurora-jelly" viewBox="0 0 150 210" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="'+id+'-bell" cx="42%" cy="25%" r="78%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".2" stop-color="'+glow+'" stop-opacity=".8"/><stop offset=".56" stop-color="'+deep+'" stop-opacity=".52"/><stop offset="1" stop-color="#17134a" stop-opacity=".12"/></radialGradient>' +
        '<radialGradient id="'+id+'-core" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="'+glow+'" stop-opacity=".75"/><stop offset="1" stop-color="'+glow+'" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="'+id+'-tent" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset=".28" stop-color="'+glow+'" stop-opacity=".72"/><stop offset="1" stop-color="'+deep+'" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      '<g class="tentacles">' +
        '<path class="ribbon r1" d="M34 78c-19 26 10 39-5 68s13 39-5 61" fill="none" stroke="url(#'+id+'-tent)" stroke-width="3" stroke-linecap="round"/>' +
        '<path class="ribbon r2" d="M116 77c20 29-12 43 4 71s-12 36 5 58" fill="none" stroke="url(#'+id+'-tent)" stroke-width="3" stroke-linecap="round"/>' +
        '<path class="ribbon r3" d="M52 80c-14 23 11 33-2 58s10 33-2 64" fill="none" stroke="url(#'+id+'-tent)" stroke-width="5" stroke-linecap="round" opacity=".78"/>' +
        '<path class="ribbon r4" d="M98 80c14 23-11 33 2 58s-10 33 2 64" fill="none" stroke="url(#'+id+'-tent)" stroke-width="5" stroke-linecap="round" opacity=".78"/>' +
        '<path class="ribbon r5" d="M67 82c-10 18 8 28-1 46s7 27 0 73" fill="none" stroke="'+glow+'" stroke-opacity=".48" stroke-width="8" stroke-linecap="round"/>' +
        '<path class="ribbon r6" d="M83 82c10 18-8 28 1 46s-7 27 0 73" fill="none" stroke="'+glow+'" stroke-opacity=".48" stroke-width="8" stroke-linecap="round"/>' +
      '</g>' +
      '<g class="bell">' +
        '<path d="M12 80C12 29 39 8 75 8s63 21 63 72c-12 9-20-2-31 4-12 6-21-5-32 2-11-7-20 4-32-2-11-6-20 4-31-4z" fill="url(#'+id+'-bell)" stroke="'+glow+'" stroke-opacity=".78" stroke-width="2.6"/>' +
        '<ellipse class="jelly-core" cx="75" cy="59" rx="27" ry="25" fill="url(#'+id+'-core)"/>' +
        '<path d="M27 55c9-25 29-37 52-39" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M40 74c8-18 18-29 31-35M76 79c5-23 14-39 29-51M103 76c5-15 13-25 23-31" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>' +
        '<g class="aurora-specks" fill="#fff"><circle cx="42" cy="39" r="2"/><circle cx="112" cy="35" r="1.7"/><circle cx="95" cy="21" r="1.4"/><circle cx="55" cy="24" r="1.5"/><circle cx="120" cy="58" r="1.2"/></g>' +
      '</g>' +
    '</svg>';
  }

  function auroraLantern(id, v){
    var p = palette(v);
    return '<svg class="fish-art aurora-lantern" viewBox="0 0 295 125" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1=".2" x2="1" y2=".7"><stop offset="0" stop-color="'+p.deep+'" stop-opacity=".18"/><stop offset=".38" stop-color="#0d1730" stop-opacity=".7"/><stop offset=".7" stop-color="'+p.mid+'" stop-opacity=".28"/><stop offset="1" stop-color="#020714" stop-opacity=".82"/></linearGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+p.soft+'" stop-opacity=".42"/><stop offset=".45" stop-color="'+p.glow+'" stop-opacity=".27"/><stop offset="1" stop-color="'+p.deep+'" stop-opacity=".02"/></linearGradient>' +
        '<radialGradient id="'+id+'-core"><stop offset="0" stop-color="#fff" stop-opacity=".88"/><stop offset=".25" stop-color="'+p.glow+'" stop-opacity=".66"/><stop offset="1" stop-color="'+p.glow+'" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<g class="tail"><path d="M64 63L12 32c12 14 15 25 14 33-1 9-6 20-17 31l56-28z" fill="url(#'+id+'-fin)"/></g>' +
      '<path class="dorsal" d="M102 34c34-19 82-19 123-2-40-4-79 1-115 15z" fill="url(#'+id+'-fin)"/>' +
      '<path class="ventral" d="M116 91c37 11 82 11 120 0-36 19-79 22-114 12z" fill="url(#'+id+'-fin)"/>' +
      '<path class="aurora-body" d="M59 63c21-27 71-40 129-33 50 6 87 23 98 39-11 19-49 34-100 35-59 1-106-13-127-41z" fill="url(#'+id+'-body)" stroke="'+p.glow+'" stroke-opacity=".18" stroke-width="1"/>' +
      '<ellipse class="inner-core" cx="162" cy="65" rx="36" ry="17" fill="url(#'+id+'-core)" opacity=".4"/>' +
      '<path class="inner-vein" d="M84 70c43-10 95-9 141 5" fill="none" stroke="'+p.glow+'" stroke-opacity=".28" stroke-width="1.5"/>' +
      '<path class="aurora-band" d="M80 47c54-13 121-10 172 8" fill="none" stroke="'+p.soft+'" stroke-opacity=".15" stroke-width="7" stroke-linecap="round"/>' +
      '<path class="pectoral" d="M180 72c-21 5-39 14-53 28 24 1 44-5 59-21z" fill="url(#'+id+'-fin)"/>' +
      '<g fill="'+p.glow+'" style="color:'+p.glow+'"><circle class="photophore" cx="89" cy="80" r="1.6"/><circle class="photophore" cx="106" cy="84" r="1.5"/><circle class="photophore" cx="124" cy="87" r="1.6"/><circle class="photophore" cx="143" cy="88" r="1.4"/><circle class="photophore" cx="162" cy="88" r="1.6"/><circle class="photophore" cx="181" cy="86" r="1.5"/><circle class="photophore" cx="200" cy="82" r="1.6"/><circle class="photophore" cx="219" cy="77" r="1.5"/><circle class="photophore" cx="132" cy="60" r="1"/><circle class="photophore" cx="160" cy="61" r="1"/><circle class="photophore" cx="188" cy="58" r="1"/></g>' +
      '<ellipse cx="251" cy="53" rx="4.5" ry="5" fill="'+p.soft+'" fill-opacity=".34"/><ellipse class="fish-pupil" cx="252" cy="53.3" rx="1.7" ry="2.1" fill="'+p.glow+'" opacity=".75"/><circle cx="253" cy="52" r=".6" fill="#fff"/>' +
      '<path d="M269 70c3 .6 7 0 9-2" fill="none" stroke="'+p.soft+'" stroke-opacity=".25" stroke-width=".9" stroke-linecap="round"/>' +
    '</svg>';
  }

  function upgradeFish(){
    [].forEach.call(document.querySelectorAll('.critter'), function(el){
      if(el.dataset.artUpgraded === '5') return;
      var id = uid('fish'), v = variant();
      if(el.classList.contains('clown')){ el.innerHTML = auroraReef(id,v); el.dataset.artSpecies='aurora-reef'; }
      else if(el.classList.contains('tang')){ el.innerHTML = auroraGlider(id,v); el.dataset.artSpecies='aurora-glider'; }
      else if(el.classList.contains('jelly')){ el.innerHTML = auroraJelly(id,v); el.dataset.artSpecies='aurora-jelly'; }
      else if(el.classList.contains('lantern')){ el.innerHTML = auroraLantern(id,v); el.dataset.artSpecies='aurora-lantern'; }
      else return;
      el.dataset.artVariant = String(v);
      el.dataset.artUpgraded = '5';
      el.style.setProperty('--art-delay', (-Math.random()*8).toFixed(2)+'s');
      el.style.setProperty('--art-speed', (6.4+Math.random()*3.6).toFixed(2)+'s');
      el.style.setProperty('--art-roll', ((Math.random()-.5)*1.3).toFixed(2)+'deg');
    });
  }

  function upgradeAngler(){
    var a = document.querySelector('.angler');
    if(!a || a.dataset.artUpgraded === '5') return;
    a.dataset.artUpgraded = '5';
    a.dataset.artSpecies = 'aurora-angler';
    a.innerHTML =
      '<defs>' +
        '<radialGradient id="angler-v5-body" cx="58%" cy="42%" r="78%"><stop offset="0" stop-color="#7cf7ff" stop-opacity=".38"/><stop offset=".28" stop-color="#35406f" stop-opacity=".5"/><stop offset=".68" stop-color="#11152e" stop-opacity=".82"/><stop offset="1" stop-color="#03040c" stop-opacity=".92"/></radialGradient>' +
        '<linearGradient id="angler-v5-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e7ffff" stop-opacity=".34"/><stop offset=".42" stop-color="#7cf7ff" stop-opacity=".24"/><stop offset="1" stop-color="#6d46d8" stop-opacity=".02"/></linearGradient>' +
        '<radialGradient id="angler-v5-core"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="#7cf7ff" stop-opacity=".55"/><stop offset="1" stop-color="#7cf7ff" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="angler-v5-lure"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="#eaffff"/><stop offset=".48" stop-color="#7cf7ff" stop-opacity=".76"/><stop offset="1" stop-color="#7cf7ff" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<g class="angler-tail"><path d="M51 72L7 42c10 15 13 27 12 36-1 9-6 21-15 33l49-32z" fill="url(#angler-v5-fin)"/></g>' +
      '<path class="lure-stalk" d="M102 39C116 12 148 7 171 22" fill="none" stroke="#b7f7ff" stroke-opacity=".44" stroke-width="1.5" stroke-linecap="round"/>' +
      '<circle cx="172" cy="22" r="20" fill="url(#angler-v5-lure)" opacity=".82"/>' +
      '<path class="aurora-body" d="M44 74c-1-32 24-55 62-56 40-1 68 21 70 51 2 33-26 58-69 58-39 0-62-19-63-53z" fill="url(#angler-v5-body)" stroke="#7cf7ff" stroke-opacity=".18" stroke-width="1.1"/>' +
      '<ellipse class="inner-core" cx="103" cy="72" rx="35" ry="27" fill="url(#angler-v5-core)" opacity=".22"/>' +
      '<path class="angler-spines" d="M69 34l-5-18 11 12 4-19 8 17 10-13 1 18 13-9-4 19" fill="url(#angler-v5-fin)" opacity=".72"/>' +
      '<path class="inner-vein" d="M62 77c27-10 56-9 84 0" fill="none" stroke="#7cf7ff" stroke-opacity=".18" stroke-width="1.2"/>' +
      '<path d="M119 68c17-8 39-8 54 0-4 25-19 38-43 32 9-8 8-22-11-32z" fill="#02030a" fill-opacity=".86" stroke="#dfffff" stroke-opacity=".16" stroke-width="1"/>' +
      '<g fill="#efffff" opacity=".78"><path d="M124 69l4 10 4-11 4 12 4-12 5 12 4-12 4 11 4-9z"/><path d="M129 98l4-9 4 10 4-11 4 10 4-9 3 7z"/></g>' +
      '<path class="angler-pectoral" d="M90 84c-14 13-27 17-38 13 10-12 23-17 38-13z" fill="url(#angler-v5-fin)"/>' +
      '<ellipse cx="119" cy="50" rx="4.6" ry="5" fill="#eaffff" fill-opacity=".22"/><ellipse cx="120" cy="50" rx="1.7" ry="2.1" fill="#7cf7ff" opacity=".72"/>' +
      '<circle class="lure-core" cx="172" cy="22" r="5.5" fill="#f3ffff" stroke="#7cf7ff" stroke-opacity=".66" stroke-width="1"/>';
  }

  function run(){ upgradeFish(); upgradeAngler(); }
  run();
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  addEventListener('load', run, {once:true});

  var observer = new MutationObserver(function(changes){
    for(var i=0;i<changes.length;i++){
      if(changes[i].addedNodes && changes[i].addedNodes.length){ upgradeFish(); break; }
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();

// 2026 FISH HWB sea-life art v4.
// Anatomy-first fish illustrations; the successful Aurora Jelly design is retained.
(function(){
  var oldStyle = document.querySelector('link[data-fish-art-v3]');
  if (oldStyle) oldStyle.remove();
  var artStyle = document.querySelector('link[data-fish-art-v4]');
  if (!artStyle) {
    artStyle = document.createElement('link');
    artStyle.rel = 'stylesheet';
    artStyle.href = 'assets/fish-art-v4.css';
    artStyle.dataset.fishArtV4 = '1';
    document.head.appendChild(artStyle);
  }

  var count = 0;
  function uid(prefix){ count += 1; return prefix + '-' + count; }
  function variant(){ return count % 3; }

  function moorishIdol(id, v){
    var gold = v === 1 ? '#f2c94c' : v === 2 ? '#ffb84d' : '#ffd85c';
    var cool = v === 1 ? '#54c5d8' : v === 2 ? '#6a8cff' : '#3fb6d3';
    return '<svg class="fish-art moorish-idol" viewBox="0 0 270 190" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="'+id+'-body" cx="66%" cy="38%" r="76%"><stop offset="0" stop-color="#fffdf3"/><stop offset=".34" stop-color="#f4f0df"/><stop offset=".7" stop-color="#d8d3bf"/><stop offset="1" stop-color="#aaa58f"/></radialGradient>' +
        '<linearGradient id="'+id+'-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0a4"/><stop offset=".42" stop-color="'+gold+'"/><stop offset="1" stop-color="#c67816"/></linearGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".68"/><stop offset=".45" stop-color="'+cool+'" stop-opacity=".38"/><stop offset="1" stop-color="#173044" stop-opacity=".05"/></linearGradient>' +
        '<linearGradient id="'+id+'-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".48" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<clipPath id="'+id+'-clip"><path d="M58 95C60 44 99 20 147 25c47 5 80 38 76 75-5 42-43 69-91 63-46-6-76-30-74-68z"/></clipPath>' +
      '</defs>' +
      '<g class="tail"><path d="M62 96C43 80 27 67 10 58c8 18 10 31 9 39 0 10-3 23-11 39 19-9 36-22 55-38z" fill="url(#'+id+'-gold)" stroke="#423b2f" stroke-opacity=".55" stroke-width="1.4"/><path d="M18 68c15 9 27 18 40 28M14 97h45M18 126c15-9 27-18 40-28" fill="none" stroke="#7a6023" stroke-opacity=".4" stroke-width="1"/></g>' +
      '<path class="dorsal" d="M86 44C104 4 156 5 190 28c-28-4-55 2-79 21z" fill="url(#'+id+'-fin)" stroke="#31424d" stroke-opacity=".5" stroke-width="1.2"/>' +
      '<path class="streamer" d="M126 31C143 5 163-3 182 2c-9 8-15 17-20 28-5 12-7 30-8 53-8-20-17-36-28-52z" fill="url(#'+id+'-fin)" stroke="#31424d" stroke-opacity=".4" stroke-width="1.1"/>' +
      '<path class="ventral" d="M103 153c17 12 34 18 53 17-16 13-35 18-53 12-7-8-10-18-10-29z" fill="url(#'+id+'-fin)" stroke="#31424d" stroke-opacity=".45" stroke-width="1.1"/>' +
      '<path d="M58 95C60 44 99 20 147 25c47 5 80 38 76 75-5 42-43 69-91 63-46-6-76-30-74-68z" fill="url(#'+id+'-body)" stroke="#2d3232" stroke-opacity=".55" stroke-width="1.5"/>' +
      '<g clip-path="url(#'+id+'-clip)">' +
        '<path d="M86 17c-2 42 8 91 29 145" fill="none" stroke="#1b1d1f" stroke-width="22" opacity=".93"/>' +
        '<path d="M142 17c-6 37 3 94 26 151" fill="none" stroke="#191b1d" stroke-width="24" opacity=".93"/>' +
        '<path d="M189 29c-9 34-6 82 11 120" fill="none" stroke="url(#'+id+'-gold)" stroke-width="24" opacity=".96"/>' +
        '<path class="scale-shimmer" d="M73 58c37-26 94-29 133-4" fill="none" stroke="url(#'+id+'-sheen)" stroke-width="10" stroke-linecap="round"/>' +
        '<g fill="none" stroke="#6d736f" stroke-opacity=".18" stroke-width=".8"><path d="M99 59q7 5 14 0M111 68q7 5 14 0M95 78q7 5 14 0M124 84q7 5 14 0M103 98q7 5 14 0M136 103q7 5 14 0M113 116q7 5 14 0M149 120q7 5 14 0"/></g>' +
      '</g>' +
      '<path class="pectoral" d="M159 104c-18 3-34 14-43 30 20 2 38-6 52-23z" fill="url(#'+id+'-fin)" stroke="#37464f" stroke-opacity=".45" stroke-width="1.1"/>' +
      '<path d="M190 68c-7 13-7 32 1 45" fill="none" stroke="#655f4c" stroke-width="1.2" stroke-linecap="round"/>' +
      '<ellipse cx="205" cy="66" rx="6.3" ry="6.8" fill="#cbb777" stroke="#252a2b" stroke-width="1.2"/>' +
      '<ellipse class="fish-pupil" cx="206" cy="66.5" rx="2.7" ry="3.2" fill="#080b0c"/>' +
      '<circle cx="207" cy="65" r=".9" fill="#fff"/>' +
      '<path d="M220 91c5 1 9 0 13-3" fill="none" stroke="#353431" stroke-width="1.2" stroke-linecap="round"/>' +
      '<path d="M80 42c-3 26-2 59 6 88" fill="none" stroke="'+cool+'" stroke-opacity=".16" stroke-width="3"/>' +
    '</svg>';
  }

  function opalWrasse(id, v){
    var cyan = v === 1 ? '#63e5d2' : v === 2 ? '#74c9ff' : '#5ce4ff';
    var violet = v === 1 ? '#745cff' : v === 2 ? '#d86dff' : '#7c66ff';
    var warm = v === 1 ? '#ffd46d' : v === 2 ? '#ff8c76' : '#ffcc67';
    return '<svg class="fish-art opal-wrasse" viewBox="0 0 285 130" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1="0" x2="1" y2=".2"><stop offset="0" stop-color="#16394a"/><stop offset=".25" stop-color="#1e6c7b"/><stop offset=".48" stop-color="'+cyan+'"/><stop offset=".68" stop-color="'+violet+'"/><stop offset=".88" stop-color="#26356f"/><stop offset="1" stop-color="#132033"/></linearGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efffff" stop-opacity=".55"/><stop offset=".42" stop-color="'+cyan+'" stop-opacity=".42"/><stop offset="1" stop-color="'+violet+'" stop-opacity=".08"/></linearGradient>' +
        '<linearGradient id="'+id+'-stripe" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="'+warm+'" stop-opacity="0"/><stop offset=".28" stop-color="'+warm+'" stop-opacity=".85"/><stop offset=".7" stop-color="#fff4bf" stop-opacity=".72"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<clipPath id="'+id+'-clip"><path d="M55 65c20-30 69-45 127-36 48 7 81 26 88 43-8 19-43 36-91 39-56 4-102-11-124-46z"/></clipPath>' +
      '</defs>' +
      '<g class="tail"><path d="M58 65L12 29c10 17 12 30 12 37s-3 22-14 38l49-34z" fill="url(#'+id+'-fin)" stroke="#23414c" stroke-opacity=".55" stroke-width="1.2"/><path d="M19 38l35 26M15 66h40M18 95l37-26" fill="none" stroke="#cfefff" stroke-opacity=".28" stroke-width="1"/></g>' +
      '<path class="dorsal" d="M91 37c34-25 89-27 134-6-43-5-84 0-122 17z" fill="url(#'+id+'-fin)" stroke="#294a58" stroke-opacity=".4" stroke-width="1"/>' +
      '<path class="ventral" d="M105 96c34 13 76 14 116 3-36 22-77 25-107 11z" fill="url(#'+id+'-fin)" stroke="#294a58" stroke-opacity=".4" stroke-width="1"/>' +
      '<path d="M55 65c20-30 69-45 127-36 48 7 81 26 88 43-8 19-43 36-91 39-56 4-102-11-124-46z" fill="url(#'+id+'-body)" stroke="#183542" stroke-opacity=".62" stroke-width="1.4"/>' +
      '<g clip-path="url(#'+id+'-clip)">' +
        '<path class="scale-shimmer" d="M70 48c50-16 115-13 167 8" fill="none" stroke="#dffcff" stroke-opacity=".24" stroke-width="9" stroke-linecap="round"/>' +
        '<path d="M75 82c46-5 100 2 145 18" fill="none" stroke="url(#'+id+'-stripe)" stroke-width="6" stroke-linecap="round"/>' +
        '<path d="M99 35c14 18 27 42 34 70M140 28c12 20 24 46 29 79M183 29c9 21 17 45 21 72" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>' +
        '<g fill="none" stroke="#d9ffff" stroke-opacity=".17" stroke-width=".75"><path d="M94 55q7 5 14 0M108 62q7 5 14 0M122 54q7 5 14 0M138 67q7 5 14 0M154 57q7 5 14 0M171 70q7 5 14 0M188 61q7 5 14 0M202 75q7 5 14 0M117 78q7 5 14 0M147 86q7 5 14 0"/></g>' +
      '</g>' +
      '<path class="pectoral" d="M171 72c-18 5-33 14-44 27 21 1 38-5 51-20z" fill="url(#'+id+'-fin)" stroke="#294a58" stroke-opacity=".42" stroke-width="1"/>' +
      '<path d="M224 50c-4 9-3 22 2 30" fill="none" stroke="#183a46" stroke-width="1.1"/>' +
      '<ellipse cx="242" cy="54" rx="5.4" ry="5.8" fill="#7fcbd1" stroke="#122a33" stroke-width="1.1"/>' +
      '<ellipse class="fish-pupil" cx="243" cy="54.4" rx="2.4" ry="2.8" fill="#071116"/>' +
      '<circle cx="244" cy="53" r=".8" fill="#fff"/>' +
      '<path d="M260 72c4 .8 8 0 11-2.6" fill="none" stroke="#17303a" stroke-width="1.1" stroke-linecap="round"/>' +
    '</svg>';
  }

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

  function ghostLantern(id, v){
    var glow = v === 1 ? '#83ffcf' : v === 2 ? '#ff72cf' : '#74eaff';
    var edge = v === 1 ? '#5c8b78' : v === 2 ? '#785370' : '#526f86';
    return '<svg class="fish-art ghost-lantern" viewBox="0 0 285 120" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1="0" x2="1" y2=".2"><stop offset="0" stop-color="#172a35" stop-opacity=".84"/><stop offset=".42" stop-color="#10202b" stop-opacity=".92"/><stop offset=".74" stop-color="#09121b" stop-opacity=".97"/><stop offset="1" stop-color="#03070b"/></linearGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c7f6ff" stop-opacity=".38"/><stop offset=".55" stop-color="'+edge+'" stop-opacity=".22"/><stop offset="1" stop-color="#06101a" stop-opacity=".04"/></linearGradient>' +
        '<linearGradient id="'+id+'-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dffaff" stop-opacity="0"/><stop offset=".48" stop-color="#dffaff" stop-opacity=".34"/><stop offset="1" stop-color="#dffaff" stop-opacity="0"/></linearGradient>' +
        '<radialGradient id="'+id+'-organ"><stop offset="0" stop-color="#e6ffff" stop-opacity=".75"/><stop offset=".32" stop-color="'+glow+'" stop-opacity=".38"/><stop offset="1" stop-color="'+glow+'" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<g class="tail"><path d="M62 60L13 30c10 13 14 23 14 31 0 9-5 20-16 31l51-27z" fill="url(#'+id+'-fin)" stroke="'+edge+'" stroke-opacity=".45" stroke-width="1.1"/><path d="M21 38l36 22M17 61h40M21 84l36-20" fill="none" stroke="#c4e3ec" stroke-opacity=".22" stroke-width=".8"/></g>' +
      '<path class="dorsal" d="M100 31c31-18 77-19 118-4-39-3-77 2-111 15z" fill="url(#'+id+'-fin)" stroke="'+edge+'" stroke-opacity=".34" stroke-width=".9"/>' +
      '<path class="ventral" d="M110 88c34 11 77 11 113 1-34 19-75 22-107 12z" fill="url(#'+id+'-fin)" stroke="'+edge+'" stroke-opacity=".34" stroke-width=".9"/>' +
      '<path d="M58 61c20-26 68-39 123-32 49 6 84 22 95 38-10 18-47 33-95 34-56 1-101-13-123-40z" fill="url(#'+id+'-body)" stroke="'+edge+'" stroke-opacity=".56" stroke-width="1.2"/>' +
      '<path class="scale-shimmer" d="M78 46c52-14 117-10 166 8" fill="none" stroke="url(#'+id+'-glass)" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M82 70c39-9 88-8 130 4" fill="none" stroke="'+glow+'" stroke-opacity=".24" stroke-width="1.4"/>' +
      '<ellipse cx="151" cy="62" rx="24" ry="11" fill="url(#'+id+'-organ)" opacity=".48"/>' +
      '<path class="pectoral" d="M175 68c-19 4-36 13-48 25 21 2 40-4 55-17z" fill="url(#'+id+'-fin)" stroke="'+edge+'" stroke-opacity=".4" stroke-width=".9"/>' +
      '<g fill="'+glow+'" style="color:'+glow+'">' +
        '<circle class="photophore" cx="86" cy="78" r="1.7"/><circle class="photophore" cx="101" cy="82" r="1.5"/><circle class="photophore" cx="117" cy="85" r="1.7"/><circle class="photophore" cx="134" cy="86" r="1.4"/><circle class="photophore" cx="151" cy="86" r="1.6"/><circle class="photophore" cx="168" cy="84" r="1.5"/><circle class="photophore" cx="185" cy="80" r="1.6"/><circle class="photophore" cx="202" cy="76" r="1.5"/>' +
        '<circle class="photophore" cx="123" cy="57" r="1.1"/><circle class="photophore" cx="149" cy="59" r="1.1"/><circle class="photophore" cx="175" cy="56" r="1.1"/>' +
      '</g>' +
      '<path d="M228 49c-3 7-2 17 2 24" fill="none" stroke="'+edge+'" stroke-opacity=".55" stroke-width="1"/>' +
      '<ellipse cx="245" cy="51" rx="5.2" ry="5.8" fill="#071119" stroke="#8ca7b5" stroke-opacity=".7" stroke-width="1"/>' +
      '<ellipse class="fish-pupil" cx="246" cy="51.3" rx="2.2" ry="2.7" fill="'+glow+'" opacity=".8"/>' +
      '<circle cx="247" cy="50" r=".7" fill="#fff"/>' +
      '<path d="M264 68c3 .7 7 0 9-2" fill="none" stroke="#738895" stroke-width="1" stroke-linecap="round"/>' +
    '</svg>';
  }

  function upgradeFish(){
    [].forEach.call(document.querySelectorAll('.critter:not([data-art-upgraded])'), function(el){
      var id = uid('fish');
      var v = variant();
      if (el.classList.contains('clown')) { el.innerHTML = moorishIdol(id, v); el.dataset.artSpecies = 'moorish-idol'; }
      else if (el.classList.contains('tang')) { el.innerHTML = opalWrasse(id, v); el.dataset.artSpecies = 'opal-wrasse'; }
      else if (el.classList.contains('jelly')) { el.innerHTML = auroraJelly(id, v); el.dataset.artSpecies = 'aurora-jelly'; }
      else if (el.classList.contains('lantern')) { el.innerHTML = ghostLantern(id, v); el.dataset.artSpecies = 'ghost-lantern'; }
      else return;
      el.dataset.artVariant = String(v);
      el.dataset.artUpgraded = '3';
      el.style.setProperty('--art-delay', (-Math.random() * 8).toFixed(2) + 's');
      el.style.setProperty('--art-speed', (6.1 + Math.random() * 3.4).toFixed(2) + 's');
      el.style.setProperty('--art-roll', ((Math.random() - .5) * 1.8).toFixed(2) + 'deg');
    });
  }

  function upgradeAngler(){
    var a = document.querySelector('.angler');
    if (!a || a.dataset.artUpgraded === '3') return;
    a.dataset.artUpgraded = '3';
    a.innerHTML =
      '<defs>' +
        '<radialGradient id="angler-v4-body" cx="62%" cy="36%" r="80%"><stop offset="0" stop-color="#405564"/><stop offset=".38" stop-color="#1c2935"/><stop offset=".78" stop-color="#081018"/><stop offset="1" stop-color="#020407"/></radialGradient>' +
        '<linearGradient id="angler-v4-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#93afbd" stop-opacity=".34"/><stop offset="1" stop-color="#15232e" stop-opacity=".04"/></linearGradient>' +
        '<radialGradient id="angler-v4-lure"><stop offset="0" stop-color="#fff"/><stop offset=".24" stop-color="#dfffff"/><stop offset=".48" stop-color="#75efff" stop-opacity=".72"/><stop offset="1" stop-color="#75efff" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<g class="angler-tail"><path d="M49 70L7 42c9 15 12 26 11 34-1 9-5 19-13 30l46-29z" fill="url(#angler-v4-fin)" stroke="#536674" stroke-opacity=".5" stroke-width="1.2"/></g>' +
      '<path class="lure-stalk" d="M102 39C114 13 145 6 167 21" fill="none" stroke="#627985" stroke-width="1.7" stroke-linecap="round"/>' +
      '<circle cx="168" cy="21" r="18" fill="url(#angler-v4-lure)" opacity=".72"/>' +
      '<path d="M44 73c-1-31 24-54 61-55 39-1 65 22 67 51 2 31-25 54-66 54-38 0-61-17-62-50z" fill="url(#angler-v4-body)" stroke="#536674" stroke-opacity=".58" stroke-width="1.3"/>' +
      '<path d="M67 30l-5-18 11 12 3-18 8 17 9-13 1 18 12-9-4 18" fill="#101a22" stroke="#536674" stroke-opacity=".48" stroke-width="1.1"/>' +
      '<path d="M60 51c14-16 33-25 57-27" fill="none" stroke="#9bb2be" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M116 66c16-8 37-8 51-1-4 24-18 36-41 31 9-8 8-21-10-30z" fill="#010203" stroke="#536674" stroke-opacity=".65" stroke-width="1.2"/>' +
      '<g fill="#eaf1f4" opacity=".88"><path d="M121 66l4 10 4-11 4 12 4-12 5 12 4-12 4 11 4-9z"/><path d="M126 94l4-9 4 10 4-11 4 10 4-9 3 7z"/></g>' +
      '<path class="angler-pectoral" d="M88 82c-13 12-25 16-36 12 10-11 22-15 36-12z" fill="url(#angler-v4-fin)" stroke="#536674" stroke-opacity=".45" stroke-width="1"/>' +
      '<ellipse cx="117" cy="49" rx="5" ry="5.5" fill="#050b10" stroke="#839aa7" stroke-opacity=".7" stroke-width="1"/>' +
      '<ellipse cx="118" cy="49" rx="2" ry="2.5" fill="#99eaff" opacity=".7"/>' +
      '<circle class="lure-core" cx="168" cy="21" r="5.2" fill="#eaffff" stroke="#75efff" stroke-width="1.1"/>';
  }

  function run(){ upgradeFish(); upgradeAngler(); }
  run();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once:true });
  addEventListener('load', run, { once:true });

  var observer = new MutationObserver(function(changes){
    for (var i = 0; i < changes.length; i++) {
      if (changes[i].addedNodes && changes[i].addedNodes.length) { upgradeFish(); break; }
    }
  });
  observer.observe(document.body, { childList:true, subtree:true });
})();

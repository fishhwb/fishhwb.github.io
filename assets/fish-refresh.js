// 2026 FISH HWB portfolio sea-life art direction.
// Keeps the lightweight sea.js movement system, but swaps the original
// decorative fish for richer, species-specific SVG illustrations.
(function(){
  var artStyle = document.querySelector('link[data-fish-art-v3]');
  if (!artStyle) {
    artStyle = document.createElement('link');
    artStyle.rel = 'stylesheet';
    artStyle.href = 'assets/fish-art-v3.css';
    artStyle.dataset.fishArtV3 = '1';
    document.head.appendChild(artStyle);
  }

  var count = 0;
  function uid(prefix){ count += 1; return prefix + '-' + count; }
  function variant(){ return count % 3; }

  function reefCrown(id, v){
    var accent = v === 1 ? '#8ff0ff' : v === 2 ? '#ffd85c' : '#ff7fc6';
    var body2 = v === 1 ? '#1b75b9' : v === 2 ? '#cb3f5f' : '#ff6b32';
    return '<svg class="fish-art reef-crown" viewBox="0 0 210 130" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="'+id+'-body" cx="67%" cy="32%" r="78%"><stop offset="0" stop-color="#fff0c9"/><stop offset=".18" stop-color="'+accent+'"/><stop offset=".54" stop-color="'+body2+'"/><stop offset="1" stop-color="#331736"/></radialGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".82"/><stop offset=".32" stop-color="'+accent+'" stop-opacity=".78"/><stop offset="1" stop-color="#7a2e7f" stop-opacity=".18"/></linearGradient>' +
        '<linearGradient id="'+id+'-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".48" stop-color="#fff" stop-opacity=".88"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        '<filter id="'+id+'-soft"><feGaussianBlur stdDeviation="2.6"/></filter>' +
        '<clipPath id="'+id+'-clip"><path d="M45 67C52 35 91 17 139 25c31 5 52 21 55 40 3 19-15 38-47 47-46 13-93-3-102-45z"/></clipPath>' +
      '</defs>' +
      '<g class="fish-shadow" opacity=".28" filter="url(#'+id+'-soft)"><ellipse cx="113" cy="108" rx="62" ry="8" fill="#020712"/></g>' +
      '<g class="tail crown-tail">' +
        '<path d="M50 67C29 48 17 27 5 11c7 23 7 40 1 55 8 18 7 35 0 55 15-18 29-34 45-50z" fill="url(#'+id+'-fin)" stroke="#2a1530" stroke-width="3"/>' +
        '<path d="M43 57C27 45 17 32 10 22M43 69H8M43 80C27 90 18 101 10 112" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.4"/>' +
      '</g>' +
      '<path class="crest" d="M68 38C76 7 110-5 147 12c-23 1-39 12-53 32-8-1-17-3-26-6z" fill="url(#'+id+'-fin)" stroke="#2a1530" stroke-width="3"/>' +
      '<path class="ventral-banner" d="M88 99c18 8 39 9 57 3-9 18-24 28-39 27-7-9-12-19-18-30z" fill="url(#'+id+'-fin)" stroke="#2a1530" stroke-width="3"/>' +
      '<path d="M45 67C52 35 91 17 139 25c31 5 52 21 55 40 3 19-15 38-47 47-46 13-93-3-102-45z" fill="url(#'+id+'-body)" stroke="#25152d" stroke-width="3.5"/>' +
      '<g clip-path="url(#'+id+'-clip)">' +
        '<path d="M69 27c-4 22-1 55 14 83" fill="none" stroke="#fff7df" stroke-opacity=".78" stroke-width="13"/>' +
        '<path d="M108 20c-8 25-5 62 12 95" fill="none" stroke="#fff7df" stroke-opacity=".8" stroke-width="14"/>' +
        '<path d="M149 26c-8 22-6 53 8 81" fill="none" stroke="#fff7df" stroke-opacity=".75" stroke-width="12"/>' +
        '<path d="M53 49c36-24 89-25 127-6" fill="none" stroke="url(#'+id+'-shine)" stroke-width="9" stroke-linecap="round" class="fish-highlight"/>' +
        '<g class="scale-mosaic" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1">' +
          '<path d="M81 44q8 8 16 0M96 54q8 8 16 0M77 64q8 8 16 0M112 41q8 8 16 0M129 54q8 8 16 0M103 72q8 8 16 0M136 74q8 8 16 0M90 88q8 8 16 0"/>' +
        '</g>' +
      '</g>' +
      '<path class="fin" d="M126 74c-18 4-30 15-38 31 19 2 35-5 49-23z" fill="url(#'+id+'-fin)" stroke="#2a1530" stroke-width="2.4"/>' +
      '<path class="fish-gill" d="M159 48c-7 11-7 29 1 40" fill="none" stroke="#5f294e" stroke-width="2.3" stroke-linecap="round"/>' +
      '<path d="M187 77c6 2 11 0 15-5" fill="none" stroke="#25152d" stroke-width="2.3" stroke-linecap="round"/>' +
      '<ellipse cx="171" cy="49" rx="12" ry="13" fill="#fffaf0" stroke="#25152d" stroke-width="3"/>' +
      '<ellipse class="fish-pupil" cx="174" cy="51" rx="6" ry="7" fill="#160b21"/>' +
      '<circle cx="176" cy="47" r="2.4" fill="#fff"/>' +
      '<g class="pearl-dots" fill="'+accent+'"><circle cx="153" cy="33" r="2.1"/><circle cx="143" cy="91" r="1.7"/><circle cx="132" cy="31" r="1.4"/><circle cx="164" cy="96" r="1.5"/></g>' +
    '</svg>';
  }

  function prismSail(id, v){
    var a = v === 1 ? '#7cf7d4' : v === 2 ? '#ff8bd1' : '#66c7ff';
    var b = v === 1 ? '#194bc6' : v === 2 ? '#7636ca' : '#122f9d';
    return '<svg class="fish-art prism-sail" viewBox="0 0 220 140" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="'+id+'-body" cx="72%" cy="38%" r="80%"><stop offset="0" stop-color="#d9ffff"/><stop offset=".14" stop-color="'+a+'"/><stop offset=".48" stop-color="#2c76df"/><stop offset=".78" stop-color="'+b+'"/><stop offset="1" stop-color="#08142e"/></radialGradient>' +
        '<linearGradient id="'+id+'-sail" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".76"/><stop offset=".3" stop-color="'+a+'" stop-opacity=".72"/><stop offset=".72" stop-color="#7e5cff" stop-opacity=".5"/><stop offset="1" stop-color="#142b72" stop-opacity=".08"/></linearGradient>' +
        '<linearGradient id="'+id+'-tail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff7a8"/><stop offset=".45" stop-color="#ffd447"/><stop offset="1" stop-color="#ff7d3f"/></linearGradient>' +
      '</defs>' +
      '<g class="tail prism-tail"><path d="M48 72L7 25c10 28 9 59 0 94l41-43z" fill="url(#'+id+'-tail)" stroke="#0b1733" stroke-width="3"/><path d="M14 39l29 31M10 71h34M14 107l29-32" fill="none" stroke="#8a6320" stroke-opacity=".55" stroke-width="1.3"/></g>' +
      '<path class="sail-top" d="M62 46C77 3 129-4 174 28c-35-8-69 3-96 27z" fill="url(#'+id+'-sail)" stroke="#0b1733" stroke-width="3"/>' +
      '<path class="sail-bottom" d="M74 95c29 10 62 9 91-5-20 35-57 47-84 30z" fill="url(#'+id+'-sail)" stroke="#0b1733" stroke-width="3"/>' +
      '<path d="M45 72C51 36 94 18 145 26c38 6 64 26 65 48 0 22-25 42-66 48-52 8-93-11-99-50z" fill="url(#'+id+'-body)" stroke="#0b1733" stroke-width="3.5"/>' +
      '<path class="prism-mask" d="M61 51c31-25 80-30 119-12-22 4-39 17-51 37 13 14 34 20 55 16-27 27-77 30-108 8-22-15-28-32-15-49z" fill="#071632" opacity=".88"/>' +
      '<path class="iridescent-ribbon" d="M60 39c37-14 83-13 121 3" fill="none" stroke="#bdfbff" stroke-opacity=".55" stroke-width="8" stroke-linecap="round"/>' +
      '<g class="scale-mosaic" fill="none" stroke="'+a+'" stroke-opacity=".25" stroke-width="1">' +
        '<path d="M79 50q8 8 16 0M95 58q8 8 16 0M70 67q8 8 16 0M112 44q8 8 16 0M129 55q8 8 16 0M101 78q8 8 16 0M138 80q8 8 16 0M87 92q8 8 16 0"/>' +
      '</g>' +
      '<path class="fin" d="M129 78c-20 7-33 18-42 34 20 3 40-5 54-22z" fill="url(#'+id+'-tail)" stroke="#0b1733" stroke-width="2.4"/>' +
      '<path class="fish-gill" d="M175 50c-6 11-6 28 1 39" fill="none" stroke="#0c3b84" stroke-width="2.1"/>' +
      '<ellipse cx="188" cy="49" rx="11" ry="12" fill="#ebfbff" stroke="#0b1733" stroke-width="3"/>' +
      '<ellipse class="fish-pupil" cx="190" cy="50" rx="5.3" ry="6.3" fill="#08142d"/>' +
      '<circle cx="192" cy="46" r="2" fill="#fff"/>' +
      '<path d="M204 78c5 1 9 0 12-4" fill="none" stroke="#0b1733" stroke-width="2" stroke-linecap="round"/>' +
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

  function glassLantern(id, v){
    var glow = v === 1 ? '#7dffca' : v === 2 ? '#ff6ce5' : '#78e8ff';
    return '<svg class="fish-art glass-lantern" viewBox="0 0 230 110" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#53799b" stop-opacity=".78"/><stop offset=".33" stop-color="#17334d" stop-opacity=".94"/><stop offset=".75" stop-color="#071625"/><stop offset="1" stop-color="#02070d"/></linearGradient>' +
        '<linearGradient id="'+id+'-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dffaff" stop-opacity="0"/><stop offset=".5" stop-color="#dffaff" stop-opacity=".5"/><stop offset="1" stop-color="#dffaff" stop-opacity="0"/></linearGradient>' +
        '<radialGradient id="'+id+'-orb"><stop offset="0" stop-color="#fff"/><stop offset=".28" stop-color="'+glow+'"/><stop offset="1" stop-color="'+glow+'" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<g class="tail glass-tail"><path d="M55 56L8 19c13 19 14 49 0 75l48-34z" fill="#0d2032" fill-opacity=".82" stroke="#7895aa" stroke-width="2"/><path d="M16 31l34 24M12 57h39M16 84l34-24" fill="none" stroke="#a8c2d3" stroke-opacity=".34" stroke-width="1.2"/></g>' +
      '<path class="crest" d="M85 31L97 5l9 21 17-14 3 17 17-8-6 16" fill="#10283e" stroke="#7895aa" stroke-width="2"/>' +
      '<path d="M49 57C61 26 119 15 173 28c37 9 55 25 50 42-6 19-40 31-84 30-49-1-80-14-90-43z" fill="url(#'+id+'-body)" stroke="#7895aa" stroke-width="2.4"/>' +
      '<path class="glass-sheen" d="M67 42c40-14 94-12 132 5" fill="none" stroke="url(#'+id+'-glass)" stroke-width="8" stroke-linecap="round"/>' +
      '<path class="internal-spine" d="M69 69c37-15 83-14 118-3" fill="none" stroke="'+glow+'" stroke-opacity=".38" stroke-width="2"/>' +
      '<g class="lights" fill="'+glow+'">' +
        '<circle cx="72" cy="75" r="2.8"/><circle cx="87" cy="79" r="2.5"/><circle cx="103" cy="82" r="2.8"/><circle cx="120" cy="83" r="2.4"/><circle cx="137" cy="82" r="2.7"/><circle cx="154" cy="79" r="2.4"/><circle cx="171" cy="74" r="2.7"/>' +
        '<circle cx="96" cy="57" r="1.8"/><circle cx="121" cy="60" r="1.8"/><circle cx="146" cy="57" r="1.8"/>' +
      '</g>' +
      '<g class="organ-glow"><ellipse cx="127" cy="59" rx="17" ry="10" fill="url(#'+id+'-orb)" opacity=".46"/></g>' +
      '<path class="fin" d="M139 68c-17 12-34 15-49 10 13-13 28-18 49-10z" fill="#153954" fill-opacity=".74" stroke="#7895aa" stroke-width="1.8"/>' +
      '<path class="fish-gill" d="M187 42c-4 9-4 22 1 31" fill="none" stroke="#88a6ba" stroke-width="1.5"/>' +
      '<ellipse cx="198" cy="43" rx="9" ry="10" fill="#03101a" stroke="#9eb8ca" stroke-width="1.8"/>' +
      '<ellipse class="fish-pupil" cx="199" cy="43" rx="4" ry="4.8" fill="'+glow+'"/>' +
      '<circle cx="201" cy="40" r="1.4" fill="#fff"/>' +
      '<path d="M216 67c-4 2-8 2-11 0" fill="none" stroke="#7895aa" stroke-width="1.5" stroke-linecap="round"/>' +
    '</svg>';
  }

  function upgradeFish(){
    [].forEach.call(document.querySelectorAll('.critter:not([data-art-upgraded])'), function(el){
      var id = uid('fish');
      var v = variant();
      if (el.classList.contains('clown')) { el.innerHTML = reefCrown(id, v); el.dataset.artSpecies = 'reef-crown'; }
      else if (el.classList.contains('tang')) { el.innerHTML = prismSail(id, v); el.dataset.artSpecies = 'prism-sail'; }
      else if (el.classList.contains('jelly')) { el.innerHTML = auroraJelly(id, v); el.dataset.artSpecies = 'aurora-jelly'; }
      else if (el.classList.contains('lantern')) { el.innerHTML = glassLantern(id, v); el.dataset.artSpecies = 'glass-lantern'; }
      else return;
      el.dataset.artVariant = String(v);
      el.dataset.artUpgraded = '2';
      el.style.setProperty('--art-delay', (-Math.random() * 7).toFixed(2) + 's');
      el.style.setProperty('--art-speed', (4.8 + Math.random() * 3.2).toFixed(2) + 's');
      el.style.setProperty('--art-roll', ((Math.random() - .5) * 3.5).toFixed(2) + 'deg');
    });
  }

  function upgradeAngler(){
    var a = document.querySelector('.angler');
    if (!a || a.dataset.artUpgraded === '2') return;
    a.dataset.artUpgraded = '2';
    a.innerHTML =
      '<defs>' +
        '<radialGradient id="angler-v3-body" cx="65%" cy="32%" r="82%"><stop offset="0" stop-color="#536d86"/><stop offset=".3" stop-color="#27394f"/><stop offset=".68" stop-color="#0c1725"/><stop offset="1" stop-color="#02050a"/></radialGradient>' +
        '<radialGradient id="angler-v3-lure"><stop offset="0" stop-color="#fff"/><stop offset=".22" stop-color="#fff8b3"/><stop offset=".48" stop-color="#7cf7ff" stop-opacity=".7"/><stop offset="1" stop-color="#7cf7ff" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="angler-v3-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8aa0b4" stop-opacity=".5"/><stop offset="1" stop-color="#101b29" stop-opacity=".2"/></linearGradient>' +
      '</defs>' +
      '<path class="lure-stalk" d="M92 31C105 6 136 0 158 16" fill="none" stroke="#6e879d" stroke-width="2.6" stroke-linecap="round"/>' +
      '<circle cx="159" cy="16" r="23" fill="url(#angler-v3-lure)" opacity=".8"/>' +
      '<g class="tail"><path d="M45 67L5 34c10 20 9 45 0 66l40-28z" fill="#08131e" stroke="#62788d" stroke-width="2.2"/><path d="M12 45l28 20M9 68h33M12 90l28-20" fill="none" stroke="#71879a" stroke-opacity=".5" stroke-width="1.1"/></g>' +
      '<path class="angler-spines" d="M58 35L48 7l18 19 2-25 11 24 11-17 1 22 15-10-6 21" fill="#0d1927" stroke="#62788d" stroke-width="2"/>' +
      '<path d="M38 69c0-31 24-50 58-50 32 0 54 17 57 41 3 28-17 50-53 50-39 0-62-12-62-41z" fill="url(#angler-v3-body)" stroke="#62788d" stroke-width="2.4"/>' +
      '<path d="M51 49c13-17 31-25 53-27" fill="none" stroke="#9ab4ca" stroke-opacity=".42" stroke-width="4" stroke-linecap="round"/>' +
      '<g class="skin-speck" fill="#72869a"><circle cx="57" cy="72" r="1.4"/><circle cx="72" cy="84" r="1.7"/><circle cx="86" cy="70" r="1.2"/><circle cx="53" cy="88" r="1"/><circle cx="98" cy="91" r="1.3"/><circle cx="75" cy="52" r=".9"/><circle cx="109" cy="37" r="1.1"/></g>' +
      '<path class="angler-jaw" d="M108 59c17-8 38-8 52 0-4 26-18 39-43 34 10-9 9-23-9-34z" fill="#010203" stroke="#62788d" stroke-width="2.2"/>' +
      '<g class="tooth" fill="#f3f8fb" stroke="#c8d3dc" stroke-width=".7"><path d="M113 60l5 14 5-15 5 16 5-16 5 17 5-17 5 15 4-13z"/><path d="M118 91l5-13 5 14 5-15 5 14 5-13 4 10z"/></g>' +
      '<path class="fin" d="M84 78c-12 15-23 20-33 16 9-13 20-18 33-16z" fill="url(#angler-v3-fin)" stroke="#62788d" stroke-width="1.8"/>' +
      '<ellipse cx="116" cy="45" rx="8" ry="8.8" fill="#04101a" stroke="#a5bfd5" stroke-width="1.6"/>' +
      '<ellipse class="eye-glow" cx="117" cy="45" rx="4" ry="4.8" fill="#aee9ff"/>' +
      '<circle cx="118.5" cy="42.5" r="1.4" fill="#fff"/>' +
      '<circle class="lure lure-core" cx="159" cy="16" r="7.2" fill="#fffbd2" stroke="#8df2ff" stroke-width="1.6"/>';
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

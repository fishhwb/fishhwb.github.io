// 2026 FISH HWB sea-life visual refresh.
// Replaces the original lightweight inline SVGs after sea.js creates them,
// while keeping the same swim/depth animation system.
(function(){
  var count = 0;
  function uid(prefix){ count += 1; return prefix + '-' + count; }

  function clown(id){
    return '<svg viewBox="0 0 160 96" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb04b"/><stop offset=".35" stop-color="#ff7b1e"/><stop offset=".72" stop-color="#ef4e12"/><stop offset="1" stop-color="#b72e0c"/></linearGradient>' +
        '<linearGradient id="'+id+'-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb95e"/><stop offset=".55" stop-color="#ff6f1f"/><stop offset="1" stop-color="#2a1510"/></linearGradient>' +
        '<radialGradient id="'+id+'-eye" cx="38%" cy="35%" r="70%"><stop offset="0" stop-color="#8b5d2b"/><stop offset=".45" stop-color="#3f2617"/><stop offset="1" stop-color="#090706"/></radialGradient>' +
        '<clipPath id="'+id+'-clip"><path d="M39 49C46 23 82 13 118 25c18 6 29 18 29 30 0 14-14 27-36 32-34 8-67-5-72-38z"/></clipPath>' +
      '</defs>' +
      '<g class="tail">' +
        '<path d="M43 51C28 40 15 23 4 14c5 19 6 49 0 69 12-8 25-24 39-32z" fill="url(#'+id+'-fin)" stroke="#26140e" stroke-width="3" stroke-linejoin="round"/>' +
        '<path class="fish-fin-ray" d="M10 24c11 8 20 17 29 27M6 48h35M10 74c11-8 20-16 29-24" fill="none" stroke="#331a12" stroke-width="1.7"/>' +
      '</g>' +
      '<path d="M67 27C77 7 105 3 125 21c-21-4-42-2-58 6z" fill="url(#'+id+'-fin)" stroke="#26140e" stroke-width="3"/>' +
      '<path d="M68 79c13 15 36 15 49 2-18 4-34 2-49-2z" fill="url(#'+id+'-fin)" stroke="#26140e" stroke-width="3"/>' +
      '<path d="M39 49C46 23 82 13 118 25c18 6 29 18 29 30 0 14-14 27-36 32-34 8-67-5-72-38z" fill="url(#'+id+'-body)" stroke="#26140e" stroke-width="3" stroke-linejoin="round"/>' +
      '<g clip-path="url(#'+id+'-clip)">' +
        '<path d="M53 13c-9 20-7 57 3 83l18-3c-11-27-11-59-1-82z" fill="#f8f2df" stroke="#26140e" stroke-width="3"/>' +
        '<path d="M89 9c-11 25-8 67 5 91l19-5c-12-28-12-62 1-86z" fill="#f8f2df" stroke="#26140e" stroke-width="3"/>' +
        '<path d="M123 17c-10 20-8 51 4 72l17-10c-10-20-9-39 0-55z" fill="#f8f2df" stroke="#26140e" stroke-width="3"/>' +
        '<path class="fish-highlight" d="M54 31c25-14 57-13 79 1" fill="none" stroke="#fff5d7" stroke-width="6" stroke-linecap="round" opacity=".45"/>' +
        '<g class="fish-scale" fill="none" stroke="#6e2812" stroke-width="1">' +
          '<path d="M72 42q7 7 14 0M82 52q7 7 14 0M68 62q7 7 14 0M96 39q7 7 14 0M103 58q7 7 14 0M84 72q7 7 14 0"/>' +
        '</g>' +
      '</g>' +
      '<path class="fish-gill" d="M121 42c-8 8-8 22 1 29" fill="none" stroke="#7d2b17" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path class="fin" d="M94 58c-9 13-22 17-31 12 8-10 18-17 31-12z" fill="url(#'+id+'-fin)" stroke="#26140e" stroke-width="2.5"/>' +
      '<path class="fish-fin-ray" d="M68 68l21-8M72 71l18-7" fill="none" stroke="#472018" stroke-width="1.2"/>' +
      '<path d="M140 61c4 2 8 1 11-2" fill="none" stroke="#26140e" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="126" cy="43" r="10" fill="#fff8e9" stroke="#26140e" stroke-width="3"/>' +
      '<circle class="fish-pupil" cx="128" cy="44" r="5.6" fill="url(#'+id+'-eye)"/>' +
      '<circle cx="130" cy="41" r="2" fill="#fff"/>' +
    '</svg>';
  }

  function tang(id){
    return '<svg viewBox="0 0 160 96" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4ea8ff"/><stop offset=".35" stop-color="#236ce8"/><stop offset=".76" stop-color="#1247b6"/><stop offset="1" stop-color="#082d79"/></linearGradient>' +
        '<linearGradient id="'+id+'-tail" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff26a"/><stop offset=".5" stop-color="#ffd22e"/><stop offset="1" stop-color="#e79a08"/></linearGradient>' +
        '<clipPath id="'+id+'-clip"><path d="M37 50C43 21 81 10 119 23c19 7 31 20 29 33-2 16-19 29-42 33-34 6-64-9-69-39z"/></clipPath>' +
      '</defs>' +
      '<g class="tail">' +
        '<path d="M40 50L8 17c7 19 7 47 0 68z" fill="url(#'+id+'-tail)" stroke="#111831" stroke-width="3" stroke-linejoin="round"/>' +
        '<path class="fish-fin-ray" d="M12 27l24 21M10 50h27M13 76l23-24" fill="none" stroke="#7f6500" stroke-width="1.7"/>' +
      '</g>' +
      '<path d="M62 28C76 7 111 7 133 24c-25-4-48-1-71 4z" fill="#245fd2" stroke="#111831" stroke-width="3"/>' +
      '<path d="M67 80c18 13 47 13 65-2-21 5-43 6-65 2z" fill="#183e9b" stroke="#111831" stroke-width="3"/>' +
      '<path d="M37 50C43 21 81 10 119 23c19 7 31 20 29 33-2 16-19 29-42 33-34 6-64-9-69-39z" fill="url(#'+id+'-body)" stroke="#111831" stroke-width="3"/>' +
      '<g clip-path="url(#'+id+'-clip)">' +
        '<path d="M47 34c19-14 51-19 75-8-13 4-27 13-35 24 9 9 24 14 39 12-17 17-48 20-70 7-13-8-18-23-9-35z" fill="#111936" opacity=".96"/>' +
        '<path class="fish-highlight" d="M53 30c30-13 61-10 81 4" fill="none" stroke="#8fd1ff" stroke-width="6" stroke-linecap="round" opacity=".5"/>' +
        '<g class="fish-scale" fill="none" stroke="#8ec7ff" stroke-width="1">' +
          '<path d="M65 40q7 7 14 0M76 48q7 7 14 0M61 58q7 7 14 0M82 65q7 7 14 0M102 35q7 7 14 0M110 70q7 7 14 0"/>' +
        '</g>' +
      '</g>' +
      '<path class="fish-gill" d="M121 40c-7 10-7 25 1 32" fill="none" stroke="#0e2f76" stroke-width="2.2"/>' +
      '<path class="fin" d="M95 59c-9 13-22 17-31 12 8-10 19-17 31-12z" fill="url(#'+id+'-tail)" stroke="#111831" stroke-width="2.4"/>' +
      '<path class="fish-fin-ray" d="M69 69l21-8M74 73l17-8" fill="none" stroke="#7f6500" stroke-width="1.2"/>' +
      '<path d="M142 63c4 1 7 0 10-3" fill="none" stroke="#111831" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="126" cy="42" r="10" fill="#e9f7ff" stroke="#111831" stroke-width="3"/>' +
      '<circle class="fish-pupil" cx="128" cy="43" r="5.4" fill="#111831"/>' +
      '<circle cx="130" cy="40" r="2" fill="#fff"/>' +
    '</svg>';
  }

  function jelly(id){
    return '<svg viewBox="0 0 120 180" aria-hidden="true">' +
      '<defs>' +
        '<radialGradient id="'+id+'-bell" cx="42%" cy="25%" r="80%"><stop offset="0" stop-color="#fff7ff" stop-opacity=".95"/><stop offset=".22" stop-color="#ffd4f0" stop-opacity=".9"/><stop offset=".62" stop-color="#ff75c8" stop-opacity=".58"/><stop offset="1" stop-color="#8248d8" stop-opacity=".34"/></radialGradient>' +
        '<linearGradient id="'+id+'-tent" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd8f2" stop-opacity=".85"/><stop offset="1" stop-color="#bd7cff" stop-opacity=".12"/></linearGradient>' +
      '</defs>' +
      '<g class="tentacles" fill="none" stroke-linecap="round">' +
        '<path d="M22 66c-8 23 10 36 0 60s7 32 2 50" stroke="url(#'+id+'-tent)" stroke-width="2"/>' +
        '<path d="M98 66c8 23-10 36 0 60s-7 32-2 50" stroke="url(#'+id+'-tent)" stroke-width="2"/>' +
        '<path d="M38 68c-7 18 7 30 0 49s6 27 0 48" stroke="url(#'+id+'-tent)" stroke-width="2.3"/>' +
        '<path d="M82 68c7 18-7 30 0 49s-6 27 0 48" stroke="url(#'+id+'-tent)" stroke-width="2.3"/>' +
        '<path d="M50 65c-10 15 8 22-2 36s10 22 0 38 5 22 0 34" stroke="#ff8fd5" stroke-width="6" opacity=".48"/>' +
        '<path d="M70 65c10 15-8 22 2 36s-10 22 0 38-5 22 0 34" stroke="#ff8fd5" stroke-width="6" opacity=".48"/>' +
        '<path d="M60 66c-6 19 7 31 0 51s5 30 0 48" stroke="#ffe3f5" stroke-width="3.4" opacity=".62"/>' +
      '</g>' +
      '<g class="bell">' +
        '<path d="M9 66C9 24 32 7 60 7s51 17 51 59c-8 7-15 0-23 5-8 5-15-3-23 2-8-5-15 3-23-2-8-5-15 2-22-4-6 3-9 0-11-1z" fill="url(#'+id+'-bell)" stroke="#ffb9df" stroke-width="2.4"/>' +
        '<path d="M24 46c8-19 23-28 39-30" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".5" class="fish-highlight"/>' +
        '<path d="M37 44c0-10 9-16 16-10 6 5 1 15-5 18-6 2-11-2-11-8zM69 31c5-9 17-7 18 2s-8 15-15 12-7-8-3-14z" fill="#ff5db8" opacity=".45"/>' +
        '<g class="fish-speck" fill="#fff"><circle cx="84" cy="23" r="2.4"/><circle cx="93" cy="38" r="1.7"/><circle cx="31" cy="55" r="1.8"/><circle cx="48" cy="20" r="1.5"/></g>' +
      '</g>' +
    '</svg>';
  }

  function lantern(id){
    return '<svg viewBox="0 0 150 70" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="'+id+'-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#385879"/><stop offset=".38" stop-color="#1d3550"/><stop offset=".75" stop-color="#0d1d32"/><stop offset="1" stop-color="#050b14"/></linearGradient>' +
        '<linearGradient id="'+id+'-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9efff" stop-opacity="0"/><stop offset=".45" stop-color="#b9efff" stop-opacity=".62"/><stop offset="1" stop-color="#b9efff" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      '<g class="tail"><path d="M32 36L6 12c7 14 7 33 0 50z" fill="#112137" stroke="#6d8ba7" stroke-width="2"/><path class="fish-fin-ray" d="M10 21l18 14M8 36h22M10 53l18-15" stroke="#7f9cb6" fill="none" stroke-width="1"/></g>' +
      '<path d="M62 19l12-16c2 7 11 12 23 14-13-1-24 0-35 2z" fill="#172b45" stroke="#6d8ba7" stroke-width="2"/>' +
      '<path d="M30 36C41 14 93 8 126 20c15 5 20 12 18 18-2 8-13 14-28 18-34 9-72 3-86-20z" fill="url(#'+id+'-body)" stroke="#6d8ba7" stroke-width="2"/>' +
      '<path class="fish-highlight" d="M42 28c25-11 58-13 87-5" fill="none" stroke="url(#'+id+'-sheen)" stroke-width="6" stroke-linecap="round"/>' +
      '<g class="fish-speck" fill="#7394ae"><circle cx="53" cy="28" r="1"/><circle cx="65" cy="23" r=".9"/><circle cx="81" cy="31" r="1.1"/><circle cx="94" cy="25" r=".8"/><circle cx="106" cy="34" r="1"/></g>' +
      '<path class="fin" d="M98 40c-8 10-18 12-25 8 7-8 15-11 25-8z" fill="#1a314d" stroke="#6d8ba7" stroke-width="1.7"/>' +
      '<g class="lights" fill="#91fbff">' +
        '<circle cx="46" cy="47" r="2.4"/><circle cx="57" cy="50" r="2.3"/><circle cx="69" cy="52" r="2.4"/><circle cx="81" cy="53" r="2.3"/><circle cx="93" cy="52" r="2.4"/><circle cx="105" cy="50" r="2.3"/><circle cx="116" cy="47" r="2.4"/>' +
        '<circle cx="62" cy="41" r="1.5"/><circle cx="78" cy="43" r="1.5"/><circle cx="94" cy="41" r="1.5"/>' +
      '</g>' +
      '<path class="fish-gill" d="M119 27c-4 6-4 15 1 21" fill="none" stroke="#7995ad" stroke-width="1.4"/>' +
      '<circle cx="127" cy="28" r="8.2" fill="#06101c" stroke="#9ab3c7" stroke-width="1.8"/>' +
      '<circle class="fish-pupil" cx="128" cy="28" r="4.2" fill="#1f506f"/>' +
      '<circle cx="130" cy="26" r="1.6" fill="#c9fbff"/>' +
      '<path d="M139 39c-3 2-6 2-9 0" fill="none" stroke="#7b95ab" stroke-width="1.5" stroke-linecap="round"/>' +
    '</svg>';
  }

  function upgradeFish(){
    [].forEach.call(document.querySelectorAll('.critter:not([data-art-upgraded])'), function(el){
      var id = uid('fish');
      if (el.classList.contains('clown')) el.innerHTML = clown(id);
      else if (el.classList.contains('tang')) el.innerHTML = tang(id);
      else if (el.classList.contains('jelly')) el.innerHTML = jelly(id);
      else if (el.classList.contains('lantern')) el.innerHTML = lantern(id);
      else return;
      el.dataset.artUpgraded = '1';
    });
  }

  function upgradeAngler(){
    var a = document.querySelector('.angler');
    if (!a || a.dataset.artUpgraded) return;
    a.dataset.artUpgraded = '1';
    a.innerHTML =
      '<defs>' +
        '<radialGradient id="angler-v2-body" cx="62%" cy="38%" r="78%"><stop offset="0" stop-color="#4a627a"/><stop offset=".35" stop-color="#27384b"/><stop offset=".72" stop-color="#101925"/><stop offset="1" stop-color="#05080e"/></radialGradient>' +
        '<radialGradient id="angler-v2-halo"><stop offset="0" stop-color="#fffbd4" stop-opacity="1"/><stop offset=".28" stop-color="#ffe97c" stop-opacity=".72"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/></radialGradient>' +
      '</defs>' +
      '<path d="M92 28C101 9 129 2 150 14" fill="none" stroke="#70859a" stroke-width="2.4" stroke-linecap="round"/>' +
      '<circle cx="150" cy="14" r="19" fill="url(#angler-v2-halo)"/>' +
      '<g class="tail"><path d="M45 63L10 37c8 16 8 35 0 53z" fill="#0e1722" stroke="#607286" stroke-width="2"/><path d="M15 47l25 14M13 64h29M15 82l25-16" fill="none" stroke="#607286" stroke-width="1.1" opacity=".6"/></g>' +
      '<path d="M58 31l-7-20 13 15 3-21 8 20 9-13 1 17" fill="#111b28" stroke="#607286" stroke-width="2"/>' +
      '<path d="M39 65c0-27 21-43 50-43 26 0 44 14 46 34 2 23-14 42-44 42-33 0-52-10-52-33z" fill="url(#angler-v2-body)" stroke="#607286" stroke-width="2.2"/>' +
      '<path class="fish-highlight" d="M50 48c9-14 23-21 40-23" fill="none" stroke="#94abc0" stroke-width="3" stroke-linecap="round" opacity=".45"/>' +
      '<g class="skin-speck" fill="#718497"><circle cx="58" cy="69" r="1.3"/><circle cx="69" cy="79" r="1.5"/><circle cx="82" cy="67" r="1.1"/><circle cx="54" cy="82" r=".9"/><circle cx="88" cy="86" r="1.2"/><circle cx="74" cy="50" r=".8"/></g>' +
      '<path d="M99 57c13-5 29-5 39 1-3 20-14 31-34 27 7-7 7-19-5-28z" fill="#010203" stroke="#607286" stroke-width="2"/>' +
      '<g class="tooth" fill="#f4f7f7" stroke="#c9d2dc" stroke-width=".7">' +
        '<path d="M104 58l4 11 4-11 4 13 4-13 5 14 4-14 4 12 3-11z"/>' +
        '<path d="M108 84l4-10 4 10 4-12 4 12 4-11 3 9z"/>' +
      '</g>' +
      '<path class="fin" d="M80 73c-10 12-19 16-27 13 7-10 16-14 27-13z" fill="#162333" stroke="#607286" stroke-width="1.8"/>' +
      '<circle cx="104" cy="43" r="7" fill="#07111b" stroke="#a6bfd4" stroke-width="1.5"/>' +
      '<circle class="eye-glow" cx="105" cy="43" r="3.6" fill="#bfe9ff"/>' +
      '<circle cx="106.4" cy="41.5" r="1.3" fill="#fff"/>' +
      '<circle class="lure lure-core" cx="150" cy="14" r="6.5" fill="#fff8b7" stroke="#ffe27a" stroke-width="1.5"/>';
  }

  function run(){ upgradeFish(); upgradeAngler(); }
  run();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once:true });
  addEventListener('load', run, { once:true });

  // Upgrade fish created later by the Konami swarm as well.
  var observer = new MutationObserver(function(changes){
    for (var i = 0; i < changes.length; i++) {
      if (changes[i].addedNodes && changes[i].addedNodes.length) { upgradeFish(); break; }
    }
  });
  observer.observe(document.body, { childList:true, subtree:true });
})();

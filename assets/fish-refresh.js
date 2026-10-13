// 2026 FISH HWB sea-life art v6.
// Richer Aurora biology: preserve the successful jelly, deepen every fish with layered anatomy.
(function(){
  ['v3','v4','v5'].forEach(function(v){
    var old = document.querySelector('link[data-fish-art-'+v+']');
    if(old) old.remove();
  });
  var artStyle = document.querySelector('link[data-fish-art-v6]');
  if(!artStyle){
    artStyle = document.createElement('link');
    artStyle.rel = 'stylesheet';
    artStyle.href = 'assets/fish-art-v6.css';
    artStyle.dataset.fishArtV6 = '1';
    document.head.appendChild(artStyle);
  }

  var count = 0;
  function uid(prefix){ count += 1; return prefix + '-' + count; }
  function variant(){ return count % 3; }
  function palette(v){
    return v === 1
      ? {glow:'#7cf7ff',mid:'#53d6ff',deep:'#4c49d8',soft:'#e9ffff',accent:'#9b8cff'}
      : v === 2
        ? {glow:'#ffc45d',mid:'#ff8fb8',deep:'#b94c8f',soft:'#fff5dc',accent:'#ff72cf'}
        : {glow:'#ff7ed8',mid:'#bd70ff',deep:'#6d46d8',soft:'#fff0fb',accent:'#6ee7ff'};
  }

  function reefScales(p){
    var pts=[[104,65],[122,57],[140,64],[158,55],[176,65],[194,59],[112,82],[132,76],[151,84],[171,78],[191,86],[118,101],[139,96],[160,104],[181,99],[130,118],[153,116],[174,116]];
    return '<g class="scale-field" fill="none" stroke="'+p.soft+'" stroke-opacity=".28" stroke-width=".85">' +
      pts.map(function(q,i){ return '<path class="scale-cell" d="M'+q[0]+' '+q[1]+'q7 7 14 0q-7-7-14 0z" opacity="'+(.34+(i%4)*.08)+'"/>'; }).join('') +
    '</g>';
  }

  function auroraReef(id,v){
    var p=palette(v);
    return `<svg class="fish-art aurora-reef-v6" viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-body" cx="62%" cy="34%" r="82%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".18" stop-color="${p.glow}" stop-opacity=".76"/><stop offset=".52" stop-color="${p.mid}" stop-opacity=".5"/><stop offset=".8" stop-color="${p.deep}" stop-opacity=".24"/><stop offset="1" stop-color="#10152e" stop-opacity=".08"/></radialGradient>
        <linearGradient id="${id}-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".72"/><stop offset=".3" stop-color="${p.glow}" stop-opacity=".48"/><stop offset=".72" stop-color="${p.accent}" stop-opacity=".25"/><stop offset="1" stop-color="${p.deep}" stop-opacity=".02"/></linearGradient>
        <radialGradient id="${id}-core"><stop offset="0" stop-color="#fff" stop-opacity=".98"/><stop offset=".3" stop-color="${p.glow}" stop-opacity=".66"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}-rim"><stop offset="0" stop-color="${p.soft}" stop-opacity="0"/><stop offset=".48" stop-color="${p.soft}" stop-opacity=".7"/><stop offset="1" stop-color="${p.soft}" stop-opacity="0"/></linearGradient>
        <clipPath id="${id}-clip"><path d="M65 96C67 46 112 23 164 26c57 4 99 37 98 78-1 43-45 75-104 70-54-4-96-34-93-78z"/></clipPath>
      </defs>
      <g class="tail fin-membrane"><path d="M72 96C47 77 24 55 5 31c10 27 12 47 10 65-2 19-8 39-15 60 23-17 47-36 74-56z" fill="url(#${id}-fin)"/><g class="fin-rays" fill="none" stroke="${p.soft}" stroke-opacity=".32" stroke-width="1"><path class="fin-ray" d="M66 94L14 45M66 96L11 76M67 99L8 111M69 101L15 143"/></g></g>
      <g class="dorsal fin-membrane"><path d="M92 55C111 9 166 0 217 27c-41-2-79 10-111 38z" fill="url(#${id}-fin)"/><g fill="none" stroke="${p.soft}" stroke-opacity=".26" stroke-width=".9"><path class="fin-ray" d="M105 50L129 18M120 46L153 10M137 43L178 11M155 42L198 19"/></g></g>
      <g class="streamer fin-membrane"><path d="M150 36C167 2 198-8 226 5c-20 16-31 38-35 65-3 19-3 40-2 62-11-40-24-72-39-96z" fill="url(#${id}-fin)" opacity=".9"/><path d="M166 34c11-14 24-23 40-27M175 52c8-17 18-30 30-40" fill="none" stroke="${p.soft}" stroke-opacity=".28" stroke-width="1"/></g>
      <g class="ventral fin-membrane"><path d="M119 163c27 10 57 10 86 0-23 24-50 34-79 26-6-7-8-16-7-26z" fill="url(#${id}-fin)"/><path d="M130 169l8 15M149 168l4 18M168 168v17M187 165l-4 15" fill="none" stroke="${p.soft}" stroke-opacity=".23" stroke-width=".9"/></g>
      <path class="aurora-body" d="M65 96C67 46 112 23 164 26c57 4 99 37 98 78-1 43-45 75-104 70-54-4-96-34-93-78z" fill="url(#${id}-body)" stroke="${p.glow}" stroke-opacity=".3" stroke-width="1.25"/>
      <g clip-path="url(#${id}-clip)"><ellipse class="inner-core" cx="165" cy="101" rx="56" ry="41" fill="url(#${id}-core)" opacity=".48"/><ellipse class="organ" cx="146" cy="111" rx="20" ry="12" fill="${p.accent}" fill-opacity=".18"/><ellipse class="organ" cx="176" cy="105" rx="13" ry="9" fill="${p.glow}" fill-opacity=".2"/><path class="inner-vein" d="M86 101c40-19 91-20 138 1" fill="none" stroke="${p.glow}" stroke-opacity=".38" stroke-width="2"/><path class="branch-vein" d="M123 95c8-18 17-32 30-43M145 92c12-18 27-31 45-40M150 105c11 14 19 30 22 49M178 101c15 13 26 27 33 44" fill="none" stroke="${p.glow}" stroke-opacity=".2" stroke-width="1.2"/><path class="aurora-band" d="M88 60c39-23 98-25 145-2" fill="none" stroke="url(#${id}-rim)" stroke-width="12" stroke-linecap="round"/>${reefScales(p)}<g fill="${p.soft}" opacity=".44"><circle cx="111" cy="49" r="1.4"/><circle cx="134" cy="44" r="1"/><circle cx="158" cy="53" r="1.2"/><circle cx="184" cy="47" r="1.3"/><circle cx="208" cy="63" r="1.1"/><circle cx="102" cy="118" r="1"/><circle cx="127" cy="133" r="1.4"/><circle cx="155" cy="138" r="1"/><circle cx="187" cy="134" r="1.2"/><circle cx="216" cy="120" r="1.1"/></g></g>
      <g class="pectoral fin-membrane"><path d="M182 111c-24 5-46 20-61 43 28 1 51-10 69-33z" fill="url(#${id}-fin)"/><path d="M177 115l-44 31M181 119l-34 30M184 123l-20 24" fill="none" stroke="${p.soft}" stroke-opacity=".3" stroke-width=".9"/></g>
      <path class="rim-light" d="M83 78c28-35 82-49 131-31" fill="none" stroke="${p.soft}" stroke-opacity=".38" stroke-width="4.5" stroke-linecap="round"/><path d="M221 72c-6 13-5 31 2 43" fill="none" stroke="${p.soft}" stroke-opacity=".26" stroke-width="1.2"/>
      <g class="eye"><ellipse cx="240" cy="70" rx="7.4" ry="7.8" fill="${p.soft}" fill-opacity=".58"/><ellipse cx="240" cy="70" rx="5" ry="5.4" fill="${p.deep}" fill-opacity=".45"/><ellipse class="fish-pupil" cx="241" cy="70.5" rx="2.3" ry="2.8" fill="#08101c"/><circle cx="242.2" cy="68.8" r="1" fill="#fff"/></g><path d="M256 101c6 1 11 0 15-3.5" fill="none" stroke="${p.soft}" stroke-opacity=".36" stroke-width="1.1" stroke-linecap="round"/>
    </svg>`;
  }

  function auroraGlider(id,v){
    var p=palette(v);
    return `<svg class="fish-art aurora-glider-v6" viewBox="0 0 350 160" aria-hidden="true">
      <defs><linearGradient id="${id}-body" x1="0" y1=".15" x2="1" y2=".75"><stop offset="0" stop-color="${p.deep}" stop-opacity=".2"/><stop offset=".24" stop-color="${p.mid}" stop-opacity=".52"/><stop offset=".52" stop-color="${p.glow}" stop-opacity=".75"/><stop offset=".76" stop-color="${p.accent}" stop-opacity=".48"/><stop offset="1" stop-color="#101832" stop-opacity=".12"/></linearGradient><linearGradient id="${id}-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".35" stop-color="${p.glow}" stop-opacity=".4"/><stop offset=".72" stop-color="${p.accent}" stop-opacity=".18"/><stop offset="1" stop-color="${p.deep}" stop-opacity=".02"/></linearGradient><radialGradient id="${id}-core"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="${p.glow}" stop-opacity=".55"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient><clipPath id="${id}-clip"><path d="M68 80c24-35 83-52 151-41 60 9 103 31 118 50-15 22-60 41-121 43-68 2-124-16-148-52z"/></clipPath></defs>
      <g class="tail fin-membrane"><path d="M73 79L11 28c16 23 19 40 17 52-1 13-7 29-21 49l68-44z" fill="url(#${id}-fin)"/><path d="M18 41l50 36M14 79h52M18 117l50-34" fill="none" stroke="${p.soft}" stroke-opacity=".3" stroke-width="1"/></g>
      <g class="dorsal fin-membrane"><path d="M108 48c45-30 111-31 167-6-55-5-107 1-155 23z" fill="url(#${id}-fin)"/><path d="M123 50l20-22M149 46l21-25M178 44l18-24M208 43l16-18M238 43l12-13" fill="none" stroke="${p.soft}" stroke-opacity=".27" stroke-width=".9"/></g>
      <g class="ventral fin-membrane"><path d="M127 116c43 16 96 17 143 4-43 27-96 31-136 16z" fill="url(#${id}-fin)"/><path d="M148 122l7 13M176 125l4 15M205 125v15M234 123l-5 13" fill="none" stroke="${p.soft}" stroke-opacity=".24" stroke-width=".85"/></g>
      <path class="aurora-body" d="M68 80c24-35 83-52 151-41 60 9 103 31 118 50-15 22-60 41-121 43-68 2-124-16-148-52z" fill="url(#${id}-body)" stroke="${p.glow}" stroke-opacity=".24" stroke-width="1.2"/>
      <g clip-path="url(#${id}-clip)"><ellipse class="inner-core" cx="205" cy="82" rx="69" ry="31" fill="url(#${id}-core)" opacity=".35"/><ellipse class="organ" cx="183" cy="89" rx="20" ry="10" fill="${p.accent}" fill-opacity=".15"/><path class="inner-vein" d="M95 87c59-16 132-13 193 7" fill="none" stroke="${p.glow}" stroke-opacity=".34" stroke-width="1.9"/><path class="branch-vein" d="M142 84c11-15 22-26 36-35M178 84c13-18 29-30 48-37M181 94c12 12 22 25 28 39M222 94c13 10 24 21 34 34" fill="none" stroke="${p.glow}" stroke-opacity=".18" stroke-width="1.05"/><path class="aurora-band" d="M94 57c60-21 139-18 202 9" fill="none" stroke="${p.soft}" stroke-opacity=".24" stroke-width="9" stroke-linecap="round"/><g class="scale-field" fill="none" stroke="${p.soft}" stroke-opacity=".25" stroke-width=".8"><path class="scale-cell" d="M118 66q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M139 61q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M161 67q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M183 61q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M206 68q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M229 63q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M128 82q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M151 87q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M174 81q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M199 88q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M224 82q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M248 89q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M141 101q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M166 105q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M192 101q8 7 16 0q-8-7-16 0z"/><path class="scale-cell" d="M219 106q8 7 16 0q-8-7-16 0z"/></g></g>
      <g class="pectoral fin-membrane"><path d="M217 89c-25 5-48 17-67 37 29 3 54-5 75-26z" fill="url(#${id}-fin)"/><path d="M212 92l-48 29M216 96l-37 27M219 100l-24 22" fill="none" stroke="${p.soft}" stroke-opacity=".28" stroke-width=".9"/></g>
      <path class="rim-light" d="M94 62c52-32 135-39 204-7" fill="none" stroke="${p.soft}" stroke-opacity=".34" stroke-width="4.8" stroke-linecap="round"/><path d="M284 61c-4 10-3 24 2 33" fill="none" stroke="${p.soft}" stroke-opacity=".22" stroke-width="1"/><ellipse cx="307" cy="66" rx="6.5" ry="6.8" fill="${p.soft}" fill-opacity=".48"/><ellipse cx="307" cy="66" rx="4.3" ry="4.6" fill="${p.deep}" fill-opacity=".45"/><ellipse class="fish-pupil" cx="308" cy="66.2" rx="2" ry="2.35" fill="#07101b"/><circle cx="309" cy="64.9" r=".8" fill="#fff"/><path d="M326 88c5 .8 9 0 12-2.5" fill="none" stroke="${p.soft}" stroke-opacity=".32" stroke-width="1" stroke-linecap="round"/>
    </svg>`;
  }

  // Intentionally unchanged — this is the reference style.
  function auroraJelly(id, v){
    var glow = v === 1 ? '#7cf7ff' : v === 2 ? '#ffc45d' : '#ff7ed8';
    var deep = v === 1 ? '#4c49d8' : v === 2 ? '#b94c8f' : '#6d46d8';
    return '<svg class="fish-art aurora-jelly" viewBox="0 0 150 210" aria-hidden="true">' + '<defs>' + '<radialGradient id="'+id+'-bell" cx="42%" cy="25%" r="78%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".2" stop-color="'+glow+'" stop-opacity=".8"/><stop offset=".56" stop-color="'+deep+'" stop-opacity=".52"/><stop offset="1" stop-color="#17134a" stop-opacity=".12"/></radialGradient>' + '<radialGradient id="'+id+'-core" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="'+glow+'" stop-opacity=".75"/><stop offset="1" stop-color="'+glow+'" stop-opacity="0"/></radialGradient>' + '<linearGradient id="'+id+'-tent" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset=".28" stop-color="'+glow+'" stop-opacity=".72"/><stop offset="1" stop-color="'+deep+'" stop-opacity="0"/></linearGradient>' + '</defs>' + '<g class="tentacles">' + '<path class="ribbon r1" d="M34 78c-19 26 10 39-5 68s13 39-5 61" fill="none" stroke="url(#'+id+'-tent)" stroke-width="3" stroke-linecap="round"/>' + '<path class="ribbon r2" d="M116 77c20 29-12 43 4 71s-12 36 5 58" fill="none" stroke="url(#'+id+'-tent)" stroke-width="3" stroke-linecap="round"/>' + '<path class="ribbon r3" d="M52 80c-14 23 11 33-2 58s10 33-2 64" fill="none" stroke="url(#'+id+'-tent)" stroke-width="5" stroke-linecap="round" opacity=".78"/>' + '<path class="ribbon r4" d="M98 80c14 23-11 33 2 58s-10 33 2 64" fill="none" stroke="url(#'+id+'-tent)" stroke-width="5" stroke-linecap="round" opacity=".78"/>' + '<path class="ribbon r5" d="M67 82c-10 18 8 28-1 46s7 27 0 73" fill="none" stroke="'+glow+'" stroke-opacity=".48" stroke-width="8" stroke-linecap="round"/>' + '<path class="ribbon r6" d="M83 82c10 18-8 28 1 46s-7 27 0 73" fill="none" stroke="'+glow+'" stroke-opacity=".48" stroke-width="8" stroke-linecap="round"/>' + '</g>' + '<g class="bell">' + '<path d="M12 80C12 29 39 8 75 8s63 21 63 72c-12 9-20-2-31 4-12 6-21-5-32 2-11-7-20 4-32-2-11-6-20 4-31-4z" fill="url(#'+id+'-bell)" stroke="'+glow+'" stroke-opacity=".78" stroke-width="2.6"/>' + '<ellipse class="jelly-core" cx="75" cy="59" rx="27" ry="25" fill="url(#'+id+'-core)"/>' + '<path d="M27 55c9-25 29-37 52-39" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="7" stroke-linecap="round"/>' + '<path d="M40 74c8-18 18-29 31-35M76 79c5-23 14-39 29-51M103 76c5-15 13-25 23-31" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="2"/>' + '<g class="aurora-specks" fill="#fff"><circle cx="42" cy="39" r="2"/><circle cx="112" cy="35" r="1.7"/><circle cx="95" cy="21" r="1.4"/><circle cx="55" cy="24" r="1.5"/><circle cx="120" cy="58" r="1.2"/></g>' + '</g>' + '</svg>';
  }

  function auroraLantern(id,v){
    var p=palette(v);
    return `<svg class="fish-art aurora-lantern-v6" viewBox="0 0 340 145" aria-hidden="true"><defs><linearGradient id="${id}-body" x1="0" y1=".2" x2="1" y2=".72"><stop offset="0" stop-color="${p.deep}" stop-opacity=".15"/><stop offset=".3" stop-color="#0b1530" stop-opacity=".68"/><stop offset=".58" stop-color="${p.mid}" stop-opacity=".3"/><stop offset=".82" stop-color="#09101f" stop-opacity=".78"/><stop offset="1" stop-color="#020612" stop-opacity=".92"/></linearGradient><linearGradient id="${id}-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.soft}" stop-opacity=".44"/><stop offset=".4" stop-color="${p.glow}" stop-opacity=".26"/><stop offset="1" stop-color="${p.deep}" stop-opacity=".015"/></linearGradient><radialGradient id="${id}-core"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".28" stop-color="${p.glow}" stop-opacity=".64"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient><clipPath id="${id}-clip"><path d="M69 73c23-31 81-47 146-38 58 8 101 27 116 45-14 21-58 39-117 40-66 1-121-15-145-47z"/></clipPath></defs><g class="tail fin-membrane"><path d="M75 73L11 31c15 18 20 32 19 43-1 12-7 26-21 42l68-37z" fill="url(#${id}-fin)"/><path d="M20 42l48 30M16 74h51M19 105l49-29" fill="none" stroke="${p.soft}" stroke-opacity=".26" stroke-width=".9"/></g><g class="dorsal fin-membrane"><path d="M117 40c40-24 96-24 143-4-46-4-90 2-132 19z" fill="url(#${id}-fin)"/><path d="M133 42l20-18M161 39l21-19M190 39l18-17M220 39l14-11" fill="none" stroke="${p.soft}" stroke-opacity=".23" stroke-width=".85"/></g><g class="ventral fin-membrane"><path d="M132 106c42 14 93 14 136 2-40 23-89 27-128 14z" fill="url(#${id}-fin)"/></g><path class="aurora-body" d="M69 73c23-31 81-47 146-38 58 8 101 27 116 45-14 21-58 39-117 40-66 1-121-15-145-47z" fill="url(#${id}-body)" stroke="${p.glow}" stroke-opacity=".2" stroke-width="1.05"/><g clip-path="url(#${id}-clip)"><ellipse class="inner-core" cx="198" cy="76" rx="43" ry="22" fill="url(#${id}-core)" opacity=".38"/><ellipse class="organ" cx="179" cy="82" rx="18" ry="10" fill="${p.accent}" fill-opacity=".16"/><path class="inner-vein" d="M96 82c51-13 111-11 166 6" fill="none" stroke="${p.glow}" stroke-opacity=".32" stroke-width="1.6"/><path class="branch-vein" d="M141 78c9-13 20-24 32-31M175 78c11-14 25-25 40-32M181 88c12 10 21 21 27 31M220 86c13 9 24 19 33 29" fill="none" stroke="${p.glow}" stroke-opacity=".16" stroke-width="1"/><path class="aurora-band" d="M94 53c61-18 135-14 198 8" fill="none" stroke="${p.soft}" stroke-opacity=".14" stroke-width="8" stroke-linecap="round"/><path d="M117 57c14 10 18 32 10 50M147 49c13 15 17 40 7 62M178 47c12 18 15 43 5 67M210 48c11 19 13 41 3 63M241 51c9 17 10 36 2 54" fill="none" stroke="${p.soft}" stroke-opacity=".07" stroke-width="2"/></g><g class="pectoral fin-membrane"><path d="M214 84c-24 5-46 17-63 34 27 2 51-5 70-24z" fill="url(#${id}-fin)"/><path d="M209 87l-45 27M213 91l-34 24M217 95l-22 19" fill="none" stroke="${p.soft}" stroke-opacity=".24" stroke-width=".8"/></g><g fill="${p.glow}" style="color:${p.glow}"><circle class="photophore" cx="104" cy="95" r="1.7"/><circle class="photophore" cx="122" cy="100" r="1.55"/><circle class="photophore" cx="141" cy="103" r="1.7"/><circle class="photophore" cx="161" cy="105" r="1.5"/><circle class="photophore" cx="181" cy="105" r="1.65"/><circle class="photophore" cx="201" cy="103" r="1.5"/><circle class="photophore" cx="221" cy="99" r="1.65"/><circle class="photophore" cx="242" cy="94" r="1.55"/><circle class="photophore" cx="263" cy="88" r="1.45"/><circle class="photophore" cx="146" cy="73" r="1"/><circle class="photophore" cx="176" cy="74" r="1"/><circle class="photophore" cx="207" cy="70" r="1"/><circle class="photophore" cx="236" cy="71" r=".9"/></g><path class="rim-light" d="M96 56c57-24 138-24 203 2" fill="none" stroke="${p.soft}" stroke-opacity=".18" stroke-width="4" stroke-linecap="round"/><ellipse cx="294" cy="62" rx="6" ry="6.5" fill="${p.soft}" fill-opacity=".28"/><ellipse cx="294" cy="62" rx="4" ry="4.5" fill="${p.deep}" fill-opacity=".55"/><ellipse class="fish-pupil" cx="295" cy="62.3" rx="1.8" ry="2.2" fill="${p.glow}" opacity=".86"/><circle cx="296" cy="61" r=".7" fill="#fff"/><path d="M315 82c4 .7 8 0 11-2.2" fill="none" stroke="${p.soft}" stroke-opacity=".26" stroke-width=".9" stroke-linecap="round"/></svg>`;
  }

  function upgradeFish(){
    [].forEach.call(document.querySelectorAll('.critter'),function(el){
      if(el.dataset.artUpgraded === '6') return;
      var id=uid('fish'),v=variant();
      if(el.classList.contains('clown')){el.innerHTML=auroraReef(id,v);el.dataset.artSpecies='aurora-reef-v6';}
      else if(el.classList.contains('tang')){el.innerHTML=auroraGlider(id,v);el.dataset.artSpecies='aurora-glider-v6';}
      else if(el.classList.contains('jelly')){el.innerHTML=auroraJelly(id,v);el.dataset.artSpecies='aurora-jelly';}
      else if(el.classList.contains('lantern')){el.innerHTML=auroraLantern(id,v);el.dataset.artSpecies='aurora-lantern-v6';}
      else return;
      el.dataset.artVariant=String(v);el.dataset.artUpgraded='6';el.style.setProperty('--art-delay',(-Math.random()*9).toFixed(2)+'s');el.style.setProperty('--art-speed',(7.2+Math.random()*4.1).toFixed(2)+'s');el.style.setProperty('--art-roll',((Math.random()-.5)*1.2).toFixed(2)+'deg');
    });
  }

  function upgradeAngler(){
    var a=document.querySelector('.angler');if(!a || a.dataset.artUpgraded === '6') return;a.dataset.artUpgraded='6';a.dataset.artSpecies='aurora-angler-v6';
    a.innerHTML=`<defs><radialGradient id="angler-v6-body" cx="57%" cy="40%" r="82%"><stop offset="0" stop-color="#7cf7ff" stop-opacity=".42"/><stop offset=".27" stop-color="#4b4f89" stop-opacity=".5"/><stop offset=".62" stop-color="#161a35" stop-opacity=".8"/><stop offset="1" stop-color="#02040c" stop-opacity=".95"/></radialGradient><linearGradient id="angler-v6-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efffff" stop-opacity=".42"/><stop offset=".4" stop-color="#7cf7ff" stop-opacity=".25"/><stop offset="1" stop-color="#6d46d8" stop-opacity=".02"/></linearGradient><radialGradient id="angler-v6-core"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset=".28" stop-color="#7cf7ff" stop-opacity=".58"/><stop offset="1" stop-color="#7cf7ff" stop-opacity="0"/></radialGradient><radialGradient id="angler-v6-lure"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="#efffff"/><stop offset=".48" stop-color="#7cf7ff" stop-opacity=".8"/><stop offset="1" stop-color="#7cf7ff" stop-opacity="0"/></radialGradient></defs><g class="angler-tail fin-membrane"><path d="M54 75L5 38c12 19 15 33 14 43-1 11-7 24-18 40l55-40z" fill="url(#angler-v6-fin)"/><path d="M13 50l37 25M9 79h42M12 109l39-28" fill="none" stroke="#dfffff" stroke-opacity=".22" stroke-width=".9"/></g><path class="lure-stalk" d="M104 42C118 12 151 5 177 21" fill="none" stroke="#caffff" stroke-opacity=".48" stroke-width="1.5" stroke-linecap="round"/><circle cx="178" cy="21" r="22" fill="url(#angler-v6-lure)" opacity=".84"/><path class="aurora-body" d="M45 77c-1-35 26-61 67-62 44-1 75 24 77 57 2 36-29 63-76 63-43 0-67-21-68-58z" fill="url(#angler-v6-body)" stroke="#7cf7ff" stroke-opacity=".22" stroke-width="1.2"/><ellipse class="inner-core" cx="109" cy="77" rx="39" ry="30" fill="url(#angler-v6-core)" opacity=".24"/><ellipse class="organ" cx="91" cy="84" rx="18" ry="11" fill="#bd70ff" fill-opacity=".14"/><path class="angler-spines fin-membrane" d="M69 38l-6-21 12 14 4-22 9 20 11-15 1 20 14-10-4 22 15-5-9 17" fill="url(#angler-v6-fin)" opacity=".78"/><path class="inner-vein" d="M62 82c30-12 63-11 94 1" fill="none" stroke="#7cf7ff" stroke-opacity=".24" stroke-width="1.4"/><path class="branch-vein" d="M84 77c8-13 16-23 26-31M106 79c11-14 23-23 37-28M106 88c10 10 18 21 23 33" fill="none" stroke="#7cf7ff" stroke-opacity=".14" stroke-width="1"/><g class="skin-specks" fill="#dfffff" opacity=".28"><circle cx="69" cy="61" r="1"/><circle cx="78" cy="101" r="1.2"/><circle cx="91" cy="53" r=".8"/><circle cx="103" cy="113" r="1"/><circle cx="122" cy="42" r=".9"/><circle cx="133" cy="112" r=".8"/><circle cx="151" cy="54" r="1.1"/></g><path d="M124 70c18-9 42-9 58 0-5 28-21 42-47 35 10-9 9-24-11-35z" fill="#02030a" fill-opacity=".9" stroke="#dfffff" stroke-opacity=".2" stroke-width="1"/><g fill="#efffff" opacity=".86"><path d="M129 71l4 11 4-12 5 13 4-13 5 13 5-13 4 12 5-10z"/><path d="M135 103l4-10 4 11 5-12 4 11 5-10 4 8z"/></g><g class="angler-pectoral fin-membrane"><path d="M94 89c-16 15-31 20-43 15 11-14 26-19 43-15z" fill="url(#angler-v6-fin)"/><path d="M89 92l-30 9M91 95l-24 8" fill="none" stroke="#dfffff" stroke-opacity=".2" stroke-width=".8"/></g><g fill="#7cf7ff" style="color:#7cf7ff"><circle class="photophore" cx="72" cy="93" r="1.2"/><circle class="photophore" cx="83" cy="104" r="1.1"/><circle class="photophore" cx="98" cy="111" r="1.2"/><circle class="photophore" cx="116" cy="114" r="1"/><circle class="photophore" cx="137" cy="111" r="1.1"/></g><ellipse cx="122" cy="51" rx="5.4" ry="5.8" fill="#efffff" fill-opacity=".24"/><ellipse cx="123" cy="51" rx="2" ry="2.4" fill="#7cf7ff" opacity=".82"/><circle cx="124" cy="49.8" r=".7" fill="#fff"/><circle class="lure-core" cx="178" cy="21" r="6" fill="#f6ffff" stroke="#7cf7ff" stroke-opacity=".72" stroke-width="1"/>`;
  }

  function run(){upgradeFish();upgradeAngler();}
  run();if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});addEventListener('load',run,{once:true});
  var observer=new MutationObserver(function(changes){for(var i=0;i<changes.length;i++){if(changes[i].addedNodes&&changes[i].addedNodes.length){upgradeFish();break;}}});observer.observe(document.body,{childList:true,subtree:true});
})();

// Approved concept-art overlay for the surface fish and abyss angler.
// Runs after fish-refresh.js and deliberately leaves jelly / glider / lantern art alone.
(function(){
  'use strict';

  var style = document.querySelector('link[data-approved-fish-v7]');
  if(!style){
    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/fish-approved-v7.css?v=7.3';
    style.dataset.approvedFishV7 = '1';
    document.head.appendChild(style);
  }

  var uidCount = 0;
  function uid(){ uidCount += 1; return 'approved-v7-'+uidCount; }
  function colors(v){
    if(v === 1) return {ice:'#a9fbff', cyan:'#62ddff', violet:'#9885ff', rose:'#e7a8ff', gold:'#ffe0a3', deep:'#415bc0'};
    if(v === 2) return {ice:'#fff3e6', cyan:'#7befff', violet:'#c978ff', rose:'#ff91c8', gold:'#ffd078', deep:'#8e4ba9'};
    return {ice:'#efffff', cyan:'#6cf3ff', violet:'#8b87ff', rose:'#ffb5dc', gold:'#ffe0a0', deep:'#4777b8'};
  }

  function scaleLattice(c){
    var out=[];
    for(var row=0;row<5;row++){
      for(var col=0;col<8;col++){
        var x=138+col*19+(row%2?9:0), y=78+row*18;
        out.push('<path class="approved-scale" d="M'+x+' '+y+'q8 8 16 0q-8-8-16 0z"/>');
      }
    }
    return '<g fill="none" stroke="'+c.ice+'" stroke-opacity=".31" stroke-width=".8">'+out.join('')+'</g>';
  }

  function surfaceFish(id,v){
    var c=colors(v);
    return `<svg class="fish-art approved-surface-fish" viewBox="0 0 390 235" aria-hidden="true">
      <defs>
        <radialGradient id="${id}-body" cx="67%" cy="33%" r="88%">
          <stop offset="0" stop-color="#fff" stop-opacity=".94"/>
          <stop offset=".14" stop-color="${c.ice}" stop-opacity=".86"/>
          <stop offset=".34" stop-color="${c.cyan}" stop-opacity=".64"/>
          <stop offset=".58" stop-color="${c.violet}" stop-opacity=".43"/>
          <stop offset=".78" stop-color="${c.rose}" stop-opacity=".25"/>
          <stop offset="1" stop-color="${c.deep}" stop-opacity=".08"/>
        </radialGradient>
        <linearGradient id="${id}-fin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity=".78"/>
          <stop offset=".25" stop-color="${c.ice}" stop-opacity=".62"/>
          <stop offset=".5" stop-color="${c.cyan}" stop-opacity=".38"/>
          <stop offset=".74" stop-color="${c.rose}" stop-opacity=".2"/>
          <stop offset="1" stop-color="${c.violet}" stop-opacity=".025"/>
        </linearGradient>
        <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.gold}" stop-opacity="0"/><stop offset=".5" stop-color="${c.gold}" stop-opacity=".9"/><stop offset="1" stop-color="${c.gold}" stop-opacity="0"/></linearGradient>
        <radialGradient id="${id}-core"><stop offset="0" stop-color="#fff" stop-opacity=".98"/><stop offset=".25" stop-color="${c.gold}" stop-opacity=".72"/><stop offset=".52" stop-color="${c.cyan}" stop-opacity=".46"/><stop offset="1" stop-color="${c.cyan}" stop-opacity="0"/></radialGradient>
        <clipPath id="${id}-clip"><path d="M92 119c14-50 68-78 132-70 67 8 114 43 116 84 2 42-45 73-114 76-68 3-123-28-134-90z"/></clipPath>
      </defs>

      <g class="approved-tail">
        <path d="M100 119C70 93 38 63 7 28c17 35 21 62 17 89-3 29-13 59-24 91 31-26 64-54 105-82z" fill="url(#${id}-fin)"/>
        <path d="M96 117C71 126 43 153 19 190c33-21 59-32 83-41" fill="none" stroke="${c.gold}" stroke-opacity=".37" stroke-width="1.2"/>
        <g fill="none" stroke="${c.ice}" stroke-opacity=".34" stroke-width="1"><path d="M91 114L20 45M94 118L13 84M95 122L11 127M97 126L17 174"/></g>
        <g fill="${c.cyan}" style="color:${c.cyan}"><circle class="approved-node" cx="26" cy="48" r="1.8"/><circle class="approved-node" cx="17" cy="86" r="1.5"/><circle class="approved-node" cx="16" cy="128" r="1.7"/><circle class="approved-node" cx="25" cy="170" r="1.6"/></g>
      </g>

      <g class="approved-dorsal">
        <path d="M118 73C139 17 199-3 267 35c-48-4-91 13-132 52z" fill="url(#${id}-fin)"/>
        <g fill="none" stroke="${c.ice}" stroke-opacity=".32" stroke-width=".9"><path d="M133 68L161 24M150 59L187 13M171 53L215 13M193 52L242 24"/></g>
      </g>
      <g class="approved-streamer">
        <path d="M177 50C193 4 231-11 273 5c-29 19-45 47-50 83-4 27-4 52 1 78-15-50-31-91-47-116z" fill="url(#${id}-fin)" opacity=".92"/>
        <path d="M196 45c16-20 36-32 59-37M207 67c11-24 26-43 44-56" fill="none" stroke="${c.gold}" stroke-opacity=".27" stroke-width="1"/>
      </g>
      <g class="approved-ventral">
        <path d="M142 192c31 14 68 14 103 1-29 33-64 45-99 33-8-9-10-20-4-34z" fill="url(#${id}-fin)"/>
        <path d="M154 199l5 20M178 199l3 24M203 198v23M228 195l-6 19" fill="none" stroke="${c.ice}" stroke-opacity=".27" stroke-width=".9"/>
      </g>

      <path class="approved-body" d="M92 119c14-50 68-78 132-70 67 8 114 43 116 84 2 42-45 73-114 76-68 3-123-28-134-90z" fill="url(#${id}-body)" stroke="${c.ice}" stroke-opacity=".32" stroke-width="1.25"/>
      <g clip-path="url(#${id}-clip)">
        <ellipse class="approved-core" cx="220" cy="129" rx="66" ry="47" fill="url(#${id}-core)" opacity=".5"/>
        <ellipse class="approved-core" cx="183" cy="142" rx="30" ry="19" fill="${c.rose}" fill-opacity=".14"/>
        <path class="approved-vein" d="M118 125c48-24 111-24 171 2" fill="none" stroke="${c.cyan}" stroke-opacity=".48" stroke-width="2"/>
        <path class="approved-vein" d="M154 118c12-25 29-45 51-61M190 117c17-25 38-42 64-53M194 132c15 18 26 39 31 66M235 126c20 18 36 38 47 61M146 135c-9 17-15 34-16 51" fill="none" stroke="${c.gold}" stroke-opacity=".26" stroke-width="1.2"/>
        <path d="M119 84c48-29 116-34 177-9" fill="none" stroke="${c.ice}" stroke-opacity=".46" stroke-width="10" stroke-linecap="round"/>
        ${scaleLattice(c)}
        <g fill="${c.gold}" style="color:${c.gold}"><circle class="approved-node" cx="143" cy="74" r="1.5"/><circle class="approved-node" cx="173" cy="64" r="1.2"/><circle class="approved-node" cx="204" cy="71" r="1.5"/><circle class="approved-node" cx="237" cy="68" r="1.2"/><circle class="approved-node" cx="269" cy="81" r="1.4"/><circle class="approved-node" cx="141" cy="164" r="1.3"/><circle class="approved-node" cx="175" cy="179" r="1.5"/><circle class="approved-node" cx="214" cy="185" r="1.2"/><circle class="approved-node" cx="252" cy="177" r="1.5"/></g>
      </g>

      <g class="approved-pectoral">
        <path d="M229 137c-32 6-62 25-82 54 35 2 66-12 91-42z" fill="url(#${id}-fin)"/>
        <path d="M224 141l-61 43M229 146l-48 41M233 151l-31 34" fill="none" stroke="${c.ice}" stroke-opacity=".35" stroke-width=".9"/>
      </g>
      <path d="M119 99c35-45 102-64 166-43" fill="none" stroke="url(#${id}-gold)" stroke-width="5" stroke-linecap="round"/>
      <path d="M294 93c-7 14-7 34 1 48" fill="none" stroke="${c.ice}" stroke-opacity=".28" stroke-width="1.1"/>
      <g class="approved-eye"><ellipse cx="317" cy="94" rx="9" ry="9.5" fill="${c.ice}" fill-opacity=".7"/><ellipse cx="317" cy="94" rx="6" ry="6.4" fill="${c.cyan}" fill-opacity=".36"/><ellipse class="approved-eye-pupil" cx="318" cy="94.4" rx="2.7" ry="3.2" fill="#06101a"/><circle cx="319.7" cy="92.3" r="1.25" fill="#fff"/></g>
      <path d="M337 128c7 1.2 13 .1 19-4" fill="none" stroke="${c.gold}" stroke-opacity=".45" stroke-width="1.25" stroke-linecap="round"/>
      <path d="M345 122c4 2 7 5 9 9" fill="none" stroke="${c.ice}" stroke-opacity=".24" stroke-width=".8"/>
    </svg>`;
  }

  function anglerTeeth(){
    var top=[], bottom=[];
    for(var i=0;i<11;i++){
      var x=146+i*8.2;
      top.push('<path d="M'+x+' 100l3 '+(13+(i%3)*3)+' 4-'+(13+(i%3)*3)+'z"/>');
      bottom.push('<path d="M'+(x+2)+' 148l3 -'+(12+((i+1)%3)*3)+' 4 '+(12+((i+1)%3)*3)+'z"/>');
    }
    return '<g class="approved-teeth" fill="#f5fdff" fill-opacity=".9">'+top.join('')+bottom.join('')+'</g>';
  }

  function anglerArt(){
    return `<defs>
      <radialGradient id="approved-angler-body" cx="60%" cy="42%" r="86%"><stop offset="0" stop-color="#badcff" stop-opacity=".4"/><stop offset=".23" stop-color="#806dcc" stop-opacity=".38"/><stop offset=".48" stop-color="#43547f" stop-opacity=".3"/><stop offset=".76" stop-color="#14192d" stop-opacity=".72"/><stop offset="1" stop-color="#040611" stop-opacity=".94"/></radialGradient>
      <linearGradient id="approved-angler-fin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1ffff" stop-opacity=".48"/><stop offset=".32" stop-color="#9bdfff" stop-opacity=".34"/><stop offset=".67" stop-color="#a27cff" stop-opacity=".2"/><stop offset="1" stop-color="#574c9d" stop-opacity=".015"/></linearGradient>
      <radialGradient id="approved-angler-organ"><stop offset="0" stop-color="#fff8ed" stop-opacity=".96"/><stop offset=".24" stop-color="#ffd6a4" stop-opacity=".78"/><stop offset=".52" stop-color="#ff98c8" stop-opacity=".45"/><stop offset="1" stop-color="#b46fff" stop-opacity="0"/></radialGradient>
      <radialGradient id="approved-angler-lure"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="#fff1de"/><stop offset=".43" stop-color="#ffbfdc" stop-opacity=".88"/><stop offset=".7" stop-color="#aa8cff" stop-opacity=".48"/><stop offset="1" stop-color="#806aff" stop-opacity="0"/></radialGradient>
    </defs>
    <g class="approved-angler-tail"><path d="M70 107L8 63c15 20 20 38 18 52-2 15-10 31-23 49l70-46z" fill="url(#approved-angler-fin)"/><path d="M17 76l48 30M13 108h50M18 151l48-35" fill="none" stroke="#d9f7ff" stroke-opacity=".28" stroke-width="1"/></g>
    <g class="approved-angler-dorsal"><path d="M89 63C110 20 159 7 204 34c-37-2-70 10-99 37z" fill="url(#approved-angler-fin)"/><path d="M104 60l16-34M122 55l22-39M143 51l26-36M165 50l25-27" fill="none" stroke="#e8fbff" stroke-opacity=".27" stroke-width=".9"/></g>
    <path class="approved-lure-stalk" d="M147 53C162 11 207 3 235 30c15 15 16 34 5 50" fill="none" stroke="#d8f8ff" stroke-opacity=".55" stroke-width="2" stroke-linecap="round"/>
    <circle cx="242" cy="85" r="31" fill="url(#approved-angler-lure)" opacity=".7"/>
    <g fill="none" stroke="#ffd8ed" stroke-opacity=".55" stroke-linecap="round"><path d="M242 90c-8 15 4 22-5 36"/><path d="M248 90c9 13-3 20 6 32"/><path d="M236 91c-15 12-5 20-15 29"/><path d="M252 88c15 9 9 18 20 24"/></g>
    <path d="M61 108c-2-46 33-81 87-83 58-2 100 30 104 74 4 49-38 87-101 87-57 0-88-29-90-78z" fill="url(#approved-angler-body)" stroke="#bfeaff" stroke-opacity=".3" stroke-width="1.4"/>
    <ellipse class="approved-organ" cx="130" cy="112" rx="48" ry="38" fill="url(#approved-angler-organ)" opacity=".42"/>
    <ellipse class="approved-organ" cx="115" cy="123" rx="22" ry="15" fill="#ffa7c8" fill-opacity=".18"/>
    <g fill="none" stroke="#d8f5ff" stroke-opacity=".24" stroke-width="1.3"><path class="approved-rib" d="M91 78c-11 20-11 52 0 77"/><path class="approved-rib" d="M108 69c-13 25-13 65 0 94"/><path class="approved-rib" d="M126 65c-14 29-14 72 0 103"/><path class="approved-rib" d="M145 65c-13 29-13 70 0 101"/><path class="approved-rib" d="M164 69c-11 26-11 62 0 90"/></g>
    <path d="M79 111c42-19 91-18 133 4" fill="none" stroke="#8ee7ff" stroke-opacity=".28" stroke-width="1.5"/>
    <path d="M112 105c12-21 27-37 46-48M137 108c18-21 38-34 61-41M136 122c15 17 26 36 33 58" fill="none" stroke="#ffbfdc" stroke-opacity=".19" stroke-width="1.1"/>
    <g class="approved-angler-pectoral"><path d="M118 137c-25 23-49 30-68 23 17-22 40-30 68-23z" fill="url(#approved-angler-fin)"/><path d="M108 142l-46 14M113 147l-37 12M116 152l-24 9" fill="none" stroke="#dffaff" stroke-opacity=".25" stroke-width=".9"/></g>
    <path d="M146 92c31-17 72-14 101 7-5 38-26 63-61 66-4-21-17-43-40-73z" fill="#03050c" fill-opacity=".88" stroke="#d8f5ff" stroke-opacity=".25" stroke-width="1.1"/>
    ${anglerTeeth()}
    <g fill="#a9f3ff" style="color:#a9f3ff"><circle class="approved-photophore" cx="79" cy="137" r="1.5"/><circle class="approved-photophore" cx="91" cy="151" r="1.3"/><circle class="approved-photophore" cx="108" cy="161" r="1.5"/><circle class="approved-photophore" cx="128" cy="167" r="1.3"/><circle class="approved-photophore" cx="150" cy="170" r="1.45"/><circle class="approved-photophore" cx="175" cy="168" r="1.25"/><circle class="approved-photophore" cx="199" cy="161" r="1.4"/><circle class="approved-photophore" cx="221" cy="149" r="1.25"/></g>
    <ellipse cx="180" cy="72" rx="7.4" ry="7.9" fill="#efffff" fill-opacity=".2"/><ellipse cx="180" cy="72" rx="4.5" ry="4.9" fill="#5d66a4" fill-opacity=".55"/><ellipse cx="181" cy="72.3" rx="2" ry="2.4" fill="#080b17"/><circle cx="182.4" cy="70.8" r=".8" fill="#fff"/>
    <circle class="approved-lure-core" cx="242" cy="85" r="8.5" fill="#fff6ed" stroke="#ffd0e8" stroke-opacity=".75" stroke-width="1.2"/>`;
  }

  function apply(){
    [].forEach.call(document.querySelectorAll('.critter.clown, .critter.tang'), function(el){
      if(el.dataset.approvedArt === '7') return;
      var id=uid(), v=Number(el.dataset.artVariant||0)%3;
      el.innerHTML=surfaceFish(id,v);
      el.dataset.approvedArt='7';
      el.dataset.artSpecies='approved-surface-v7';
    });
    var a=document.querySelector('.angler');
    if(a && a.dataset.approvedArt !== '7'){
      a.setAttribute('viewBox','0 0 285 195');
      a.setAttribute('width','285');
      a.setAttribute('height','195');
      a.innerHTML=anglerArt();
      a.dataset.approvedArt='7';
      a.dataset.artSpecies='approved-angler-v7';
    }
  }

  function delayedApply(){ apply(); setTimeout(apply,80); setTimeout(apply,450); }
  delayedApply();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',delayedApply,{once:true});
  addEventListener('load',delayedApply,{once:true});
  var observer=new MutationObserver(function(mutations){
    for(var i=0;i<mutations.length;i++) if(mutations[i].addedNodes&&mutations[i].addedNodes.length){setTimeout(apply,20);break;}
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();

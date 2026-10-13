// Approved concept-art overlay for the surface fish and abyss angler.
// Runs after fish-refresh.js and deliberately leaves jelly / glider / lantern art alone.
(function(){
  'use strict';

  var style = document.querySelector('link[data-approved-fish-v7]');
  if(!style){
    style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'assets/fish-approved-v7.css';
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

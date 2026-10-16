// FISH HWB v3 — lightweight developer UI enhancements.
(function(){
  'use strict';
  // v3 owns the merged project hub. Remove the old #code compatibility anchor
  // before extras.js runs so the legacy project migration cannot rewrite it.
  var legacyCodeAnchor=document.getElementById('code');
  if(legacyCodeAnchor) legacyCodeAnchor.removeAttribute('id');

  function el(tag, cls, text){var n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;}

  function decorateProjects(){
    var grid=document.querySelector('#projects .projects-v2');
    if(!grid)return false;
    var cards=[].slice.call(grid.querySelectorAll('.project-v2'));
    cards.forEach(function(card,i){
      card.dataset.index=String(i+1).padStart(2,'0');
      var text=(card.textContent||'').toLowerCase();
      var tags=[];
      if(/vr|openxr|vrchat/.test(text))tags.push('vr');
      if(/blender/.test(text))tags.push('blender');
      if(/python|c#|unity|godot|unreal|code|app|tool/.test(text))tags.push('software');
      card.dataset.filters=tags.join(' ');
    });
    var host=document.querySelector('#projects .project-filter');
    if(host&&!host.dataset.ready){
      host.dataset.ready='1';
      host.addEventListener('click',function(e){
        var b=e.target.closest('button[data-filter]');if(!b)return;
        host.querySelectorAll('button').forEach(function(x){x.classList.toggle('active',x===b);});
        var f=b.dataset.filter;
        cards.forEach(function(card){card.classList.toggle('is-hidden',f!=='all' && !(card.dataset.filters||'').split(' ').includes(f));});
      });
    }
    return true;
  }

  function liveTicker(){
    var ticker=el('div','dev-ticker surface-mode');ticker.setAttribute('aria-hidden','true');
    ticker.innerHTML='<b>&gt;</b> <span>portfolio.init()</span> · systems nominal';
    document.body.appendChild(ticker);
    var messages={
      surface:'<b>&gt;</b> <span>portfolio.init()</span> · hello from Wales',
      sunlight:'<b>&gt;</b> <span>content.stream()</span> · media pipeline online',
      twilight:'<b>&gt;</b> <span>creative.audio()</span> · descending through the stack',
      midnight:'<b>&gt;</b> <span>projects.load()</span> · VR + software + 3D',
      abyss:'<b>&gt;</b> <span>community.connect()</span> · somehow you made it this deep'
    };
    addEventListener('depth',function(e){
      var d=e.detail.depth;
      var key=d<50?'surface':d<200?'sunlight':d<1000?'twilight':d<4000?'midnight':'abyss';
      ticker.classList.toggle('surface-mode',d<200);
      ticker.innerHTML=messages[key];
    });
  }

  function terminalHead(){
    var section=document.getElementById('projects');if(!section)return;
    var wrap=section.querySelector('.wrap');if(!wrap||wrap.querySelector('.dev-head'))return;
    var panel=el('div','dev-head');
    panel.innerHTML='<div class="dev-headbar"><i></i><i></i><i></i><span>fishhwb@portfolio:~/work</span></div><div class="dev-console"><span class="prompt">dedzed@fishhwb</span>:<span class="cyan">~/projects</span>$ ./show-work --all<br><strong>VR development · software · Blender tools · VRChat worlds · 3D experiments</strong><br><span class="prompt">status:</span> public builds and live metadata loaded from the project pipeline</div>';
    var head=wrap.querySelector('.sec-head');if(head)head.insertAdjacentElement('afterend',panel);
  }

  function watchProjectRender(){
    if(decorateProjects())return;
    var target=document.getElementById('projects');if(!target)return;
    var mo=new MutationObserver(function(){if(decorateProjects())mo.disconnect();});
    mo.observe(target,{childList:true,subtree:true});
    setTimeout(function(){mo.disconnect();decorateProjects();},5000);
  }

  document.addEventListener('DOMContentLoaded',function(){terminalHead();liveTicker();watchProjectRender();});
})();

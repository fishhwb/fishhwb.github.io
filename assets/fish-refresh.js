// Surface fish + angler teardown.
// Keeps the jellyfish and lanternfish system intact while permanently removing
// the surface fish, angler artwork and abyss scan/spotlight from the rendered page.
(function(){
  'use strict';

  function removeSurfaceAndAngler(){
    document.querySelectorAll('.critter.clown, .critter.tang, .angler, .abyss .dark').forEach(function(el){
      el.remove();
    });

    var abyss = document.querySelector('.abyss');
    if(abyss){
      abyss.style.removeProperty('--lx');
      abyss.style.removeProperty('--ly');
      abyss.style.cursor = 'default';
    }
  }

  // Make the removal immediate even if another cached sea-life script creates
  // the old elements before this file runs.
  var style = document.createElement('style');
  style.id = 'surface-fish-angler-removed';
  style.textContent = '.critter.clown,.critter.tang,.angler,.abyss .dark{display:none!important}';
  document.head.appendChild(style);

  removeSurfaceAndAngler();
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', removeSurfaceAndAngler, {once:true});
  }
  window.addEventListener('load', removeSurfaceAndAngler, {once:true});

  // sea.js creates creatures dynamically. Remove any legacy surface fish or
  // angler nodes if an older cached copy of sea.js tries to add them later.
  var observer = new MutationObserver(function(mutations){
    for(var i=0;i<mutations.length;i++){
      if(mutations[i].addedNodes && mutations[i].addedNodes.length){
        removeSurfaceAndAngler();
        break;
      }
    }
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
})();

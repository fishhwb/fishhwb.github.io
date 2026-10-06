// FISH HWB startup parody ad. No ad network or tracking is used here.
(function(){
  if (document.querySelector('.startup-bait-ad')) return;

  var key = 'fishhwb-startup-parody-ad-v1';
  try {
    if (sessionStorage.getItem(key) === 'shown') return;
    sessionStorage.setItem(key, 'shown');
  } catch (e) {}

  var overlay = document.createElement('div');
  overlay.className = 'startup-bait-ad';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'bait-ad-title');
  overlay.innerHTML =
    '<div class="startup-bait-shell">' +
      '<button class="startup-bait-close" type="button" aria-label="Close parody ad">×</button>' +
      '<a class="startup-bait-card" href="bait/">' +
        '<div class="startup-bait-fish" aria-hidden="true">🐟</div>' +
        '<div class="startup-bait-copy">' +
          '<span class="startup-bait-kicker">Parody ad · suspiciously local</span>' +
          '<h2 id="bait-ad-title">Hot Single Fish in Your Area</h2>' +
          '<p>One click away from the least trustworthy aquarium on the internet.</p>' +
          '<span class="startup-bait-cta">Meet the fish →</span>' +
        '</div>' +
      '</a>' +
    '</div>';

  function close(){
    overlay.hidden = true;
    document.documentElement.style.overflow = '';
    setTimeout(function(){ overlay.remove(); }, 60);
  }

  overlay.querySelector('.startup-bait-close').addEventListener('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    close();
  });
  overlay.addEventListener('click', function(e){ if (e.target === overlay) close(); });
  addEventListener('keydown', function onKey(e){
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      close();
      removeEventListener('keydown', onKey);
    }
  });

  document.body.appendChild(overlay);
  document.documentElement.style.overflow = 'hidden';
})();

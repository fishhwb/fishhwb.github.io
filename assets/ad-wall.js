// Deliberately fake ad wall. This page contains no AdSense or third-party ad network.
(function(){
  var wall = document.getElementById('ad-wall');
  var close = document.querySelector('.wall-close');
  if (!wall) return;

  var fish = ['🐟','🐠','🐡','🦈','🪼','🦑','🐙','🦀','🦐','🐬'];
  var titles = [
    'Hot Single Cod Near You',
    'This Bass Has Standards',
    'Local Haddock Wants To Chat',
    'Meet Mature Mackerel Tonight',
    'One Lonely Pufferfish',
    'Sharks Hate This One Trick',
    'Tuna In Your Postcode',
    'Fishwives Are Watching',
    'Deep Sea Singles Online',
    'Your Plaice Or Mine?',
    'Cod Looking For Sole Mate',
    'Fin-terested In You',
    'Unreasonably Attractive Trout',
    'This Eel Is Emotionally Available',
    'Carp Within 3 Metres',
    'Find Your Perfect Catch'
  ];
  var copy = [
    'No credit card. No aquarium. Questionable decision making required.',
    'Verified wet. Allegedly single. Definitely a fish.',
    'Scientists are baffled by how local this fish apparently is.',
    'Clicking this will not improve your love life, but it will amuse the fish.',
    'Premium scales. Strong fins. Zero conversational skills.',
    'Your browser was selected by a highly advanced haddock algorithm.',
    'Hot fish are waiting. Mostly because they cannot operate a keyboard.',
    '100% saltwater chemistry. 0% background checks.',
    'The algorithm says you deserve someone with gills.',
    'Meet someone who will never leave the tank without you.'
  ];
  var ctas = ['View Fish','Risk It','Meet Now','Absolutely Not','Take The Bait','Open Tank','Find A Catch','Wet Click'];

  function pick(list, i){ return list[(i * 7 + Math.floor(Math.random() * list.length)) % list.length]; }

  for (var i = 0; i < 72; i++) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'fake-ad';
    card.style.setProperty('--r', ((Math.random() * 3.2) - 1.6).toFixed(2) + 'deg');
    card.style.setProperty('--fr', ((Math.random() * 18) - 9).toFixed(1) + 'deg');
    card.innerHTML =
      '<span class="emoji" aria-hidden="true">' + pick(fish, i) + '</span>' +
      '<span><h2>' + pick(titles, i) + '</h2><p>' + pick(copy, i + 3) + '</p></span>' +
      '<span class="cta">' + pick(ctas, i + 5) + '</span>';
    card.addEventListener('click', function(){
      var self = this;
      self.classList.remove('clicked');
      void self.offsetWidth;
      self.classList.add('clicked');
      var cta = self.querySelector('.cta');
      cta.textContent = 'YOU CLICKED A FISH';
      setTimeout(function(){ cta.textContent = 'STILL A FISH'; }, 850);
    });
    wall.appendChild(card);
  }

  function leave(){ location.href = '../'; }
  if (close) close.addEventListener('click', leave);
  addEventListener('keydown', function(e){ if (e.key === 'Escape') leave(); });
})();

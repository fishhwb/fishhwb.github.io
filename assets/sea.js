// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Everything living in the water: fish by depth, the dark bit with the
// anglerfish, the treasure on the sea floor, secret codes and the sound.
(function(){
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var talk = function(text){ if (window.cubez) window.cubez.say(text); };

  /* ---------- who lives where ---------- */

  // Shared gradients, clip paths and textures, defined once for every critter.
  var CLOWN_BODY = 'M44 60C50 36 78 22 112 20c30-2 56 10 70 26 6 7 8 13 5 20-4 10-20 20-44 26-32 8-72 6-90-10-6-6-9-14-9-22z';
  var TANG_BODY = 'M40 62C48 34 84 18 124 20c30 2 52 16 60 34 4 9 2 18-6 26-14 14-40 24-70 24-34 0-60-14-68-42z';
  var SARDINE_BODY = 'M20 30C40 17 90 11 140 14c22 2 40 8 52 16-12 8-30 13-52 15-50 4-100-1-120-15z';
  var LANTERN_BODY = 'M18 30C30 14 80 8 124 11c16 2 28 8 32 17 2 6-4 12-16 16-40 12-100 8-122-14z';
  var NETTLE_BELL = 'M8 62C8 28 32 8 60 8s52 20 52 54c-5 3-9 0-14 2s-9-1-14 1-9-1-14 1-9-1-14 1-9-1-14-1-9 2-14-1-9 1-12-2c-4 2-8 1-10-3z';

  var defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0');
  defs.setAttribute('aria-hidden', 'true');
  defs.style.position = 'absolute';
  defs.innerHTML = '<defs>' +
    '<pattern id="sea-scales" width="7" height="5" patternUnits="userSpaceOnUse"><path d="M0 5a3.5 3.5 0 0 1 7 0" fill="none" stroke="#000" stroke-width=".6" stroke-opacity=".1"/></pattern>' +
    '<radialGradient id="sea-gloss" cx=".6" cy=".2" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>' +
    '<linearGradient id="sea-shade" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>' +
    // clownfish
    '<linearGradient id="sea-clown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9480a"/><stop offset=".45" stop-color="#f76d12"/><stop offset=".85" stop-color="#ff9a3a"/><stop offset="1" stop-color="#ffb35c"/></linearGradient>' +
    '<linearGradient id="sea-clownfin" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#f7741a"/><stop offset=".75" stop-color="#ff8c2e" stop-opacity=".9"/><stop offset="1" stop-color="#ffa050" stop-opacity=".75"/></linearGradient>' +
    '<radialGradient id="sea-clowneye"><stop offset="0" stop-color="#e6781f"/><stop offset=".7" stop-color="#9a3d08"/><stop offset="1" stop-color="#3a1402"/></radialGradient>' +
    '<clipPath id="sea-clown-clip"><path d="' + CLOWN_BODY + '"/></clipPath>' +
    // blue tang
    '<linearGradient id="sea-tang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1238b8"/><stop offset=".4" stop-color="#1f5ff0"/><stop offset=".8" stop-color="#4f9bff"/><stop offset="1" stop-color="#8cc4ff"/></linearGradient>' +
    '<linearGradient id="sea-tangtail" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#f7b500"/><stop offset="1" stop-color="#ffe45c"/></linearGradient>' +
    '<clipPath id="sea-tang-clip"><path d="' + TANG_BODY + '"/></clipPath>' +
    // sardine
    '<linearGradient id="sea-sardine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#173f63"/><stop offset=".22" stop-color="#2f6f98"/><stop offset=".42" stop-color="#9ec3d8"/><stop offset=".6" stop-color="#eef5f9"/><stop offset=".85" stop-color="#f7fafc"/><stop offset="1" stop-color="#c9d7e0"/></linearGradient>' +
    '<clipPath id="sea-sardine-clip"><path d="' + SARDINE_BODY + '"/></clipPath>' +
    // sea nettle
    '<radialGradient id="sea-nettle" cx=".5" cy=".25" r=".8"><stop offset="0" stop-color="#ffe3b3" stop-opacity=".85"/><stop offset=".45" stop-color="#f0a060" stop-opacity=".6"/><stop offset="1" stop-color="#a8482a" stop-opacity=".4"/></radialGradient>' +
    '<clipPath id="sea-nettle-clip"><path d="' + NETTLE_BELL + '"/></clipPath>' +
    // lanternfish
    '<linearGradient id="sea-lantern" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1522"/><stop offset=".35" stop-color="#22405f"/><stop offset=".55" stop-color="#8fb3cf"/><stop offset=".75" stop-color="#3d5f7e"/><stop offset="1" stop-color="#132236"/></linearGradient>' +
    '<clipPath id="sea-lantern-clip"><path d="' + LANTERN_BODY + '"/></clipPath>' +
    '</defs>';
  document.body.appendChild(defs);

  var scales = function(clip, body){
    return '<g clip-path="url(#' + clip + ')"><path d="' + body + '" fill="url(#sea-scales)"/><path d="' + body + '" fill="url(#sea-shade)"/><path d="' + body + '" fill="url(#sea-gloss)"/></g>';
  };
  var eye = function(x, y, r, iris, ring){
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + iris + '" stroke="' + ring + '" stroke-width="1"/>' +
      '<circle cx="' + (x + r * .15) + '" cy="' + y + '" r="' + (r * .62) + '" fill="#050505"/>' +
      '<circle cx="' + (x + r * .4) + '" cy="' + (y - r * .35) + '" r="' + (r * .2) + '" fill="#fff" opacity=".9"/>';
  };
  var rays = function(x, y, pts, colour){
    return '<path d="' + pts.map(function(p){ return 'M' + x + ' ' + y + 'L' + p[0] + ' ' + p[1]; }).join('') + '" stroke="' + colour + '" stroke-width=".7" fill="none"/>';
  };

  // clown anemonefish
  var CLOWN = '<svg viewBox="0 0 200 110">' +
    '<path d="M78 28C82 14 98 8 110 14c4-6 16-10 28-4 12 6 16 16 14 22z" fill="url(#sea-clownfin)" stroke="#141010" stroke-width="2.4" stroke-linejoin="round"/>' +
    rays(110, 30, [[86,16],[98,11],[110,12],[124,9],[138,11],[150,20]], 'rgba(120,40,0,.3)') +
    '<path d="M108 86c4 13 20 16 32 5z" fill="url(#sea-clownfin)" stroke="#141010" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<g class="tail"><path d="M48 60C40 50 30 42 14 38c-7 12-8 34-2 46 16-2 28-12 36-24z" fill="url(#sea-clownfin)" stroke="#141010" stroke-width="2.4" stroke-linejoin="round"/>' +
    rays(47, 60, [[15,40],[12,50],[11,62],[13,74],[16,82]], 'rgba(120,40,0,.35)') + '</g>' +
    '<path d="' + CLOWN_BODY + '" fill="url(#sea-clown)"/>' +
    '<g clip-path="url(#sea-clown-clip)" stroke="#141010" stroke-width="2.2">' +
    '<path d="M150 16c-10 16-10 60 2 82l15-4c-12-20-12-58-2-76z" fill="#fbfaf4"/>' +
    '<path d="M104 16c-8 14 2 26 10 38-8 12-14 26-8 44l15-1c-6-14 0-28 8-42-8-12-16-24-10-38z" fill="#fbfaf4"/>' +
    '<path d="M58 34c-6 10-6 38 0 48l11-2c-4-10-4-34 0-44z" fill="#fbfaf4"/>' +
    '</g>' + scales('sea-clown-clip', CLOWN_BODY) +
    '<path d="' + CLOWN_BODY + '" fill="none" stroke="rgba(90,25,0,.35)" stroke-width="1"/>' +
    '<path class="fin" d="M136 64c-8 4-16 12-18 20 8 0 18-6 22-14z" fill="rgba(255,140,50,.85)" stroke="#141010" stroke-width="1.6" stroke-linejoin="round"/>' +
    '<path d="M122 90c-2 9 5 14 12 14-2-6-6-11-12-14z" fill="#f7741a" stroke="#141010" stroke-width="1.6"/>' +
    eye(166, 47, 7, 'url(#sea-clowneye)', 'rgba(0,0,0,.45)') +
    '<path d="M185 61c-2 3-5 4-8 4" fill="none" stroke="#6b2305" stroke-width="1.4" stroke-linecap="round"/>' +
    '</svg>';

  // palette surgeonfish (blue tang)
  var TANG = '<svg viewBox="0 0 200 120">' +
    '<path d="M60 38C80 16 122 8 160 26l-8 8C124 20 88 26 64 44z" fill="#1d4fe0" stroke="#070a22" stroke-width="2.4" stroke-linejoin="round"/>' +
    rays(110, 30, [[70,32],[90,20],[110,15],[130,16],[150,24]], 'rgba(0,0,30,.35)') +
    '<path d="M70 90c22 18 64 20 92 4l-8-6c-24 12-58 12-78-4z" fill="#1d4fe0" stroke="#070a22" stroke-width="2.4" stroke-linejoin="round"/>' +
    '<g class="tail"><path d="M46 62L8 30c8 14 8 50 0 64z" fill="url(#sea-tangtail)"/>' +
    '<path d="M46 62L9 31M46 62L9 93" stroke="#070a22" stroke-width="4" stroke-linecap="round"/>' +
    rays(45, 62, [[12,44],[12,56],[12,68],[12,80]], 'rgba(120,70,0,.35)') + '</g>' +
    '<path d="' + TANG_BODY + '" fill="url(#sea-tang)"/>' +
    '<g clip-path="url(#sea-tang-clip)">' +
    '<path d="M56 44c20-18 62-20 90-6-22 0-40 8-50 22 14 6 34 8 46 4-20 14-60 16-80 4-10-8-12-18-6-24z" fill="#080b26"/>' +
    '<path d="M40 64c10-4 22-4 30 0" stroke="#080b26" stroke-width="6" fill="none"/>' +
    '</g>' + scales('sea-tang-clip', TANG_BODY) +
    '<path d="' + TANG_BODY + '" fill="none" stroke="rgba(0,0,40,.4)" stroke-width="1"/>' +
    '<path class="fin" d="M142 74c-8 6-14 14-14 22 8-2 16-10 18-18z" fill="rgba(255,205,40,.85)" stroke="rgba(120,80,0,.6)" stroke-width="1"/>' +
    eye(166, 52, 7, '#0d1742', '#2b5fd8') +
    '<path d="M186 66c-2 2-4 3-7 3" fill="none" stroke="#070a22" stroke-width="1.4" stroke-linecap="round"/>' +
    '</svg>';

  // European sardine
  var SARDINE = '<svg viewBox="0 0 200 60">' +
    '<g class="tail"><path d="M24 30L3 11c5 8 6 13 6 19s-1 11-6 19z" fill="#8fa9bc" opacity=".9"/>' +
    rays(23, 30, [[5,14],[7,22],[8,30],[7,38],[5,46]], 'rgba(40,70,100,.4)') + '</g>' +
    '<path d="M88 14l9-10 9 10z" fill="#355f86" opacity=".9"/>' +
    '<path d="M112 44l6 7 6-7z" fill="#b7c9d6" opacity=".9"/>' +
    '<path d="' + SARDINE_BODY + '" fill="url(#sea-sardine)"/>' +
    '<g clip-path="url(#sea-sardine-clip)"><path d="' + SARDINE_BODY + '" fill="url(#sea-scales)"/>' +
    '<path d="M36 30c40-5 92-6 148-2" stroke="#fff" stroke-width="1.6" opacity=".55" fill="none"/>' +
    '<g fill="#1b3b5a" opacity=".7"><circle cx="150" cy="21" r="1.4"/><circle cx="140" cy="21.5" r="1.2"/><circle cx="130" cy="22" r="1.1"/><circle cx="121" cy="22.3" r="1"/></g></g>' +
    '<path d="M162 17c-6 8-6 19 0 26" fill="none" stroke="rgba(40,70,100,.4)" stroke-width="1.2"/>' +
    eye(177, 26, 4.6, '#dfe7ee', 'rgba(60,80,100,.5)') +
    '<path d="M192 30c-4 1-8 2-12 1" fill="none" stroke="rgba(40,60,80,.5)" stroke-width="1"/>' +
    '</svg>';
  // sardines travel in a loose school
  var SCHOOL = '<div class="school">' + [0, 1, 2, 3, 4, 5, 6].map(function(i){
    return '<div style="left:' + [0, 18, 34, 8, 46, 26, 58][i] + '%;top:' + [10, 0, 30, 52, 20, 70, 48][i] + '%;animation-delay:-' + (i * 0.37).toFixed(2) + 's">' + SARDINE + '</div>';
  }).join('') + '</div>';

  // Pacific sea nettle
  var JELLY = '<svg viewBox="0 0 120 230">' +
    '<g class="tentacles" fill="none" stroke-linecap="round">' +
    [14, 24, 36, 48, 72, 84, 96, 106].map(function(x, i){
      var w = i % 2 ? 6 : -6;
      return '<path d="M' + x + ' 62c' + w + ' 26 ' + (-w) + ' 48 0 74s' + w + ' 48 0 ' + (60 + (i % 3) * 16) + '" stroke="rgba(150,50,30,.55)" stroke-width="' + (i % 3 ? 0.8 : 1.1) + '"/>';
    }).join('') +
    '<path d="M37.9 62.0 L37.3 64.0 L36.4 66.0 L35.7 68.0 L35.5 70.0 L35.9 72.0 L36.8 74.0 L37.6 76.0 L38.0 78.0 L37.8 80.0 L37.2 82.0 L36.7 84.0 L36.8 86.0 L37.7 88.0 L39.2 90.0 L40.6 92.0 L41.6 94.0 L41.9 96.0 L41.5 98.0 L41.1 100.0 L41.3 102.0 L42.3 104.0 L43.9 106.0 L45.6 108.0 L46.7 110.0 L46.9 112.0 L46.2 114.0 L45.3 116.0 L44.8 118.0 L45.2 120.0 L46.3 122.0 L47.6 124.0 L48.2 126.0 L47.8 128.0 L46.3 130.0 L44.4 132.0 L42.9 134.0 L42.4 136.0 L42.8 138.0 L43.6 140.0 L44.0 142.0 L43.2 144.0 L41.3 146.0 L38.8 148.0 L36.9 150.0 L36.1 152.0 L36.5 154.0 L37.7 156.0 L38.5 158.0 L38.4 160.0 L37.0 162.0 L35.1 164.0 L33.6 166.0 L33.4 168.0 L34.7 170.0 L36.9 172.0 L39.1 174.0 L40.2 176.0 L40.1 178.0 L39.1 180.0 L38.3 182.0 L46.2 182.0 L44.0 180.0 L41.7 178.0 L40.3 176.0 L40.2 174.0 L41.1 172.0 L42.4 170.0 L43.1 168.0 L42.8 166.0 L41.8 164.0 L40.7 162.0 L40.3 160.0 L41.0 158.0 L42.7 156.0 L44.8 154.0 L46.5 152.0 L47.3 150.0 L47.3 148.0 L46.9 146.0 L47.0 144.0 L47.9 142.0 L49.7 140.0 L51.8 138.0 L53.5 136.0 L54.4 134.0 L54.3 132.0 L53.8 130.0 L53.4 128.0 L53.7 126.0 L54.7 124.0 L56.0 122.0 L57.0 120.0 L57.3 118.0 L56.7 116.0 L55.5 114.0 L54.5 112.0 L53.9 110.0 L54.0 108.0 L54.5 106.0 L54.9 104.0 L54.7 102.0 L53.9 100.0 L52.6 98.0 L51.3 96.0 L50.5 94.0 L50.4 92.0 L50.7 90.0 L51.1 88.0 L51.1 86.0 L50.7 84.0 L49.8 82.0 L49.0 80.0 L48.6 78.0 L48.8 76.0 L49.4 74.0 L50.2 72.0 L50.7 70.0 L50.8 68.0 L50.6 66.0 L50.3 64.0 L50.3 62.0Z" fill="rgba(255,226,210,.3)" stroke="rgba(255,205,185,.45)" stroke-width=".6"/>' +
    '<path d="M44.0 62.0 L43.7 64.0 L43.5 66.0 L43.3 68.0 L43.2 70.0 L43.1 72.0 L43.1 74.0 L43.1 76.0 L43.2 78.0 L43.3 80.0 L43.5 82.0 L43.8 84.0 L44.1 86.0 L44.5 88.0 L44.9 90.0 L45.4 92.0 L45.9 94.0 L46.5 96.0 L47.0 98.0 L47.6 100.0 L48.2 102.0 L48.7 104.0 L49.2 106.0 L49.7 108.0 L50.2 110.0 L50.5 112.0 L50.8 114.0 L51.1 116.0 L51.2 118.0 L51.2 120.0 L51.2 122.0 L51.0 124.0 L50.8 126.0 L50.4 128.0 L50.0 130.0 L49.5 132.0 L48.8 134.0 L48.1 136.0 L47.4 138.0 L46.6 140.0 L45.7 142.0 L44.9 144.0 L44.0 146.0 L43.1 148.0 L42.3 150.0 L41.5 152.0 L40.8 154.0 L40.1 156.0 L39.6 158.0 L39.1 160.0 L38.7 162.0 L38.5 164.0 L38.4 166.0 L38.5 168.0 L38.6 170.0 L39.0 172.0 L39.4 174.0 L40.0 176.0 L40.7 178.0 L41.5 180.0 L42.5 182.0" fill="none" stroke="rgba(190,100,70,.3)" stroke-width="1"/>' +
    '<path d="M67.5 62.0 L67.5 63.8 L67.3 65.7 L67.1 67.5 L67.2 69.3 L67.9 71.2 L68.9 73.0 L70.1 74.8 L71.1 76.7 L71.5 78.5 L71.4 80.3 L70.9 82.2 L70.5 84.0 L70.4 85.8 L71.0 87.7 L71.9 89.5 L72.9 91.3 L73.6 93.2 L73.5 95.0 L72.7 96.8 L71.6 98.7 L70.4 100.5 L69.8 102.3 L69.9 104.2 L70.5 106.0 L71.2 107.8 L71.3 109.7 L70.7 111.5 L69.3 113.3 L67.5 115.2 L65.9 117.0 L65.1 118.8 L65.1 120.7 L65.8 122.5 L66.6 124.3 L66.9 126.2 L66.3 128.0 L64.9 129.8 L63.3 131.7 L62.1 133.5 L61.8 135.3 L62.6 137.2 L64.2 139.0 L65.8 140.8 L66.9 142.7 L67.0 144.5 L66.3 146.3 L65.3 148.2 L64.9 150.0 L65.6 151.8 L67.4 153.7 L70.0 155.5 L72.5 157.3 L74.2 159.2 L74.7 161.0 L74.3 162.8 L73.5 164.7 L73.3 166.5 L74.2 168.3 L76.3 170.2 L79.0 172.0 L82.3 172.0 L83.1 170.2 L83.3 168.3 L82.4 166.5 L80.6 164.7 L78.3 162.8 L76.3 161.0 L75.0 159.2 L74.7 157.3 L75.1 155.5 L75.6 153.7 L75.7 151.8 L74.9 150.0 L73.4 148.2 L71.7 146.3 L70.3 144.5 L69.7 142.7 L70.1 140.8 L71.1 139.0 L72.3 137.2 L73.0 135.3 L73.0 133.5 L72.4 131.7 L71.7 129.8 L71.3 128.0 L71.7 126.2 L72.8 124.3 L74.5 122.5 L76.1 120.7 L77.3 118.8 L77.8 117.0 L77.7 115.2 L77.5 113.3 L77.5 111.5 L78.1 109.7 L79.3 107.8 L80.8 106.0 L82.2 104.2 L83.1 102.3 L83.3 100.5 L83.0 98.7 L82.5 96.8 L82.2 95.0 L82.4 93.2 L83.0 91.3 L83.8 89.5 L84.4 87.7 L84.6 85.8 L84.3 84.0 L83.5 82.2 L82.7 80.3 L82.1 78.5 L81.8 76.7 L82.0 74.8 L82.3 73.0 L82.5 71.2 L82.4 69.3 L81.9 67.5 L81.2 65.7 L80.4 63.8 L80.0 62.0Z" fill="rgba(255,226,210,.3)" stroke="rgba(255,205,185,.45)" stroke-width=".6"/>' +
    '<path d="M73.6 62.0 L73.9 63.8 L74.2 65.7 L74.6 67.5 L74.9 69.3 L75.3 71.2 L75.7 73.0 L76.0 74.8 L76.4 76.7 L76.7 78.5 L77.0 80.3 L77.3 82.2 L77.5 84.0 L77.7 85.8 L77.8 87.7 L77.9 89.5 L77.9 91.3 L77.8 93.2 L77.7 95.0 L77.5 96.8 L77.3 98.7 L77.0 100.5 L76.6 102.3 L76.2 104.2 L75.7 106.0 L75.1 107.8 L74.6 109.7 L74.0 111.5 L73.3 113.3 L72.7 115.2 L72.0 117.0 L71.4 118.8 L70.7 120.7 L70.1 122.5 L69.6 124.3 L69.1 126.2 L68.6 128.0 L68.2 129.8 L67.9 131.7 L67.7 133.5 L67.6 135.3 L67.6 137.2 L67.6 139.0 L67.8 140.8 L68.1 142.7 L68.5 144.5 L68.9 146.3 L69.5 148.2 L70.1 150.0 L70.9 151.8 L71.7 153.7 L72.5 155.5 L73.4 157.3 L74.3 159.2 L75.3 161.0 L76.3 162.8 L77.2 164.7 L78.1 166.5 L79.0 168.3 L79.8 170.2 L80.6 172.0" fill="none" stroke="rgba(190,100,70,.3)" stroke-width="1"/>' +
    '<path d="M53.5 62.0 L53.2 64.3 L52.5 66.7 L52.3 69.0 L52.8 71.3 L54.0 73.7 L55.2 76.0 L55.9 78.3 L55.7 80.7 L55.2 83.0 L55.1 85.3 L55.8 87.7 L57.3 90.0 L58.7 92.3 L59.4 94.7 L59.0 97.0 L58.1 99.3 L57.6 101.7 L58.1 104.0 L59.3 106.3 L60.4 108.7 L60.5 111.0 L59.4 113.3 L57.8 115.7 L56.6 118.0 L56.5 120.3 L57.3 122.7 L58.0 125.0 L57.7 127.3 L56.1 129.7 L53.9 132.0 L52.4 134.3 L52.2 136.7 L53.2 139.0 L54.2 141.3 L54.1 143.7 L52.7 146.0 L50.9 148.3 L49.8 150.7 L50.3 153.0 L52.2 155.3 L54.2 157.7 L55.0 160.0 L54.3 162.3 L53.1 164.7 L52.8 167.0 L54.1 169.3 L56.9 171.7 L59.7 174.0 L61.1 176.3 L60.7 178.7 L59.6 181.0 L59.3 183.3 L60.7 185.7 L63.4 188.0 L66.0 190.3 L67.0 192.7 L65.9 195.0 L63.8 197.3 L62.5 199.7 L62.9 202.0 L69.9 202.0 L70.6 199.7 L69.6 197.3 L67.7 195.0 L66.3 192.7 L66.2 190.3 L67.3 188.0 L68.2 185.7 L68.0 183.3 L66.2 181.0 L63.6 178.7 L61.7 176.3 L61.1 174.0 L61.7 171.7 L62.3 169.3 L62.0 167.0 L60.4 164.7 L58.3 162.3 L56.8 160.0 L56.8 157.7 L57.9 155.3 L59.1 153.0 L59.5 150.7 L58.8 148.3 L57.8 146.0 L57.3 143.7 L58.0 141.3 L59.8 139.0 L61.6 136.7 L62.6 134.3 L62.6 132.0 L62.1 129.7 L62.1 127.3 L63.0 125.0 L64.8 122.7 L66.5 120.3 L67.4 118.0 L67.2 115.7 L66.5 113.3 L66.2 111.0 L66.6 108.7 L67.7 106.3 L68.7 104.0 L68.9 101.7 L68.3 99.3 L67.1 97.0 L66.3 94.7 L66.2 92.3 L66.6 90.0 L67.1 87.7 L66.9 85.3 L66.1 83.0 L64.9 80.7 L64.0 78.3 L63.9 76.0 L64.3 73.7 L64.7 71.3 L64.7 69.0 L64.1 66.7 L63.4 64.3 L63.0 62.0Z" fill="rgba(255,226,210,.3)" stroke="rgba(255,205,185,.45)" stroke-width=".6"/>' +
    '<path d="M58.2 62.0 L58.3 64.3 L58.4 66.7 L58.6 69.0 L58.8 71.3 L59.1 73.7 L59.5 76.0 L59.8 78.3 L60.3 80.7 L60.7 83.0 L61.1 85.3 L61.6 87.7 L62.0 90.0 L62.4 92.3 L62.7 94.7 L63.0 97.0 L63.2 99.3 L63.4 101.7 L63.5 104.0 L63.5 106.3 L63.4 108.7 L63.2 111.0 L62.9 113.3 L62.6 115.7 L62.1 118.0 L61.6 120.3 L61.0 122.7 L60.4 125.0 L59.7 127.3 L59.0 129.7 L58.4 132.0 L57.7 134.3 L57.0 136.7 L56.5 139.0 L55.9 141.3 L55.5 143.7 L55.2 146.0 L54.9 148.3 L54.8 150.7 L54.9 153.0 L55.0 155.3 L55.3 157.7 L55.7 160.0 L56.2 162.3 L56.9 164.7 L57.6 167.0 L58.4 169.3 L59.3 171.7 L60.2 174.0 L61.1 176.3 L62.1 178.7 L63.0 181.0 L63.9 183.3 L64.7 185.7 L65.4 188.0 L65.9 190.3 L66.4 192.7 L66.7 195.0 L66.8 197.3 L66.8 199.7 L66.6 202.0" fill="none" stroke="rgba(190,100,70,.3)" stroke-width="1"/>' +
    '</g>' +
    '<g class="bell">' +
    '<path d="' + NETTLE_BELL + '" fill="url(#sea-nettle)"/>' +
    '<g clip-path="url(#sea-nettle-clip)" stroke="rgba(140,50,25,.45)" stroke-width="2.2" fill="none">' +
    [8, 22, 36, 50, 60, 70, 84, 98, 112].map(function(x){ return '<path d="M60 10Q' + ((x + 60) / 2) + ' 30 ' + x + ' 66"/>'; }).join('') +
    '</g>' +
    '<ellipse cx="44" cy="26" rx="16" ry="8" fill="#fff" opacity=".28" transform="rotate(-24 44 26)"/>' +
    '<path d="' + NETTLE_BELL + '" fill="none" stroke="rgba(255,225,190,.6)" stroke-width="1"/>' +
    '</g></svg>';

  // lanternfish (Myctophidae)
  var LANTERN = '<svg viewBox="0 0 160 60">' +
    '<g class="tail"><path d="M22 30L3 13c4 6 5 11 5 17s-1 11-5 17z" fill="#1c3350"/>' +
    rays(21, 30, [[5,16],[7,24],[8,30],[7,36],[5,44]], 'rgba(120,160,200,.3)') + '</g>' +
    '<path d="M68 12l11-8 10 8z" fill="#1c3350"/>' +
    '<path d="M36 15l4-4 3 4z" fill="#1c3350"/>' +
    '<path d="M80 44l6 8 7-8z" fill="#1c3350" opacity=".9"/>' +
    '<path d="' + LANTERN_BODY + '" fill="url(#sea-lantern)"/>' +
    '<g clip-path="url(#sea-lantern-clip)"><path d="' + LANTERN_BODY + '" fill="url(#sea-scales)"/>' +
    '<path d="M30 28c34-6 80-8 116-4" stroke="#cfe6f5" stroke-width="2" opacity=".5" fill="none"/></g>' +
    '<path class="fin" d="M120 34c-6 4-12 10-14 16 6-1 12-6 16-12z" fill="rgba(60,100,140,.6)"/>' +
    '<g class="lights" fill="#a9fbff">' +
    [34, 43, 52, 61, 70, 79, 88, 97, 106, 115].map(function(x, i){ return '<circle cx="' + x + '" cy="' + (39 + Math.sin(i / 3) * 2.5) + '" r="1.6"/>'; }).join('') +
    [48, 64, 80, 96].map(function(x){ return '<circle cx="' + x + '" cy="33" r="1.1" opacity=".75"/>'; }).join('') +
    '<circle cx="146" cy="36" r="1.8"/></g>' +
    '<path d="M156 30c-8 3-18 3-26 1" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="1.2"/>' +
    eye(139, 22, 8.5, '#0a1726', '#7a9cc0') +
    '</svg>';

  var kinds = {
    clown: { svg: CLOWN, size: [52, 30], speed: [26, 18] },
    tang: { svg: TANG, size: [56, 30], speed: [24, 18] },
    school: { svg: SCHOOL, size: [150, 60], speed: [18, 10] },
    jelly: { svg: JELLY, size: [70, 40], speed: [55, 30] },
    lantern: { svg: LANTERN, size: [52, 26], speed: [20, 14] },
  };
  var FISH = CLOWN, FISH2 = TANG;

  var who = {
    stream: ['clown', 'tang', 'school', 'clown', 'tang'],
    videos: ['jelly', 'jelly'],
    music: ['jelly', 'jelly', 'jelly'],
    models: ['lantern', 'lantern', 'lantern'],
    code: ['lantern', 'lantern', 'lantern', 'lantern'],
  };

  Object.keys(who).forEach(function(id){
    var sec = document.getElementById(id);
    if (!sec) return;
    var tank = document.createElement('div');
    tank.className = 'critters';
    tank.setAttribute('aria-hidden', 'true');
    who[id].forEach(function(kind){
      var k = kinds[kind];
      var c = document.createElement('div');
      var back = kind !== 'jelly' && Math.random() < 0.5;
      c.className = 'critter ' + kind + (kind === 'jelly' ? ' jelly' : '') + (back ? ' back' : '');
      c.innerHTML = k.svg;
      c.style.top = (8 + Math.random() * 78) + '%';
      c.style.setProperty('--size', (k.size[0] + Math.random() * k.size[1]) + 'px');
      c.style.animationDuration = (k.speed[0] + Math.random() * k.speed[1]) + 's';
      c.style.animationDelay = (-Math.random() * 60) + 's';
      tank.appendChild(c);
    });
    sec.insertBefore(tank, sec.firstChild);
  });

  /* ---------- the abyss: dark apart from the lure ---------- */

  var abyss = document.querySelector('.abyss');
  if (abyss) {
    var angler = abyss.querySelector('.angler');
    // where the lure sits inside the angler svg, in px at its drawn size
    var LURE_X = 150, LURE_Y = 14;
    var tx = 0, ty = 0, lx = 0, ly = 0, inside = false, t0 = performance.now();
    var aim = function(x, y){ var r = abyss.getBoundingClientRect(); tx = x - r.left; ty = y - r.top; inside = true; };
    abyss.addEventListener('pointermove', function(e){ aim(e.clientX, e.clientY); });
    abyss.addEventListener('pointerdown', function(e){ aim(e.clientX, e.clientY); });
    abyss.addEventListener('pointerleave', function(){ inside = false; });
    var onScreen = false;
    new IntersectionObserver(function(es){ onScreen = es[0].isIntersecting; }).observe(abyss);
    (function glow(now){
      requestAnimationFrame(glow);
      if (!onScreen) return;
      var w = abyss.clientWidth, h = abyss.clientHeight;
      if (!inside) {
        // no pointer in here: the fish goes for a wander on its own
        var s = (now - t0) / 1000;
        tx = w * (0.5 + 0.34 * Math.sin(s * 0.35));
        ty = h * (0.5 + 0.28 * Math.sin(s * 0.53));
      }
      var k = calm ? 1 : 0.08;
      lx += (tx - lx) * k; ly += (ty - ly) * k;
      abyss.style.setProperty('--lx', lx + 'px');
      abyss.style.setProperty('--ly', ly + 'px');
      var flip = tx < lx - 2 ? -1 : 1;
      angler.style.transform = 'translate(' + (lx - LURE_X * flip) + 'px,' + (ly - LURE_Y) + 'px) scaleX(' + flip + ')';
    })(performance.now());
  }

  /* ---------- treasure ---------- */

  var chest = document.querySelector('.chest');
  if (chest) {
    var opened = false;
    try { opened = localStorage.getItem('fishhwb-treasure') === '1'; } catch (e) {}
    if (opened) chest.classList.add('open');
    chest.addEventListener('click', function(){
      var first = !chest.classList.contains('open');
      chest.classList.add('open');
      try { localStorage.setItem('fishhwb-treasure', '1'); } catch (e) {}
      for (var i = 0; i < 14; i++) {
        var c = document.createElement('i');
        c.className = 'coin';
        c.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
        c.style.setProperty('--dy', (-60 - Math.random() * 120) + 'px');
        c.style.animationDelay = (Math.random() * 0.2) + 's';
        chest.appendChild(c);
        setTimeout(c.remove.bind(c), 1600);
      }
      talk(first
        ? "You found the treasure! It's 14 gold coins and a slightly damp sticker. Don't spend it all at once."
        : "Still just coins. I checked.");
    });
  }

  /* ---------- secret codes ---------- */

  var typed = '';
  var KONAMI = 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a';
  var keys = [];
  addEventListener('keydown', function(e){
    if (/input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable) return;
    keys.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    keys = keys.slice(-10);
    if (keys.join(' ') === KONAMI) { keys = []; swarm(); }
    if (e.key.length === 1) {
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (/id-?10-?t$/.test(typed)) { typed = ''; idiot(); }
    }
  });

  function idiot(){
    document.body.classList.remove('glitch');
    void document.body.offsetWidth;
    document.body.classList.add('glitch');
    setTimeout(function(){ document.body.classList.remove('glitch'); }, 700);
    talk("ID-10-T error detected. I checked the logs. It's you.");
  }

  function swarm(){
    var layer = document.createElement('div');
    layer.className = 'swarm';
    layer.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 30; i++) {
      var f = document.createElement('div');
      f.className = 'critter ' + (i % 4 ? 'sardine' : i % 8 ? 'clown' : 'tang');
      f.innerHTML = i % 4 ? SARDINE : i % 8 ? FISH : FISH2;
      f.style.top = (Math.random() * 92) + '%';
      f.style.setProperty('--size', (i % 4 ? 50 + Math.random() * 30 : 60 + Math.random() * 30) + 'px');
      f.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      f.style.animationDelay = (Math.random() * 1.5) + 's';
      layer.appendChild(f);
    }
    document.body.appendChild(layer);
    setTimeout(function(){ layer.remove(); }, 6500);
    talk('+30 fish. Cheat codes still work in 2026.');
  }

  /* ---------- sound: waves up top, muffled rumble at the bottom ---------- */

  var btn = document.querySelector('.sound');
  var audio = null;
  var depth = window.fishDepth || 0;

  function start(){
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    var ctx = new AC();
    // brown noise: sounds like water rather than hiss
    var len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0), last = 0;
    for (var i = 0; i < len; i++) { last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02; d[i] = last * 3.5; }
    var src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    var filter = ctx.createBiquadFilter(); filter.type = 'lowpass';
    var swell = ctx.createGain(); swell.gain.value = 0.5;
    var lfo = ctx.createOscillator(); lfo.frequency.value = 0.09;
    var lfoAmt = ctx.createGain();
    lfo.connect(lfoAmt).connect(swell.gain);
    var out = ctx.createGain(); out.gain.value = 0;
    src.connect(filter).connect(swell).connect(out).connect(ctx.destination);
    src.start(); lfo.start();
    out.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
    var a = { ctx: ctx, filter: filter, lfoAmt: lfoAmt, out: out };
    tune(a);
    (function blip(){
      a.timer = setTimeout(blip, 1500 + Math.random() * 5000);
      if (ctx.state !== 'running') return;
      var o = ctx.createOscillator(), g = ctx.createGain(), t = ctx.currentTime;
      o.type = 'sine';
      o.frequency.setValueAtTime(250 + Math.random() * 200, t);
      o.frequency.exponentialRampToValueAtTime(900 + Math.random() * 600, t + 0.12);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
      o.connect(g).connect(filter);
      o.start(t); o.stop(t + 0.16);
    })();
    return a;
  }

  function tune(a){
    var p = Math.min(1, depth / 4500);
    var t = a.ctx.currentTime;
    a.filter.frequency.setTargetAtTime(120 + 1500 * Math.pow(1 - p, 2), t, 0.4);
    a.lfoAmt.gain.setTargetAtTime(0.45 * (1 - p), t, 0.4);
  }

  addEventListener('depth', function(e){
    depth = e.detail.depth;
    if (audio) tune(audio);
  });

  if (btn) btn.addEventListener('click', function(){
    var on = btn.getAttribute('aria-pressed') === 'true';
    if (!on) {
      if (!audio) audio = start();
      if (!audio) return;
      audio.ctx.resume();
      audio.out.gain.setTargetAtTime(0.5, audio.ctx.currentTime, 0.3);
    } else if (audio) {
      audio.out.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.2);
      setTimeout(function(){ if (btn.getAttribute('aria-pressed') === 'false') audio.ctx.suspend(); }, 800);
    }
    btn.setAttribute('aria-pressed', String(!on));
  });
})();

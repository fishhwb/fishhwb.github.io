param(
    [Parameter(Mandatory=$true)]
    [string]$RepoPath
)

$ErrorActionPreference = 'Stop'
$SourceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoPath = (Resolve-Path $RepoPath).Path

$ExtrasPath = Join-Path $RepoPath 'assets\extras.js'
if (-not (Test-Path $ExtrasPath)) {
    throw "Could not find assets\extras.js under: $RepoPath"
}

$files = @(
    'assets\site-refresh.css',
    'assets\fish-refresh.js',
    'assets\parody-ad.js',
    'assets\ad-wall.css',
    'assets\ad-wall.js',
    'bait\index.html',
    'ADSENSE.md'
)

foreach ($relative in $files) {
    $src = Join-Path $SourceRoot $relative
    $dst = Join-Path $RepoPath $relative
    $dstDir = Split-Path -Parent $dst
    if (-not (Test-Path $dstDir)) { New-Item -ItemType Directory -Path $dstDir -Force | Out-Null }
    Copy-Item -LiteralPath $src -Destination $dst -Force
    Write-Host "Updated $relative"
}

$marker = 'FISHHWB_SITE_REFRESH_2026'
$extras = Get-Content -LiteralPath $ExtrasPath -Raw

if ($extras -notmatch [regex]::Escape($marker)) {
    $loader = @'

/* FISHHWB_SITE_REFRESH_2026 */
(function(){
  if (window.__fishhwbSiteRefresh2026) return;
  window.__fishhwbSiteRefresh2026 = true;

  function loadScripts(){
    ['assets/fish-refresh.js?v=20261006','assets/parody-ad.js?v=20261006'].forEach(function(src){
      var s = document.createElement('script');
      s.src = src;
      s.defer = true;
      document.head.appendChild(s);
    });
  }

  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'assets/site-refresh.css?v=20261006';
  css.onload = loadScripts;
  css.onerror = loadScripts;
  document.head.appendChild(css);
  setTimeout(function(){
    if (!document.querySelector('script[src*="fish-refresh.js"]')) loadScripts();
  }, 1200);
})();
'@
    Add-Content -LiteralPath $ExtrasPath -Value $loader -Encoding UTF8
    Write-Host 'Patched assets\extras.js with the site refresh loader.'
} else {
    Write-Host 'assets\extras.js already contains the site refresh loader; no duplicate patch added.'
}

Write-Host ''
Write-Host 'FISH HWB site refresh applied successfully.' -ForegroundColor Green
Write-Host 'Test the site, then commit/push the changed files.'

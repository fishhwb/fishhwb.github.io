import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const token = process.env.GITHUB_TOKEN || '';
const owners = ['dedzedofficial', 'fishhwb'];
const excludedRepos = new Set(['fishhwb/fishhwb.github.io']);
const siteBase = 'https://fishhwb.github.io';
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'FISHHWB-Website-Generator/2.0',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(token ? { Authorization: `Bearer ${token}` } : {})
};

const fallback = {
  'dedzedofficial/Meshy-Importer-for-Blender-Unity': 'Imports and locally decodes Meshy .meshy models for Unity, Blender, Godot and Unreal Engine.',
  'dedzedofficial/Optimize-Your-Project': 'A free Unity and Blender optimisation toolkit for repetitive cleanup and performance work.',
  'dedzedofficial/Blender-XR': 'Open-source VR mesh modelling and scene building using a controller-first OpenXR workflow.',
};

async function json(url, { allow404 = false } = {}) {
  const r = await fetch(url, { headers });
  if (allow404 && r.status === 404) return null;
  if (!r.ok) throw new Error(`${url}: ${r.status}`);
  return r.json();
}

async function readOptional(file, fallbackValue) {
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch { return fallbackValue; }
}

function slug(fullName) {
  return fullName.toLowerCase().replace(/\//g, '--').replace(/[^a-z0-9-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
function escapeHtml(v = '') {
  return String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function titleFromFile(file) {
  return path.basename(file, path.extname(file)).replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
function ageStatus(repo, override) {
  if (override?.status) return override.status;
  if (repo.archived) return 'Archived';
  const age = Date.now() - new Date(repo.pushed_at || repo.updated_at || 0).getTime();
  if (age < 120 * 864e5) return 'Active';
  if (age < 365 * 864e5) return 'Maintenance';
  return 'Quiet';
}
function preferredAsset(release) {
  if (!release) return null;
  const assets = Array.isArray(release.assets) ? release.assets : [];
  const ranked = assets.slice().sort((a,b) => {
    const score = x => /\.(exe|msi|dmg|pkg|zip|7z|tar\.gz|unitypackage|blend)$/i.test(x?.name || '') ? 2 : 0;
    return score(b)-score(a) || Number(b.download_count||0)-Number(a.download_count||0);
  });
  return ranked[0] || null;
}

async function collectProjects() {
  const overrides = await readOptional('assets/project-overrides.json', {});
  let raw = [];
  for (const owner of owners) {
    const list = await json(`https://api.github.com/users/${owner}/repos?sort=pushed&direction=desc&per_page=100&type=owner`);
    raw.push(...list);
  }
  const seen = new Set();
  raw = raw.filter(r => r && !r.private && !r.fork && r.name !== '.github' && !excludedRepos.has(r.full_name) && !seen.has(r.full_name) && seen.add(r.full_name));
  raw.sort((a,b) => new Date(b.pushed_at || 0) - new Date(a.pushed_at || 0));

  const repos = [];
  for (const repo of raw) {
    const override = overrides[repo.full_name] || {};
    let latest = null;
    try { latest = await json(`https://api.github.com/repos/${repo.full_name}/releases/latest`, {allow404:true}); }
    catch (err) { console.warn(`release ${repo.full_name}: ${err.message}`); }
    const asset = preferredAsset(latest);
    const pageSlug = slug(repo.full_name);
    repos.push({
      id: repo.id,
      owner: { login: repo.owner?.login || repo.full_name.split('/')[0] },
      full_name: repo.full_name,
      name: override.name || repo.name,
      html_url: repo.html_url,
      homepage: repo.homepage || '',
      description: repo.description || '',
      summary: override.summary || fallback[repo.full_name] || repo.description || 'Public FISH HWB project. Open the repository for documentation, releases and source code.',
      language: repo.language || '',
      topics: Array.isArray(repo.topics) ? repo.topics : [],
      license: repo.license ? { name: repo.license.name, spdx_id: repo.license.spdx_id } : null,
      archived: !!repo.archived,
      pushed_at: repo.pushed_at || '',
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      open_issues_count: repo.open_issues_count || 0,
      status: ageStatus(repo, override),
      page: `projects/${pageSlug}/`,
       install_url: override.install_url || '',
      socialImage: override.socialImage || `https://opengraph.githubassets.com/1/${repo.full_name}`,
      release: latest ? {
        tag_name: latest.tag_name || latest.name || '',
        name: latest.name || latest.tag_name || '',
        published_at: latest.published_at || latest.created_at || '',
        html_url: latest.html_url || '',
        download_url: asset?.browser_download_url || latest.html_url || '',
        asset_name: asset?.name || '',
        download_count: asset?.download_count || 0
      } : null
    });
  }
  await writeFile('assets/projects.json', JSON.stringify({ updatedAt: new Date().toISOString(), _note: 'Generated by .github/scripts/build-site-content.mjs. Manual edits are overwritten.', repos }, null, 2) + '\n');
  return repos;
}

async function walk(dir, out = []) {
  let entries;
  try { entries = await readdir(dir, {withFileTypes:true}); }
  catch { return out; }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full.replaceAll('\\','/'));
  }
  return out;
}

async function buildGallery() {
  const files = await walk('assets/3d');
  const imageExt = new Set(['png','jpg','jpeg','webp','avif']);
  const modelExt = new Set(['glb','gltf','obj','stl','fbx']);
  const sourceExt = new Set(['blend']);
  const eligible = files.filter(f => !/\/README\.md$/i.test(f));
  const byStem = new Map();
  for (const f of eligible) {
    const ext = path.extname(f).slice(1).toLowerCase();
    const stem = f.slice(0, -(ext.length + 1)).toLowerCase();
    if (!byStem.has(stem)) byStem.set(stem, []);
    byStem.get(stem).push({path:f, ext});
  }
  const modelStems = new Set(eligible.filter(f => modelExt.has(path.extname(f).slice(1).toLowerCase())).map(f => f.slice(0,-path.extname(f).length).toLowerCase()));
  const items = [];
  for (const f of eligible.sort()) {
    const ext = path.extname(f).slice(1).toLowerCase();
    const stem = f.slice(0,-path.extname(f).length).toLowerCase();
    const siblings = byStem.get(stem) || [];
    const preview = siblings.find(x => x.ext === 'webp') || siblings.find(x => imageExt.has(x.ext));
    if (modelExt.has(ext)) {
      items.push({ type:'model', path:f, ext, title:titleFromFile(f), preview:preview?.path || '', label:`Interactive ${ext.toUpperCase()} model` });
    } else if (imageExt.has(ext) && !modelStems.has(stem)) {
      items.push({ type:'image', path:f, ext, title:titleFromFile(f), preview:f, label:'3D render' });
    } else if (sourceExt.has(ext)) {
      items.push({ type:'source', path:f, ext, title:titleFromFile(f), preview:preview?.path || '', label:'Blender source file' });
    }
  }
  await writeFile('assets/gallery.json', JSON.stringify({ updatedAt:new Date().toISOString(), _note:'Generated from assets/3d by .github/scripts/build-site-content.mjs. Manual edits are overwritten.', items }, null, 2) + '\n');
  return items;
}

function projectHtml(repo) {
  const title = `${repo.name} | FISH HWB Projects`;
  const desc = repo.summary;
  const canonical = `${siteBase}/${repo.page}`;
  const release = repo.release?.tag_name ? `<p class="project-release"><b>Latest release:</b> ${escapeHtml(repo.release.tag_name)}${repo.release.published_at ? ` · ${escapeHtml(new Date(repo.release.published_at).toLocaleDateString('en-GB'))}` : ''}</p>` : '';
  const browserInstall = repo.install_url ? `<a class="button" href="${escapeHtml(repo.install_url)}">Install browser extension ↗</a>` : '';
  const download = repo.release?.download_url ? `<a class="button" href="${escapeHtml(repo.release.download_url)}" rel="noopener">Download latest ↗</a>` : '';
  const topics = (repo.topics||[]).slice(0,8).map(t=>`<span>${escapeHtml(t)}</span>`).join('');
  const schema = {
    '@context':'https://schema.org',
    '@type':'SoftwareSourceCode',
    name:repo.name,
    description:repo.summary,
    codeRepository:repo.html_url,
    programmingLanguage:repo.language || undefined,
    url:canonical,
    author:{'@type':'Person',name:'Ded Zed',url:siteBase},
    license:repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' ? `https://spdx.org/licenses/${repo.license.spdx_id}.html` : undefined,
    version:repo.release?.tag_name || undefined
  };
  Object.keys(schema).forEach(k=>schema[k]===undefined&&delete schema[k]);
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(desc)}"><link rel="canonical" href="${canonical}">
<meta property="og:title" content="${escapeHtml(repo.name)}"><meta property="og:description" content="${escapeHtml(desc)}"><meta property="og:type" content="website"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${escapeHtml(repo.socialImage)}"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="../../assets/favicon.ico"><link rel="stylesheet" href="../../assets/style.css"><link rel="stylesheet" href="../../assets/site-v2.css"><script type="application/ld+json">${JSON.stringify(schema).replace(/<\//g,'<\\/')}</script>
<style>.project-page{padding:72px 0 100px;min-height:80vh}.project-page .hero{max-width:850px}.project-page h1{font:900 clamp(2.8rem,8vw,6rem)/.88 var(--head);font-variation-settings:"wdth" 72;text-transform:uppercase;margin:12px 0 22px;overflow-wrap:anywhere}.project-page .lead{font-size:1.2rem;max-width:690px;color:var(--ink-2)}.project-page .chips{display:flex;gap:7px;flex-wrap:wrap;margin:24px 0}.project-page .chips span{border:1.5px solid var(--ink);padding:5px 8px;font:500 .72rem/1 var(--mono)}.project-page .actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}.project-release{font:500 .85rem/1.5 var(--mono);margin-top:24px}</style></head>
<body><header class="site-head"><div class="wrap nav"><a class="brand" href="../../"><img src="../../assets/fishhwb-mascot.webp" alt="" width="36" height="36">FISH HWB</a></div></header>
<main class="project-page"><div class="wrap hero"><div class="eyebrow">Project · ${escapeHtml(repo.status)}</div><h1>${escapeHtml(repo.name)}</h1><p class="lead">${escapeHtml(desc)}</p><div class="chips"><span>${escapeHtml(repo.status)}</span>${repo.language?`<span>${escapeHtml(repo.language)}</span>`:''}${repo.license?.spdx_id?`<span>${escapeHtml(repo.license.spdx_id)}</span>`:''}${topics}</div>${release}<div class="actions">${browserInstall}${download}<a class="button alt" href="${escapeHtml(repo.html_url)}" rel="noopener">GitHub ↗</a>${repo.homepage?`<a class="button alt" href="${escapeHtml(repo.homepage)}" rel="noopener">Website ↗</a>`:''}</div></div></main>
<footer><div class="wrap foot"><div>FISH HWB</div><div><a href="../../#projects">All projects</a> · <a href="../../privacy-policy/">Privacy</a></div></div></footer></body></html>\n`;
}

async function buildProjectPages(repos) {
  await mkdir('projects', {recursive:true});
  for (const repo of repos) {
    const dir = path.join('projects', slug(repo.full_name));
    await mkdir(dir, {recursive:true});
    await writeFile(path.join(dir,'index.html'), projectHtml(repo));
  }
}

async function buildSitemap(repos) {
  const urls = [
    `${siteBase}/`,
    `${siteBase}/privacy-policy/`,
    `${siteBase}/terms-of-service/`,
    `${siteBase}/install/meshy/`,
    ...repos.map(r => `${siteBase}/${r.page}`)
  ];
  const body = urls.map(u=>`  <url><loc>${escapeHtml(u)}</loc></url>`).join('\n');
  await writeFile('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generated public sitemap. Hidden friendship/auth routes are intentionally excluded. -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

const repos = await collectProjects();
const gallery = await buildGallery();
await buildProjectPages(repos);
await buildSitemap(repos);
console.log(`Generated ${repos.length} project cards/pages and indexed ${gallery.length} 3D gallery item(s).`);

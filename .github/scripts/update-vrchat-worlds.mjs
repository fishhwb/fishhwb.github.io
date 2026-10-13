import { readFile, writeFile } from 'node:fs/promises';

const path = 'assets/vrchat-worlds.json';
const current = JSON.parse(await readFile(path, 'utf8'));
const seedIds = Array.isArray(current.worldIds)
  ? current.worldIds.filter(x => /^wrld_[0-9a-f-]{36}$/i.test(x))
  : [];
const old = new Map((current.worlds || []).map(w => [w.id, w]));
const headers = {
  Accept: 'application/json',
  'User-Agent': 'FISHHWB-Website/2.0 (+https://github.com/fishhwb/fishhwb.github.io)'
};
const authCookie = process.env.VRCHAT_AUTH_COOKIE || '';
if (authCookie) headers.Cookie = authCookie.includes('auth=') ? authCookie : `auth=${authCookie}`;

async function getWorld(id) {
  const r = await fetch(`https://api.vrchat.cloud/api/1/worlds/${encodeURIComponent(id)}`, { headers });
  if (!r.ok) throw new Error(`VRChat returned ${r.status}`);
  return r.json();
}

function platformsFrom(w, fallback) {
  const found = new Set();
  for (const pkg of w.unityPackages || []) {
    const p = String(pkg?.platform || '').toLowerCase();
    if (p === 'standalonewindows' || p === 'windows') found.add('PC');
    else if (p === 'android') found.add('Android/Quest');
    else if (p) found.add(pkg.platform);
  }
  return found.size ? [...found] : (fallback.platforms || []);
}

function normalise(w, fallback = {}) {
  const id = w.id || fallback.id;
  return {
    id,
    name: w.name || fallback.name || 'VRChat world',
    description: w.description || fallback.description || '',
    thumbnailImageUrl: w.thumbnailImageUrl || w.imageUrl || fallback.thumbnailImageUrl || '',
    imageUrl: w.imageUrl || fallback.imageUrl || '',
    capacity: w.capacity || w.recommendedCapacity || fallback.capacity || null,
    recommendedCapacity: w.recommendedCapacity || fallback.recommendedCapacity || null,
    authorId: w.authorId || fallback.authorId || '',
    authorName: w.authorName || fallback.authorName || '',
    visits: Number.isFinite(w.visits) ? w.visits : (fallback.visits ?? null),
    favorites: Number.isFinite(w.favorites) ? w.favorites : (fallback.favorites ?? null),
    popularity: Number.isFinite(w.popularity) ? w.popularity : (fallback.popularity ?? null),
    heat: Number.isFinite(w.heat) ? w.heat : (fallback.heat ?? null),
    releaseStatus: w.releaseStatus || fallback.releaseStatus || 'public',
    publicationDate: w.publicationDate || fallback.publicationDate || '',
    labsPublicationDate: w.labsPublicationDate || fallback.labsPublicationDate || '',
    platforms: platformsFrom(w, fallback),
    tags: Array.isArray(w.tags) ? w.tags : (fallback.tags || []),
    updatedAt: w.updated_at || w.updatedAt || fallback.updatedAt || '',
    url: `https://vrchat.com/home/world/${id}`
  };
}

const ids = new Set(seedIds);
const authorIds = new Set();
const firstPass = new Map();

// Seed worlds let us learn the creator's VRChat user ID without storing login credentials.
for (const id of seedIds) {
  try {
    const w = await getWorld(id);
    firstPass.set(id, w);
    if (w.authorId) authorIds.add(w.authorId);
  } catch (err) {
    console.warn(`${id}: ${err.message}; keeping last known metadata`);
    const fallback = old.get(id);
    if (fallback?.authorId) authorIds.add(fallback.authorId);
  }
}

// Once an author ID is known, ask VRChat for all public worlds by that author.
// VRChat requires authentication for author enumeration, so the workflow can use VRCHAT_AUTH_COOKIE.
// Individual known public worlds still refresh without authentication.
for (const authorId of authorIds) {
  try {
    for (let offset = 0; offset < 2000; offset += 100) {
      const url = new URL('https://api.vrchat.cloud/api/1/worlds');
      url.searchParams.set('userId', authorId);
      url.searchParams.set('n', '100');
      url.searchParams.set('offset', String(offset));
      url.searchParams.set('sort', 'updated');
      url.searchParams.set('order', 'descending');
      url.searchParams.set('releaseStatus', 'public');
      const r = await fetch(url, { headers });
      if (!r.ok) throw new Error(`world search returned ${r.status}`);
      const page = await r.json();
      if (!Array.isArray(page)) throw new Error('world search returned an unexpected response');
      for (const w of page) {
        if (w?.id && w.authorId === authorId) {
          ids.add(w.id);
          firstPass.set(w.id, w);
        }
      }
      if (page.length < 100) break;
    }
  } catch (err) {
    console.warn(`${authorId}: ${err.message}; automatic discovery skipped this run`);
  }
}

const worlds = [];
for (const id of ids) {
  const fallback = old.get(id) || normalise(firstPass.get(id) || { id });
  try {
    const w = firstPass.get(id) || await getWorld(id);
    worlds.push(normalise(w, fallback));
  } catch (err) {
    console.warn(`${id}: ${err.message}; keeping last known metadata`);
    worlds.push(fallback);
  }
}

worlds.sort((a, b) => {
  const byDate = String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
  return byDate || String(a.name || '').localeCompare(String(b.name || ''));
});
const worldIds = worlds.map(w => w.id);
const core = { worldIds, worlds };
const previousCore = { worldIds: current.worldIds || [], worlds: current.worlds || [] };

if (JSON.stringify(core) !== JSON.stringify(previousCore)) {
  await writeFile(path, JSON.stringify({ updatedAt: new Date().toISOString(), ...core }, null, 2) + '\n');
  console.log(`Updated ${worlds.length} VRChat world${worlds.length === 1 ? '' : 's'}.`);
} else {
  console.log(`No VRChat world changes (${worlds.length} known).`);
}

import { readFile, writeFile } from 'node:fs/promises';

const path = 'assets/vrchat-worlds.json';
const current = JSON.parse(await readFile(path, 'utf8'));
const old = new Map((current.worlds || []).map(w => [w.id, w]));
const validWorldId = value => /^wrld_[0-9a-f-]{36}$/i.test(String(value || ''));

const ownerId = process.env.VRCHAT_OWNER_USER_ID
  || current.ownerUserId
  || (current.worlds || []).find(w => /^usr_[0-9a-f-]{36}$/i.test(String(w?.authorId || '')))?.authorId
  || 'usr_97d57b9e-27fa-4fce-a1ce-218edb215ad2';

const baseHeaders = {
  Accept: 'application/json',
  'User-Agent': 'FISHHWB-Website/2.1 (+https://github.com/fishhwb/fishhwb.github.io)'
};

function normaliseCookie(name, value) {
  const clean = String(value || '').trim();
  if (!clean) return '';
  return clean.includes(`${name}=`) ? clean : `${name}=${clean}`;
}

const cookies = [
  normaliseCookie('auth', process.env.VRCHAT_AUTH_COOKIE),
  normaliseCookie('twoFactorAuth', process.env.VRCHAT_TWO_FACTOR_AUTH_COOKIE)
].filter(Boolean);
const authHeaders = cookies.length ? { ...baseHeaders, Cookie: cookies.join('; ') } : baseHeaders;

async function fetchJson(url, headers = baseHeaders) {
  const r = await fetch(url, { headers });
  if (!r.ok) {
    const error = new Error(`VRChat returned ${r.status}`);
    error.status = r.status;
    throw error;
  }
  return r.json();
}

async function getWorld(id) {
  const url = `https://api.vrchat.cloud/api/1/worlds/${encodeURIComponent(id)}`;
  try {
    return await fetchJson(url, baseHeaders);
  } catch (publicError) {
    if (!cookies.length) throw publicError;
    return fetchJson(url, authHeaders);
  }
}

function platformsFrom(w, fallback = {}) {
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

const ids = new Set([
  ...(Array.isArray(current.worldIds) ? current.worldIds : []),
  ...(current.worlds || []).map(w => w.id)
].filter(validWorldId));
const firstPass = new Map();

function collectWorldIds(value) {
  if (typeof value === 'string') {
    if (validWorldId(value)) ids.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectWorldIds(item);
    return;
  }
  if (!value || typeof value !== 'object') return;
  if (validWorldId(value.id)) {
    ids.add(value.id);
    firstPass.set(value.id, value);
  }
  for (const child of Object.values(value)) collectWorldIds(child);
}

let profileDiscoverySucceeded = false;
if (cookies.length) {
  try {
    const url = new URL(`https://api.vrchat.cloud/api/1/profile/${encodeURIComponent(ownerId)}`);
    url.searchParams.set('withGroupsAndWorlds', 'true');
    const profile = await fetchJson(url, authHeaders);
    const publicWorlds = Array.isArray(profile.publicWorlds) ? profile.publicWorlds : [];
    for (const world of publicWorlds) collectWorldIds(world);
    profileDiscoverySucceeded = true;

    const advertised = Number(profile.totalPublicWorldsCount || 0);
    if (advertised && publicWorlds.length < advertised) {
      console.warn(`VRChat profile reports ${advertised} public worlds but returned ${publicWorlds.length}; known worlds will still be preserved and validated.`);
    } else {
      console.log(`VRChat profile discovery returned ${publicWorlds.length} public world${publicWorlds.length === 1 ? '' : 's'}.`);
    }
  } catch (err) {
    console.warn(`Public-profile world discovery failed: ${err.message}. Existing worlds will be preserved.`);
  }
} else {
  console.warn('No VRCHAT_AUTH_COOKIE is configured; public-profile world discovery cannot run.');
}

// Preserve any world IDs embedded in the profile response, then independently verify
// ownership and public release status before putting them on the website.
const worlds = [];
for (const id of ids) {
  const fallback = old.get(id) || normalise(firstPass.get(id) || { id });
  try {
    const w = await getWorld(id);
    if (w.authorId !== ownerId) {
      console.warn(`${id}: skipped because it belongs to ${w.authorId || 'an unknown author'}`);
      continue;
    }
    if (w.releaseStatus !== 'public') {
      console.log(`${id}: skipped because releaseStatus is ${w.releaseStatus || 'unknown'}`);
      continue;
    }
    worlds.push(normalise(w, fallback));
  } catch (err) {
    if (fallback?.authorId === ownerId && fallback?.releaseStatus === 'public') {
      console.warn(`${id}: ${err.message}; keeping last known public metadata`);
      worlds.push(fallback);
    } else {
      console.warn(`${id}: ${err.message}; skipped because it could not be safely verified`);
    }
  }
}

worlds.sort((a, b) => {
  const byDate = String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
  return byDate || String(a.name || '').localeCompare(String(b.name || ''));
});

const worldIds = worlds.map(w => w.id);
const core = { ownerUserId: ownerId, worldIds, worlds };
const previousCore = {
  ownerUserId: current.ownerUserId || ownerId,
  worldIds: current.worldIds || [],
  worlds: current.worlds || []
};

if (!profileDiscoverySucceeded && worlds.length === 0 && old.size) {
  console.warn('Discovery/validation produced no safe worlds; leaving the existing file untouched.');
  process.exit(0);
}

if (JSON.stringify(core) !== JSON.stringify(previousCore)) {
  await writeFile(path, JSON.stringify({ updatedAt: new Date().toISOString(), ...core }, null, 2) + '\n');
  console.log(`Updated ${worlds.length} VRChat world${worlds.length === 1 ? '' : 's'}.`);
} else {
  console.log(`No VRChat world changes (${worlds.length} known).`);
}

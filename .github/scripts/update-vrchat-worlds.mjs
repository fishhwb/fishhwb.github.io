import { readFile, writeFile } from 'node:fs/promises';

const path = 'assets/vrchat-worlds.json';
const current = JSON.parse(await readFile(path, 'utf8'));
const old = new Map((current.worlds || []).map(w => [w.id, w]));
const validWorldId = value => /^wrld_[0-9a-f-]{36}$/i.test(String(value || ''));
const ownerId = current.ownerUserId
  || (current.worlds || []).find(w => /^usr_[0-9a-f-]{36}$/i.test(String(w?.authorId || '')))?.authorId
  || 'usr_97d57b9e-27fa-4fce-a1ce-218edb215ad2';
const authCookie = String(process.env.VRCHAT_AUTH_COOKIE || '').trim();
const discoveryFile = String(process.env.VRCHAT_DISCOVERY_FILE || '').trim();

// Public worlds found under DedZedOffishal. Keeping these as permanent candidates
// means an incomplete third-party search index cannot silently remove a world.
// Every candidate is still checked against VRChat below before it is published.
const permanentSeedWorldIds = [
  'wrld_2e9d399f-749f-43a5-958c-a524ad3bec56', // Echo Reef
  'wrld_5ee23cc0-0821-49e2-82b6-0dd8b94d47f8', // Marked Realms
  'wrld_ff5a8b4c-e722-4fd8-9fe1-01ce42925567', // Greggs
  'wrld_873faac1-2a30-4574-be0b-d1a5856f5402', // Ded Haven
  'wrld_c531ec2c-4a65-4695-8d5a-6b46100f45a5', // Murder Party
  'wrld_b2350f58-8dd4-499e-ad26-a065114a4d39'  // DayScare
];
const seedWorldIds = [...new Set([
  ...permanentSeedWorldIds,
  ...(Array.isArray(current.seedWorldIds) ? current.seedWorldIds : [])
])].filter(validWorldId);

const headers = {
  Accept: 'application/json',
  'User-Agent': 'FISHHWB-Website/2.4 (+https://fishhwb.github.io/)'
};

function officialHeaders() {
  if (!authCookie) return headers;
  return {
    ...headers,
    Cookie: authCookie.includes('auth=') ? authCookie : `auth=${authCookie}`
  };
}

async function fetchJson(url, requestHeaders = headers) {
  const r = await fetch(url, { headers: requestHeaders });
  if (!r.ok) throw new Error(`${new URL(url).hostname} returned ${r.status}`);
  return r.json();
}

async function getWorld(id) {
  return fetchJson(`https://api.vrchat.cloud/api/1/worlds/${encodeURIComponent(id)}`, officialHeaders());
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
  ...seedWorldIds,
  ...(Array.isArray(current.worldIds) ? current.worldIds : []),
  ...(current.worlds || []).map(w => w.id)
].filter(validWorldId));

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
  if (validWorldId(value.id)) ids.add(value.id);
  for (const child of Object.values(value)) collectWorldIds(child);
}

let discoverySucceeded = false;
if (discoveryFile) {
  try {
    const discovered = JSON.parse(await readFile(discoveryFile, 'utf8'));
    const before = ids.size;
    collectWorldIds(discovered);
    const added = ids.size - before;
    discoverySucceeded = true;
    console.log(`Browser author search added ${added} candidate world${added === 1 ? '' : 's'}.`);
  } catch (err) {
    console.warn(`Browser world discovery unavailable: ${err.message}.`);
  }
}

async function discoverFromVrchat() {
  let offset = 0;
  let addedTotal = 0;
  for (let page = 0; page < 20; page++) {
    const url = new URL('https://api.vrchat.cloud/api/1/worlds');
    url.searchParams.set('userId', ownerId);
    url.searchParams.set('releaseStatus', 'public');
    url.searchParams.set('sort', 'updated');
    url.searchParams.set('order', 'descending');
    url.searchParams.set('n', '100');
    url.searchParams.set('offset', String(offset));
    const batch = await fetchJson(url.toString(), officialHeaders());
    if (!Array.isArray(batch)) throw new Error('VRChat returned an unexpected world-search response');
    const before = ids.size;
    collectWorldIds(batch);
    addedTotal += ids.size - before;
    if (batch.length < 100) break;
    offset += 100;
  }
  console.log(`VRChat author search added ${addedTotal} candidate world${addedTotal === 1 ? '' : 's'}.`);
}

try {
  await discoverFromVrchat();
  discoverySucceeded = true;
} catch (err) {
  console.warn(`VRChat author search unavailable: ${err.message}.`);
}

try {
  const indexUrl = `https://vrcavatarsearch.nekosunevr.co.uk/api/v1/worlds/by-author/${encodeURIComponent(ownerId)}`;
  const indexed = await fetchJson(indexUrl);
  const before = ids.size;
  collectWorldIds(indexed?.data ?? indexed);
  discoverySucceeded = true;
  const added = ids.size - before;
  console.log(`Public world index added ${added} candidate world${added === 1 ? '' : 's'}.`);
} catch (err) {
  console.warn(`Public world discovery failed: ${err.message}; keeping known worlds.`);
}

const worlds = [];
for (const id of ids) {
  const fallback = old.get(id) || { id };
  try {
    const w = await getWorld(id);
    if (w.authorId !== ownerId) {
      console.warn(`${id}: ignored because it belongs to another author.`);
      continue;
    }
    if (w.releaseStatus !== 'public') {
      console.log(`${id}: ignored because it is ${w.releaseStatus || 'not public'}.`);
      continue;
    }
    worlds.push(normalise(w, fallback));
  } catch (err) {
    if (fallback?.authorId === ownerId && fallback?.releaseStatus === 'public') {
      console.warn(`${id}: ${err.message}; keeping last known public metadata.`);
      worlds.push(fallback);
    } else {
      console.warn(`${id}: ${err.message}; skipped because it could not be verified.`);
    }
  }
}

worlds.sort((a, b) => {
  const byDate = String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
  return byDate || String(a.name || '').localeCompare(String(b.name || ''));
});

const worldIds = worlds.map(w => w.id);
const core = { ownerUserId: ownerId, seedWorldIds, worldIds, worlds };
const previousCore = {
  ownerUserId: current.ownerUserId || ownerId,
  seedWorldIds: current.seedWorldIds || [],
  worldIds: current.worldIds || [],
  worlds: current.worlds || []
};

if (!discoverySucceeded && worlds.length === 0 && old.size) {
  console.warn('Discovery and validation produced no safe worlds; leaving the existing file untouched.');
  process.exit(0);
}

if (JSON.stringify(core) !== JSON.stringify(previousCore)) {
  await writeFile(path, JSON.stringify({ updatedAt: new Date().toISOString(), ...core }, null, 2) + '\n');
  console.log(`Updated ${worlds.length} VRChat world${worlds.length === 1 ? '' : 's'}.`);
} else {
  console.log(`No VRChat world changes (${worlds.length} known).`);
}

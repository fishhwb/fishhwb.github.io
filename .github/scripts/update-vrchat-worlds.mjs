import { readFile, writeFile } from 'node:fs/promises';

const path = 'assets/vrchat-worlds.json';
const current = JSON.parse(await readFile(path, 'utf8'));
const ids = Array.isArray(current.worldIds) ? current.worldIds.filter(x => /^wrld_[0-9a-f-]{36}$/i.test(x)) : [];
const old = new Map((current.worlds || []).map(w => [w.id, w]));
const worlds = [];
const headers = {
  'Accept': 'application/json',
  'User-Agent': 'FISHHWB-Website/1.0 (+https://github.com/fishhwb/fishhwb.github.io)'
};

for (const id of ids) {
  let fallback = old.get(id) || { id, name: 'VRChat world', description: '', url: `https://vrchat.com/home/world/${id}` };
  try {
    const r = await fetch(`https://api.vrchat.cloud/api/1/worlds/${encodeURIComponent(id)}`, { headers });
    if (!r.ok) throw new Error(`VRChat returned ${r.status}`);
    const w = await r.json();
    worlds.push({
      id,
      name: w.name || fallback.name,
      description: w.description || fallback.description || '',
      thumbnailImageUrl: w.thumbnailImageUrl || w.imageUrl || fallback.thumbnailImageUrl || '',
      imageUrl: w.imageUrl || fallback.imageUrl || '',
      capacity: w.capacity || w.recommendedCapacity || fallback.capacity || null,
      authorName: w.authorName || fallback.authorName || '',
      updatedAt: w.updated_at || w.updatedAt || '',
      url: `https://vrchat.com/home/world/${id}`
    });
  } catch (err) {
    console.warn(`${id}: ${err.message}; keeping last known metadata`);
    worlds.push(fallback);
  }
}

await writeFile(path, JSON.stringify({ updatedAt: new Date().toISOString(), worldIds: ids, worlds }, null, 2) + '\n');

// DedZedoffishal was here, if you are looking here you missed the ID-10-T error
// Pulls the latest posts from the DedZed Patreon and writes assets/devlog.json
// for the Dev log section. Run hourly by .github/workflows/patreon-devlog.yml.
// Uses Patreon's public post listing, so no token is needed. Patron-only posts
// come through as a title and a link, never their content.
import { readFile, writeFile } from 'node:fs/promises';

const CAMPAIGN = process.env.PATREON_CAMPAIGN_ID || '7377437';
const PAGE = 'https://www.patreon.com/cw/DedZed';
const OUT = new URL('../../assets/devlog.json', import.meta.url);
const UA = 'Mozilla/5.0 (compatible; fishhwb.github.io dev log sync)';

const q = new URLSearchParams({
  'filter[campaign_id]': CAMPAIGN,
  'filter[contains_exclusive_posts]': 'true',
  'filter[is_draft]': 'false',
  sort: '-published_at',
  'fields[post]': 'title,published_at,url,is_public,teaser_text,content',
  'json-api-use-default-includes': 'false',
  'page[count]': '20',
});

const res = await fetch('https://www.patreon.com/api/posts?' + q, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
if (!res.ok) {
  // leave the existing file alone rather than wiping the dev log
  console.error('Patreon said ' + res.status + ', keeping the current dev log.');
  process.exit(0);
}
const body = await res.json();
if (!Array.isArray(body.data)) {
  console.error('Unexpected reply from Patreon, keeping the current dev log.');
  process.exit(0);
}

const plain = (html) => String(html || '')
  .replace(/<(br|\/p|\/li|\/h\d)[^>]*>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'")
  .replace(/\n{3,}/g, '\n\n').trim();

const clip = (text, max = 320) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 40)).trim() + '...';
};

const posts = body.data.map(({ attributes: a }) => {
  const open = a.is_public === true;
  const link = a.url ? new URL(a.url, 'https://www.patreon.com').href : PAGE;
  return {
    date: String(a.published_at || '').slice(0, 10),
    title: plain(a.title) || 'Untitled post',
    text: clip(plain(open ? (a.content || a.teaser_text) : a.teaser_text)),
    link,
    locked: !open,
  };
}).filter((p) => p.date);

const next = {
  _note: 'Filled in automatically from Patreon every hour by .github/workflows/patreon-devlog.yml. Edits here get overwritten.',
  patreon: PAGE,
  posts,
};

let before = '';
try { before = await readFile(OUT, 'utf8'); } catch {}
const out = JSON.stringify(next, null, 2) + '\n';
if (out === before) {
  console.log('No new posts.');
} else {
  await writeFile(OUT, out);
  console.log('Wrote ' + posts.length + ' post(s) to assets/devlog.json.');
}

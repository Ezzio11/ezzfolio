// Scans public/assets/work/<series>/*.webp (skipping *_thumb) -> src/data/work.json
// Edit ORDER/TITLES to curate; folders starting with "wwe" merge into one room; SKIP hides folders.
import { readdirSync, writeFileSync } from 'fs';
const root = 'public/assets/work';
const SKIP = ['mz']; // company-internal pages, not personal work
// Series get their own section above the singles. `kind: 'book'` opens the page-turner.
// Blurbs are drafts: edit freely.
const SERIES = {
  'wwe-bloodline': { id: 'bloodline', title: 'The Bloodline Files', kind: 'book', blurb: 'A classified dossier on the Bloodline Syndicate: character files, case files for every major event, 22 pages.' },
  'wwe-wargames2025': { id: 'wargames', title: 'WarGames 2025', kind: 'grid', blurb: 'The Survivor Series WarGames roster, redone as Arabic candidate cards.' },
  jackets: { id: 'jackets', title: 'Jackets', blurb: 'Varsity jackets, one per person.' },
  thumbnails: { id: 'nile-league', title: 'Nile League', blurb: 'Thumbnail series.' },
};
const ORDER = ['recent', 'wwe', 'football', 'attitude', 'archive'];
const TITLES = { recent: 'Recent', wwe: 'Wrestling', football: 'Football', attitude: 'Attitude', archive: 'Archive' };
const pretty = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const rooms = {}, series = [];
for (const d of readdirSync(root, { withFileTypes: true }).filter((d) => d.isDirectory() && !SKIP.includes(d.name))) {
  const items = readdirSync(`${root}/${d.name}`).filter((f) => f.endsWith('.webp') && !f.endsWith('_thumb.webp')).sort()
    .map((f) => ({ src: `/assets/work/${d.name}/${f}`, thumb: `/assets/work/${d.name}/${f.replace('.webp', '_thumb.webp')}`, title: pretty(f.replace('.webp', '').replace(/^\d+-/, '')) }));
  if (SERIES[d.name]) series.push({ ...SERIES[d.name], items });
  else (rooms[d.name.startsWith('wwe') ? 'wwe' : d.name] ||= []).push(...items);
}
series.sort((a, b) => Object.values(SERIES).findIndex((x) => x.id === a.id) - Object.values(SERIES).findIndex((x) => x.id === b.id));
const singles = Object.keys(rooms).sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)).map((id) => ({ id, title: TITLES[id] || pretty(id), items: rooms[id] }));
writeFileSync('src/data/work.json', JSON.stringify({ series, singles }, null, 1));
console.log([...series, ...singles].map((s) => `${s.id}: ${s.items.length}`).join('\n'));

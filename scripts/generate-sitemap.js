import fs from 'fs';
import path from 'path';

const baseUrl = 'https://www.2mparfumeriedk.com';
const routes = [
  '/',
  '/boutique',
  '/contact',
  '/faq',
  '/blog',
  '/coffret-signature',
  '/a-propos',
  '/mentions-legales',
];

const urls = routes.map((r) => `${baseUrl}${r}`).map((loc) => ({ loc }));

const now = new Date().toISOString();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`)
  .join('\n')}
</urlset>`;

const out = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(out, xml, 'utf8');
console.log('Wrote sitemap to', out);

process.exit(0);

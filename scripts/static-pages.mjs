import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { projectContent } from '../src/projects.js'
import { publishThumbnail } from './thumbnail.mjs'

const output = new URL('../dist/', import.meta.url)
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
const site = new URL(process.env.SITE_URL || 'https://nguy3nantam.github.io/NhanBDS/')
if (!['http:', 'https:'].includes(site.protocol) || site.search || site.hash) throw new Error('SITE_URL must be an HTTP(S) URL without query or hash')
if (!site.pathname.endsWith('/')) site.pathname += '/'
const original = await readFile(new URL('index.html', output), 'utf8')
const homeThumbnail = await publishThumbnail(output, site, 'images/social-thumbnail.jpg')
const home = original.replaceAll('https://nguy3nantam.github.io/NhanBDS/', site.href)
  .replaceAll(new URL('images/social-thumbnail.jpg', site).href, homeThumbnail)
await writeFile(new URL('index.html', output), home)
const clean = home
  .replace(/\s*<meta (?:name|property)="(?:description|keywords|robots|twitter:[^"]+|og:[^"]+)"[^>]*>/g, '')
  .replace(/\s*<link rel="(?:canonical|image_src|preload)"[^>]*>/g, '')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
const page = (title, head, body) => clean
  .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>\n${head}`)
  .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${body}</noscript>`)
const urls = [site.href]
for (const project of projectContent) {
  const path = `du-an/${project.slug}/`
  const url = new URL(path, site).href
  const image = await publishThumbnail(output, site, project.imagePath)
  const title = `${project.name} | Mai Hoàng Nhân BĐS`
  const alt = project.illustration ? `Ảnh minh họa cho ${project.name}` : project.name
  const metadata = {
    'og:type': 'website', 'og:locale': 'vi_VN', 'og:site_name': 'Mai Hoàng Nhân BĐS',
    'og:url': url, 'og:title': title, 'og:description': project.description,
    'og:image': image, 'og:image:alt': alt, 'og:image:type': 'image/webp',
    'og:image:width': project.slug === 'the-opera-residence' ? '1707' : '900',
    'og:image:height': project.slug === 'the-opera-residence' ? '960' : '600',
    'twitter:card': 'summary_large_image', 'twitter:title': title,
    'twitter:description': project.description, 'twitter:image': image, 'twitter:image:alt': alt,
  }
  const head = `<meta name="robots" content="index, follow, max-image-preview:large" />
<meta name="description" content="${escape(project.description)}" />
<link rel="canonical" href="${escape(url)}" />
${Object.entries(metadata).map(([key, value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`).join('\n')}
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: title, description: project.description, url, primaryImageOfPage: image }).replaceAll('<', '\\u003c')}</script>`
  await mkdir(new URL(path, output), { recursive: true })
  await writeFile(new URL(`${path}index.html`, output), page(title, head, `<h1>${escape(project.name)}</h1><p>${escape(project.description)}</p><a href="tel:0909467505">Gọi Nhân: 0909 467 505</a>`))
  urls.push(url)
}
await mkdir(new URL('admin/', output), { recursive: true })
for (const [path, title] of [['admin/index.html', 'Quản trị chưa kích hoạt | Nhân BĐS'], ['404.html', 'Không tìm thấy trang | Nhân BĐS']]) {
  await writeFile(new URL(path, output), page(title, '<meta name="robots" content="noindex, nofollow" />', `<h1>${escape(title)}</h1>`))
}
await writeFile(new URL('sitemap.xml', output), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>\n`)
await writeFile(new URL('robots.txt', output), `User-agent: *\nAllow: /\nDisallow: ${site.pathname}admin\n\nSitemap: ${new URL('sitemap.xml', site).href}\n`)

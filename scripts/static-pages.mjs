import { mkdir, readFile, writeFile } from 'node:fs/promises'

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
const privateHtml = html
  .replace(/(<meta name="robots" content=")[^"]+/, '$1noindex, nofollow')
  .replace(/\s*<link rel="canonical"[^>]+>/, '')
  .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')

await mkdir(new URL('../dist/admin/', import.meta.url), { recursive: true })
await writeFile(new URL('../dist/admin/index.html', import.meta.url), privateHtml.replace(/<title>.*?<\/title>/, '<title>Quản trị chưa kích hoạt | Nhân BĐS</title>'))
await writeFile(new URL('../dist/404.html', import.meta.url), privateHtml.replace(/<title>.*?<\/title>/, '<title>Không tìm thấy trang | Nhân BĐS</title>'))

// Keep the sitemap <lastmod> in sync with the build date (Vietnam time, GMT+7).
const sitemapUrl = new URL('../dist/sitemap.xml', import.meta.url)
const sitemap = await readFile(sitemapUrl, 'utf8')
const buildDate = new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10)
await writeFile(sitemapUrl, sitemap.replace(/<lastmod>[^<]+<\/lastmod>/, `<lastmod>${buildDate}</lastmod>`))

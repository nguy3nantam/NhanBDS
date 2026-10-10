import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { extname } from 'node:path'

// Version the existing image URL without duplicating its bytes in the build.
export async function publishThumbnail(output, site, sourcePath) {
  const source = new URL(sourcePath, output)
  if (!source.href.startsWith(output.href)) throw new Error('Thumbnail must be inside the build directory')
  const bytes = await readFile(source)
  const extension = extname(sourcePath).toLowerCase()
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(extension)) throw new Error('Unsupported thumbnail format')
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 20)
  const url = new URL(sourcePath, site)
  url.searchParams.set('v', hash)
  return url.href
}

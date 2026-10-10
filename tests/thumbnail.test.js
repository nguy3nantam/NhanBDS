import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { expect, it } from 'vitest'
import { publishThumbnail } from '../scripts/thumbnail.mjs'

it('keeps unchanged thumbnail URLs stable and updates them when image bytes change', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'nhanbds-thumbnail-'))
  const output = pathToFileURL(`${directory}/`)
  const site = new URL('https://example.com/NhanBDS/')
  try {
    await mkdir(new URL('images/', output))
    const original = await readFile('public/images/social-thumbnail.jpg')
    await writeFile(new URL('images/source.jpg', output), original)
    const first = await publishThumbnail(output, site, 'images/source.jpg')
    expect(new URL(first).pathname).toBe('/NhanBDS/images/source.jpg')
    expect(new URL(first).searchParams.get('v')).toMatch(/^[a-f0-9]{20}$/)
    expect(await publishThumbnail(output, site, 'images/source.jpg')).toBe(first)
    const path = first.slice(site.href.length)
    expect(await readFile(new URL(path, output))).toEqual(original)
    await writeFile(new URL('images/source.jpg', output), await readFile('public/images/nhan-profile.jpg'))
    expect(await publishThumbnail(output, site, 'images/source.jpg')).not.toBe(first)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
})

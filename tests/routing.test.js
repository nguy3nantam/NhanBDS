import { expect, it } from 'vitest'
import { resolveRoute } from '../src/routing'

it.each(['/', '/NhanBDS/'])('supports root and project hosting at %s', (base) => {
  expect(resolveRoute(base, base)).toBe('home')
  expect(resolveRoute(`${base}index.html`, base)).toBe('home')
  for (const suffix of ['admin', 'admin/', 'admin/index.html']) {
    expect(resolveRoute(`${base}${suffix}`, base)).toBe('admin')
  }
  expect(resolveRoute(`${base}missing`, base)).toBe('not-found')
  expect(resolveRoute(`${base}other/admin`, base)).toBe('not-found')
  for (const slug of ['the-opera-residence', 'sun-thu-thiem', 'gs-metrocity']) {
    for (const suffix of ['', '/', '/index.html']) {
      expect(resolveRoute(`${base}du-an/${slug}${suffix}`, base)).toBe('project')
    }
  }
  expect(resolveRoute(`${base}du-an/khong-ton-tai/`, base)).toBe('not-found')
})

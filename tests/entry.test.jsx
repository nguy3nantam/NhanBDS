import { act, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// The entry module decides what to mount from window.location.pathname, so
// each test resets the module registry and re-imports it at a new URL.
async function mountAt(pathname) {
  vi.resetModules()
  document.body.innerHTML = '<div id="root"></div>'
  window.history.pushState({}, '', pathname)
  await act(async () => {
    await import('../src/main')
  })
}

beforeEach(() => {
  document.head.innerHTML = '<title>Mai Hoàng Nhân BĐS | Tư vấn bất động sản TP.HCM</title><meta name="robots" content="index, follow"/>'
})

describe('entry routing', () => {
  it('renders the landing page on the root path', async () => {
    await mountAt('/')
    expect(await screen.findByRole('heading', { level: 1, name: /Kiến tạo tài sản/ })).toBeInTheDocument()
    expect(document.querySelector('meta[name="robots"]').content).toBe('index, follow')
  })

  it('renders the admin demo on /admin and marks it noindex', async () => {
    await mountAt('/admin')
    expect(await screen.findByText('Xin chào, anh Nhân!')).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Quản trị mẫu | Mai Hoàng Nhân BĐS'))
    expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, nofollow')
  })

  it('shows the not-found page for unknown paths', async () => {
    await mountAt('/khong-ton-tai')
    expect(await screen.findByRole('heading', { level: 1, name: 'Không tìm thấy trang' })).toBeInTheDocument()
    await waitFor(() => expect(document.title).toBe('Không tìm thấy trang | Nhân BĐS'))
    expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, nofollow')
  })
})

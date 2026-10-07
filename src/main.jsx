import { lazy, Suspense, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { resolveRoute } from './routing'

const Admin = import.meta.env.DEV ? lazy(() => import('./Admin')) : null

function StatusPage({ admin = false }) {
  useEffect(() => {
    document.title = admin ? 'Quản trị chưa kích hoạt | Nhân BĐS' : 'Không tìm thấy trang | Nhân BĐS'
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.content = 'noindex, nofollow'
  }, [admin])
  return <main className="status-page"><p className="section-tag">MAI HOÀNG NHÂN BĐS</p><h1>{admin ? 'Trang quản trị chưa được kích hoạt' : 'Không tìm thấy trang'}</h1><p>{admin ? 'Vui lòng liên hệ người quản lý website để được hỗ trợ.' : 'Đường dẫn này không tồn tại. Bạn có thể trở về trang chủ để xem các dự án.'}</p><a className="btn primary" href={import.meta.env.BASE_URL}>Về trang chủ</a></main>
}

const route = resolveRoute(window.location.pathname, import.meta.env.BASE_URL)
createRoot(document.getElementById('root')).render(
  route === 'home' ? <App/> : route === 'admin' && Admin
    ? <Suspense fallback={<p className="status-page" role="status">Đang tải giao diện mẫu…</p>}><Admin/></Suspense>
    : <StatusPage admin={route === 'admin'}/>
)

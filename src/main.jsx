import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import StatusPage from './StatusPage'
import { resolveRoute } from './routing'
import './fonts.css'

const Admin = import.meta.env.DEV ? lazy(() => import('./Admin')) : null

const route = resolveRoute(window.location.pathname, import.meta.env.BASE_URL)
createRoot(document.getElementById('root')).render(
  route === 'home' ? <App/> : route === 'admin' && Admin
    ? <Suspense fallback={<p className="status-page" role="status">Đang tải giao diện mẫu…</p>}><Admin/></Suspense>
    : <StatusPage admin={route === 'admin'}/>
)

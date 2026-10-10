/* Entry point mounts the root; route components live in their own modules. */
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import StatusPage from './StatusPage'
import { resolveRoute, resolveProject } from './routing'
import './fonts.css'
import './styles.css'

const App = lazy(() => import('./App'))
const ProjectPage = lazy(() => import('./ProjectPage'))
const Admin = import.meta.env.DEV ? lazy(() => import('./Admin')) : null

const route = resolveRoute(window.location.pathname, import.meta.env.BASE_URL)
createRoot(document.getElementById('root')).render(
  <Suspense fallback={<p className="status-page" role="status">Đang tải trang…</p>}>
    {route === 'home' ? <App/> : route === 'project'
      ? <ProjectPage project={resolveProject(window.location.pathname, import.meta.env.BASE_URL)}/>
      : route === 'admin' && Admin ? <Admin/> : <StatusPage admin={route === 'admin'}/>}
  </Suspense>
)

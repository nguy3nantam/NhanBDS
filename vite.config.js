import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE_PATH overrides the deploy base (repo rename, custom domain, subfolder).
// GitHub Pages project sites default to /NhanBDS/; everything else to /.
const base = process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/NhanBDS/' : '/')

export default defineConfig({
  plugins: [react()],
  base,
})

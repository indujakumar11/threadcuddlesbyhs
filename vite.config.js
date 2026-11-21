import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from https://<user>.github.io/<repo>/,
// so production builds use the repository name as the base path.
// Override with BASE_PATH (e.g. BASE_PATH=/ for a custom domain or another host).
const REPO_BASE = '/threadcuddlesbyhs/';

// `npm run dev` keeps "/" for convenience; `build` and `preview` use the
// GitHub Pages path so the preview matches the live site exactly.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === 'build' || isPreview ? process.env.BASE_PATH || REPO_BASE : '/',
}));

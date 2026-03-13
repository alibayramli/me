import path from 'path'
import faroUploader from '@grafana/faro-rollup-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { inspectAttr } from 'kimi-plugin-inspect-react'

const BASE_PATH = '/me/'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const appVersion = process.env.npm_package_version ?? '0.0.0'
  const gitCommitSha = process.env.GITHUB_SHA ?? 'local'
  const sourcemapPrefixPath = env.FARO_SOURCEMAP_PREFIX_PATH?.trim() || BASE_PATH.replace(/^\//, '')
  const appName = env.VITE_FARO_APP_NAME?.trim() || 'ali-bayramli-portfolio'
  const shouldUploadSourcemaps =
    (process.env.GITHUB_ACTIONS === 'true' || env.FARO_UPLOAD_SOURCEMAPS === 'true') &&
    Boolean(
      appName &&
      env.FARO_APP_ID &&
      env.FARO_STACK_ID &&
      env.FARO_SOURCEMAP_ENDPOINT &&
      env.FARO_SOURCEMAP_API_KEY,
    )

  return {
    base: BASE_PATH,
    build: {
      sourcemap: shouldUploadSourcemaps ? 'hidden' : false,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@grafana/')) {
              return 'grafana-vendor'
            }
          },
        },
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
      __GIT_COMMIT_SHA__: JSON.stringify(gitCommitSha),
    },
    plugins: [
      inspectAttr(),
      react(),
      ...(shouldUploadSourcemaps
        ? [
            faroUploader({
              appName,
              appId: env.FARO_APP_ID,
              stackId: env.FARO_STACK_ID,
              endpoint: env.FARO_SOURCEMAP_ENDPOINT,
              apiKey: env.FARO_SOURCEMAP_API_KEY,
              bundleId: gitCommitSha,
              gzipContents: true,
              keepSourcemaps: false,
              prefixPath: sourcemapPrefixPath,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})

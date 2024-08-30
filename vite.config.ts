import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from "autoprefixer"
// https://vitejs.dev/config/

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
        plugins: [react()],
        css: {
            preprocessorOptions: {
                postcss: {
                    plugins: [tailwindcss, autoprefixer],
                }
            }
        },
        resolve: {
            alias: {
                '@': path.resolve('./src'),
                '@img': path.resolve('./src/assets/img'),
                '@api': path.resolve('./src/api'),
                '@comp': path.resolve('./src/components')
            },
        },
        server: {
            host: '0.0.0.0',
            port: 3000,
            proxy: {
                '/dev': {
                    changeOrigin: true,
                    secure: false,
                    target: env.VITE_APP_URL,
                    rewrite: (path) => path.replace(/^\/dev/, '')
                }
            }
        }

    }
})

import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      //configuração para copiar os arquivos da pasta resources para a pasta dist, para que o electron possa acessar os arquivos e colocar o icone da aplicação
      viteStaticCopy({
        targets: [
          {
            src: 'resources/*',
            dest: 'resources'
          }
        ],
      }),

    ]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  //configuração para poder usar variaveis de ambiente
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform)
    },
    //configuração para usar o tailwindcss
    css: {
      postcss: {
        plugins: [tailwindcss({
          config: './src/renderer/tailwind.config.js'
        })]
      }
    },
    //fianal da configuração do tailwindcss
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})

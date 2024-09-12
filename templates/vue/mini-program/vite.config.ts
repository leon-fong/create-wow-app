import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import AutoImport from 'unplugin-auto-import/vite'

export default async () => {
  const UnoCSS = (await import('unocss/vite')).default

  return defineConfig({
    plugins: [
      UniHelperManifest(),
      Uni(),
      AutoImport({
        imports: ['vue', 'uni-app'],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
      }),
      UnoCSS(),
    ],
  })
}

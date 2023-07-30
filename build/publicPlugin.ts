import { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import url from 'url'

export interface PublicPluginOptions {
  /**
   * A list of files to exclude from the public folder
   * @default []
   * @example ['index.html']
   */
  exclude?: string[]

  /**
   * A list of files to include from the public folder
   */
  include?: string[]
}

/**
 * A Plugin that will copy public to the dist folder
 * custom any files that will be extracted
 */
export function publicPlugin(options?: PublicPluginOptions): Plugin {
  const exclude = options?.exclude || []
  const include = options?.include || []

  let config: null | ResolvedConfig = null

  return {
    name: 'vite-plugin-assets',
    configResolved(resolvedConfig) {
      config = resolvedConfig
    },
    closeBundle() {
      const publicDir = config?.publicDir
      if (!publicDir) return

      const rootPath = path.resolve(url.fileURLToPath(new URL('.', import.meta.url)), '../')
      const publicPath = path.resolve(config?.root || '', publicDir)
      const distPath = path.resolve(config?.root || '', config?.build?.outDir || '')

      const files = fs.readdirSync(publicPath)
      files.forEach((file) => {
        if (exclude.includes(file)) return

        const source = path.join(publicPath, file)
        const destination = path.join(distPath, file)

        fs.copyFileSync(source, destination)
      })

      // handle include files
      include.forEach((file) => {
        const source = path.join(rootPath, file)
        const destination = path.join(distPath, file)

        fs.copyFileSync(source, destination)
      })
    }
  }
}

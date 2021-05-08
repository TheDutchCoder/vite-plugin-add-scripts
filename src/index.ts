import type { Plugin } from 'vite'
import { hasErrors, filterByPosition } from './utils'

export const positions = ['head', 'body'] as const

export type Position = typeof positions[number];

export type Script = {
  position: Position;
  content: string;
}

const VitePluginAddScripts = (scripts: Script[]): Plugin => {
  return {
    name: 'vite-plugin-add-scripts',
    apply: 'build',
    enforce: 'pre',
    async transformIndexHtml (html: string) {
      // Return when there are errors
      if (hasErrors(scripts)) {
        return
      }

      // Filter scripts by their position.
      const headScripts = filterByPosition(scripts, 'head')
      const bodyScripts = filterByPosition(scripts, 'body')

      // Append the scripts to the HTML.
      html = html.replace(
        /<\/head>/,
        `${headScripts.join('\n')}\n</head>`
      )

      html = html.replace(
        /<\/body>/,
        `${bodyScripts.join('\n')}\n</body>`
      )

      return html
    },
  }
}

export default VitePluginAddScripts

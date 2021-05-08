import type { Plugin } from 'vite'
import { hasErrors, filterByPosition, sortScripts } from './utils'

export const positions = ['head', 'body'] as const

export type Position = typeof positions[number];

export type Script = {
  position?: Position;
  content: string;
  sort?: number,
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
      let headScripts = filterByPosition(scripts, 'head')
      let bodyScripts = filterByPosition(scripts, 'body')

      // Sort scripts by their sort key.
      headScripts = sortScripts(headScripts)
      bodyScripts = sortScripts(bodyScripts)

      // Append the scripts to the HTML.
      html = html.replace(
        /<\/head>/,
        `${headScripts.map(script => script.content).join('\n')}\n</head>`
      )

      html = html.replace(
        /<\/body>/,
        `${bodyScripts.map(script => script.content).join('\n')}\n</body>`
      )

      return html
    },
  }
}

export default VitePluginAddScripts

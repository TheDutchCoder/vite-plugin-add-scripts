import type { Plugin } from 'vite'
import { hasErrors, filterByPosition, filterByPrepend, sortScripts } from './utils'

export const positions = ['head', 'body'] as const

export type Position = typeof positions[number];

export type Script = {
  position?: Position;
  prepend?: Boolean;
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

      // Sort by prepend/append.
      const headPrependScripts = filterByPrepend(headScripts, true)
      const headAppendScripts = filterByPrepend(headScripts, false)

      const bodyPrependScripts = filterByPrepend(bodyScripts, true)
      const bodyAppendScripts = filterByPrepend(bodyScripts, false)

      // Append the scripts to the HTML.
      html = html.replace(
        /<head>/,
        `<head>\n${headPrependScripts.map(script => script.content).join('\n')}`
      )

      html = html.replace(
        /<\/head>/,
        `${headAppendScripts.map(script => script.content).join('\n')}\n</head>`
      )

      html = html.replace(
        /<body>/,
        `<body>\n${bodyPrependScripts.map(script => script.content).join('\n')}`
      )

      html = html.replace(
        /<\/body>/,
        `${bodyAppendScripts.map(script => script.content).join('\n')}\n</body>`
      )

      return html
    },
  }
}

export default VitePluginAddScripts

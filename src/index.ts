import type { Plugin } from 'vite'

const positions = ['head', 'body'] as const

type Script = {
  position: typeof positions[number];
  content: string;
}

function VitePluginAddScripts (scripts: Script[]): Plugin {
  return {
    name: 'vite-plugin-add-scripts',
    apply: 'build',
    enforce: 'pre',
    async transformIndexHtml (html: string) {
      const headScripts = []
      const bodyScripts = []

      // If empty array, return
      if (scripts.length === 0) {
        return
      }

      // Loop through scripts array and for each script, check if the script
      // should be added to the head or the body.
      scripts.forEach(script => {
        if (!positions.includes(script.position)) {
          this.error(`"script.position: ${script.position}" is not a valid position. Should be one of [${positions.join(', ')}]`)
        }

        if (!!script.content) {
          this.error(`"script.content" can't be empty`)
        }

        // Add script to head/body array
        script.position === 'head' ? headScripts.push(script.content) : bodyScripts.push(script.content)
      })

      // Add all scripts
      html.replace(
        /<\/head>/,
        `${headScripts.join('\n')}</head>`
      )

      html.replace(
        /<\/body>/,
        `${bodyScripts.join('\n')}</body>`
      )

      return html
    },
  }
}

export default VitePluginAddScripts

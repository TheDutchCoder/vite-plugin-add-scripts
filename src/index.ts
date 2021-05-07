import type { Plugin } from 'vite'

const positions = ['head', 'body'] as const

type Script = {
  position: typeof positions[number];
  content: string;
}

export default function VitePluginAddScripts (scripts: Script[]): Plugin {
  return {
    name: 'vite-plugin-add-scripts',
    apply: 'build',
    enforce: 'pre',
    async transformIndexHtml (html: string) {
      const headScripts: string[] = []
      const bodyScripts: string[] = []

      // If empty array, return
      if (scripts.length === 0) {
        return
      }

      // Loop through scripts array and for each script, check if the script
      // should be added to the head or the body.
      scripts.forEach(script => {
        if (!positions.includes(script.position)) {
          console.error(`"script.position: ${script.position}" is not a valid position. Should be one of [${positions.join(', ')}]`)
        }

        if (script.content.length === 0) {
          console.error(`"script.content" can't be empty`)
        }

        // Add script to head/body array
        script.position === 'head' ? headScripts.push(script.content) : bodyScripts.push(script.content)
      })

      // Add all scripts
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

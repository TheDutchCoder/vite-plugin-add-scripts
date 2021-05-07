import type { Plugin } from 'vite'

function VitePluginAddScripts (scripts: []): Plugin {
  return {
    name: 'vite-plugin-add-scripts',
    apply: 'build',
    enforce: 'pre',
    async transformIndexHtml (html: string) {
      // If empty array, return

      // Loop through scripts array and for each script, check if the script
      // should be added to the head or the body.

      // Add script to head/body array

      // Add all scripts

      return html.replace(
        /<\/head>/,
        `</head>`
      )
    },
  }
}

export default VitePluginAddScripts

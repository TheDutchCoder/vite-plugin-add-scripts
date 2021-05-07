# vite-plugin-add-scripts
A Vite plugin to add custom scripts to the index.html file

## Installation
```
npm install vite-plugin-add-scripts
```

## Usage
Add your plugin to the `plugins` array. You can also specify when the plugin
should be used with the `apply` option.

```js
// vite.config.js
import ViteAddScripts from 'vite-plugin-add-scripts'

export default {
  plugins: [
    {
      ...ViteAddScripts([
        {
          position: 'head',
          content: '<script>window.foo = {}</script>'
        }
      ]),
      apply: 'build',
    }
  ]
}
```

## Options
You can use the `position` option to add the script to either the head or the
body section of the index.html file

The `content` option is the actual content that gets written to the file.
Normally it would be a stringified version of the script tags and their
contents.

```js
...ViteAddScripts([
  {
    position: 'body', // or 'head'
    content: '<sciprt>window.foo = {}</script>'
  }
]),
```

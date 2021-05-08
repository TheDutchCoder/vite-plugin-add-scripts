# vite-plugin-add-scripts
A Vite plugin to add custom scripts to the index.html file

## :warning: This project is still experimental :warning:

## Installation
```
npm install vite-plugin-add-scripts --save-dev
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

The `sort` option can be used to determine the order the scripts get appended.
This defaults to `0` and higher values appear later. Negative avlues are allowed
as well.

```js
...ViteAddScripts([
  {
    position: 'head',
    sort: 3,
    content: '<script>window.foo = {}</script>'
  },
  {
    position: 'head',
    sort: -2,
    content: '<script>window.bar = {}</script>'
  },
  {
    position: 'body',
    content: '<script>window.baz = {}</script>'
  }
]),
```

Output:
```html
<!DOCTYPE html>
<html>
  <head>
    <script>window.bar = {}</script>
    <script>window.foo = {}</script>
  </head>
  <body>
    <script>window.baz = {}</script>
  </body>
</html>
```

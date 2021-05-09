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
          position: 'body',
          sort: 2,
          content: '<script>window.foo = {}</script>'
        },
        {
          position: 'body',
          sort: 1,
          content: '<script>window.bar = {}</script>'
        }
      ]),
      apply: 'build',
    }
  ]
}
```

## Options
This plugin provides a couple of options that can be configured. Only the
`content` option is required.

### Position
```js
value: 'head' | 'body'
optional
default: 'head'
```
You can use the `position` option to add the script to either the head or the
body section of the index.html file.

### Content
```js
value: string
required
```
The `content` option is the actual content that gets written to the file.
Normally it would be a stringified version of the script tags and their
contents.

### Sort
```js
value: number
default: 0
```
The `sort` option can be used to determine the order the scripts get added.
This defaults to `0` and higher values appear later. Negative avlues are allowed
as well.

### Prepend
```js
value: boolean
default: false
```
The `prepend` option adds scripts directly after the `<head>` or `<body>` tag.
Scripts are appended by default.

```js
...ViteAddScripts([
  {
    sort: 3,
    content: '<script>window.foo = {}</script>'
  },
  {
    prepend: true,
    sort: -2,
    content: '<script>window.bar = {}</script>'
  },
  {
    position: 'body',
    content: '<script>window.baz = {}</script>'
  },
  {
    position: 'body',
    prepend: true,
    content: '<script>window.this = {}</script>'
  },
  {
    position: 'body',
    prepend: true,
    sort: -1,
    content: '<script>window.that = {}</script>'
  },
]),
```

Output:
```html
<!DOCTYPE html>
<html>
  <head>
    <script>window.bar = {}</script>
    <title>Title</title>
    <script>window.foo = {}</script>
  </head>
  <body>
    <script>window.that = {}</script>
    <script>window.this = {}</script>
    <p>content</p>
    <script>window.baz = {}</script>
  </body>
</html>
```

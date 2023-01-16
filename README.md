# postcss-custom-media-generator

This is a meta-postcss-plugin that ultimately depends on [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media).

[PostCSS] plugin custom media generator.

[PostCSS]: https://github.com/postcss/postcss

```js
module.exports = {
  plugins: [
    "postcss-custom-media-generator": {
      "--light": "prefers-color-scheme: light",
      "--dark": "prefers-color-scheme: dark",
      sm: 600,
      md: 800,
      lg: 1000,
    }
  ]
}
```

Becomes:

```postcss
@custom-media --light (prefers-color-scheme: light);
@custom-media --dark (prefers-color-scheme: dark);
@custom-media --sm-only (min-width: 600px) and (max-width: 799px);
@custom-media --sm (min-width: 600px);
@custom-media --md-only (min-width: 800px) and (max-width: 999px);
@custom-media --md (min-width: 800px);
@custom-media --lg (min-width: 1000px);
@custom-media --lg-only (min-width: 1000px);
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-custom-media-generator
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-custom-media-generator')({ /* options */ }),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

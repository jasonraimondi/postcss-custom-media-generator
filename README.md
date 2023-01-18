# postcss-custom-media-generator

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/allmyfutures/postcss-custom-media-generator/test.yml?branch=main&label=Unit%20Tests&style=flat-square)](https://github.com/allmyfutures/postcss-custom-media-generator)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/allmyfutures/postcss-custom-media-generator?style=flat-square)](https://codeclimate.com/github/allmyfutures/postcss-custom-media-generator/test_coverage)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/allmyfutures/postcss-custom-media-generator?style=flat-square)](https://github.com/allmyfutures/postcss-custom-media-generator/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dt/postcss-custom-media-generator?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/postcss-custom-media-generator)

Generates mobile first `@custom-media` rules from a configuration object.

## Install

```shell
pnpm add -D postcss-custom-media-generator
```

This plugin depends on further processing using one of the following methods:

- If you use [postcss-preset-env], just make sure this plugin is loaded before postcss-preset-env, and you should be good to go.
- [postcss-custom-media] and [postcss-media-minmax].

## Usage

**Note: This plugin should be run first in your PostCSS pipeline.**

Pass in a configuration of desired global media queries.

You can pass in a key of any arbitrary string, and a value of either a string or a number.

- Strings should be valid CSS media queries
- Numbers will be turned into mobile-first queries.

```js
module.exports = {
  plugins: {
    "postcss-custom-media-generator": {
      // you can pass in any arbitrary key, and any valid CSS media query value
      "--light": "prefers-color-scheme: light",
      "--dark": "prefers-color-scheme: dark",
      sm: 600,
      md: 800,
      lg: 1000
    },
    "postcss-preset-env": {},
  }
};
```

Becomes:

```postcss
@custom-media --light (prefers-color-scheme: light);
@custom-media --dark (prefers-color-scheme: dark);
@custom-media --sm-only (600px <= width < 800px);
@custom-media --sm (600px <= width);
@custom-media --md-only (800px <= width < 1000px);
@custom-media --md (800px <= width);
@custom-media --lg (1000px <= width);
```

Write your css like this:

```postcss
@media (--md) {
  /* styles for medium viewport */
}

/* becomes */

@media (min-width: 800px) {
  /* styles for medium viewport */
}
```

[postcss-media-minmax]: https://github.com/postcss/postcss-media-minmax
[postcss-custom-media]: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media
[postcss-preset-env]: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env

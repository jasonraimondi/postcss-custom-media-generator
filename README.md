# postcss-custom-media-generator

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/allmyfutures/postcss-custom-media-generator/test.yml?branch=main&label=Unit%20Tests&style=flat-square)](https://github.com/allmyfutures/postcss-custom-media-generator)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/allmyfutures/postcss-custom-media-generator?style=flat-square)](https://github.com/allmyfutures/postcss-custom-media-generator/releases/latest)
[![NPM Downloads](https://img.shields.io/npm/dt/postcss-custom-media-generator?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/postcss-custom-media-generator)

Generates mobile first `@custom-media` rules from a configuration object.

## Install

```shell
pnpm add -D postcss-custom-media-generator
```

## Usage

Pass in a configuration of desired global media queries. You can pass in any arbitrary key, and any valid CSS media query value. Strings will be passed directly, and numbers will be turned into mobile-first queries.

A configuration object like this:

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
    "postcss-custom-media": {}
  }
};
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

When combined with the [postcss-custom-media] plugin:

```postcss
@custom-media --md (min-width: 800px);

@media (--md) {
  /* styles for medium viewport */
}

/* becomes */

@media (min-width: 800px) {
  /* styles for medium viewport */
}
```

[postcss-custom-media]: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media
[postcss-custom-env]: https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env

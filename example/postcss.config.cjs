module.exports = {
  plugins: {
    "postcss-custom-media-generator": {
      "--light": "prefers-color-scheme: light",
      "--dark": "prefers-color-scheme: dark",
      small: 600,
      medium: 800,
      large: 1000,
    },
    "postcss-preset-env": {
      // "postcss-custom-media" is stage 2, and this is required
      stage: 2,
      // nesting is optional, but it's nice to have
      features: {
        "nesting-rules": true,
      },
    },
  },
};

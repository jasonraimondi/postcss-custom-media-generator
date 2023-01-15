export const postcss = true;

export type Options = Record<string, string>;

export default (opts: Options = {}) => {
  return {
    postcssPlugin: "postcss-custom-media-generator",

    Root (root: any, _postcss: any) {
      for (const [key, value] of Object.entries(opts)) {
        root.append(`@custom-media ${key} (${value})`);
      }
    }

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
}

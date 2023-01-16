import type { Root } from "postcss";
import { AtRule } from "postcss";
import { generateMediaQueries } from "./generate_media_queries";

const plugin = (opts: Record<string, string> = {}) => {
  const { strings, numbers } = extractNumbers(opts);
  const config = Object.assign(strings, generateMediaQueries(numbers), {});

  return {
    postcssPlugin: "postcss-custom-media-generator",

    Once(root: Root) {
      for (let [key, value] of Object.entries(config).reverse()) {
        if (!key.startsWith("--")) key = `--${key}`;
        if (!(value.startsWith("(") && value.endsWith(")"))) value = `(${value})`;
        const rule = new AtRule({ name: "custom-media", params: `${key} ${value}` });
        root.prepend(rule);
      }
    },
  };
};

function extractNumbers(obj: Record<string, string | number>) {
  let numbers: Record<string, number> = {};
  let strings: Record<string, string> = {};
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value === "number") {
      numbers[key] = value;
    } else {
      strings[key] = value;
    }
  }
  return { numbers, strings };
}

plugin.postcss = true;

export = plugin;

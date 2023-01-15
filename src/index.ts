import { generateMediaQueries } from "./generate_media_queries";
import { AtRule } from "postcss";

export const postcss = true;

export type Options = Record<string, string>;

export default (opts: Options = {}) => {
  const { strings, numbers } = extractNumbers(opts);
  const config = Object.assign(strings, generateMediaQueries(numbers), {});

  return {
    postcssPlugin: "postcss-custom-media-generator",

    Root(root: any, _postcss: any) {
      for (let [key, value] of Object.entries(config)) {
        if (value[0] !== "(" && value[value.length - 1] !== ")") value = `(${value})`;
        const rule = new AtRule({ name: "custom-media", params: `${key} ${value}` });
        root.append(rule);
      }
    },
  };
}

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

import postcss from "postcss";

import plugin from "./index";

async function run(input: any, output: any, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("directly copies prehyphened", async () => {
  const config = {
    "--dark": "prefers-color-scheme: dark",
  };


  await run("", "@custom-media --dark prefers-color-scheme: dark", config);
});

it("does something", async () => {
  const config = {
    sm: 600,
    md: 800,
    lg: 1000,
  };


  await run("", `@custom-media --sm-only (min-width: 600px) and (max-width: 799px);
@custom-media --sm (min-width: 600px);
@custom-media --md-only (min-width: 800px) and (max-width: 999px);
@custom-media --md (min-width: 800px);
@custom-media --lg (min-width: 1000px);
@custom-media --lg-only (min-width: 1000px)`, config);
});

it("works with mixed string keys", async () => {
  const config = {
    "--dark": "prefers-color-scheme: dark",
    sm: 600,
    md: 800,
  };


  await run("@custom-media --light prefers-color-scheme: light", `@custom-media --light prefers-color-scheme: light;
@custom-media --dark prefers-color-scheme: dark;
@custom-media --sm-only (min-width: 600px) and (max-width: 799px);
@custom-media --sm (min-width: 600px);
@custom-media --md (min-width: 800px);
@custom-media --md-only (min-width: 800px)`, config);
});

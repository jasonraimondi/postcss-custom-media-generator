import postcss from "postcss";

import plugin from "./index";

async function run(input: any, output: any, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined });
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it("handles prehyphened", async () => {
  const config = {
    "--dark": "prefers-color-scheme: dark",
  };

  await run("", "@custom-media --dark (prefers-color-scheme: dark)", config);
});

it("handles unhyphenated", async () => {
  const config = {
    dark: "prefers-color-scheme: dark",
  };

  await run("", "@custom-media --dark (prefers-color-scheme: dark)", config);
});

it("handles number values as mobile-first", async () => {
  const config = {
    sm: 600,
    md: 800,
    lg: 1000,
  };

  await run(
    "",
    `@custom-media --sm-only (600px <= width < 800px);
@custom-media --sm (600px <= width);
@custom-media --md-only (800px <= width < 1000px);
@custom-media --md (800px <= width);
@custom-media --lg (1000px <= width)`,
    config,
  );
});

it("handles number and string values", async () => {
  const config = {
    "--dark": "prefers-color-scheme: dark",
    sm: 600,
    md: 800,
  };

  await run(
    "a { color: red; }",
    `@custom-media --dark (prefers-color-scheme: dark);
@custom-media --sm-only (600px <= width < 800px);
@custom-media --sm (600px <= width);
@custom-media --md (800px <= width);
a { color: red; }`,
    config,
  );
});

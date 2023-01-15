import postcss from "postcss";
import plugin from "./index";

async function run(input: any, output: any, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {from: undefined});
  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('does something', async () => {
  await run('', '@custom-media --dark (prefers-color-scheme: dark)', {
    '--dark': 'prefers-color-scheme: dark',
  });
});

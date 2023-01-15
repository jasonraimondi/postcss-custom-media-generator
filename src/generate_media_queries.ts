type CustomMediaInput = Record<string, number>;
// type CustomMediaResponseKey = `--${string}`;
type CustomMediaResponse = Record<string, string>;

export function generateMediaQueries(map: CustomMediaInput): CustomMediaResponse {
  const result: CustomMediaResponse = {};

  const sortedInput = sortInput(map);
  const values = Object.values(sortedInput);
  const entries = Object.entries(sortedInput);

  let cnt = 0;
  for (const [key, breakpoint] of entries) {
    const nextBreakpoint = values[cnt + 1];
    if (nextBreakpoint) {
      result[`--${key}-only`] = `(min-width: ${breakpoint}px) and (max-width: ${
        nextBreakpoint - 1
      }px)`;
      result[`--${key}`] = `(min-width: ${breakpoint}px)`;
    } else {
      result[`--${key}`] = `(min-width: ${breakpoint}px)`;
      result[`--${key}-only`] = result[`--${key}`];
    }
    cnt++;
  }

  return result;
}

function sortInput(map: CustomMediaInput) {
  return Object.fromEntries(Object.entries(map).sort(([, a], [, b]) => a - b));
}

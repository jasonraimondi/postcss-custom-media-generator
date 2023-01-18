type CustomMediaInput = Record<string, number>;
// type CustomMediaResponseKey = `--${string}`;
type CustomMediaResponse = Record<string, string>;

export function createMobileFirstMediaQueries(map: CustomMediaInput): CustomMediaResponse {
  const result: CustomMediaResponse = {};

  const sortedInput = sortInput(map);
  const values = Object.values(sortedInput);
  const entries = Object.entries(sortedInput);

  let cnt = 0;
  for (const [key, breakpoint] of entries) {
    const nextBreakpoint = values[cnt + 1];
    if (nextBreakpoint) {
      result[`--${key}-only`] = `${breakpoint}px <= width < ${nextBreakpoint}px`;
      result[`--${key}`] = `${breakpoint}px <= width`;
    } else {
      result[`--${key}`] = `${breakpoint}px <= width`;
    }
    cnt++;
  }

  return result;
}

function sortInput(map: CustomMediaInput) {
  return Object.fromEntries(Object.entries(map).sort(([, a], [, b]) => a - b));
}

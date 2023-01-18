import { createMobileFirstMediaQueries } from "./createMobileFirstMediaQueries";

it("outputs custom media queries object built for mobile first designs", () => {
  expect(
    createMobileFirstMediaQueries({
      sm: 600,
      md: 800,
      lg: 1000,
      xl: 1200,
      xxl: 1400,
    }),
  ).toEqual({
    "--sm": `600px <= width`,
    "--sm-only": `600px <= width < 800px`,
    "--md": `800px <= width`,
    "--md-only": `800px <= width < 1000px`,
    "--lg": `1000px <= width`,
    "--lg-only": `1000px <= width < 1200px`,
    "--xl": `1200px <= width`,
    "--xl-only": `1200px <= width < 1400px`,
    "--xxl": `1400px <= width`,
  });
});

it("sorts mixed inputs before creating custom media queries", () => {
  expect(
    createMobileFirstMediaQueries({
      tablet: 800,
      desktop: 1400,
      phone: 400,
    }),
  ).toEqual({
    "--phone": `400px <= width`,
    "--phone-only": `400px <= width < 800px`,
    "--tablet": `800px <= width`,
    "--tablet-only": `800px <= width < 1400px`,
    "--desktop": `1400px <= width`,
  });
});

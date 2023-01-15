import { generateMediaQueries } from "./generate_media_queries";

it("outputs custom media queries object built for mobile first designs", () => {
  expect(
    generateMediaQueries({
      sm: 600,
      md: 800,
      lg: 1000,
      xl: 1200,
      xxl: 1400,
    }),
  ).toEqual({
    "--sm": `(min-width: 600px)`,
    "--sm-only": `(min-width: 600px) and (max-width: 799px)`,
    "--md": `(min-width: 800px)`,
    "--md-only": `(min-width: 800px) and (max-width: 999px)`,
    "--lg": `(min-width: 1000px)`,
    "--lg-only": `(min-width: 1000px) and (max-width: 1199px)`,
    "--xl": `(min-width: 1200px)`,
    "--xl-only": `(min-width: 1200px) and (max-width: 1399px)`,
    "--xxl": `(min-width: 1400px)`,
    "--xxl-only": `(min-width: 1400px)`,
  });
});

it("sorts mixed inputs before creating custom media queries", () => {
  expect(
    generateMediaQueries({
      tablet: 800,
      desktop: 1400,
      phone: 400,
    }),
  ).toEqual({
    "--phone": `(min-width: 400px)`,
    "--phone-only": `(min-width: 400px) and (max-width: 799px)`,
    "--tablet": `(min-width: 800px)`,
    "--tablet-only": `(min-width: 800px) and (max-width: 1399px)`,
    "--desktop": `(min-width: 1400px)`,
    "--desktop-only": `(min-width: 1400px)`,
  });
});

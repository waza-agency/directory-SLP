// Babel config used ONLY by Jest via babel-jest (configured in jest.config.js
// with the explicit `configFile` option).
//
// This file is intentionally NOT named `babel.config.js` — Next.js's SWC
// compiler auto-detects any file matching Babel's standard config names and
// disables SWC when one is present. Disabling SWC breaks `next/font`, which
// requires SWC transforms. By using a non-standard name here we keep Jest
// working with its babel preset pipeline while letting the Next.js build
// continue to use SWC for `next/font`, React Server Components, etc.
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    // Add any necessary plugins here
  ],
};

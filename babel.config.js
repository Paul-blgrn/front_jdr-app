module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ["@babel/preset-react", { "runtime": "automatic" }],
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-runtime",
  ],
  overrides: [
    {
      test: /node_modules/,
      presets: [['@babel/preset-env']],
    },
  ]
};
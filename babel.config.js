module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    "@babel/plugin-transform-modules-commonjs",
  ],
  overrides: [
    {
      test: /node_modules/,
      presets: ['@babel/preset-env'],
    },
  ]
};
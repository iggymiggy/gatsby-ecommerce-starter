const Dotenv = require('dotenv-webpack')

module.exports = {
  plugins: [
    new Dotenv({
      path: `./.env.development`,
    }),
  ],
  // resolve: {
  //   fallback: {
  //     crypto: require.resolve('crypto-browserify'),
  //     https: require.resolve("https-browserify"),
  //   }
  // },
  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },
}
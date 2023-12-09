const webpack = require('webpack');

module.exports = {
    webpack: {
      configure: {
        resolve: {
          fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "process": require.resolve('process')
          },
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: require.resolve('process'),
            }),
        ],
        
      },
    },
};
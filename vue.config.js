// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const { InjectManifest } = require('workbox-webpack-plugin')

const config = {}

if (process.env.NODE_ENV === 'production') {
  config['configureWebpack'] = {
    plugins: [
      new InjectManifest({
        swSrc: './service-worker.js',
      }),
    ],
  }
}

module.exports = config

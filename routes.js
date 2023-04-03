import { CACHE_ASSETS } from './src/cache'
const { Router } = require('@edgio/core/router')

module.exports = new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  // Send requests to static assets in the build output folder `dist`
  .static('dist')

  .match('/edg-api/api/character', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('api', {
      path: '/api/character',
      transformResponse: (response) => {
        if (response.body) {
          response.body = response.body
            .toString()
            .replace(
              /https:\/\/rickandmortyapi.com\//g,
              '/edg-api/'
            )
        }
      }
    })
  })

  .match('/edg-api/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('api', {
      path: ':path*',
    })
  })

  // Send everything else to the App Shell
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })

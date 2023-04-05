import { CACHE_ASSETS } from './src/cache'
const { Router } = require('@edgio/core/router')
import Request from '@edgio/core/router/Request'

module.exports = new Router()
  // Prevent search engine bot(s) from indexing
  // Read more on: https://docs.layer0.co/guides/cookbook#blocking-search-engine-crawlers
  // Send requests to static assets in the build output folder `dist`

  .match({ path: '/' }, ({ request, redirect }) => {
    const cookie = request.getHeader('cookie')

    var redirectPath = '/'
    // if (cookie && cookie !== 'undefined') {
    //   const country = cookie.match(/country=([^;\s]+)/)[1]
    //   redirectPath = redirectPath + country
    // } else {
    //   redirectPath = redirectPath + 'uk'
    // }
    redirectPath = redirectPath + 'uk'
    return redirect(redirectPath, 301);
  }
  )

  .match(
    {
      path: '/uk',
      cookies: { country: /es/ }
    },
    ({ request, redirect }) => {
      const path = request.url
      // const cookie = request.getHeader('cookie')
      const cookie = 'country=se;'
      const country = cookie.match(/country=([^;\s]+)/)[1]
      return redirect('/' + country, 301);
    }
  )

  .match(
    {
      path: '/uk/:path*',
      cookies: { country: /(us|br|es)$/ }
    },
    ({ request, redirect }) => {
      // const cookie = request.getHeader('cookie')
      const cookie = 'country=se;'
      const country = cookie.match(/country=([^;\s]+)/)[1]
      return redirect('/' + country + '/:path*', 301);
    }
  )

  .match({ path: '/:version' }, ({ redirect, compute, appShell, request }) => {
    const path = request.path
    const regexToExcludePaths = /^\/(?:uk|us|row|manifest|service-worker|assets|_nuxt|__edgio__|favicon)/;

    if (!regexToExcludePaths.test(path) && path !== '/' && !/\/(uk|us|row)\//.test(path)) {
      console.log('REDIRECT TO UK/:path')
      return redirect('/uk/:version', 301);
    }

    if (regexToExcludePaths.test(path) && path.slice(-1) == '/') {
      console.log('TRIM /');
      const newPath = path.slice(0, -1)
      return redirect(newPath, 301);
    }
  })

  // .match('/uk', ({ cache }) => {
  //   cache({
  //     edge: {
  //       maxAgeSeconds: 86400,
  //       staleWhileRevalidateSeconds: 60,
  //     },
  //   });
  // })

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

  .static('dist')

  // Send everything else to the App Shell
  .fallback(({ appShell }) => {
    appShell('dist/index.html')
  })

/**
 * We should not punish users who use modern browsers by forcing them to download polyfills.
 *
 * The idea here is to determine whether the fetch polyfill is required, and dynamically load it if necessary.
 *
 * Unfortunately apollo-client and fetch-interceptor also import the fetch polyfill, which causes Webpack to ignore this attempt to split the polyfill out
 * 
 * An alias has been added to the webpack config which returns this conditional require if `whatwg-fetch` is imported from any library
 */

if (!window.fetch) {
  require.ensure([], (require) => {
    require('whatwg-fetch')
  }, 'polyfill-fetch')
}
const mix = require('laravel-mix')
const path = require('path')

const directory = path.basename(path.resolve(__dirname))
const source = `platform/plugins/${directory}`
const dist = `public/vendor/core/plugins/${directory}`

mix
    .sass(`${source}/resources/sass/geocoding.scss`, `${dist}/css`)
    .js(`${source}/resources/js/geocoding.js`, `${dist}/js`)

if (mix.inProduction()) {
    mix
        .copy(`${dist}/css/geocoding.css`, `${source}/public/css`)
        .copy(`${dist}/js/geocoding.js`, `${source}/public/js`)
}

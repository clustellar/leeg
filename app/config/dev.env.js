'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_SECURE: !!process.env.API_SECURE,
  API_HOST: '"' + process.env.API_HOST + '"',
  API_PATH: '"' + process.env.API_PATH + '"'
})

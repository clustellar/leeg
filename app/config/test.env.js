'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_SECURE: !!process.env.API_SECURE,
  API_HOST: '"' + process.env.API_HOST + '"',
  API_PATH: '"' + process.env.API_PATH + '"'
})

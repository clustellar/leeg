'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  WEBSOCKET: '"' + process.env.WEBSOCKET + '"',
  API: '"' + process.env.API + '"'
})

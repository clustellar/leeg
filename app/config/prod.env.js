'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_SECURE: !!process.env.API_SECURE,
  API_HOST: '"' + process.env.API_HOST + '"',
  API_PATH: '"' + process.env.API_PATH + '"'
}

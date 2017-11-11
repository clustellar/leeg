var express = require('express')
  , request = require('request')
  , router = express.Router()

router.get('*', function (req, res, next) {
  try {
    var b64 = req.originalUrl.toString().split('proxy/').pop();
    var url = new Buffer(b64, 'base64').toString('ascii')
    console.log('[PROXY] -> ' + url);
    req.pipe(request(url)).pipe(res);
  } catch (err) {
    console.warn('Error in proxy: ', err)
    return res.sendStatus(400);
  }
})

module.exports = router
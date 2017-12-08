module.exports = function (req, res, next) {
  req.sequence.run().then(resp => {
    console.log('RESP: ', resp)
    res.send(JSON.stringify(resp))
  })
}

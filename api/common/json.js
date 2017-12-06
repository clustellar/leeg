module.exports = function (req, res, next) {
  req.sequence.run().then(resp => {
    res.send(JSON.stringify(resp))
  })
}

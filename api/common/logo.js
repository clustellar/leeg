module.exports = function (req, res, next) {
  req.sequence.run().then(resp => {
    res.send(JSON.stringify(resp.map(item => Object.assign({}, { id: item.id, name: item.name, logo: item.logo }))))
  })
}

module.exports = {
  error: function (res) {
    return function (err) {
      res.send(500, { error: err.message });
    }
  }
}

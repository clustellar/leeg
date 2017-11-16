module.exports = {
  error: function (res) {
    return function (err) {
      return res.send(500, { error: err.message });
    }
  }
}

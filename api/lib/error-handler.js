module.export = function (res) {
  return function (error) {
    return res.send(500, { error: error.message });
  }
}

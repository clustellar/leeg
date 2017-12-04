var validateFunction = function (Model, filter) {
  var name = Model.getTableName()
  return Model.filter(filter).run().then(resp => {
    if (resp.length) {
      return JSON.stringify({ valid: false, message: ['This', name, 'is already taken.'].join(' ') })
    } else {
      return JSON.stringify({ valid: true, message: ['This', name, 'is available, save to claim it'].join(' ') })
    }
  })
}

var saveFunction = function (Model, params, data) {
  if (params.id) {
    return Model.get(params.id).update(data)
  } else if (params.name) {
    return Model.filter({ name: params.name }).nth(0).update(data)
  } else {
    return new Model(data).save()
  }
}

var saveHandler = function (req, res, next) {
  if (req.body) {
    if (req.params.validate || req.query.validate) {
      validateFunction(req.model, { name: req.body.name }).then(resp => res.send(resp))
    } else {
      saveFunction(req.model, req.params, req.body)
      .then(resp => res.send(JSON.stringify(resp)))
      .catch(err => res.status(500).send(err))
    }
  } else {
    res.status(500).send('No body received.')
  }
}

exports.validate = validateFunction
exports.save = saveHandler

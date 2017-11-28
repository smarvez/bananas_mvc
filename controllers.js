const model = require('./models')
const uuid = require('uuid/v4')

let getAll = function(req, res, next) {
  const data = model.getAll();
  res.status(200).json({ data })
}

let findBanana = function(req, res, next) {
  const banana = model.findBanana(model.bananas, req.params.id)
  if (!banana) return next({ status: 404, message: `Could not find banana with id of ${req.params.id}` })

  res.status(200).json({ data: banana })
}

let create = function (req, res, next) {
  const { name, size, flavor } = req.body
  if (!name || !size || !flavor) return next({ status: 400, message: `Fields name and breed are required` })
  let banana = model.create(name, size, flavor)
  res.status(201).json({ data: banana })
}

let changeOne = function(req, res, next) {
  const id = req.params.id
  const banana = model.findBanana(model.bananas, id)

  if (!banana) return next({ status: 404, message: `Could not find banana with id of ${id}` })

  const { name, size, flavor } = req.body
  if (!name || !size || !flavor) return next({ status: 400, message: `Fields name and breed are required` })

  let result = model.changeOne(name, size, flavor, banana)

  res.status(200).json({ data: result })
}

let deleteOne = function(req, res, next) {
  const id = req.params.id
  const banana = model.findBanana(model.bananas, id)
  const result = model.deleteOne(banana)

  if (!banana) return next({ status: 404, message: `Could not find banana with id of ${id}` })

  res.status(204).json()
}

module.exports = { getAll, findBanana, create, changeOne, deleteOne }

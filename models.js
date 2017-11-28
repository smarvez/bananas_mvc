const uuid = require('uuid/v4')
const bananas = require('./bananas')

function getAll() {
  return bananas
}

function findBanana(arr, id) {
  return arr.find(ele => ele.id === id)
}

function create(name, size, flavor) {
  const banana = {id: uuid(), name, size, flavor}
  bananas.push(banana)
  return banana
}

function changeOne(name, size, flavor, banana) {
  let nanner = bananas.indexOf(banana)
  bananas[nanner] = {id: banana.id, name, size, flavor}
  return bananas[nanner]
}

function deleteOne(banana) {
  let index = bananas.indexOf(banana)
  const deleted = bananas.splice(index, 1);
  return deleted;
}

module.exports = { bananas, getAll, findBanana, create, changeOne, deleteOne }

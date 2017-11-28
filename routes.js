const express = require('express')
const router = express.Router()
const ctrl = require('./controllers')

router.get('/', ctrl.getAll )

router.get('/:id', ctrl.findBanana)

router.post('/', ctrl.create)

router.put('/:id', ctrl.changeOne)

router.delete('/:id', ctrl.deleteOne)

module.exports = router

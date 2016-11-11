'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/card.controller');

/* GET All Cards */
router.get('/cards', controller.list)

/* POST one card only */
router.post('/cards', controller.create)

/* GET one card only */
router.post('/cards/:_id', controller.find)

/* PUT a card */
router.put('/cards/:_id', controller.update)

/* DELETE one card only */
router.delete('/cards/:_id', controller.delete)


module.exports = router

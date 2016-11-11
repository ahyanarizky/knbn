'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/card.controller');

/* GET All Cards */
router.get('/cards', controller.list)

/* POST one card only */
router.post('/cards', controller.creating)

/* GET one card only */
router.post('/cards/:cardID', controller.find)

/* PUT a card */
router.put('/cards/:cardID', controller.update)

/* DELETE one card only */
router.delete('/cards/:cardID', controller.hapus)


module.exports = router

const express = require('express')
const seriesController = require('../controllers/series.js')

const router = express.Router()

const Serie = require('../models/serie.js')
const models = {
  Serie
}

router.get('/', seriesController.index.bind(null, models))

router.get('/nova', seriesController.novaForm)
router.post('/nova', seriesController.novaProcess.bind(null, models))

module.exports = router
const express = require('express')
const productController = require('../controllers/productController')
const { checkNotAuthenticated } = require('../utils/checkAuthenticated')

const router = express.Router()

router.get('/', checkNotAuthenticated, productController.getAllProducts)
router.post('/', productController.createProduct)

module.exports = router

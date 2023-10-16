const express = require('express')
const { getAds, getMyAds, getAd, createAd, updateAd, deleteAd } = require('../controllers/adController.js')
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController.js')

const requireAuth = require('../middleware/requireAuth.js')
const requireAdmin = require('../middleware/requireAdmin.js')

const router = express.Router()

//categories
router.get('/categories', getCategories)
router.post('/categories', requireAuth, requireAdmin, createCategory)
router.delete('/categories/:id', requireAuth, requireAdmin, deleteCategory)

// ads
router.get('/', getAds)
router.get('/myads', requireAuth, getMyAds)
router.get('/:id', getAd)
router.post('/', requireAuth, createAd)
router.patch('/:id', requireAuth, updateAd)
router.delete('/:id', requireAuth, deleteAd)


module.exports = router
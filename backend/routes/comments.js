const express = require('express')
const { getComments, createComment, deleteComment } = require('../controllers/commentsController')

const requireAuth = require('../middleware/requireAuth')
const requireAdmin = require('../middleware/requireAdmin')

const router = express.Router()


//comments
router.get('/:ad_id', getComments)
router.post('/', createComment)
router.delete('/:ad_id', requireAuth, requireAdmin, deleteComment)




module.exports = router
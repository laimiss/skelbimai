const express = require('express')

const { loginUser, signupUser, getUsers } = require('../controllers/userController')

const requireAuth = require('../middleware/requireAuth.js')
const requireAdmin = require('../middleware/requireAdmin.js')

const router = express.Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.post('/getAll', requireAuth, requireAdmin, getUsers)


module.exports = router
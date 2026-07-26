const {register, login} =require('../controllers/user.controller')
const express =require('express')
const { registerValidation, loginValidation } = require('../middleware/validations/user')

const router = express.Router()

router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)
module.exports = router

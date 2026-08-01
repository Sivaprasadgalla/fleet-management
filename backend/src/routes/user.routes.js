const {register, login, getUsers, createUser, updateUser, deleteUser, getProflie, changePassword} =require('../controllers/user.controller')
const express =require('express')
const { registerValidation, loginValidation, passwordValidation } = require('../middleware/validations/user')
const {auth} = require('../middleware/authentication/auth')
const authorize = require('../middleware/authentication/authorize')

const router = express.Router()

router.post('/register',registerValidation,register)
router.post('/login',loginValidation,login)

router.post('/change-password',auth,authorize('admin','user'),passwordValidation,changePassword)
router.get('/all-users',auth, authorize('admin'), getUsers)
router.post('/create',auth,authorize('admin'),registerValidation,createUser)
router.get('/get-profile/:id',auth,authorize('admin','user'),getProflie)
// router.put('/update-profile',auth,authorize('user','admin'),updateUser)
router.put('/update-profile',auth,authorize('admin','user'),updateUser)
router.delete('/delete-user/:id',auth,authorize('admin'),deleteUser)

module.exports = router

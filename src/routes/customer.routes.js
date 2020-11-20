const express = require('express');

// const Router = express.Router;
const { Router } = express;
const router = Router();

//Importando funciones de customerController
const { saveCustomer, deleteCustomer, verifyCustomerEmail, getProfile, updatePhone } = require('../controllers/customerController');
const { tokenRequired } = require('../middlewares/auth.middleware');

//Importando middlewares den customer
const { fieldsValidationRegister, phoneVerify, passwdVerify, verifyEmailFields } = require('../middlewares/customer.middleware');

//Registro de usuario en la base de datos 
router.post('/', [fieldsValidationRegister, phoneVerify, passwdVerify], saveCustomer);

router.post('/verify', [tokenRequired, verifyEmailFields], verifyCustomerEmail);

router.get('/profile', [tokenRequired], getProfile);

router.put('/phone', [tokenRequired, phoneVerify], updatePhone);



module.exports = router;
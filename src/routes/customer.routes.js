const express = require('express');

// const Router = express.Router;
const { Router } = express;
const router = Router();

//Importando funciones de customerController
const { saveCustomer, deleteCustomer, verifyCustomerEmail, getProfile, updatePhone, getAllCustomers } = require('../controllers/customerController');
const { tokenRequired, tokenEmployee } = require('../middlewares/auth.middleware');

//Importando middlewares den customer
const { fieldsValidationRegister, verifyEmailFields, phoneVerify } = require('../middlewares/customer.middleware');

const { passwdVerify } = require('../helpers/utilies');

//Registro de usuario en la base de datos 
router.post('/', [fieldsValidationRegister, phoneVerify, passwdVerify], saveCustomer);

router.post('/verify', [tokenRequired, verifyEmailFields], verifyCustomerEmail);

router.get('/profile', [tokenRequired], getProfile);

router.get('/', [tokenEmployee], getAllCustomers);

router.put('/phone', [tokenRequired, phoneVerify], updatePhone);

router.delete('/', [tokenRequired], deleteCustomer)



module.exports = router;
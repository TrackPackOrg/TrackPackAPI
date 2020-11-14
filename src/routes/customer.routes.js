const express = require('express');

// const Router = express.Router;
const { Router } = express;
const router = Router();

//Importando funciones de customerController
const { saveCustomer, deleteCustomer, verifyCustomerEmail } = require('../controllers/customerController');

//Importando middlewares den customer
const { fieldsValidationRegister, phoneVerify, passwdVerify, verifyEmailFields } = require('../middlewares/customer.middleware');

//Registro de usuario en la base de datos 
router.post('/', [fieldsValidationRegister, phoneVerify, passwdVerify], saveCustomer);

router.post('/verify', [verifyEmailFields], verifyCustomerEmail);



module.exports = router;
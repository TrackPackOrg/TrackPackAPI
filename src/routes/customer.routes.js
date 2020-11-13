const express = require('express');

// const Router = express.Router;
const { Router } = express;
const router = Router();

//Importando funciones de customerController
const { saveCustomer, deleteCustomer } = require('../controllers/customerController');

//Importando middlewares den customer
const { fieldsValidationRegister, phoneVerify } = require('../middlewares/customer.middleware');

//Registro de usuario en la base de datos 
router.post('/', [fieldsValidationRegister, phoneVerify], saveCustomer);



module.exports = router;
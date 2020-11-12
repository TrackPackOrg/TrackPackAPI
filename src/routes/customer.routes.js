const express = require('express');

// const Router = express.Router;
const { Router } = express;
const router = Router();

//Importando funciones de customerController
const { saveCustomer, deleteCustomer } = require('../controllers/customerController');

//Importando middlewares den customer
const customerMiddlewares = require('../middlewares/customer.middleware');

//Registro de usuario en la base de datos 
router.post('/', [customerMiddlewares.fieldsValidation], saveCustomer);



module.exports = router;
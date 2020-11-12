const express = require('express');
const { Router } = express;
const router = Router();

const { getStates, getCityById, saveCustomerAddress } = require('../controllers/addressController');
const { addressFieldsValidation } = require('../middlewares/address.middleware');

router.get('/states', getStates);
router.get('/cities', getCityById);

// www.trackpack.com/address/customer
router.post('/customer', [addressFieldsValidation], saveCustomerAddress);


module.exports = router;
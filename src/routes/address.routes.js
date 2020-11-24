const express = require('express');
const { Router } = express;
const router = Router();

const { getStates, getCityById, saveCustomerAddress, getAllAddress, deleteAddress, updateAddress, updateDefaultAddress } = require('../controllers/addressController');
const { addressFieldsValidation, verifyState } = require('../middlewares/address.middleware');
const { tokenRequired } = require('../middlewares/auth.middleware');

router.get('/states', getStates);
router.get('/cities', [verifyState], getCityById);

// www.trackpack.com/address/customer
router.post('/customer', [tokenRequired, addressFieldsValidation], saveCustomerAddress);
router.put('/customer', [tokenRequired], updateAddress);
router.get('/', [tokenRequired], getAllAddress);
router.delete('/', [tokenRequired], deleteAddress);

router.put('/default', [tokenRequired], updateDefaultAddress);

module.exports = router;
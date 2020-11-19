const { Router } = require('express');
const { saveLoad, getAllLoads, updateLoadAddress } = require('../controllers/loadController');
const { tokenRequired } = require('../middlewares/auth.middleware');
const { addressCustomerValidation } = require('../middlewares/address.middleware');
const router = Router();

router.post('/', [tokenRequired, addressCustomerValidation], saveLoad);
router.get('/', [tokenRequired], getAllLoads);
router.put('/updateAddress', [tokenRequired, addressCustomerValidation], updateLoadAddress);


module.exports = router;
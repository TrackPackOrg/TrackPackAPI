const { Router } = require('express');
const { saveLoad, getAllLoads } = require('../controllers/loadController');
const { tokenRequired } = require('../middlewares/auth.middleware');
const { addressCustomerValidation } = require('../middlewares/address.middleware');
const router = Router();

router.post('/', [tokenRequired, addressCustomerValidation], saveLoad);
router.get('/', [tokenRequired], getAllLoads)


module.exports = router;
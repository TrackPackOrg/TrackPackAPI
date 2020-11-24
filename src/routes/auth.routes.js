const { Router } = require('express');

const router = Router();
const { tokenRequired, tokenEmployee } = require('../middlewares/auth.middleware');
const { verify, dashboard } = require('../controllers/authController');


router.get('/verify', [tokenRequired], verify);
router.get('/dashboard', [tokenEmployee], dashboard);


module.exports = router;
const { Router } = require('express');

const router = Router();
const { tokenRequire } = require('../middlewares/auth.middleware');
const { verify } = require('../controllers/authController');

router.get('/verify', [tokenRequire], verify);


module.exports = router;
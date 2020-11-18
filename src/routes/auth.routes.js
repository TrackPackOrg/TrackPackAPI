const { Router } = require('express');

const router = Router();
const { tokenRequired } = require('../middlewares/auth.middleware');
const { verify } = require('../controllers/authController');

router.get('/verify', [tokenRequired], verify);


module.exports = router;
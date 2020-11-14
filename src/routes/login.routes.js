const express = require('express');
const { Router } = express;
const router = Router();

const { loginFieldsValidation } = require('../middlewares/login.middleware');
const { login } = require('../controllers/loginControllers');

router.post('/', [loginFieldsValidation], login);


module.exports = router;
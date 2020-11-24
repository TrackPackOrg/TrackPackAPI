const express = require('express');
const { Router } = express;
const router = Router();

const { loginFieldsValidation } = require('../middlewares/login.middleware');
const { login, loginEmployee } = require('../controllers/loginControllers');

router.post('/', [loginFieldsValidation], login);
router.post('/employee', loginEmployee);

module.exports = router;
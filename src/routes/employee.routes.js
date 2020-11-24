const { Router } = require('express');
const { validUsername, getEmployeeProfile, getEmployees, saveEmployee } = require('../controllers/employeeController');
const { passwdVerify } = require('../helpers/utilies');
const { tokenEmployee } = require('../middlewares/auth.middleware');
const { fieldsValidationEmployee } = require('../middlewares/employee.middleware');

const router = Router();

router.post('/', [tokenEmployee, fieldsValidationEmployee, passwdVerify], saveEmployee);
router.get('/validUsername', validUsername);
router.get('/profile', [tokenEmployee], getEmployeeProfile);
router.get('/', [tokenEmployee], getEmployees);


module.exports = router;
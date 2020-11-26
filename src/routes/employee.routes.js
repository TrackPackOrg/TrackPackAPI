const { Router } = require('express');
const { validUsername, getEmployeeProfile, getEmployees, saveEmployee, verifyPassword, deleteEmployee } = require('../controllers/employeeController');
const { passwdVerify } = require('../helpers/utilies');
const { tokenEmployee } = require('../middlewares/auth.middleware');
const { fieldsValidationEmployee } = require('../middlewares/employee.middleware');

const router = Router();

router.post('/', [tokenEmployee, fieldsValidationEmployee, passwdVerify], saveEmployee);
router.get('/', [tokenEmployee], getEmployees);
router.post('/verify-password', [tokenEmployee], verifyPassword);
router.delete('/', [tokenEmployee], deleteEmployee);
router.get('/validUsername', validUsername);
router.get('/profile', [tokenEmployee], getEmployeeProfile);


module.exports = router;
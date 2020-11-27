const { Router } = require('express');
const { getInactiveCustomers } = require('../controllers/customerController');
const { validUsername, getEmployeeProfile, getEmployees, saveEmployee, verifyPassword, deleteEmployee, deleteCustomer, reactiveCustomer, passwordChange } = require('../controllers/employeeController');
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
router.delete('/customer', [tokenEmployee], deleteCustomer);
router.get('/customer/inactive', [tokenEmployee], getInactiveCustomers);
router.put('/customer/active', [tokenEmployee], reactiveCustomer);
router.put('/customer/password', [tokenEmployee, passwdVerify], passwordChange);


module.exports = router;
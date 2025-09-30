import express from 'express';
const router = express();
import {createEmployee, getAllEmployee, updateEmployee, deleteEmployee, employeeProfile, adminLogin, employeeLogin} from '../controllers/employeeController.js'
import {jwtAuth} from '../middlewares/jwt.js'

router.post('/add-employee',jwtAuth, createEmployee);
router.post('/admin-login', adminLogin)
router.post('/employee-login', employeeLogin)
router.get('/employee-list', jwtAuth, getAllEmployee);
router.put('/update-employee/:id',jwtAuth, updateEmployee);
router.delete('/delete-employee/:id',jwtAuth, deleteEmployee);
router.get('/employee-profile/:id',jwtAuth, employeeProfile);


router.get('/is-login', jwtAuth);

export default router;
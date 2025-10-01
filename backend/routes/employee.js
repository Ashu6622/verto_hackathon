import express from 'express';
const router = express();
import {createEmployee, getAllEmployee, updateEmployee, deleteEmployee, employeeProfile, adminLogin, employeeLogin} from '../controllers/employeeController.js'
import {jwtAuth} from '../middlewares/jwt.js'


router.post('/add-employee', createEmployee);
router.post('/admin-login', adminLogin);
router.post('/employee-login', employeeLogin);
router.get('/employee-list', getAllEmployee);
router.put('/update-employee/:id', updateEmployee);
router.delete('/delete-employee/:id', deleteEmployee);
router.get('/employee-profile/:id', employeeProfile);


router.get('/is-login', jwtAuth);

export default router;
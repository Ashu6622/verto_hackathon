import express from 'express';
const router = express.Router();
import employeeRoute from './employee.js'

router.use('/api/employees', employeeRoute);

export default router;
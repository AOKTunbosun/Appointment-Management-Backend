import { Router } from 'express';

import userRouter from './users.js';
import serviceRouter from './services.js';


const router = Router();

router.use('/users', userRouter);
router.use('/services', serviceRouter);


export default router;
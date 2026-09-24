import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';


import baseRouter from './routes/base_router.js';

dotenv.config();

const app = express();


app.use(express.json());

app.use(morgan('tiny'));

app.use('/api', baseRouter);


app.get('/health', (request, response) => {
    return response.status(200).send({ message: 'Server is healthy' });
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
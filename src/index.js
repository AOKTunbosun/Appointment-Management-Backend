import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';

import './auth_strategies/local_strategy.js';

import baseRouter from './routes/base_router.js';

import { redisStore } from './config/redis_session_store.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(session({
    store: redisStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24
     }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('tiny'));

app.use('/api', baseRouter);


app.get('/health', (request, response) => {
    return response.status(200).send({ message: 'Server is healthy' });
});



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
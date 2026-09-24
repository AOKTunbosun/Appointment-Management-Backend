import { Router } from 'express';
import {checkSchema, matchedData, validationResult} from 'express-validator';

import {registerUserSchema, loginUserSchema} from '../validation_schemas/user_schemas.js';

import { hashPassword } from '../utils/hashing.js';

import {users} from '../db/schema/users.js';
import {db} from '../db/index.js';


const router = Router();


router.post('/register', checkSchema(registerUserSchema), async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        return response.status(400).send({ errors: result.array() });
    }
    const data = matchedData(request);
    console.log('Validated data:', data);

    // Hashing password before saving to the database
    const hashedPassword = await hashPassword(data.password);
    
    try {
        const newUser = await db.insert(users).values({...data, password: hashedPassword }).returning();
        console.log('New user saved to the database:', newUser);
        return response.status(201).send({ user: newUser });
    } catch (err) {
        console.error('Error saving user to the database:', err);
        return response.status(500).send({ error: 'Internal Server Error' });
    }
    
});


router.post('/login', checkSchema(loginUserSchema), async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        return response.status(400).send({ errors: result.array() });
    }
    const data = matchedData(request);
    console.log('Validated data:', data);

    // Handle user login logic here
});



export default router;
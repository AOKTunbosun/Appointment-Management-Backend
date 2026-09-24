import {response, Router} from 'express';
import {checkSchema, matchedData, validationResult} from 'express-validator';
import passport from 'passport';

import {checkAuthStatus} from '../auth_strategies/dependencies/auth_status_checker.js';
import { db } from '../db/index.js';
import { services } from '../db/schema/services.js';

import {getAllServices, createService, getServiceById} from '../crud/services.js';

import {createServicesSchema, getServicebyIdSchema} from '../validation_schemas/services_schemas.js';


const router = Router();


router.get('', checkAuthStatus, async (request, response) => {
    const servicesList = await getAllServices();
    if (!servicesList || servicesList.length === 0) {
        return response.status(404).send({ message: 'No services found' });
    }

    return response.status(200).send({ services: servicesList });
});


router.post('', checkAuthStatus, checkSchema(createServicesSchema), async (request, response) => {
    const result = validationResult(request);
    if (!result.isEmpty()) {
        return response.status(400).send({error: result.array()})
    }

    const data = matchedData(request);

    try {
        const newService = await createService(data);
        return response.status(201).send({service: newService});
    } catch (err) {
        console.error(`Error saving services to database: ${err}`);
        return response.status(500).send({error: 'Unable to save service'})
    }

});


router.get('/:id', checkAuthStatus, async (request, response) => {
    try{
        const service = await getServiceById(request.params.id);
        if (!service) {
            return response.status(404).send({message: 'Service not found'})
        }
        
        return response.status(200).send({service: service})
        

    } catch (err) {
        console.error(`Error fetching services: ${err}`);
        return response.sendStatus(500)
    }
});


router.patch('/:id', checkAuthStatus, async (request, response) => {});


export default router;
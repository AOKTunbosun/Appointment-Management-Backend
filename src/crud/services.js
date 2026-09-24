import {eq} from 'drizzle-orm';
import { v7 as uuidv7 } from "uuid";

import {db} from '../db/index.js';
import {services} from '../db/schema/services.js';



export const getAllServices = async () => {
    const servicesList = await db.select().from(services);
    return servicesList;
};


export const createService = async (serviceData) => {
    const [newService] = await db.insert(services).values(serviceData).returning()
    return newService;
};

export const getServiceById = async (serviceId) => {
    const [service] = await db.select().from(services).where(eq(services.id, serviceId)).limit(1)
    
    return service;
};
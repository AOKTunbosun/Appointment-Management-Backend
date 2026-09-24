import { eq } from 'drizzle-orm';

import {db} from '../db/index.js';
import {users} from '../db/schema/users.js';




export const getAllUsers = async () => {
    const usersList = await db.select().from(users);
    return usersList;
};


export const createUser = async (userData) => {
    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
}

export const getUserByEmail = async (email) => {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user;
}

export const getUserById = async (id) => {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
}


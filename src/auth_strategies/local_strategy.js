import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { eq } from 'drizzle-orm';

import { users } from '../db/schema/users.js';
import { db } from '../db/index.js';
import { verifyPassword } from '../utils/hashing.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if (!user) {
            throw new Error('User not found');
        }
        done(null, user);
    } catch (err) { 
        done(err, null)
    }
});


passport.use(new LocalStrategy({usernameField: 'email' }, async (email, password, done) => {
    try {
        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (!user) {
            return done(null, false, { message: 'Invalid email or password' });
        }
        console.log(user);

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
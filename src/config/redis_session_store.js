import {RedisStore} from 'connect-redis';
import {redisClient} from './redis.js';

export const redisStore = new RedisStore({
    client: redisClient,
});
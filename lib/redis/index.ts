import Redis from 'redis';
import { promisify } from 'util';

import endpoint from '../../endpoint';

const redis = Redis.createClient(endpoint.REDIS_URL);

export const getAsyncRedis = promisify(redis.get).bind(redis);

export default redis;

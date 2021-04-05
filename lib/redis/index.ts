import Redis from 'redis';

import endpoint from '../../endpoint';

const redis = Redis.createClient(endpoint.REDIS_URL);

export default redis;

const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  url: 'redis://127.0.0.1:6379',  // Redis server address
});

// Handle Redis connection errors
redisClient.on('error', (err) => console.error('Redis Client Error', err));

module.exports = redisClient;

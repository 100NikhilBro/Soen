const Redis = require('ioredis');


require('dotenv').config();


if (!process.env.HOST_R || !process.env.PORT_R || !process.env.PASSWORD) {
    throw new Error("Missing required environment variables for Redis connection.");
}

const redisClient = new Redis({
    host: process.env.HOST_R,
    port: process.env.PORT_R,
    password: process.env.PASSWORD,
})


redisClient.on('connect', () => {
    console.log("Redis Connected");
})


redisClient.on('error', (err) => {
    console.error("Redis connection error:", err);
});


module.exports = redisClient;
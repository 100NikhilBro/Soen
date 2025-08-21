const jwt = require('jsonwebtoken');
require('dotenv').config();

const redisClient = require("../services/redis.service.js")


const authUser = async(req, res, next) => {
    try {

        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        console.log(token);

        if (!token) {
            return res.status(401).send({ error: "Please authenticate" });
        }

        const blacklisted = await redisClient.get(token);

        if (blacklisted) {
            return res.status(401).json({ error: "Unauthorised user" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '2d' });
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e)
        return res.status(401).send({ error: "Please authenticate" });
    }
}


module.exports = authUser;
const User = require('../models/user.model.js');
const userService = require("../services/user.services.js");
const expressValidator = require('express-validator');
const redisClient = require('../services/redis.service.js');


exports.createUserController = async(req, res) => {

    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await userService.createUser(req.body);

        user.password = undefined;

        const token = await user.generateJWT();
        res.status(201).send({ user, token });


    } catch (error) {
        res.status(400).send(error.message)

    }
}



exports.userLoginController = async(req, res) => {
    const errors = expressValidator.validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                errors: "Invalid credentials"
            })
        }

        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                errors: "Invalid credentials"
            })
        }

        user.password = undefined;

        const token = await user.generateJWT();

        res.status(200).json({ user, token });

    } catch (e) {
        return res.status(400).send(e.message);
    }
}


exports.profileController = async(req, res) => {

    console.log(req.user);

    res.status(200).json({
        user: req.user
    })

}


exports.logOut = async(req, res) => {
    try {

        const token = req.cookies.token || req.body.token || (req.header("Authorization") && req.header("Authorization").split(" ")[1]);

        if (!token) {
            return res.status(401).json({ msg: "token is invalid or missing" });
        }

        redisClient.set(token, 'logout', 'EX', 24 * 60 * 60);

        res.status(200).json({
            msg: "Logged Out Successfully",
        })

    } catch (e) {

        console.log("Error is logging Out", e);

        res.status(401).json({
            msg: "Error in logged Out"
        })

    }
}



exports.allUser = async(req, res) => {
    try {

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })

        const allUsers = await userService.getAllUsers({ userId: loggedInUser._id });

        return res.status(200).json({
            users: allUsers
        })

    } catch (e) {
        console.log(e);
    }
}
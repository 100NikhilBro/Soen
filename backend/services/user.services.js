const User = require('../models/user.model.js');

exports.createUser = async({ email, password }) => {

    if (!email || !password) {
        throw new Error('Email and password are reuired');
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    return user;



}


exports.getAllUsers = async({ userId }) => {
    const users = await userModel.find({
        _id: { $ne: userId }
    });
    return users;
}
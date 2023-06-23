const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const server = require('../environment');
const User = require('../models/User');
const blacklisted = require('../models/Blacklisted');

const validateToken = (token) => {
    try {
        const data = jwt.verify(token, server.SECRET_KEY);
        return data;
    } catch (error) {
        throw new Error('Invalid cookie token!');
    }
}

const createAccessToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatarImg: user.avatarImg,
        cafes: user.cafes,
        cart: user.cart
    };
    const accessToken = jwt.sign(payload, server.SECRET_KEY);
    return {
        username: user.username,
        email: user.email,
        avatarImg: user.avatarImg,
        cafes: user.cafes,
        cart: user.cart,
        accessToken,
        _id: user._id
    };
}

const register = async (data) => {
    const existingEmail = await User.findOne({ email: data.email });
    const existingUsername = await User.findOne({ username: data.username });

    if (existingEmail) {
        throw new Error('Email already exists!');
    } else if (existingUsername) {
        throw new Error('Username already exists!');
    }
    const user = await User.create(data);
    return createAccessToken(user);
}

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password!');
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (isUser) {
        let userToReturn = createAccessToken(user);
        userToReturn.avatarImg = user.avatarImg;
        userToReturn.imageId = user.imageId;
        return userToReturn;
    } else {
        throw new Error('Invalid email or password!');
    }
}

const updateCafesOnUser = async (_id, coffeeId) => {
    try {
        const user = await User.findById(_id);
        let array = user.cafes
        array.push(coffeeId)
        await User.findByIdAndUpdate(_id, { cafes: array })
    } catch (error) {
        throw new Error(error)
    }
}

const logout = async (token) => {
    await blacklisted.create({ token })
}

const updateUser = async (id, data) => {
    const existingEmail = await User.findOne({ email: data.email });
    const existingUsername = await User.findOne({ username: data.username });

    if (existingEmail) {
        throw new Error('Email already exists!');
    } else if (existingUsername) {
        throw new Error('Username already exists!');
    }
    
    try {
        return await User.findByIdAndUpdate(id, { ...data }, { runValidators: true });
    } catch (error) {
        return error;
    }
}

const getUnknownUser = async (username) => {
    return await User.findOne({ username }).populate('cafes');
}

module.exports = {
    createAccessToken,
    validateToken,
    login,
    register,
    getUnknownUser,
    logout,
    updateCafesOnUser,
    updateUser
}

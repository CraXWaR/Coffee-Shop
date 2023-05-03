const Coffee = require("../models/Coffee");
const User = require("../models/User");

require('dotenv').config()
const addCoffee = async (coffee, id) => {
    try {
        coffee.owner = id;
        return await Coffee.create({ ...coffee })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
const getAllCafes = async () => {
    return await Coffee.find({})
}
const getOneCoffee = async (id) => {
    return await Coffee.findById(id).populate('owner addedBy')
}
const getProfileCafes = async (_id) => {
    return await Coffee.find({ owner: _id })
}
const editCoffee = async (id, data) => {
    try {
        return await Coffee.findByIdAndUpdate(id, { ...data }, { runValidators: true })
    } catch (error) {
        throw new Error(error)
    }
}
const deleteCoffee = async (id) => {
    return await Coffee.findByIdAndDelete(id)

}
const getTop3Cafes = async () => {
    const cafes = await Coffee.find({}).sort({ price: -1 }).limit(3)
    return cafes
}
const addToFavourite = async (userId, carId) => {
    try {
        //Adding coffee to user
        const user = await User.findById(userId);
        let array = user.favouriteCafes;
        array.push(carId);
        console.log(userId);
        console.log(carId);
        await User.findByIdAndUpdate(userId, {favouriteCafes: array});
        //Adding user to coffee
        let coffee = await Coffee.findById(carId);
        let coffeeArray = coffee.addedBy;
        coffeeArray.push(userId);
        await Coffee.findByIdAndUpdate(carId, {addedBy: coffeeArray});
    } catch (error) {
        throw new Error(error);
    }

}
const getFavouriteCafes = async (userId) => {
    return await User.findById(userId).populate('favouriteCafes')
}
const removeFromFavourites = async (userId, carId) => {
    try {
        const user = await User.findById(userId);
        let userCoffeeArray = user.favouriteCafes
        let userIndex = userCoffeeArray.indexOf(carId);
        userCoffeeArray.splice(userIndex, 1)
        await User.findByIdAndUpdate(userId, {favouriteCafes: userCoffeeArray})

        const car = await Coffee.findById(carId);
        let coffeeUserArray = car.addedBy;
        let coffeeUserIndex =coffeeUserArray.indexOf(userId)
        coffeeUserArray.splice(coffeeUserIndex, 1)
        await Coffee.findByIdAndUpdate(carId, {addedBy: coffeeUserArray})
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    removeFromFavourites,
    getFavouriteCafes,
    addToFavourite,
    getTop3Cafes,
    deleteCoffee,
    editCoffee,
    getProfileCafes,
    getOneCoffee,
    getAllCafes,
    addCoffee,
}

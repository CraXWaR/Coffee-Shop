const Coffee = require("../models/Coffee")
const User = require("../models/User")
require('dotenv').config()
const addCar = async (coffee, id) => {
    try {
        coffee.owner = id;
        return await Coffee.create({ ...coffee })
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}
const getAllCars = async () => {
    return await Coffee.find({})
}
const getOneCar = async (id) => {
    return await Coffee.findById(id).populate('owner addedBy')
}
const getProfileCars = async (_id) => {
    return await Coffee.find({ owner: _id })
}
const editCar = async (id, data) => {
    try {
        return await Coffee.findByIdAndUpdate(id, { ...data }, { runValidators: true })
    } catch (error) {
        throw new Error(error)
    }
}
const deleteACar = async (id) => {
    return await Coffee.findByIdAndDelete(id)

}
const getTop3Cars = async () => {
    const cars = await Coffee.find({}).sort({ price: -1 }).limit(3)
    return cars
}
const addToFavourite = async (userId, carId) => {
    try {
        //Adding car to user
        const user = await User.findById(userId)
        let array = user.favouriteCars;
        array.push(carId)
        console.log(userId)
        console.log(carId)
        await User.findByIdAndUpdate(userId, {favouriteCars: array})
        //Adding user to car
        let car = await Coffee.findById(carId)
        let carArray = car.addedBy
        carArray.push(userId)
        await Coffee.findByIdAndUpdate(carId, {addedBy: carArray})
    } catch (error) {
        throw new Error(error)
    }

}
const getFavouriteCars = async (userId) => {
    return await User.findById(userId).populate('favouriteCars')
}
const removeFromFavourites = async (userId, carId) => {
    try {
        const user = await User.findById(userId);
        let userCarArray = user.favouriteCars
        let userIndex = userCarArray.indexOf(carId);
        userCarArray.splice(userIndex, 1)
        await User.findByIdAndUpdate(userId, {favouriteCars: userCarArray})

        const car = await Coffee.findById(carId);
        let carUserArray = car.addedBy;
        let carUserIndex =carUserArray.indexOf(userId)
        carUserArray.splice(carUserIndex, 1)
        await Coffee.findByIdAndUpdate(carId, {addedBy: carUserArray})
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    removeFromFavourites,
    getFavouriteCars,
    addToFavourite,
    getTop3Cars,
    deleteACar,
    editCar,
    getProfileCars,
    getOneCar,
    getAllCars,
    addCar,
}

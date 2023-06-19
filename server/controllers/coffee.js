const User = require('../models/User');
const { addCoffee, getAllCafes, getOneCoffee, getProfileCafes, editCoffee, deleteCoffee, getTop3Cafes, addToFavourite, getFavouriteCafes, removeFromFavourites } = require('../services/coffee');
const { updateCafesOnUser } = require('../services/user');
const jwtDecode = require('jwt-decode');

const router = require('express').Router();

router.post('/', async (req, res) => {
    const data = req.body.data;
    let token = jwtDecode(data.token);
    try {
        const userId = token._id;
        const coffee = await addCoffee(data, userId);
        await updateCafesOnUser(userId, coffee._id);
        res.status(201).json(coffee);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
    res.end()
})

router.get('/', async (req, res) => {
    const cafes = await getAllCafes();
    res.status(200).json(cafes);
})

router.get('/mycafes', async (req, res) => {
    const _id = req?.user?._id;
    const cafes = await getProfileCafes(_id)
    res.status(200).json(cafes);
    res.end()
})

router.get('/most', async (req, res) => {
    const cafes = await getTop3Cafes();
    res.status(200).json(cafes);
})

router.delete('/favourites/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const caffeeId = req.params.id;
        await removeFromFavourites(userId, caffeeId);
        res.status(200).json('Success');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.get('/favourites/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const caffeeId = req.params.id;
        await addToFavourite(userId, caffeeId);
        res.status(200).json('Success');
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.get('/favourite-cafes', async (req, res) => {
    let userId = req.user._id;
    try {
        let cafes = await getFavouriteCafes(userId);
        res.status(200).json(cafes?.getFavouriteCafes);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const coffee = await getOneCoffee(id);
        if (coffee) {
            res.status(200).json(coffee);
        } else {
            throw new Error('Invalid coffee ID!');
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const coffee = await getOneCoffee(id);
    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        if (userId == coffee.owner._id) {
            await editCoffee(id, data);
            const updatedCoffee = await getOneCoffee(id);
            res.status(200).json(updatedCoffee);
        } else {
            throw new Error('You are not the owner!')
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        const user = await User.findById(userId);
        console.log(user.cafes);
        if (user.cafes.includes(id)) {
            let cafesArray = user.cafes;
            let deletionIndex = cafesArray.indexOf(id)
            cafesArray.splice(deletionIndex, 1)
            await User.findByIdAndUpdate(userId, { cafes: cafesArray })
            await deleteCoffee(req.params.id);
            res.status(200).json('Coffee deleted!');
        } else {
            throw new Error('You are not the owner!')
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;

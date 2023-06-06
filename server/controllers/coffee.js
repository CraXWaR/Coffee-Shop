const User = require('../models/User');
// const cloudinary = require('cloudinary');
// const uploader = require("../services/multer");
const { addCoffee, getAllCafes, getOneCoffee, getProfileCafes, editCoffee, deleteCoffee, getTop3Cafes, addToFavourite, getFavouriteCafes, removeFromFavourites } = require('../services/coffee');
const { updateCafesOnUser } = require('../services/user');
const jwtDecode = require('jwt-decode');

const router = require('express').Router();
// TODO AFTER /, uploader.array('carPhotos')
router.post('/', async (req, res) => {
    // const base64 = req.body.data.base64;
    const data = req.body.data;
    let token = jwtDecode(data.token)
    try {
        // data.caffeeImages = []
        // if (base64?.length > 0) {
        //     for (let el of base64) {
        //         const uploaded = await cloudinary.v2.uploader.upload(el, { fetch_format: "auto" });
        //         let objectToPush =  {
        //             imageUrl: uploaded.url,
        //             imageId: uploaded.public_id,
        //         }
        //         data.carImages.push(objectToPush)
        //     }
        // }
        const userId = token._id;
        const coffee = await addCoffee(data, userId)
        await updateCafesOnUser(userId, coffee._id)
        res.status(201).json(coffee)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    res.end()
})
router.get('/', async (req, res) => {
    const cafes = await getAllCafes()
    res.status(200).json(cafes)
})
router.get('/mycafes', async (req, res) => {
    const _id = req?.user?._id;
    const cafes = await getProfileCafes(_id)
    res.status(200).json(cafes)
    res.end()
})
router.get('/most', async (req, res) => {
    const cafes = await getTop3Cafes()
    res.status(200).json(cafes)
})
router.delete('/favourites/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const caffeeId = req.params.id;
        await removeFromFavourites(userId, caffeeId)
        res.status(200).json('Success')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/favourites/:id', async (req, res) => {
    try {
        const userId = req.user._id;
        const caffeeId = req.params.id;
        await addToFavourite(userId, caffeeId)
        res.status(200).json('Success')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.get('/favourite-cafes', async (req, res) => {
    let userId = req.user._id
    try {
        let cafes = await getFavouriteCafes(userId)
        res.status(200).json(cafes?.getFavouriteCafes)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const coffee = await getOneCoffee(id);
        if (coffee) {
            res.status(200).json(coffee)
        } else {
            throw new Error('Invalid coffee ID!')
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})
// AFTER ID, uploader.array('carPhotos')
router.put('/:id', async (req, res) => {
    console.log('here')
    const id = req.params.id;
    console.log(req.body)
    // const base64 = req.body.base64;
    const data = req.body;

    const coffee = await getOneCoffee(id)
    try {
        data.caffeeImages = []
        if (req?.user._id == coffee.owner._id) {
            // if (base64) {
            //     for (let el of base64) {
            //         const uploaded = await cloudinary.v2.uploader.upload(el, { fetch_format: "auto" });
            //         let objectToPush =  {
            //             imageUrl: uploaded.url,
            //             imageId: uploaded.public_id,
            //         }
            //         data.carImages.push(objectToPush)
            //     }
            // }else {
            //     data.caffeeImages.push(data.imageUrl)
            // }
            await editCoffee(id, data)
            const updatedCoffee = await getOneCoffee(id)
            res.status(200).json(updatedCoffee)
        } else {
            throw new Error('You are not the owner!')
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.delete('/:id', async (req, res) => {
    const user = await User.findById(req.user._id)
    const id = req.params.id;
    if (user.cafes.includes(id)) {
        let cafesArray = user.cafes;
        let deletionIndex = cafesArray.indexOf(id)
        cafesArray.splice(deletionIndex, 1)
        await User.findByIdAndUpdate(req.user._id, { cafes: cafesArray })
        let coffee = await deleteCoffee(id)
        // if (coffee.imageId) {
        //     await cloudinary.v2.uploader.destroy(coffee.imageId)
        // }
        res.status(200).json('Deleted!')
    } else {
        res.status(400).json({ error: 'You are not the owner of the coffee!' })
    }
})

module.exports = router;

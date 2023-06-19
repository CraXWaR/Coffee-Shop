const { register, login, getUnknownUser } = require('../services/user');
const User = require('../models/User');
const router = require('express').Router();
const jwtDecode = require('jwt-decode');

//Authentification routes
router.post('/register', async (req, res) => {
    const data = req.body;
    try {
        const user = await register(data);
        res.cookie("auth", user.accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
    res.end()
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password)
        res.cookie("auth", user.accessToken, { httpOnly: true, sameSite: 'none', secure: true });
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.delete('/logout', async (req, res) => {
    res.cookie("auth", 'none', { httpOnly: true, sameSite: 'none', secure: true });
    res.send({ message: 'Cookie cleared successfully' })
});

router.post('/user', async (req, res) => {
    const data = req.body;
    const token = jwtDecode(data.token);

    try {
        const username = token.username;
        const email = token.email;
        const avatarImg = token.avatarImg;
        const cafes = token.cafes;
        const cart = token.cart
        
        res.status(200).json({ "username": username, "email": email, "avatarImg": avatarImg, "cafes": { cafes }, "cart": { cart } });
        res.end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/user/:id', async (req, res) => {
    const data = req.body;

    try {
        const token = jwtDecode(data.token);
        const userId = token._id;
        await updateUser(userId, data);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

router.get('/user/:owner', async (req, res) => {
    const { owner } = req.params;
    try {
        let user = await getUnknownUser(owner);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
module.exports = router;
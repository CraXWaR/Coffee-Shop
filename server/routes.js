const router = require('express').Router();
const authcontroller = require('./controllers/auth');
const coffeecontroller = require('./controllers/coffee');

router.get('/', (req, res) => {
    res.json('Working properly...');
});

router.use(authcontroller);
router.use('/cafes', coffeecontroller);

module.exports = router;
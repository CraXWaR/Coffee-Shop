const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    make: {
        required: true,
        type: String,
        minlength: [3, 'You should have at least 3 characters!'],
        maxlength: [15, 'You can\'t have more than 15 characters!']
    },
    type: {
        required: true,
        type: String,
        minlength: [2, 'You should have at least 2 characters!'],
        maxlength: [10, 'You can\'t have more than 10 characters!']
    },
    intensity: {
        required: true,
        type: Number,
    },
    description: {
        required: true,
        type: String,
        minlength: [10, 'Description should have at least 10 characters!'],
        maxlength: [500, 'Description can\'t be more than 500 characters!'],

    },
    price: {
        required: true,
        type: Number,
        min: [1, 'Coffee should be more expensive than 1$!'],
        max: [200, 'Coffee can\'t be more expensive than 200 dolars!']
    },
    imageUrl: {
        required: false,
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    addedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const coffee = new mongoose.model('Coffee', coffeeSchema);
module.exports = coffee;
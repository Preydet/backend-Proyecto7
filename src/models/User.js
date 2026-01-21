const mongoose = require('mongoose');
const Cart = require('./Cart');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido'],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        Cart: {
            type: mongoose.Types.ObjectId,
            ref: 'Cart',
            default: []
        },
        country: {
            type: String,
            default: ''
        },
        address: {
            type: String,
            default: ''
        },
        zipcode: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
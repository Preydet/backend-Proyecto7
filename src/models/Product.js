const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        idProd:{
            type: String,
            required: true,
        },
        priceId: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
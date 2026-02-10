const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        idProd:{
            type: String,
            required: true,
        },
        priceID: {
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
                
        img: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },

        categories: {
            type: String,
            required: true,
        },
       
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
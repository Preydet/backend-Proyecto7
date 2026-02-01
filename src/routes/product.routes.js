const express = require('express');
const {createProduct, getAllProducts, updateProductById, deleteProductById} = require('../controllers/product.controller');
const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.post('/', createProduct);// localhost:3000/products
productRouter.put('/:id', updateProductById); // localhost:3000/products/:id
productRouter.delete('/:id', deleteProductById);


module.exports = productRouter;
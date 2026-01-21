const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const isAdmin = require('../middleware/isAdmin');


const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require('../controllers/product.controller');

router.post('/create', auth, isAdmin, createProduct); // Crear producto (solo admin) localhost:3000/products/create
router.get('/readall', getAllProducts); // Listar productos localhost:3000/products/readall
router.get('/readone/:id', getProductById); // Obtener producto por ID localhost:3000/products/readone/:id
router.put('/update/:id', auth, isAdmin, updateProduct); // Actualizar producto (solo admin) localhost:3000/products/update/:id
router.delete('/delete/:id', auth, isAdmin, deleteProduct); // Eliminar producto (solo admin) localhost:3000/products/delete/:id

module.exports = router;
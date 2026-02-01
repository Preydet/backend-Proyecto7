const express = require('express');
const auth = require('../middleware/authorization');
const { createCheckoutSession, getCart, editCart } = require('../controllers/cart.controller');

const router = express.Router();

router.post('/create-checkout-session', auth, createCheckoutSession); // localhost:3000/cart/create-checkout-session
router.get('/get-cart', auth, getCart); // localhost:3000/cart/get-cart
router.put('/edit-cart', auth, editCart); // localhost:3000/cart/edit-cart

module.exports = router;


const Cart = require('../models/Cart')
const User = require('../models/User')

const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
    const userId = req.user.id;
    const foundUser = await User.findOne({ _id: userId });
    const foundCart = await Cart.findById(foundUser.cart).populate({
        path: 'products',    
    })

    const line_items = foundCart.products.map((product) => {
        return {
            price: product.priceID,
            quantity: product.quantity,
        }
    })

    console.log('line items', line_items);

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        success_url: `${process.env.STRIPE_SUCCESS_URL}`,
        cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
        customer_email: foundUser.email,
    })
    
    res.json({
        session_url: session.url,
        session
    });
    }   catch (error) {
        console.error('Error Stripe:', error);
        res.status(400).json({
            message: 'Hubo un error al crear la sesión de stripe',
            error: error.raw ? error.raw.message : error.message
        })
        }
    }


exports.getCart = async (req, res) => {
    const userId = req.user.id;
    const foundUser = await User.findOne({ _id: userId });
    const foundCart = await Cart.findOne({ _id: foundUser.cart });
    res.json({
        cart: foundCart
    })

}

exports.editCart = async (req, res) => {
    const userId = req.user.id;
    const foundUser = await User.findOne({ _id: userId });
    const { products } = req.body;
    const updatedCart = await Cart.findByIdAndUpdate(
        foundUser.cart,
        { products },
        { new: true }
    );
    res.json({
        msg: 'Carrito actualizado correctamente',
        cart: updatedCart
    })
}


  


const Product = require('../models/Product');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({
             message: 'Hubo un error al obtener los productos',
              error: error.message 
            })
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, img, currency, slug } = req.body;
        const product = await stripe.products.create({
            name,
            description,
            images: [img],
            metadata: {
                productDescription: description,
                slug
            }
        });
    
        const stripePrice = await stripe.prices.create({
            unit_amount: price,
            currency,
            product: product.id,
        });

        const newProduct = await Product.create({
            idProd: product.id,
            priceID: stripePrice.id,
            name,
            price,
            description,
            img,
            currency,
            slug
        });

        if (!newProduct) { return res.status(400).json({ 
            message: 'No se pudo crear el producto' }); }
            return res.status(201).json({ datos : newProduct });
    } catch (error) {
        res.status(500).json({ 
            message: 'Hubo un error al crear el producto',
            error: error.message 
        });
    }
}

    exports.updateProductById = async (req, res) => {
        try {
                const updateProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            )
            if (!updateProduct) { return res.status(404).json({ 
                message: 'Producto no encontrado' });
            }
            return res.status(200).json({ productoActualizado: updateProduct });
        } catch (error) {
           return res.status(500).json({ 
                message: 'Hubo un error al actualizar el producto',
                error: error.message 
            })
        }
    }


exports.deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) { 
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 
            message: 'Hubo un error al eliminar el producto',
            error: error.message 
        });
    }
}



        
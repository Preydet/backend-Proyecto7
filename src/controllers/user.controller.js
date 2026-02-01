const User = require ('../models/User');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => { 
    const { username, email, password} = req.body;
    try {
        let foundUser = await User.findOne({ email });
        if (foundUser) return res.status(400).json({ msg: 'El usuario ya existe' });

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newCart = await Cart.create({ });

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            cart: newCart
        });

        if (!newUser) return res.status(400).json({ msg: 'No se puedo registrar el usuario' });

        return res.status(201).json({ datos: newUser });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al registrar el usuario',
            error: error.message
        })
    }   
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) return res.status(400).json({ msg: 'El usuario no existe en el sistema' });

        const correctPassword = await bcryptjs.compare(password, foundUser.password);

        if (!correctPassword) return res.status(400).json({ msg: 'El email o la password no corresponde' });

        const payload = {
            user: {
                id: foundUser.id 
            }
        }

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token });
            }
        )
    } catch (error) {
        res.json({
            message: 'Hubo un error al obtener el token',
            error
        })
    }
}
 
exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al verificar el usuario',
            error
        })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { username, email } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { Username, email, password: hashedPassword },
            { new: true, runValidators: true }
        )
        if (!updatedUser) return res.status(400).json({ msg: 'usuario no encontardo' });
        return res.status(200).json({ usarioActualizado: updatedUser });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al actualizar el usuario',
            error: error.message
        })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) return res.status(400).json({ msg: 'usuario no encontardo' });
        return res.status(200).json({ msg: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al eliminar el usuario',
            error: error.message
        })
    }
}

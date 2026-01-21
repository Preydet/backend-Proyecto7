const User = require ('../models/User');
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

exports.createUser = async (req, res) => { const { username, email, password, role } = req.body;
    try {
        //Validar que el email tenga formato correcto

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'El email no tiene un formato válido' });
        }
        //Verificar si el usuario ya existe

        let foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(400).json({ message: 'El usuario ya existe en el sistema' });
        }
        //Determinar rol
        let finalRole = 'user';
        if (role === 'admin') {
            const anyAdminExists = await User.exists({ role: 'admin' });
            if (!anyAdminExists) {
                finalRole = 'admin';
            } else {
                if (!req.user || req.user.role !== 'admin') {
                    return res.status(403).json({ message: 'Solo un administrador puede crear otro administrador' });
                }
                finalRole = 'admin';
            }
        }      
            
        
        //Hashear la contraseña

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        //Crear el usuario

        const newCart = await Cart.create({});
        const newUser = await User.create({ username, email, password: hashedPassword, role: finalRole, Cart: newCart });
        if (!newUser) return res.status(400).json({ message: 'No se pudo crear el usuario' });
        return res.status(201).json({ datos: newUser });
    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error al registrar el usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let foundUser = await User.findOne({ email: email.toLowerCase() });
        if (!foundUser)  return res.status(400).json({ message: 'El usuario no existe en el sistema' });

        const correctPassword = await bcryptjs.compare(password, foundUser.password);

        if (!correctPassword)  return res.status(400).json({ message: 'El email o la password no corresponden' });
        
        const payload = { 
            user: {
                id: foundUser._id,
                role: foundUser.role
            }
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            },
            (error, token) => {
                if (error) {
                    return res.status(500).json({ message: 'Hubo un error al generar el token', error: error.message });
                }
            return res.json({ token });
            }
        );
    } catch (error) {
        res.json({ message: 'Hubo un error al obtener el token', error})
        }
};

exports.verifyUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al verificar el usuario', error })
    }
};

exports.updateUserById = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Si el usuarrio no es administrador, solo puede editarse a sí mismo
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Acceso denegado: no puedes editar otros usuarios' });
        }
        let hashedPassword;
        if (password) {            
        const salt = await bcryptjs.genSalt(10);
        hashedPassword = await bcryptjs.hash(password, salt);
        }

        const updateData = { 
            username,
            email,
            ...(password && { password: hashedPassword })
        };
        
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        )

        if (!updateUser) return res.status(404).json({ message: 'Usuario no encontrado' });

        return res.status(200).json({ usuarioActualizado: updateUser });

    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al actualizar el usuario', error })  
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        // Solo admin puede borrar a otros usuarios
        if (req.user.role !== 'admin') {
            //Pero el usuario puede borrarse a sí mismo
            if (req.user.id !== req.params.id) {
                return res.status(403).json({ message: 'Acceso denegado: no puedes eliminar otros usuarios' });
            }
        }
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el usuario', error })  
    }
};
                    

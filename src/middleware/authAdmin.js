const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return next(); // Sin token seguimos (para crear primer admin)
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Si hay token válido, añadimos req.user

    } catch (err) {
        res.status(401).json({ message: 'Acceso no autorizado' });

    }

    next();
};
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Acceso no autorizado' });

    try {
        let [ type, token ] = authorization.split(' ');

        if (type === 'Token' || type === 'Bearer') {
            const oppenToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log('contenido del token:', oppenToken);
            req.user = oppenToken.user;
            next();
        } else {
            return res.status(401).json({ message: 'Acceso no autorizado' });
        }
    } catch (error) {
        res.json({ message: 'Hubo un error', error });
    }
}
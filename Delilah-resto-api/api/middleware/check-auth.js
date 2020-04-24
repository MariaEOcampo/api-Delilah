const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;

        
        if(req.router != 'GET'){
            if(decoded.role == 'admin') 
        next();
            else res.status(403).send({message: 'No tienes los permisos suficientes para estar aquí...'});}
            return;
            next();

    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
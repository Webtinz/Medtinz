const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Le jeton doit être envoyé dans le header Authorization
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilisez votre clé secrète JWT
        req.user = decoded; // Ajoutez les données du token à l'objet req pour un accès ultérieur
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.', error: error.message });
    }
};

module.exports = authMiddleware;

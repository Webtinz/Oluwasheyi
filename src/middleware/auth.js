const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète'; // Remplacez par votre clé secrète réelle

// Middleware pour vérifier le token
const authMiddleware = (req, res, next) => {
    // Récupérer le token du header 'Authorization'
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }

    // Vérifier le token JWT
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        // Attacher l'utilisateur décodé à la requête
        req.user = decoded;
        next();
    });
};

const isAuthenticated = (req, res, next) => {
    if (req.session?.user) return next();
    // alert('Vous devez être connecté pour accéder à cette page.');
    return res.redirect('/backoffice/login');
};

const redirectToDashboard = (req, res, next) => {
    if (req.session?.user) {
        return res.redirect('/backoffice/listcontents');
    }
    next();
}


module.exports = {authMiddleware, isAuthenticated, redirectToDashboard};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Données reçues:', email, password); // Log des données envoyées par le frontend

    try {
        // Vérifier si l'utilisateur existe
        console.log(User);  // Ajoute ce log pour vérifier si User est défini
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Mot de passe incorrect');
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        // // Générer un token JWT
        // const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // console.log('Authentification réussie, token généré');
        // res.json({ message: 'Authentification réussie', token });

        // ✅ Store session
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        res.status(200).json({ message: 'Authentification réussie', user: req.session.user });
    } catch (err) {
        console.error('Erreur serveur:', err);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Déconnexion réussie" });
    });
};

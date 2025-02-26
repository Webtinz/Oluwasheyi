const { Sequelize } = require('sequelize');

// Créer la connexion à la base de données avec Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Utilisateur de la base de données
  process.env.DB_PASS, // Mot de passe de la base de données
  {
    host: process.env.DB_HOST, // Hôte de la base de données
    dialect: 'mysql', // Type de base de données
    logging: false, // Désactiver les logs SQL dans la console
    dialectOptions: {
      multipleStatements: true, // Enable multiple statements
    },
  }
);
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(err => console.error('Impossible de se connecter à la base de données:', err));
module.exports = sequelize;

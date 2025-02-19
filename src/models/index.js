// src/models/index.js
const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importation de ton modèle Testimonial
const Testimonial = require('./Testimonial')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);


// Exportation des modèles pour les utiliser dans toute l'application
module.exports = {
  sequelize,
  Testimonial,
  User
};

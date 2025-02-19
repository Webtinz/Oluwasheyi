'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hacher le mot de passe avant de l'insérer
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Insertion d'un utilisateur avec des données fictives
    await queryInterface.bulkInsert('Users', [{
      email: 'bokosemia@gmail.com',
      password: hashedPassword, // Utilise le mot de passe haché
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Suppression de l'utilisateur inséré dans la méthode up
    await queryInterface.bulkDelete('Users', null, {});
  }
};

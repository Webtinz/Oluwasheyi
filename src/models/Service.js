// src/models/Testimonial.js
module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING, // Nous allons stocker le nom du fichier image
        allowNull: true,
      },
    });
  
    return Service;
  };
  
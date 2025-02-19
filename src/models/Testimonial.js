// src/models/Testimonial.js
module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define('Testimonial', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING, // Nous allons stocker le nom du fichier image
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });

  return Testimonial;
};

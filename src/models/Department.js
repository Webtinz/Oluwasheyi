// src/models/Testimonial.js
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT, // Nous allons stocker le nom du fichier image
      allowNull: true,
    },
  });

  return Department;
};

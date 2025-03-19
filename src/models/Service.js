// src/models/Testimonial.js
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
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
    smallPhoto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    bigPhoto: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Service;
};

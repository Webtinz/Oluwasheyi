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
    photos: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue("photos"));
      },
      set(value) {
        this.setDataValue("photos", JSON.stringify(value));
      },
    },
  });

  return Service;
};

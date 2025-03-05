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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description_en: {
      type: DataTypes.TEXT,
      allowNull: false,
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

  return Department;
};

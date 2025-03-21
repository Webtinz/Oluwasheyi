// src/models/Suscriber.js
module.exports = (sequelize, DataTypes) => {
  const Suscriber = sequelize.define('Suscriber', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Suscriber;
};

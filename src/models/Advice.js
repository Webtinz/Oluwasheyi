// src/models/Advice.js
module.exports = (sequelize, DataTypes) => {
  const Advice = sequelize.define('Advice', {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    advice_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  return Advice;
};

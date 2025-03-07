// src/models/Advice.js
module.exports = (sequelize, DataTypes) => {
  const Advice = sequelize.define('Advice', {
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    advice_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    advice_text_en: {
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

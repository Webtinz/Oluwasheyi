// src/models/Content.js
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content_en: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content_fr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Content;
};


// src/models/InterestedUser.js
module.exports = (sequelize, DataTypes) => {
  const InterestedUser = sequelize.define('InterestedUser', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Events",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

  });

  InterestedUser.associate = (models) => {
    InterestedUser.belongsTo(models.Event, {
      foreignKey: "eventId",
      as: "event",
    });
  };

  return InterestedUser;
};

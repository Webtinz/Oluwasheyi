
// src/models/Donation.js
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["once", "monthly"]], 
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    medicalProgramId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "MedicalPrograms",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  Donation.associate = (models) => {
    Donation.belongsTo(models.MedicalProgram, {
      foreignKey: "medicalProgramId",
      as: "medicalProgram",
    });
  };

  return Donation;
};

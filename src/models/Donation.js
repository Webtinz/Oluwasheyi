
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
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["momo", "paypal"]],
      },
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["pending", "completed", "failed"]],
      },
      defaultValue: 'pending'
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
    //MTN Momo
    referenceId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    externalId: {
      type: DataTypes.STRING,
    },
    payerMessage: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    //Paypal
    paypalOrderId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true
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

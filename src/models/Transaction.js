// src/models/Transaction.js
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      referenceId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [[
            'PENDING',
            'PROCESSING',
            'SUCCESSFUL',
            'FAILED',
            'TIMEOUT']], 
        },
      },
      externalId: {
        type: DataTypes.STRING, 
      },
      payerMessage: {
        type: DataTypes.STRING,
      }
    });
  
    return Transaction;
  };
  
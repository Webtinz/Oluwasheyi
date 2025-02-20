module.exports = (sequelize, DataTypes) => {
    const MedicalProgram = sequelize.define('MedicalProgram', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      beneficiaries: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
      },
    });
  
    return MedicalProgram;
  };
  
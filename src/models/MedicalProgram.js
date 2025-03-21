module.exports = (sequelize, DataTypes) => {
    const MedicalProgram = sequelize.define('MedicalProgram', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nom: {
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
      description_en: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      beneficiaries: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      photo: {
        type: DataTypes.TEXT,
      },
      color: {
        type: DataTypes.STRING,
      },
    });

    MedicalProgram.associate = (models) => {  
      MedicalProgram.hasMany(models.Donation, {
        foreignKey: "medicalProgramId",
        as: "donations",
      });
    };
  
    return MedicalProgram;
  };
  
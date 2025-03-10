// src/models/Content.js
module.exports = (sequelize, DataTypes) => {
    const Patientappointment = sequelize.define('Patientappointment', {
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Patientappointment;
};

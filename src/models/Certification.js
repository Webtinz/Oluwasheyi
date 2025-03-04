module.exports = (sequelize, DataTypes) => {
    const Certification = sequelize.define('Certification', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_obtention: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });

    return Certification;
};

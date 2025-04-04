module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description_fr: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description_en: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return History;
};

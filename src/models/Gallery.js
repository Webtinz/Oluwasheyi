module.exports = (sequelize, DataTypes) => {
    const Gallery = sequelize.define('Gallery', {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        photo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    return Gallery;
};

module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('Feedback', {
        name: {
            type: DataTypes.STRING, // Limite de 100 caractères
            allowNull: false
        },
        email: {
            type: DataTypes.STRING, // Limite de 150 caractères
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        yoursuggestions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        timestamps: true, // Ajoute createdAt et updatedAt
    });

    return Feedback;
};

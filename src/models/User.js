module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Si tu veux que l'email soit unique
      validate: {
        isEmail: true, // Validation de l'email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return User;
};

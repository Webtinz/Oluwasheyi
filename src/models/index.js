const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Import models
const Feedback = require("./Feedback")(sequelize, DataTypes);
const Testimonial = require("./Testimonial")(sequelize, DataTypes);
const TeamMember = require("./TeamMember")(sequelize, DataTypes);
const User = require("./User")(sequelize, DataTypes);
const Content = require("./Content")(sequelize, DataTypes);
const Service = require("./Service")(sequelize, DataTypes);
const MedicalProgram = require("./MedicalProgram")(sequelize, DataTypes);
const Donation = require("./Donation")(sequelize, DataTypes);
const Certification = require("./Certification")(sequelize, DataTypes);
const Event = require("./Event")(sequelize, DataTypes);
const Advice = require("./Advice")(sequelize, DataTypes);


const models = {
  sequelize,
  Testimonial,
  Content,
  User,
  Service,
  Donation,
  MedicalProgram,
  Certification,
  Event,
  Advice,
  TeamMember,
  Feedback
};

// **Define associations**
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Export models
module.exports = models;

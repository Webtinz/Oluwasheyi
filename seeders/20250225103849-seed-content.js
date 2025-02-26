'use strict';
const fs = require("fs");
const path = require("path");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const contentsPath = path.join(__dirname, "../data/contents.json");
    const contents = JSON.parse(fs.readFileSync(contentsPath, "utf8"));

    return queryInterface.bulkInsert("contents", contents, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("contents", null, {});
  }
};

"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "bookings", // table name
      "status", // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Upcoming",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("bookings", "status");
  },
};

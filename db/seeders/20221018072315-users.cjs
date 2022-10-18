"use strict";
/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          auth_key: uuidv4(),
          wallet: 230,
          username: "Tester 1",
          email: "tester1@tester.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          auth_key: uuidv4(),
          email: "tester1@tester.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          auth_key: uuidv4(),
          username: "Tester 3",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

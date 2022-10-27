"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "auth0|635aa9ec7433f4b1336d6657",
          wallet: 230,
          username: "Tester 1",
          email: "tester1@tester.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "auth0|tester2",
          email: "tester2@tester.com",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "auth0|tester3",
          username: "Tester 3",
          email: "tester3@tester.com",
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

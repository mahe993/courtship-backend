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
          email: "admin@a.com",
          phone_number: "98761234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "auth0|tester2",
          email: "tester2@tester.com",
          phone_number: "87655678",
          wallet: 0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: "auth0|tester3",
          username: "Tester 3",
          email: "tester3@tester.com",
          wallet: 0,
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

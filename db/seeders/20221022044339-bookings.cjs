"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "bookings",
      [
        {
          booking_number: "3-2022-10-22-6",
          user_id: 2,
          court_id: 3,
          time: 6,
          date: new Date(2022, 10, 22),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          booking_number: "3-2022-10-23-6",
          user_id: 2,
          court_id: 3,
          time: 6,
          date: new Date(2022, 10, 23),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          booking_number: "3-2022-10-25-6",
          user_id: 1,
          court_id: 3,
          time: 6,
          date: new Date(2022, 10, 23),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("bookings", null, {});
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "bookings",
      [
        {
          id: 1,
          booking_number: "3-2022-11-01-12",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 1,
          timeslot: 12,
          date: "2022-11-01",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          booking_number: "3-2022-11-03-10",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 3,
          timeslot: 10,
          date: "2022-11-03",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          booking_number: "3-2022-10-25-20",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 1,
          timeslot: 20,
          date: "2022-10-25",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          booking_number: "3-2022-10-25-16",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 2,
          timeslot: 16,
          date: "2022-10-25",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 5,
          booking_number: "3-2022-11-05-16",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 3,
          timeslot: 16,
          date: "2022-11-05",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 6,
          booking_number: "3-2022-11-05-20",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 3,
          timeslot: 20,
          date: "2022-11-05",
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

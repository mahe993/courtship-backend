"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "reviews",
      [
        {
          review_code: "auth0|635aa9ec7433f4b1336d6657-1",
          ratings: 4,
          experience: "Its a rather good court!",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 1,
          booking_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          review_code: "auth0|635aa9ec7433f4b1336d6657-3",
          ratings: 5,
          experience: "Its a very good court with a courteous host!",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 1,
          booking_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          review_code: "auth0|635aa9ec7433f4b1336d6657-4",
          ratings: 2,
          experience:
            "Clealiness is not up to expected. Difficult to find the court",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 2,
          booking_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          review_code: "auth0|635aa9ec7433f4b1336d6657-5",
          ratings: 1,
          experience:
            "Its a horrible court! Do not book. Book at your own risk!!!",
          user_id: "auth0|635aa9ec7433f4b1336d6657",
          court_id: 3,
          booking_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("reviews", null, {});
  },
};

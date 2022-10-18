"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "courts",
      [
        {
          court_name: "New Court",
          address: "Greenwich drive, 123, #02-003-13, Singapore 123456",
          description:
            "Private court along greenwich drive. Vacation home so you have it all to yourself. Instructions upon payment.",
          price: 30,
          //url data example: [{firebasePath: "images/courtPic1.jpg", imageUrl: "getdownloadURL.com"}, {...}]
          picture_url: JSON.stringify([
            {
              firebasePath: "seeder/court1.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt1.jpg?alt=media&token=d4d8fe47-b7b7-433f-9a2e-241c11245b23",
            },
            {
              firebasePath: "seeder/court2.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt2.jpg?alt=media&token=d7c2401d-b73a-4af1-9767-a84c83bd0444",
            },
          ]),
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          court_name: "Old Court",
          address:
            "156 Google Road, Tennis Building, #10-234, Singapore 123456",
          description: "Court at google HQ",
          price: 50,
          //url data example: [{firebasePath: "images/courtPic1.jpg", imageUrl: "getdownloadURL.com"}, {...}]
          picture_url: JSON.stringify([
            {
              firebasePath: "seeder/court3.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt3.jpg?alt=media&token=a68beb0a-67c5-4d5c-8042-37489daeb513",
            },
          ]),
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          court_name: "Nadal Clay",
          address: "23 Claymore lane, Nadal Academy, #9-887, Singapore 987654",
          description: "Nadal Academy clay court",
          price: 25,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          court_name: "5 courts",
          address:
            "5 Court alley, maximum court suites, #99-99, Singapore 999999",
          description: "This has 5 court pictures",
          picture_url: JSON.stringify([
            {
              firebasePath: "seeder/court1.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt1.jpg?alt=media&token=d4d8fe47-b7b7-433f-9a2e-241c11245b23",
            },
            {
              firebasePath: "seeder/court2.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt2.jpg?alt=media&token=d7c2401d-b73a-4af1-9767-a84c83bd0444",
            },
            {
              firebasePath: "seeder/court3.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt3.jpg?alt=media&token=a68beb0a-67c5-4d5c-8042-37489daeb513",
            },
            {
              firebasePath: "seeder/court4.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt4.jpg?alt=media&token=3c38ceaf-24bc-4bbe-b13e-e2db54c5362c",
            },
            {
              firebasePath: "seeder/court5.jpg",
              url: "https://firebasestorage.googleapis.com/v0/b/courtship-firebase.appspot.com/o/seeder%2Fcourt5.jpg?alt=media&token=aff033c8-9eda-42c7-ba3c-4f7fc56fb72e",
            },
          ]),
          price: 99,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("courts", null, {});
  },
};

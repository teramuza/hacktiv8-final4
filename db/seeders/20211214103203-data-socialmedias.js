'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let arr = [
      {
        name: "Lestari",
        social_media_url: "https://www.instagram.com/lestari",
        userid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Raka",
        social_media_url: "https://www.instagram.com/raka",
        userid: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Zhafira",
        social_media_url: "https://www.instagram.com/zhafira",
        userid: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Izhar",
        social_media_url: "https://www.instagram.com/izhar",
        userid: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Saman",
        social_media_url: "https://www.instagram.com/saman",
        userid: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert("SocialMedia", arr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("SocialMedia", null);
  }
};

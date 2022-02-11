'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let arr = [
      {
        title: "Holiday",
        caption: "Holiday time!",
        poster_image_url: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/pantai-dreamland-di-bali_20160502_133703.jpg",
        userid: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Muncak",
        caption: "Senja di atas gunung",
        poster_image_url: "https://petualang.travelingyuk.com/unggah/2019/04/puncak_17_9012.jpg",
        userid: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Pinus",
        caption: "Holiday Vibes!",
        poster_image_url: "https://assets-a1.kompasiana.com/items/album/2018/06/04/gbr-1-5b14d724f133445c3b70c382.jpg",
        userid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Staycation",
        caption: "Good vibes!",
        poster_image_url: "https://img.okezone.com/content/2019/01/20/406/2006892/10-tempat-instagramable-di-dunia-indonesia-nomor-4-vBDJtVZ0J7.jpg",
        userid: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Taman bunga",
        caption: "Love from sun",
        poster_image_url: "https://cdn-image.hipwee.com/wp-content/uploads/2018/02/hipwee-27881025_218686712013021_8391544185672433664_n-768x938-750x916.jpg",
        userid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert("Photos", arr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Photos", null);
  }
};

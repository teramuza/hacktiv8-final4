'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let arr = [
      {
        userid: 1,
        photoid: 1,
        comment: "Pantai mana tuh ?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 2,
        photoid: 1,
        comment: "Pemandangannya sabi bat",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 4,
        photoid: 1,
        comment: "Yoi, sinilah nyusul",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 3,
        photoid: 2,
        comment: "Ajak-ajak aku ya kalo muncak lagi",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 5,
        photoid: 2,
        comment: "Kuy mau ikut gk bulan depan ke gede ?",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 3,
        photoid: 3,
        comment: "Ih lucu banget tempatnya",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 4,
        photoid: 4,
        comment: "Horang kaya liburannya dihotel mulu",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userid: 5,
        photoid: 5,
        comment: "Ada yang bersinar, tapi bukan cahaya",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert("Comments", arr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null);
  }
};

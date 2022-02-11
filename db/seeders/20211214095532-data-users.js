'use strict';
const { hashPassword } = require("../../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let arr = [
      {
        full_name: "Lestari",
        email: "lestari@gmail.com",
        username: "lestari",
        password: hashPassword("lestari123"),
        profile_image_url: "https://cdn.kibrispdr.org/data/gambar-profil-kartun-0.jpg",
        age: 21,
        phone_number: "08959585952",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        full_name: "Raka Aditya",
        email: "rakaaditya@gmail.com",
        username: "raka",
        password: hashPassword("raka123"),
        profile_image_url: "https://i.pinimg.com/originals/c5/57/73/c557738a37e27cf78e07a0f3a5bccb15.png",
        age: 21,
        phone_number: "087775889204",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        full_name: "Zhafira Hajar",
        email: "zhafira@gmail.com",
        username: "zhafira",
        password: hashPassword("zhafira123"),
        profile_image_url: "https://www.kibrispdr.org/data/gambar-profil-kartun-3.jpg",
        age: 21,
        phone_number: "081299875826",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        full_name: "Izhar Mayranda",
        email: "izhar@gmail.com",
        username: "izhar",
        password: hashPassword("izhar123"),
        profile_image_url: "https://www.pinclipart.com/picdir/big/578-5780354_foto-profil-gambar-animasi-creator-clipart.png",
        age: 21,
        phone_number: "08959585952",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        full_name: "Saman Supriadi",
        email: "saman@gmail.com",
        username: "saman",
        password: hashPassword("saman123"),
        profile_image_url: "https://www.kibrispdr.org/dwn/1/gambar-animasi-bayi-gambar-animasi-faceq.jpg",
        age: 21,
        phone_number: "085619971205",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert("Users", arr);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null);
  }
};

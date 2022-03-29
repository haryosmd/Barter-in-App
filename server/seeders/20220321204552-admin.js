"use strict";
const { hashPassword } = require("../helpers/bcrypt");
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
      "Users",
      [
        {
          username: "Josua",
          email: "joshsudarso19@gmail.com",
          password: hashPassword("smio28934ng02m"),
          role: "Customer",
          address: "-",
          photoUrl:
            "https://lh3.googleusercontent.com/a-/AOh14GjGE3SGRcmbC9-sw7I-FsagqXaQ-JKmDO1zXbNB=s360-p-rw-no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Arya",
          email: "aryawdy16@gmail.com",
          password: hashPassword("smio28934ng02m"),
          role: "Customer",
          address: "-",
          photoUrl:
            "https://lh3.googleusercontent.com/a-/AOh14GggQkL7YgD5mIDSNzppGS-eUJ8XuF-kKYIqWheCzw=s288-p-no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Glenn",
          email: "leonardusglenn@gmail.com",
          password: hashPassword("smio28934ng02m"),
          role: "Customer",
          address: "-",
          photoUrl:
            "https://lh3.googleusercontent.com/a-/AOh14Ghk6sYfnFNnqN4FzzYbv-OTjV8hNe5Uj4RuJW-z0A=s317-p-rw-no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Haryo",
          email: "haryo.davinci@gmail.com",
          password: hashPassword("smio28934ng02m"),
          role: "Customer",
          address: "-",
          photoUrl:
            "https://lh3.googleusercontent.com/a-/AOh14Ghz9bG70Q71Z_ELAuknjAufZj5ynDAMQqpb3WoU=s288-p-rw-no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Johanes",
          email: "joshuasaymet@gmail.com",
          password: hashPassword("kdor02jmc9w39"),
          role: "Customer",
          address: "-",
          photoUrl:
            "https://lh3.googleusercontent.com/a-/AOh14GhGIcClcRKKohJGZeUuZSyrnYAxbkmx_-9yze8Tdg=s360-p-rw-no",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Jamora",
          email: "joshsmtpng19@gmail.com",
          password: hashPassword("kdor02jmc9w39"),
          role: "Customer",
          address: "-",
          photoUrl:
            "https://lh3.googleusercontent.com/a/AATXAJydj59IhgiJK5_8xgDsWZhZl1CBPqp2Xj22C-Bh=s360-p-rw-no-mo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Bimo",
          email: "bimoarta@gmail.com",
          password: hashPassword("bimo123bimo"),
          address: "-",
          role: "Admin",
          photoUrl: "-",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};

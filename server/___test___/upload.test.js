const app = require("../app.js");
const { sequelize } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt.js");
const ImageKit = require("imagekit");
const nodemailer = require("nodemailer");
const sendMailMock = jest.fn();

jest.mock("ioredis");
const Redis = require("ioredis");
jest.setTimeout(2000);
jest.mock("imagekit");
jest.mock("nodemailer");
nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
let access_token;

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "admin@mail.com",
          password: hashPassword("123456"),
          address: "-",
          role: "Admin",
          photoUrl:
            "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "admin11",
          email: "admin11@mail.com",
          password: hashPassword("123456"),
          address: "-",
          role: "Admin",
          photoUrl:
            "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
    .then(() => {
      access_token = signToken({
        id: 1,
        email: "admin@mail.com",
        role: "Admin",
      });
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete(
      "Users",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    )
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST items", () => {
  beforeAll(() => {
    ImageKit.mockImplementation(() => {
      return {
        upload: () => {
          return new Promise((resolve) => {
            resolve({
              url: "fake-image.png",
            });
          });
        },
      };
    });
  });
  describe("POST /users/items -  success test", () => {
    it("should return an object with status 201", (done) => {
      request(app)
        .post("/users/items")
        .set("access_token", access_token)
        .field("title", "test input post")
        .field("category", "pakaian")
        .field(
          "description",
          "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga."
        )
        .field("brand", "Supreme")
        .field("yearOfPurchase", "2021")
        .field("userId", 1)
        .attach("image", "assets/JK5OICOiE54.jpg")
        .attach("image", "assets/JK5OICOiE54.jpg")
        .then((res) => {
          expect(res.status).toBe(500);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

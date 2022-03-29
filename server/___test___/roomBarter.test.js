const app = require("../app");
const { sequelize } = require("../models");
const request = require("supertest");
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

jest.mock("ioredis");
const Redis = require("ioredis");
jest.setTimeout(2000);

let access_token;
let access_token2;

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Users",
      [
        {
          username: "admin",
          email: "customer.1@mail.com",
          password: hashPassword("123456"),
          address: "-",
          role: "Customer",
          photoUrl:
            "https://www.pngitem.com/pimgs/m/581-5813504_avatar-dummy-png-transparent-png.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "admin11",
          email: "customer.2@mail.com",
          password: hashPassword("123456"),
          address: "-",
          role: "Customer",
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
        email: "customer.1@mail.com",
        role: "Customer",
      });

      access_token2 = signToken({
        id: 2,
        email: "customer.2@mail.com",
        role: "Customer",
      });
      return queryInterface.bulkInsert(
        "Items",
        [
          {
            title: "test",
            description:
              "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
            category: "pakaian",
            brand: "H&M",
            statusBarter: false,
            yearOfPurchase: "2021",
            statusPost: "Review",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
          },
          {
            title: "test",
            description:
              "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
            category: "pakaian",
            brand: "H&M",
            statusBarter: false,
            yearOfPurchase: "2021",
            statusPost: "Review",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
          },
        ],
        {}
      );
    })
    .then(() => {
      return queryInterface.bulkInsert(
        "Images",
        [
          {
            itemId: 1,
            imageUrl:
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442839/item/goods_00_442839.jpg?width=1600&impolicy=quality_75",
            tag: "test-input",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            itemId: 1,
            imageUrl:
              "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/442839/sub/goods_442839_sub18.jpg?width=1600&impolicy=quality_75",
            tag: "test-input",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    })
    .then(() => {
      return queryInterface.bulkInsert(
        "RoomBarters",
        [
          {
            user1: 1,
            user2: 2,
            item1: 1,
            item2: 2,
            status1: false,
            status2: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete(
      "RoomBarters",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    )
    .then(() => {
      return queryInterface.bulkDelete(
        "Images",
        {},
        {
          truncate: true,
          restartIdentity: true,
          cascade: true,
        }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "Items",
        {},
        {
          truncate: true,
          restartIdentity: true,
          cascade: true,
        }
      );
    })
    .then(() => {
      return queryInterface.bulkDelete(
        "Users",
        {},
        {
          truncate: true,
          restartIdentity: true,
          cascade: true,
        }
      );
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

//GET RoomBarter
describe("GET RoomBarters", () => {
  describe("GET /roomBarter - success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .get("/users/roomBarter")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          // expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /roomBarter -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .get("/users/roomBarter")
        .then((res) => {
          expect(res.status).toBe(401);
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

//POST RoomBarter
describe("POST RoomBarters", () => {
  describe("POST /roomBarter - success test", () => {
    let payload = {
      user2: 2,
      item1: 1,
      item2: 2,
    };
    it("should return an object with status 200", (done) => {
      request(app)
        .post("/users/roomBarter")
        .set("access_token", access_token)
        .send(payload)
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          // expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /roomBarter -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .post("/users/roomBarter")
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /roomBarter -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .post("/users/roomBarter")
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST /roomBarter - failed test", () => {
    let payload = {
      user2: 2,
      item1: "",
      item2: "",
    };
    it("should return an object with status 400 - validation error", (done) => {
      request(app)
        .post("/users/roomBarter")
        .set("access_token", access_token)
        .send(payload)
        .then((res) => {
          expect(res.status).toBe(400);
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

//PATCH RoomBarter
describe("PATCH RoomBarters", () => {
  describe("PATCH room-barters/:id - success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .patch("/users/roomBarter/1")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH room-barters/:id - success test", () => {
    it("should return an object with status 200", (done) => {
      request(app)
        .patch("/users/roomBarter/1")
        .set("access_token", access_token2)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH /items/:id -  failed test", () => {
    it("should return an object with status 401 - input without access_token as headers", (done) => {
      request(app)
        .patch("/users/roomBarter/1")
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return an object with status 404 - item not found", (done) => {
      request(app)
        .patch("/users/roomBarter/100")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(404);
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

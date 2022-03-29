const app = require("../app.js");
const { Item, RoomBarter } = require("../models");
const { sequelize } = require("../models");
const request = require("supertest");
const { signToken } = require("../helpers/jwt.js");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

jest.mock("ioredis");
const Redis = require("ioredis");
jest.setTimeout(2000);
let access_token;
jest.mock("../helpers/uploadFile");
const uploadFile = require("../helpers/uploadFile");

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      "Users",
      [
        {
          username: "admin12",
          email: "admin12@mail.com",
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
      "Users",
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    )
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
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET Error", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("GET /users/items -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/items")
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

  describe("GET /users/items/homes -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/items/homes")
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

  describe("GET /users/myads -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/myads")
        .set("access_token", access_token)
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

  describe("GET /users/items-barters -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/items-barters")
        .set("access_token", access_token)
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

  describe("GET /users/roomBarter -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(RoomBarter, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/users/roomBarter")
        .set("access_token", access_token)
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

  describe("GET /admins/items -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "findAll").mockRejectedValue("Error");
      request(app)
        .get("/admins/items")
        .set("access_token", access_token)
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

describe("GET Error", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("PATCH /admins/items/:id -  failed test", () => {
    it("should return an object with status 500", (done) => {
      jest.spyOn(Item, "update").mockRejectedValue("Error");
      let payload = {
        status: `Approved`,
      };
      request(app)
        .patch("/admins/items/1")
        .send(payload)
        .set("access_token", access_token)
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

  describe("PATCH /admins/items/:id -  failed test", () => {
    it("should return an object with status 200", (done) => {
      jest.spyOn(Item, "update").mockRejectedValue("Error");
      request(app)
        .patch("/admins/items/1")
        .set("access_token", access_token)
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

describe("POST Error", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("PATCH /admins/items/:id -  failed test", () => {
    it("should return an object with status 500", (done) => {
      request(app)
        .post("/users/myImage")
        .set("access_token", access_token)
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

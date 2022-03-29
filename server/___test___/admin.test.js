const app = require("../app.js");
const { sequelize } = require("../models");
const request = require("supertest");
const { queryInterface } = sequelize;
const { User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt.js");
const CronJob = require("cron").CronJob;
jest.mock("ioredis");
const Redis = require("ioredis");
// jest.useFakeTimers();
jest.mock("cron");

let access_token;
const customerToken = signToken({
  id: 1,
  email: "ustomer@customer.customer",
  role: "Customer",
});
let adminToken = signToken({
  id: 2,
  email: "admin.test12@mail.com",
  role: "Admin",
});
beforeAll((done) => {
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
      return queryInterface.bulkInsert(
        "Users",
        [
          {
            username: "customer@customer.customer",
            email: "customer@customer.customer",
            password: hashPassword("customer@customer.customer"),
            role: "Customer",
            address: "customer@customer.customer",
            photoUrl: "customer@customer.customer",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            username: "admin123",
            email: "admin.test12@mail.com",
            password: hashPassword("customer@customer.customer"),
            role: "Admin",
            address: "customer@customer.customer",
            photoUrl: "customer@customer.customer",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    })
    .then(() => {
      return queryInterface.bulkInsert(
        "Items",
        [
          {
            title: "Baju polo dengan lengan panjang dengan bahan katun",
            category: "pakaian",
            description:
              "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
            brand: "H&M",
            yearOfPurchase: "2021",
            statusBarter: false,
            statusPost: "Reviewed",
            userId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            title: "Baju polo dengan lengan panjang dengan bahan katun",
            category: "pakaian",
            description:
              "T-shirt pria yang cepat kering sehingga terasa halus dan fresh sepanjang hari. Sempurna untuk gaya kasual dan berolahraga.",
            brand: "H&M",
            yearOfPurchase: "2021",
            statusBarter: false,
            statusPost: "Reviewed",
            userId: 1,
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
    .catch(() => {
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
    .catch(() => {
      done(err);
    });
});

describe("Admin Route Test", () => {
  describe("POST /register - create new admin", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          username: "admin@admin.admin",
          email: "admin@admin.admin",
          password: "admin@admin.admin",
          role: "Admin",
          address: "admin@admin.admin",
          photoUrl: "admin@admin.admin",
        })
        .set("access_token", adminToken)
        .then((response) => {
          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty("id", expect.any(Number));
          expect(response.body).toHaveProperty("email", "admin@admin.admin");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("400 Error register - should not create duplicate email", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          username: "admin@admin.admin",
          email: "admin@admin.admin",
          password: "admin@admin.admin",
          role: "Admin",
          address: "admin@admin.admin",
          photoUrl: "admin@admin.admin",
        })
        .set("access_token", adminToken)
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Email must be unique");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe("POST /login - login with admin", () => {
    test("200 Success login - should return access token", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "admin@admin.admin",
          password: "admin@admin.admin",
        })
        .then((response) => {
          access_token = response.body.access_token;
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty(
            "access_token",
            expect.any(String)
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Error login - wrong email and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "WRONGEMAIL",
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Invalid email/password");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Error login - wrong password and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "admin@admin.admin",
          password: "WRONGPASSWORDs",
        })
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Invalid email/password");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - no input email and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Must input email");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - no input password and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Must input password");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - empty input email and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "",
          password: "admin@admin.admin",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Must input email");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("400 Error login - empty input password and returning message", (done) => {
      request(app)
        .post("/admins/login")
        .send({
          email: "admin@admin.admin",
          password: "",
        })
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Must input password");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  //GET item/ admin
  describe("GET /items - get all items", () => {
    test("200 Success get items - should return array of item", (done) => {
      request(app)
        .get("/admins/items")
        .set("access_token", access_token)
        .then((response) => {
          expect(response.body).toEqual(expect.any(Array));
          expect(response.body[0]).toEqual(expect.any(Object));
          expect(response.status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Error get items - not authorized without token", (done) => {
      request(app)
        .get("/admins/items")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("You are not authorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    test("401 Error get items - not authorized with wrong token", (done) => {
      request(app)
        .get("/admins/items")
        .set("access_token", "WRONG-TOKEN")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("You are not authorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  //PATCH
  describe("PATCH /items/:id - patch items", () => {
    beforeAll(() => {
      CronJob.mockImplementation(() => {
        return {
          start: () => {
            return new Promise((resolve) => {
              resolve({
                message: "delete",
              });
            });
          },
        };
      });
    });

    test("200 Success patch items - should return success message", (done) => {
      let payload = {
        status: "Accepted",
      };
      request(app)
        .patch("/admins/items/1")
        .send(payload)
        .set("access_token", access_token)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe(
            "Item status successfully updated"
          );
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    // test("200 Success patch items - should return success message", (done) => {
    //   request(app)
    //     .patch("/admins/items/1")
    //     .set("access_token", access_token)
    //     .then((response) => {
    //       expect(response.status).toBe(200);
    //       expect(response.body).toHaveProperty("message");
    //       expect(response.body.message).toBe(
    //         "Item status successfully updated"
    //       );
    //       done();
    //     })
    //     .catch((err) => {
    //       done(err);
    //     });
    // });

    test("401 Error patch items - not authorized without token", (done) => {
      request(app)
        .patch("/admins/items")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("You are not authorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("401 Error patch items - not authorized with wrong token", (done) => {
      request(app)
        .patch("/admins/items")
        .set("access_token", "WRONG-TOKEN")
        .then((response) => {
          expect(response.status).toBe(401);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("You are not authorized");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("403 Error patch items - forbidden with customer role", (done) => {
      request(app)
        .patch("/admins/items/1")
        .set("access_token", customerToken)
        .then((response) => {
          expect(response.status).toBe(403);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Forbidden to access source");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("404 Error patch items - Item not founc", (done) => {
      request(app)
        .patch("/admins/items/100")
        .set("access_token", access_token)
        .then((response) => {
          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Item not found");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

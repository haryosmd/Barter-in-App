const imagekit = require("../helpers/imagekit");
const sendEmail = require("../helpers/sendEmail");
const uploadFile = require("../helpers/uploadFile");
const { Item, Image, User, RoomBarter, sequelize } = require("../models");
const { Op } = require("sequelize");
const { signToken } = require("../helpers/jwt");
const Redis = require("ioredis");
const redis = new Redis({
  port: 10199,
  host: "redis-10199.c98.us-east-1-4.ec2.cloud.redislabs.com",
  password: "8e7Ny2t28Zl9oYbsDXCpjwAmhFzuguxq",
});

class userControllers {
  static async loginGoogle(req, res, next) {
    try {
      const payload = req.body;
      const user = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          password: "rahasia" + Math.random() * 10,
          role: "Customer",
          username: payload.givenName,
          address: "-",
          photoUrl: payload.photoUrl,
        },
      });
      let tokenServer = signToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
      });

      const newToken = { id: user[0].dataValues.id, token: req.body.token };

      await redis.set(
        `tokenForId${user[0].dataValues.id}`,
        JSON.stringify(newToken)
      );

      res.status(200).json({
        access_token: tokenServer,
        id: String(user[0].dataValues.id),
        username: user[0].dataValues.username,
        email: user[0].dataValues.email,
        photoUrl: user[0].dataValues.photoUrl,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postItems(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const userId = req.userLogin.id;
      const { files } = req;
      const { title, category, description, brand, yearOfPurchase } = req.body;

      const createItem = await Item.create(
        {
          title,
          category,
          description,
          brand,
          yearOfPurchase,
          statusPost: "Pending",
          statusBarter: "Not bartered yet",
          userId,
        },
        { transaction: t }
      );

      const mappedArray = await Promise.all(
        files.map((file) => {
          return uploadFile(file).then((data) => {
            let tags = [];
            if (data.AITags) {
              data.AITags.forEach((e) => {
                tags.push(e.name);
              });
            }
            let temp = {
              imageUrl: data.url,
              itemId: createItem.id,
              tag: tags.join(", "),
            };
            return temp;
          });
        })
      );

      await Image.bulkCreate(mappedArray, {
        returning: true,
        transaction: t,
      });
      await sendEmail({ email: req.userLogin.email });
      await t.commit();

      res.status(201).send({ message: "Item has been created" });
    } catch (error) {
      await t.rollback();
      console.log(error)
      next(error);
    }
  }

  static async postImage(req, res, next) {
    try {
      const { files } = req;
      console.log(files)
      const mappedArray = await Promise.all(
        files.map((file) => {
          return uploadFile(file).then((data) => {
            let tags = [];
            if (data.AITags) {
              data.AITags.forEach((e) => {
                tags.push(e.name);
              });
            }
            let temp = {
              imageUrl: data.url,
              tag: tags.join(", "),
            };
            return temp;
          });
        })
      );
      res.status(201).json(mappedArray);
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async addItem(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const userId = req.userLogin.id;
      const {
        title,
        category,
        description,
        brand,
        yearOfPurchase,
        imageFields,
      } = req.body;

      const createItem = await Item.create(
        {
          title,
          category,
          description,
          brand,
          yearOfPurchase,
          statusPost: "Pending",
          statusBarter: "Not bartered yet",
          userId,
        },
        {
          returning: true,
          transaction: t,
        }
      );

      let imagesData = imageFields.map((el) => {
        let temp = {
          imageUrl: el.imageUrl,
          tag: el.tag,

          itemId: createItem.id,
        };
        return temp;
      });

      await Image.bulkCreate(imagesData, {
        returning: true,
        transaction: t,
      });

      await sendEmail({ email: req.userLogin.email });
      await t.commit();
      res.status(201).send({ message: "Item has been created" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getItems(req, res, next) {
    try {
      let { filterByTitle, filterByCategory, id } = req.query;
      if (!filterByTitle) filterByTitle = "";
      if (!filterByCategory) filterByCategory = "";
      if (!id) id = 0;
      let items = await Item.findAll({
        include: [Image],
        where: {
          statusPost: "Accepted",
          title: {
            [Op.iLike]: `%${filterByTitle}%`,
          },
          category: {
            [Op.iLike]: `%${filterByCategory}%`,
          },
          userId: {
            [Op.ne]: id,
          },
        },
      });

      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getItem(req, res, next) {
    try {
      let { id } = req.params;
      let item = await Item.findByPk(+id, {
        include: [
          {
            model: User,
            attributes: ["id", "email", "username", "photoUrl"],
          },
          Image,
        ],
      });
      if (!item) {
        throw new Error("NOT_FOUND");
      }
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      let { id } = req.params;
      let item = await Item.findByPk(+id);
      if (!item) {
        throw new Error("NOT_FOUND");
      }
      await Item.destroy({ where: { id } });
      res.status(200).json({ message: "Item has been deleted" });
    } catch (error) {
      next(error);
    }
  }

  static async dataForHome(req, res, next) {
    try {
      let { id } = req.query;
      if (!id) id = 0;
      let items = await Item.findAll({
        where: {
          [Op.and]: [
            {
              statusPost: "Accepted",
            },
            {
              statusBarter: "Not bartered yet",
            },
            {
              userId: {
                [Op.ne]: id,
              },
            },
          ],
        },
        limit: 10,
        order: [["updatedAt", "DESC"]],
        include: [Image],
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async getMyAds(req, res, next) {
    try {
      let items = await Item.findAll({
        where: {
          userId: req.userLogin.id,
        },
        include: [Image],
      });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async dataForBarter(req, res, next) {
    try {
      let items = await Item.findAll({
        where: {
          [Op.and]: [
            {
              statusPost: {
                [Op.eq]: "Accepted",
              },
              userId: req.userLogin.id,
            },
          ],
        },
        include: [Image],
      });
      // let filterItemBarter = items.filter((el) => {
      //   if (el.userId === req.userLogin.id && el.statusPost === "Accepted") {
      //     return el;
      //   }
      // });
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }

  static async postRoomBarter(req, res, next) {
    try {
      const UserId = req.userLogin.id;
      const { user2, item1, item2 } = req.body;
      const batch = {
        user1: UserId,
        user2,
        item1,
        item2,
        status1: false,
        status2: false,
      };
      const response = await RoomBarter.create(batch);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async patchRoomBarter(req, res, next) {
    try {
      let { id } = req.params;
      let userId = req.userLogin.id;

      let roomBarter = await RoomBarter.findByPk(+id);
      if (!roomBarter) {
        throw new Error("ROOM_NOT_FOUND");
      }

      if (roomBarter.user1 === userId) {
        await RoomBarter.update({ status1: true }, { where: { id } });
      } else if (roomBarter.user2 === userId) {
        await RoomBarter.update({ status2: true }, { where: { id } });
      }

      let newRoomBarter = await RoomBarter.findByPk(+id);
      if (newRoomBarter.status1 && newRoomBarter.status2) {
        await Item.update(
          { statusBarter: "Barter" },
          { where: { id: roomBarter.item1 } }
        );
        await Item.update(
          { statusBarter: "Barter" },
          { where: { id: roomBarter.item2 } }
        );

        res.status(200).json({ message: "Item terbarter" });
      } else {
        res.status(200).json({ message: "Wait for another user to confirm" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getRoomBarter(req, res, next) {
    try {
      const UserId = req.userLogin.id;
      const response1 = await RoomBarter.findAll({
        where: {
          [Op.or]: [{ user1: UserId }, { user2: UserId }],
        },
        include: [
          {
            model: Item,
            as: "Item1",
            include: [Image],
          },
          {
            model: Item,
            as: "Item2",
            include: [Image],
          }
        ],
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(response1);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userControllers;

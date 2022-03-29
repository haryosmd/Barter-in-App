"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.hasMany(models.Image, { foreignKey: "itemId" });
      Item.hasOne(models.RoomBarter, { foreignKey: "item1", as: "Item1" });
      Item.hasOne(models.RoomBarter, { foreignKey: "item2", as: "Item2" });
      Item.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Item.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING(70),
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
          // len: {
          //   args: [15],
          //   msg: "Length minimum must be 15 characters",
          // },
        },
      },
      category: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Category is required",
          },
          notNull: {
            msg: "Category is required",
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          notNull: {
            msg: "Description is required",
          },
          // len: {
          //   args: [20],
          //   msg: "Description minimum length must be 20 characters",
          // },
        },
      },
      brand: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Brand is required",
          },
          notNull: {
            msg: "Brand is required",
          },
        },
      },
      yearOfPurchase: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Year is required",
          },
          notNull: {
            msg: "Year is required",
          },
        },
      },
      statusPost: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Status Post is required",
          },
          notNull: {
            msg: "Status Post is required",
          },
        },
      },
      statusBarter: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Status Barter is required",
          },
          notNull: {
            msg: "Status Barter is required",
          },
        },
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "UserId is required",
          },
          notNull: {
            msg: "UserId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};

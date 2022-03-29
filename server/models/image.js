"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Item, { foreignKey: "itemId" });
    }
  }
  Image.init(
    {
      imageUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Image is required"
          },
          notNull: {
            msg: "Image is required"
          }
        }
      },
      tag: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Tag is required"
          },
          notNull: {
            msg: "Tag is required"
          }
        }
      },
      itemId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: "ItemId is required"
          },
          notNull: {
            msg: "ItemId is required"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};

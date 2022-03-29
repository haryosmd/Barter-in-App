"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomBarter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomBarter.belongsTo(models.User, { foreignKey: "user1" });
      RoomBarter.belongsTo(models.User, { foreignKey: "user2" });
      // RoomBarter.belongsTo(models.Item, { foreignKey: "item1", as: "Item1" });
      RoomBarter.belongsTo(models.Item, { foreignKey: "item1", as: "Item1" });
      RoomBarter.belongsTo(models.Item, { foreignKey: "item2", as: "Item2" });
    }
  }
  RoomBarter.init(
    {
      user1: DataTypes.INTEGER,
      user2: DataTypes.INTEGER,
      item1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Item 1 is required",
          },
          notNull: {
            msg: "Item 1 is required",
          },
        },
      },
      item2: DataTypes.INTEGER,
      status1: DataTypes.BOOLEAN,
      status2: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RoomBarter",
    }
  );
  return RoomBarter;
};

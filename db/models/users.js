"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.court);
      this.hasMany(models.booking);
    }
  }
  User.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      wallet: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          checkBalance(value) {
            if (value < 0) {
              throw new Error("Not enough money in wallet!");
            }
          },
        },
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.INTEGER,
      profilePicture: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};

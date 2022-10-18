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
      auth_key: DataTypes.UUID,
      wallet: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};

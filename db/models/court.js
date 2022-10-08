"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Court.init(
    {
      courtName: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      expiry: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "court",
      underscored: true,
    }
  );
  return Court;
};

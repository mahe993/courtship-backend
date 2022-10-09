"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
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
      expiry: DataTypes.DATEONLY,
      //url data example: [{firebasePath: "images/courtPic1.jpg", imageUrl: "getdownloadURL.com"}, {...}]
      url: DataTypes.ARRAY(DataTypes.JSONB),
    },
    {
      sequelize,
      modelName: "court",
      underscored: true,
    }
  );
  return Court;
};

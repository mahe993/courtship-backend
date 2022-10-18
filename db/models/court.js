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
      this.belongsTo(models.user);
      this.hasMany(models.booking);
    }
  }
  Court.init(
    {
      courtName: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      //url data example: [{firebasePath: "images/courtPic1.jpg", imageUrl: "getdownloadURL.com"}, {...}]
      pictureUrl: DataTypes.JSONB,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "court",
      underscored: true,
    }
  );
  return Court;
};

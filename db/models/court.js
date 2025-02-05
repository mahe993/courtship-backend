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
      this.hasMany(models.review);
    }
  }
  Court.init(
    {
      courtName: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: { type: DataTypes.INTEGER, validate: { max: 999 } },
      //url data example: [{firebasePath: "images/courtPic1.jpg", imageUrl: "getdownloadURL.com"}, {...}]
      pictureUrl: DataTypes.JSONB,
      userId: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          isIn: [["Active", "Inactive"]],
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

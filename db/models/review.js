"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.booking);
      this.belongsTo(models.court);
      this.belongsTo(models.user);
    }
  }
  Review.init(
    {
      ratings: { type: DataTypes.INTEGER, allowNull: false },
      experience: DataTypes.TEXT,
      //ensure each user only can post 1 review for each completed booking. format: ${userId}-${bookingId}
      reviewCode: { type: DataTypes.STRING, allowNull: false, unique: true },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      courtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courts",
          key: "id",
        },
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "courts",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "review",
      underscored: true,
    }
  );
  return Review;
};

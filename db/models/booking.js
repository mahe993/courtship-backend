"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.court);
    }
  }
  Booking.init(
    {
      // FORMAT: `${court_id}-${timeslot_id}-${date_id}
      bookingNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      courtId: {
        type: DataTypes.INTEGER,
        references: {
          model: "courts",
          key: "id",
        },
      },
      timeslot: {
        type: DataTypes.INTEGER,
        validate: {
          isEven(value) {
            if (value % 2 !== 0) {
              throw new Error("Not a valid timeslot!");
            }
          },
          isWithinTimeslotRange(value) {
            if (value < 10 || value > 20) {
              throw new Error("Not a valid timeslot!");
            }
          },
        },
      },
      date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "booking",
      underscored: true,
    }
  );
  return Booking;
};

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
    }
  }
  Booking.init(
    {
      // FORMAT: `${court_id}-${timeslot_id}-${date_id}
      bookingNumber: {
        type: DataTypes.UUID,
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
      time: DataTypes.INTEGER,
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

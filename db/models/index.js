"use strict";
import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
import config from "../../config/database";

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    dialect: config.development.dialect,
    port: config.development.port,
    host: config.development.host,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

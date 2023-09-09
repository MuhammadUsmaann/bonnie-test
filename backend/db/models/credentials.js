"use strict";
const Sequelize = require("sequelize");
const db = require("../index.js");

const Credentials = db.define("credentials", {
  email: { type: Sequelize.DataTypes.STRING, unique: true },
  password: { type: Sequelize.DataTypes.STRING },
  userId: { type: Sequelize.DataTypes.INTEGER },
});
const Users = db.define("users", {
  name: { type: Sequelize.DataTypes.TEXT },
  email: { type: Sequelize.DataTypes.STRING, unique: true },
});

Users.hasOne(Credentials), { foreignKey: "userId" };

Credentials.belongsTo(Users, {
  as: "user",
  foreignKey: "id",
});
  
module.exports = { Credentials, Users };

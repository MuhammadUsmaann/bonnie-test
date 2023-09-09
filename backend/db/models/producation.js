"use strict";
const Sequelize = require("sequelize");
const db = require("../index.js");
const Producation = db.define("producation", {
  producation: { type: Sequelize.DataTypes.FLOAT },
  sales: { type: Sequelize.DataTypes.FLOAT },
  export: { type: Sequelize.DataTypes.FLOAT },
  country: { type: Sequelize.DataTypes.STRING },
  type: { type: Sequelize.DataTypes.STRING },
});

module.exports = { Producation };

const sequelize = require("sequelize");

// const config = require(__dirname + '/../util/config.json')['dbconfig']
require("dotenv").config();
const config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
};
// create the database instance
const db = (module.exports = new sequelize({
  ...config,
  logging: false, // export DEBUG=sql in the environment to get SQL queries
  define: {
    underscored: true, // use snake_case rather than camelCase column names
    freezeTableName: true, // don't change table names from the one specified
    timestamps: true, // automatically include timestamp columns,
    charset: "utf8",
    dialectOptions: {
      collate: "utf8_general_ci",
    },
  },
}));
// pull in our models
require("./models");
//connection open
function sync(force = false) {
  console.log("DB Host:", process.env.DB_HOST);
  if (force === true && process.env.DB_HOST !== "localhost") {
    console.log(
      force,
      " can not be aplied to host: " + process.env.DB_HOST
    );
    console.log("Could not synced models to db");
    return;
  }
  return db
    .sync({ force })
    .then((ok) => console.log(`Synced models to db`))
    .catch((fail) => {
      console.log(fail);
    });
}
db.didSync = sync();

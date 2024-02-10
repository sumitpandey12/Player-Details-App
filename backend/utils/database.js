const Sequelize = require("sequelize");

const sequelize = new Sequelize("PlayerDB", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

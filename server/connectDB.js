const mysql = require("mysql2/promise");
const mysqlPool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: parseInt(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USERNAME || "root",
  password: process.env.MYSQL_PASSWORD || "root1234",
  database: "userdb",
});

module.exports = mysqlPool;

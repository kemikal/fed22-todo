const mysql = require("mysql2")

connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "fedtodo",
    password: "fedtodo",
    database: "fedtodo"
})

module.exports = connection;
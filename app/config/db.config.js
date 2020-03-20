module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "mysqlpassword",
    DB: "example",
    table : "tutorial",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
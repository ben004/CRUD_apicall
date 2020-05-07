const mysql = require("mysql");
let mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "mysqlpassword",
    database : "example",
    multipleStatements : true
});
  
mysqlConnection.connect((err)=>{
    return !err ? console.log("connected") : console.log("not connected")
})
module.exports=mysqlConnection;
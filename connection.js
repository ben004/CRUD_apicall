const mysql = require("mysql");
let mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "mysqlpassword",
    database : "example",
    multipleStatements : true
});
  
mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("connected");
    }
    else
    {
        console.log("not connected");
    }

})
module.exports=mysqlConnection;
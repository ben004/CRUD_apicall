const cron = require("node-cron");

const mysqldump =require('mysqldump');
const express =require("express");
const bodyParser=require("body-parser");
require('dotenv').config();

const hostname = process.env.HOST;
const port = process.env.PORT;

const EmployeeRoutes = require("./routes/routes")

let app=express();
app.use(bodyParser.json());
app.use("/employee",EmployeeRoutes)


cron.schedule("0 * * * *", function() {
    console.log("running a task every one hour");
    mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: 'mysqlpassword',
            database: 'example',
        },
        dumpToFile: './backupdata.sql',
    });
  });

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);}
);






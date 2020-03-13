const express = require("express")

const Router = express.Router();
const mysqlConnection=require("../connection");
Router.get("/all/",(req,res)=>{
    mysqlConnection.query("SELECT * from employeeinfo",async(err,rows,fields)=>{
        if(!err)
        {
            await res.send(rows);
        }
        else
        {
            console.log(err)
        }
    })
 })
 Router.get("/display/:id",(req,res)=>{
    mysqlConnection.query("SELECT * from employeeinfo WHERE empID=?",[req.params.id],async(err,rows,fields)=>{
        if(!err)
        {
            await res.send(rows)
        }
        else
        {
            console.log("the error is"+err)
        }
    })
 })
 Router.delete('/delete/:id',(req,res)=>{
    mysqlConnection.query("DELETE FROM employeeinfo WHERE empID=?",[req.params.id],async(err,rows,fields)=>{
        if(!err)
        {
            await res.send("deleted successfully");
        }
        else
        {
            console.log(err)
        }
    })
 })
 Router.post('/',(req,res)=>{
    let emp=req.body;
    let insert="insert into employeeinfo values("+emp.empID+",'"+emp.empName+"','"+emp.empAddress+"',"+emp.empPno+",'"+emp.Salary+"');"
    mysqlConnection.query(insert,async(err,rows,fields)=>{
        if(!err)
        {
            await res.send("Insert successfully");
        }
        else
        {
            console.log(err)
        }
    })
 })
 Router.put('/',(req,res)=>{
    let emp=req.body;
    let update="update employeeinfo set empName='"+emp.empName+"',empAddress='"+emp.empAddress+"',empPno="+emp.empPno+",Salary='"+emp.Salary+"' where empID="+emp.empID+";"
    mysqlConnection.query(update,async(err,rows,fields)=>{
        if(!err)
        {
            await res.send("Insert successfully");
        }
        else
        {
            console.log(err)
        }
    })
 })
module.exports = Router;
const express = require("express")
const jwt=require("jsonwebtoken")
const Router = express.Router();
const mysqlConnection=require("../connection");
Router.get("/all/",authenticationToken,(req,res)=>{
    mysqlConnection.query("SELECT * from employeeinfo",async(err,rows,fields)=>{
        if(!err)
        {
            await res.send(rows)
        }
        else
        {
            console.log(err)
        }
    })
 })
 Router.get("/display/:id",authenticationToken,(req,res)=>{
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
 Router.delete('/delete/:id',authenticationToken,(req,res)=>{
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
 Router.post('/',authenticationToken,(req,res)=>{
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


Router.post('/gettoken',(req,res)=>{
    const admin = {
        name : "beniel",
        password :"090899"
    }
    const userName = req.body.username
    const password = req.body.password
    if (userName == admin.name && password == admin.password){
        const user ={name:userName}

        const token = jwt.sign(user,process.env.PORT_TOKEN, {expiresIn: '30s' })
          
        res.json({
            create :1,
            port_token :token
        })
    }else{
         
        res.json({
             create :0,
             information : 'Request failed! only admin can access it'
        })
    }
})
function authenticationToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split (' ')[1]
    if(token == null){
        return res.send('Please enter the valid token')
    }


    jwt.verify(token,process.env.PORT_TOKEN, (err,user)=>{
         
        if (err){
            return res.send('unauthorized user entry')
        }
        req.user = user
        next()
    })
}
Router.put('/',authenticationToken,(req,res)=>{
    let emp=req.body;
    let update="update employeeinfo set empName='"+emp.empName+"',empAddress='"+emp.empAddress+"',empPno="+emp.empPno+",Salary='"+emp.Salary+"' where empID="+emp.empID+";"
    mysqlConnection.query(update,async(err,rows,fields)=>{
        if(!err)
        {
            await res.send("update successfully");
        }
        else
        {
            console.log(err)
        }
    })
 })
module.exports = Router;

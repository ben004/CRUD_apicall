const express = require("express");
const {
  getallData,
  getIddata,
  deleteById,
  insertData,
  getToken,
  authenticationToken,
  update,
} = require("../controllers/controllers");
require("dotenv").config();
const Router = express.Router();
//get all data
Router.get("/all/", authenticationToken, getallData);
//get data by id
Router.get("/display/:id", authenticationToken, getIddata);
// delete data by id
Router.delete("/delete/:id", authenticationToken, deleteById);
//insert data
Router.post("/", authenticationToken, insertData);
//get token for insert data
Router.post("/gettoken", getToken);
//update inserted data
Router.put("/update", authenticationToken, update);

module.exports = Router;

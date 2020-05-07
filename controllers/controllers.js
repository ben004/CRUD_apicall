require("dotenv").config();
const jwt = require("jsonwebtoken");
const mysqlConnection = require("../connection");
exports.getallData = (req, res) => {
  mysqlConnection.query("SELECT * from employeeinfo", async (err, rows) => {
    return !err ? await res.send(rows) : console.log(err);
  });
};
exports.getIddata = (req, res) => {
  mysqlConnection.query(
    "SELECT * from employeeinfo WHERE empID=?",
    [req.params.id],
    async (err, rows) => {
      return !err ? await res.send(rows) : console.log("the error is" + err);
    }
  );
};
exports.deleteById = (req, res) => {
  mysqlConnection.query(
    "DELETE FROM employeeinfo WHERE empID=?",
    [req.params.id],
    async (err) => {
      return !err ? await res.send("deleted successfully") : console.log(err);
    }
  );
};

exports.insertData = (req, res) => {
  let emp = req.body;
  let insert =
    "insert into employeeinfo values(" +
    emp.empID +
    ",'" +
    emp.empName +
    "','" +
    emp.empAddress +
    "'," +
    emp.empPno +
    ",'" +
    emp.Salary +
    "');";
  mysqlConnection.query(insert, async (err) => {
    return !err ? await res.send("Insert successfully") : console.log(err);
  });
};
exports.getToken = (req, res) => {
  const admin = {
    name: "beniel",
    password: "090899",
  };
  const userName = req.body.username;
  const password = req.body.password;
  if (userName == admin.name && password == admin.password) {
    const user = { name: userName };

    const token = jwt.sign(user, process.env.PORT_TOKEN, { expiresIn: "5m" });

    res.json({
      create: 1,
      port_token: token,
      message: "Token valid only for 5 minutes",
    });
  } else {
    res.json({
      create: 0,
      information: "Request failed! only admin can access it",
    });
  }
};
exports.authenticationToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.send("Please enter the valid token");
  }
  jwt.verify(token, process.env.PORT_TOKEN, (err, user) => {
    if (err) {
      return res.send("unauthorized user entry");
    }
    req.user = user;
    next();
  });
};
exports.update = (req, res) => {
  let emp = req.body;
  let update =
    "update employeeinfo set empName='" +
    emp.empName +
    "',empAddress='" +
    emp.empAddress +
    "',empPno=" +
    emp.empPno +
    ",Salary='" +
    emp.Salary +
    "' where empID=" +
    emp.empID +
    ";";
  mysqlConnection.query(update, async (err) => {
    return !err ? await res.send("update successfully") : console.log(err);
  });
};

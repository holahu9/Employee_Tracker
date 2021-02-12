var mysql = require("mysql");
var inq = require("inquirer");
var table = require("console.table");  // to display sql data in table format at command line
var add = require("./lib/add");
var update = require("./lib/update");
var view = require("./lib/view");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  exports.start();
});

// function to display menu options
exports.start = () => {
    inq.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "EXIT"                
            ]
        }
    ])
    //based upon user inputs, call the function
    .then((answer) => {
      if(answer.action === "View All Employees") {
        view.viewAllEmployees();
      }
      else if(answer.action === "Add Employee") {
        add.addEmployee();
      }      
      else if(answer.action === "Update Employee Role") {
        update.updateRole();
      }
      else if(answer.action === "EXIT") {
        connection.end();
        return
      }
    });
    
};
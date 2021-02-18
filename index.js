require('dotenv').config();
const mysql = require('mysql');
const inquier = require('inquirer');
const cTable = require('console.table');
const Query = require('./query.js');

// console.log(process.env.DB_PASSWORD); //on Heroku, you have to add it in app settings page "config variables"

//

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'employ_trackerDB',
});

// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  startPrompt();
  
});

function startPrompt() {
  const startQuestion = [{
    type: "list",
    name: "action",
    message: "what would you like to do?",
    choices: ["View all employees", "View all roles", "View all departments", "add an employee", "add a role", "add a department", "update role for an employee", "update employee's manager", "view employees by manager", "delete a department", "delete a role", "delete an employee", "View the total utilized budget of a department"]
  }]
  
  inquier.prompt(startQuestion)
  .then(response => {
    getSingleQuerryParams(response.action);
  })
  .catch(err => {
    console.error(err);
  });
}

function getSingleQuerryParams(action) {
  switch (action) {
    case "View all employees":
      
      break;
    case "add an employee":
      let questions = [
        {
          type: "input",
          name: "first_name",
          message: "what is the employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "what is the employee's last name?"
        },
        {
          type: "list",
          name: "role_id",
          //TODO run query of all 
          choices: []
        }
        
      ]

      break;
  }
  
  startPrompt();
}
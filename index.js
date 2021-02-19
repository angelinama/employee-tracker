require('dotenv').config();
const mysql = require('mysql');
const inquier = require('inquirer');
const cTable = require('console.table');
// const Query = require('./query.js');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'employee_DB',
});

// Connect to the DB
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  startPrompt();
  
});

//TODO  generate a start ascii art when start running

function startPrompt() {
  const startQuestion = [{
    type: "list",
    name: "action",
    message: "what would you like to do?",
    loop: false,
    choices: ["View all employees", "View all roles", "View all departments", "add an employee", "add a role", "add a department", "update role for an employee", "update employee's manager", "view employees by manager", "delete a department", "delete a role", "delete an employee", "View the total utilized budget of a department", "quit"]
  }]
  
  inquier.prompt(startQuestion)
  .then(response => {
    switch (response.action) {
      case "View all employees":
        viewAll("EMPLOYEE");
        break;
      case "View all roles":
        viewAll("ROLE");
        break;
      case "View all departments":
        viewAll("department");
        break;
      case "add a department":
        addNewDepartment();
        break;
      case "add a role":
        addNewRole();
        break;
      case "add an employee":
        addNewEmployee();
        break;
      default:
        connection.end();
    }
  })
  .catch(err => {
    console.error(err);
  });
}


const viewAll = (table) => {
  const query = `SELECT * FROM ${table}`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    startPrompt();
  });
};

const addNewDepartment = () => {
  let questions = [
    {
      type: "input",
      name: "name",
      message: "what is the new department name?"
    }
  ];

  inquier.prompt(questions)
  .then(response => {
    // const query = "INSERT INTO department (name) VALUES ('test')";
    const query = `INSERT INTO department (name) VALUES (?)`;
    connection.query(query, [response.name], (err, res) => {
      if (err) throw err;
      console.log("Successfully insert a department at id " + res.insertId);
      startPrompt();
    });
  })
  .catch(err => {
    console.error(err);
  });
}

const addNewRole = () => {
  //get the list of all department with department_id to make the choices object list for prompt question
  const departments = [];
  connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
    if (err) throw err;

    res.forEach(dep => {
      let qObj = {
        name: dep.name,
        value: dep.id
      }
      departments.push(qObj);
    });

    //question list to get arguments for making new roles
    let questions = [
      {
        type: "input",
        name: "title",
        message: "what is the title of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "what is the salary of the new role?"
      },
      {
        type: "list",
        name: "department",
        choices: departments,
        message: "which department is this role in?"
      }
    ];

    inquier.prompt(questions)
    .then(response => {
      const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
      connection.query(query, [[response.title, response.salary, response.department]], (err, res) => {
        if (err) throw err;
        console.log("Successfully insert role at id " + res.insertId);
        startPrompt();
      });
    })
    .catch(err => {
      console.error(err);
    });
    });
}

const addNewEmployee = () => {
  //get all the employee list to make choice of employee's manager
  connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
    if (err) throw err;
    const employeeChoice = ['None']; //an employee could have no manager
    emplRes.forEach(({ first_name, last_name, id }) => {
      employeeChoice.push({
        name: first_name + " " + last_name,
        value: id
      });
    });
    
    //get all the role list to make choice of employee's role
    connection.query("SELECT * FROM ROLE", (err, rolRes) => {
      if (err) throw err;
      const roleChoice = [];
      rolRes.forEach(({ title, id }) => {
        roleChoice.push({
          name: title,
          value: id
          });
        });
     
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
          choices: roleChoice,
          message: "what is the employee's role?"
        },
        {
          type: "list",
          name: "manager_id",
          choices: employeeChoice,
          message: "who is the employee's manager? (could be null)"
        }
      ]
  
      inquier.prompt(questions)
        .then(response => {
          const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
          connection.query(query, [[response.first_name, response.last_name, response.role_id, response.manager_id]], (err, res) => {
            if (err) throw err;
            console.log("successfully insert employee with id " + res.insertId);
            startPrompt();
          });
        })
        .catch(err => {
          console.error(err);
        });
      })
  });
}
// const express = require('express');
const connection = require('./config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');

// Database connection
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employees database.');
});

// Inquirer prompts

// Options
const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        break;
    }
  });
};

// View Departments

const viewDepartments = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err
    , res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// View Roles

const viewRoles = () => {
  const query = 'SELECT * FROM role';
  connection.query(query, (err
    , res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// View Employees

const viewEmployees = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err
    , res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

// Add Department

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:'
    }
  ]).then((answer) => {
    const query = 'INSERT INTO department SET ?';
    connection.query(query, { name: answer.name }, (err, res) => {
      if (err) throw err;
      console.log(chalk.green('Department added successfully!'));
      mainMenu();
    });
  });
}

// Add Role

const addRole = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err
    , res) => {
    if (err) throw err;
    const departments = res.map(department => {
      return {
        name: department.name,
        value: department.id
      }
    });

    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the new role:'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the new role:'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Select the department for the new role:',
        choices: departments
      }
    ]).then((answer) => {
      const query = 'INSERT INTO role SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        console.log(chalk.green('Role added successfully!'));
        mainMenu();
      });
    });
  });
}

// Add Employee

const addEmployee = () => {
  const query = 'SELECT * FROM role';
  connection.query(query, (err
    , res) => {
    if (err) throw err;
    const roles = res.map(role => {
      return {
        name: role.title,
        value: role.id
      }
    });

    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name of the new employee:'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name of the new employee:'
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Select the role for the new employee:',
        choices: roles
      }
    ]).then((answer) => {
      const query = 'INSERT INTO employee SET ?';
      connection.query(query, answer, (err, res) => {
        if (err) throw err;
        console.log(chalk.green('Employee added successfully!'));
        mainMenu();
      });
    });
  });
}

// Update Employee Role

const updateEmployeeRole = () => {
  const query = 'SELECT * FROM employee';
  connection.query(query, (err
    , res) => {
    if (err) throw err;
    const employees = res.map(employee => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    });

    const query = 'SELECT * FROM role';
    connection.query(query, (err
      , res) => {
      if (err) throw err;
      const roles = res.map(role => {
        return {
          name: role.title,
          value: role.id
        }
      });

      inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee to update:',
          choices: employees
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role for the employee:',
          choices: roles
        }
      ]).then((answer) => {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        connection.query(query, [answer.role_id, answer.employee_id], (err, res) => {
          if (err) throw err;
          console.log(chalk.green('Employee role updated successfully!'));
          mainMenu();
        });
      });
    });
  });
}

mainMenu();


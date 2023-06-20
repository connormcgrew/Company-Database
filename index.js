const inquirer = require('inquirer');
const db = require('./config/connection.js');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    startPrompt();
});

const startPrompt = () => {
inquirer.prompt([
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: [
        'View all departments', 
        'View all roles', 
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
    ],
    },
]).then((answer) => {
    switch (answer.start) {
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
    }
}
)};

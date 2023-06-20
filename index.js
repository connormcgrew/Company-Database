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
        'Update an employee role',
        'Exit'
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
        case 'Exit':
            exit();
            break;
    }
}
)};
// View all departments
const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}
// View all roles
const viewRoles = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}
// View all employees
const viewEmployees = () => {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        startPrompt();
    });
}
// Add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?',
        },
    ]).then((answer) => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        db.query(sql, answer.department, (err, res) => {
            if (err) throw err;
            console.log('Department added.');
            startPrompt();
        });
    });
}
// Add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role you would like to add?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role?',
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the department ID for this role?',
        },
    ]).then((answer) => {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        db.query(sql, [answer.role, answer.salary, answer.department], (err, res) => {
            if (err) throw err;
            console.log('Role added.');
            startPrompt();
        });
    });
}
// Add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role ID for this employee?',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'What is the manager ID for this employee?',
        },
    ]).then((answer) => {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        db.query(sql, [answer.first, answer.last, answer.role, answer.manager], (err, res) => {
            if (err) throw err;
            console.log('Employee added.');
            startPrompt();
        });
    });
}
// Update an employee role
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'What is the ID of the employee you would like to update?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the new role ID for this employee?',
        },
    ]).then((answer) => {
        const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
        db.query(sql, [answer.role, answer.employee], (err, res) => {
            if (err) throw err;
            console.log('Employee updated.');
            startPrompt();
        });
    });
}
// Exit
const exit = () => {
    db.end();
    console.log('Database disconnected.');
}
# employee-tracker
Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as Content Management Systems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.


To delete/update a department will also delete/update roles within the department

To delete a role will be rejected and an error will be thrown; to update a role will also update every employee with the role

To delete a manager will set all report-tos manager to NULL, i.e. with no manager (later may change to manager's manager recursively)
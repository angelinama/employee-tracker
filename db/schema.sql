DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(20, 2) NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);


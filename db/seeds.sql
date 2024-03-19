INSERT INTO department (name)
VALUES ('Editing'), 
('Sales'), 
('Finance'), 
('Marketing'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Editor in Chief', 110000, 1),
('Sales Lead', 150000, 2),
('Lead Accountant', 120000, 3),
('Creative Director', 110000, 4),
('Legal Director', 180000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Annie', 'Espinoza', 1, NULL),
('Jayden', 'Haley', 2, NULL),
('Wanda', 'Hanson', 3, NULL),
('Diane', 'Mcgowan', 4, NULL),
('Rebecca', 'Perez', 5, NULL);

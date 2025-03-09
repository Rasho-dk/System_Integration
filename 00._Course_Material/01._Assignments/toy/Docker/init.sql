-- Connect to the database
-- \c cia;

-- Drop the table if it exists


DROP TABLE IF EXISTS employees;

-- Create the employees table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,z
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary NUMERIC NOT NULL,
    sensitive_info TEXT
);

-- Insert data into the employees table
INSERT INTO employees (name, department, salary, sensitive_info)
VALUES
    ('Jafar', 'HR', 50000, 'Sensitive HR data'),
    ('Alan', 'Finance', 60000, 'Sensitive Finance data'),
    ('Rasho', 'IT', 55000, 'Sensitive IT data');


CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phoneNo TEXT NOT NULL,
    email TEXT NOT NULL
);

INSERT INTO customer (name, phoneNo, email)
VALUES
    ('Jack', '123456789', 'Jack@tst.com'),
    ('Jill', '987654321', 'Jill@tst.com'),
    ('John', '456789123', 'John@tst.com');
-- Create roles



CREATE TABLE B2B (
    id SERIAL PRIMARY KEY,
    CVR TEXT NOT NULL,
    name TEXT NOT NULL,
    phoneNo TEXT NOT NULL,
    email TEXT NOT NULL
);
INSERT INTO B2B (CVR, name, phoneNo, email)
VALUES
    ('123456789', 'Michael', '123456789', 'mc@b2b.com'),
    ('987654321', 'Sara', '987654321', 'Sara@b2b.com'),
    ('456789123', 'Tom', '456789123', 'Tom@b2b.com');

CREATE ROLE hr_user;
CREATE ROLE finance_user;
CREATE ROLE it_user;
CREATE ROLE admin_user;

-- Grant connection privileges to the database
GRANT CONNECT ON DATABASE rasho_DB TO hr_user, finance_user, it_user, admin_user;

-- Grant SELECT permission on the employees table to all roles
GRANT SELECT ON employees TO hr_user, finance_user, it_user, admin_user;

-- Grant INSERT, UPDATE, DELETE permissions on the employees table to admin_user
GRANT INSERT, UPDATE, DELETE ON employees TO admin_user;

-- Grant USAGE and UPDATE permissions on the sequence to admin_user
GRANT USAGE, UPDATE ON SEQUENCE employees_id_seq TO admin_user;

-- Create a view that shows sensitive data only for admin or HR
CREATE OR REPLACE VIEW secure_employees AS
SELECT 
    id, 
    name, 
    department, 
    salary,
    CASE 
        WHEN current_user = 'admin_user' THEN sensitive_info 
        ELSE 'REDACTED' 
    END AS sensitive_info
FROM employees
WHERE current_user = 'admin_user' OR department = 'HR'
WITH CHECK OPTION;



CREATE OR REPLACE VIEW secure_employees AS
SELECT
    id,
    name,
    department,
    salary,
    CASE
        WHEN current_user = ANY (SELECT rolname FROM pg_roles JOIN pg_user ON pg_roles.oid = pg_user.usesysid WHERE pg_user.usename = current_user AND pg_roles.rolname = 'admin_user') THEN sensitive_info
        ELSE 'REDACTED'
    END AS sensitive_info
FROM employees
WITH CHECK OPTION;



CREATE OR REPLACE VIEW secure_employees AS
SELECT
    id,
    name,
    department,
    salary,
    CASE
        WHEN pg_has_role(current_user, 'hr_user', 'USAGE') THEN 'REDACTED'
        WHEN pg_has_role(current_user, 'admin_user', 'USAGE') THEN sensitive_info  -- Admin users can see sensitive info
        ELSE 'REDACTED'  -- Default case: redact data for all other users
    END AS sensitive_info
FROM employees;

-- Giv adgang til visningen
GRANT SELECT ON secure_employees TO employee_role, admin_role;

-- Enable Row-Level Security on the employees table
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policies to define what data users can see
-- HR can only read data from the HR department, but not sensitive information
CREATE POLICY hr_policy
    ON employees
    FOR SELECT
    USING (current_user = 'hr_user' AND department = 'HR');

    

-- Finance can only read data from the Finance department, but not sensitive information
CREATE POLICY finance_policy
    ON employees
    FOR SELECT
    USING (current_user = 'finance_user' AND department = 'Finance');

-- IT can only read data from the IT department, but not sensitive information
CREATE POLICY it_policy
    ON employees
    FOR SELECT
    USING (current_user = 'it_user' AND department = 'IT');

-- Admin can read all data
CREATE POLICY admin_policy
    ON employees 
    FOR SELECT
    USING (current_user = 'admin_user');

-- Allow admin_user to insert data
CREATE POLICY admin_insert_policy
    ON employees
    FOR INSERT
    TO admin_user
    WITH CHECK (true);


-- Allow admin_user to update data
CREATE POLICY admin_update_policy
    ON employees
    FOR UPDATE
    TO admin_user
    USING (true);

-- Allow admin_user to delete data
CREATE POLICY admin_delete_policy
    ON employees
    FOR DELETE
    TO admin_user
    USING (true);



-- Remove policies if they exist
-- DROP POLICY IF EXISTS hr_policy ON employees;
-- DROP POLICY IF EXISTS finance_policy ON employees;
-- DROP POLICY IF EXISTS it_policy ON employees;
-- DROP POLICY IF EXISTS admin_policy ON employees;


-- init.sql

-- Allow PostgreSQL to listen on all interfaces
ALTER SYSTEM SET listen_addresses TO '*';


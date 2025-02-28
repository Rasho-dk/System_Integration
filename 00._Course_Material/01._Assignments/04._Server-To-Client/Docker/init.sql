-- \c rasho_db;
-- Drop tabeller, hvis de eksisterer
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    department TEXT NOT NULL,
    salary NUMERIC NOT NULL,
    sensitive_info TEXT
);

-- Indsæt data
INSERT INTO employees (name, department, salary, sensitive_info)
VALUES
    ('Jafar', 'HR', 50000, 'Sensitive HR data'),
    ('Alan', 'Finance', 60000, 'Sensitive Finance data'),
    ('Rasho', 'IT', 55000, 'Sensitive IT data');


-- Opret roller
CREATE ROLE hr_user;
CREATE ROLE finance_user;
CREATE ROLE it_user;
CREATE ROLE admin_user;

-- -- -- Tildel adgang
GRANT CONNECT ON DATABASE rasho_DB TO hr_user, finance_user, it_user, admin_user;

-- Grant SELECT permission on the employees table to all roles
GRANT SELECT ON employees TO hr_user, finance_user, it_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON employees TO admin_user;

-- Opret en view, der viser følsomme data kun for admin eller HR
CREATE VIEW secure_employees AS
SELECT 
    id, 
    name, 
    department, 
    salary,
    CASE 
        WHEN current_user = 'hr_user' OR current_user = 'admin_user' THEN sensitive_info 
        ELSE 'REDACTED' 
    END AS sensitive_info
FROM employees;

-- Aktivér Row-Level Security på tabellen
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
-- Opret politik for at definere regler for, hvad brugerne kan se
-- HR kan kun læse data fra HR-afdelingen, men ikke følsomme oplysninger
CREATE POLICY hr_policy
    ON employees
    FOR SELECT
    USING (current_user = 'hr_user' AND department = 'HR');

-- Finance kan kun læse data fra Finance-afdelingen, men ikke følsomme oplysninger
CREATE POLICY finance_policy
    ON employees
    FOR SELECT
    USING (current_user = 'finance_user' AND department = 'Finance');

-- IT kan kun læse data fra IT-afdelingen, men ikke følsomme oplysninger
CREATE POLICY it_policy
    ON employees
    FOR SELECT
    USING (current_user = 'it_user' AND department = 'IT');

-- Admin kan læse alt
CREATE POLICY admin_policy
    ON employees 
    FOR SELECT
    USING (current_user = 'admin_user');


-- Anvend politikkerne

-- ALTER TABLE employees ENABLE POLICY hr_policy;
-- ALTER TABLE employees ENABLE POLICY finance_policy;
-- ALTER TABLE employees ENABLE POLICY it_policy;
-- ALTER TABLE employees ENABLE POLICY admin_policy;





-- Fjern politikker
DROP POLICY IF EXISTS hr_policy ON employees;
DROP POLICY IF EXISTS finance_policy ON employees;
DROP POLICY IF EXISTS it_policy ON employees;
DROP POLICY IF EXISTS admin_policy ON employees;
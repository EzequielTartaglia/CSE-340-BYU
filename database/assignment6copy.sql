CREATE TYPE public.inventory_status_type AS ENUM ('Pending', 'Approved', 'New Arrival');

CREATE TABLE IF NOT EXISTS public.inventory_status (
    status_id SERIAL PRIMARY KEY,
    inventory_status_type inventory_status_type NOT NULL DEFAULT 'New Arrival'::inventory_status_type,
    inv_id INTEGER NOT NULL
);

CREATE TYPE public.vehicle_status_type AS ENUM ('Available', 'Sold');

CREATE TABLE IF NOT EXISTS public.vehicle_status (
    status_id SERIAL PRIMARY KEY,
    vehicle_status_type vehicle_status_type NOT NULL DEFAULT 'Available'::vehicle_status_type,
    inv_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.maintenance_history (
    maintenance_history_id SERIAL PRIMARY KEY,
    maintenance_date DATE,
    maintenance_type VARCHAR(255),
    maintenance_description TEXT,
    cost DECIMAL(10,2),
    parts_replaced TEXT[],
    notes TEXT,
    mechanic_id INTEGER NOT NULL,
    inv_id INTEGER NOT NULL,
    status_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS public.mechanic_employee (
    mechanic_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    hire_date DATE NOT NULL,
    salary DECIMAL(12, 2),
    certification VARCHAR(255)
);

-- Insert Record for `John Doe, Jane Smith, and Bob Johnson` into table `account`
INSERT INTO public.account(account_firstname, account_lastname, account_email, account_password)
VALUES 
    ('John', 'Doe', 'john.doe@mechanic.com', 'm3cH@ni5Ce!*'),
    ('Jane', 'Smith', 'jane.smith@mechanic.com', 'm3ch@nic!321'),
    ('Bob', 'Johnson', 'bob.johnson@mechanic.com', '321m3ch@nic!');

-- Update Record for accounts with email addresses containing 'mechanic' to have account_type as `Employee`
UPDATE public.account 
SET account_type = 'Employee'
WHERE account_email LIKE '%mechanic%';

-- Insert test data into inventory_status_type ENUM
INSERT INTO public.vehicle_status (vehicle_status_type, inv_id) VALUES
    ('Available', 1),
    ('Available', 4),
    ('Available', 5),
    ('Available', 6),
    ('Available', 7),
    ('Available', 8),
    ('Available', 9),
    ('Available', 10),
    ('Available', 11),
    ('Available', 12),
    ('Available', 13),
    ('Available', 14),
    ('Available', 15),
    ('Available', 20),
    ('Available', 22);

-- Insert test data into inventory_status_type ENUM
INSERT INTO public.inventory_status (inventory_status_type, inv_id) VALUES
    ('Pending', 1),
    ('Approved', 2),
    ('New Arrival', 3);


-- Insert test data into maintenance_history
INSERT INTO public.maintenance_history (maintenance_date, maintenance_type, maintenance_description, cost, parts_replaced, notes, mechanic_id, inv_id, status_id) VALUES
    ('2022-01-01', 'Oil Change', 'Regular oil change', 50.00, ARRAY['Oil Filter'], 'No specific notes', 1, 1, 1),
    ('2022-02-15', 'Brake Inspection', 'Check and replace brake pads if necessary', 100.00, ARRAY['Brake Pads'], 'Brakes in good condition', 2, 2, 2),
    ('2022-03-10', 'Tire Rotation', 'Rotate tires for even wear', 30.00, ARRAY['None'], 'Tires rotated as per schedule', 3, 3, 3);

-- Insert test data into mechanic_employee
INSERT INTO public.mechanic_employee (first_name, last_name, email, phone_number, hire_date, salary, certification) VALUES
    ('John', 'Doe', 'john.doe@example.com', '123-456-7890', '2020-01-01', 50000.00, 'ASE Certified'),
    ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '2021-02-01', 60000.00, 'Master Technician'),
    ('Bob', 'Johnson', 'bob.johnson@example.com', '555-123-4567', '2022-03-01', 70000.00, 'ASE Certified');



-- Insert more test data into maintenance_history for the provided inv_id values
INSERT INTO public.maintenance_history (maintenance_date, maintenance_type, maintenance_description, cost, parts_replaced, notes, mechanic_id, inv_id, status_id) VALUES
    ('2022-04-05', 'Transmission Fluid Change', 'Replace transmission fluid and filter', 120.00, ARRAY['Transmission Filter'], 'Smooth transmission operation', 1, 4, 1),
    ('2022-05-20', 'Battery Check', 'Test and replace the battery if needed', 50.00, ARRAY['Battery'], 'Battery in good condition', 1, 5, 2),
    ('2022-06-15', 'Engine Tune-up', 'Inspect and tune up the engine components', 80.00, ARRAY['Spark Plugs', 'Air Filter'], 'Optimized engine performance', 3, 6, 3),
    ('2022-07-10', 'Coolant Flush', 'Flush and replace the coolant', 60.00, ARRAY['Coolant'], 'Cooling system maintained', 3, 7, 1),
    ('2022-08-25', 'Air Filter Replacement', 'Replace the air filter for improved air flow', 25.00, ARRAY['Air Filter'], 'Enhanced air intake', 1, 8, 2),
    ('2022-09-12', 'Wheel Alignment', 'Adjust wheel alignment for proper handling', 40.00, ARRAY['None'], 'Steering alignment optimized', 2, 9, 3),
    ('2022-10-18', 'Brake Pad Replacement', 'Replace worn-out brake pads', 90.00, ARRAY['Brake Pads'], 'Brakes in top condition', 2, 10, 1),
    ('2022-11-02', 'Oil Change', 'Regular oil change', 50.00, ARRAY['Oil Filter'], 'No specific notes', 2, 11, 2),
    ('2022-12-15', 'Tire Rotation', 'Rotate tires for even wear', 30.00, ARRAY['None'], 'Tires rotated as per schedule', 1, 12, 3),
    ('2023-01-20', 'Brake Inspection', 'Check and replace brake pads if necessary', 100.00, ARRAY['Brake Pads'], 'Brakes in good condition', 3, 13, 1),
    ('2023-02-14', 'Transmission Fluid Change', 'Replace transmission fluid and filter', 120.00, ARRAY['Transmission Filter'], 'Smooth transmission operation', 1, 14, 2),
    ('2023-03-22', 'Battery Check', 'Test and replace the battery if needed', 50.00, ARRAY['Battery'], 'Battery in good condition', 2, 15, 3),
    ('2023-04-30', 'Engine Tune-up', 'Inspect and tune up the engine components', 80.00, ARRAY['Spark Plugs', 'Air Filter'], 'Optimized engine performance', 3, 20, 1),
    ('2023-05-10', 'Coolant Flush', 'Flush and replace the coolant', 60.00, ARRAY['Coolant'], 'Cooling system maintained', 3, 22, 2);

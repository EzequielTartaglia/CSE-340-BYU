-- 
--  Update Account
--
UPDATE public.account 
SET account_type = 'Employee'
WHERE account_firstname = 'Lily-Mae' AND account_lastname = 'Robyns';

UPDATE public.account 
SET account_type = 'Admin'
WHERE account_firstname = 'Charley' AND account_lastname = 'Villanueva';

-- 
--  Insert Classification
-- 
    -- Data for table `classification`
INSERT INTO public.classification (classification_name)
VALUES ('Custom'),
	('Sport'),
	('SUV'),
	('Truck'),
	('Sedan');

-- Data for table `inventory`
INSERT INTO public.inventory (
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )
VALUES   (
    'Chevy',
    'Camaro',
    '2018',
    'If you want to look cool this is the ar you need! This car has great performance at an affordable price. Own it today!',
    '/images/vehicles/camaro.jpg',
    '/images/vehicles/camaro-tn.jpg',
    25000,
    101222,
    'Silver',
    2
  ), (
    'Batmobile',
    'Custom',
    '2007',
    'Ever want to be a super hero? now you can with the batmobile. This car allows you to switch to bike mode allowing you to easily maneuver through trafic during rush hour.',
    '/images/vehicles/bat.jpg',
    '/images/vehicles/bat-tn.jpg',
    65000,
    29887,
    'Black',
    1
  ), (
    'FBI',
    'Surveillance Van',
    '2016',
    'do you like police shows? You will feel right at home driving this van, come complete with survalence equipments for and extra fee of $2,000 a month. ',
    '/images/vehicles/fbi.jpg',
    '/images/vehicles/fbi-tn.jpg',
    20000,
    19851,
    'Green',
    1
  ), (
    'Dog ',
    'Car',
    '1997',
    'Do you like dogs? Well this car is for you straight from the 90s from Aspen, Colorado we have the orginal Dog Car complete with fluffy ears.',
    '/images/vehicles/dog.jpg',
    '/images/vehicles/dog-tn.jpg',
    35000,
    71632,
    'Brown',
    1
  ), (
    'Jeep',
    'Wrangler',
    '2019',
    'The Jeep Wrangler is small and compact with enough power to get you where you want to go. Its great for everyday driving as well as offroading weather that be on the the rocks or in the mud!',
    '/images/vehicles/jeep-wrangler.jpg',
    '/images/vehicles/jeep-wrangler-tn.jpg',
    28045,
    41205,
    'Orange',
    3
  ), (
    'Lamborghini',
    'Adventador',
    '2016',
    'This V-12 engine packs a punch in this sporty car. Make sure you wear your seatbelt and obey all traffic laws. ',
    '/images/vehicles/lambo-Adve.jpg',
    '/images/vehicles/lambo-Adve-tn.jpg',
    417650,
    71003,
    'Blue',
    2
  ), (
    'Aerocar International',
    'Aerocar',
    '1963',
    'Are you sick of rushhour trafic? This car converts into an airplane to get you where you are going fast. Only 6 of these were made, get them while they last!',
    '/images/vehicles/aerocar.jpg',
    '/images/vehicles/aerocar-tn.jpg',
    700000,
    18956,
    'Red',
    1
  ), (
    'Monster',
    'Truck',
    '1995',
    'Most trucks are for working, this one is for fun. this beast comes with 60in tires giving you tracktions needed to jump and roll in the mud.',
    '/images/vehicles/monster.jpg',
    '/images/vehicles/monster-tn.jpg',
    150000,
    3998,
    'purple',
    1
  ), (
    'Cadillac',
    'Escalade',
    '2019',
    'This stylin car is great for any occasion from going to the beach to meeting the president. The luxurious inside makes this car a home away from home.',
    '/images/vehicles/escalade.jpg',
    '/images/vehicles/escalade-tn.jpg',
    75195,
    41958,
    'Black',
    4
  ), (
    'GM',
    'Hummer',
    '2016',
    'Do you have 6 kids and like to go offroading? The Hummer gives you the small interiors with an engine to get you out of any muddy or rocky situation.',
    '/images/vehicles/hummer.jpg',
    '/images/vehicles/hummer-tn.jpg',
    58800,
    56564,
    'Yellow',
    4
  ), (
    'Mechanic',
    'Special',
    '1964',
    'Not sure where this car came from. however with a little tlc it will run as good a new.',
    '/images/vehicles/ms.jpg',
    '/images/vehicles/ms-tn.jpg',
    100,
    200125,
    'Rust',
    5
  ), (
    'Ford',
    'Model T',
    '1921',
    'The Ford Model T can be a bit tricky to drive. It was the first car to be put into production. You can get it in any color you want as long as it is black.',
    '/images/vehicles/ford-modelt.jpg',
    '/images/vehicles/ford-modelt-tn.jpg',
    30000,
    26357,
    'Black',
    5
  ), (
    'Mystery',
    'Machine',
    '1999',
    'Scooby and the gang always found luck in solving their mysteries because of there 4 wheel drive Mystery Machine. This Van will help you do whatever job you are required to with a success rate of 100%.',
    '/images/vehicles/mm.jpg',
    '/images/vehicles/mm-tn.jpg',
    10000,
    128564,
    'Green',
    1
  ),
  (
    'Spartan',
    'Fire Truck',
    '2012',
    'Emergencies happen often. Be prepared with this Spartan fire truck. Comes complete with 1000 ft. of hose and a 1000 gallon tank.',
    '/images/vehicles/fire-truck.jpg',
    '/images/vehicles/fire-truck-tn.jpg',
    50000,
    38522,
    'Red',
    4
  ), (
    'Ford',
    'Crown Victoria',
    '2013',
    'After the police force updated their fleet these cars are now available to the public! These cars come equiped with the siren which is convenient for college students running late to class.',
    '/images/vehicles/crown-vic.jpg',
    '/images/vehicles/crown-vic-tn.jpg',
    10000,
    108247,
    'White',
    5
  );

-- Insert test data into inventory_status_type ENUM
INSERT INTO public.vehicle_status (vehicle_status_type, inv_id) VALUES
    ('Available', 1),
    ('Available', 2),
    ('Available', 3),
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
    ('Available', 15);

-- Insert test data into inventory_status_type ENUM
INSERT INTO public.inventory_status (inventory_status_type, inv_id) VALUES
    ('Approved', 1),
    ('Approved', 2),
    ('Approved', 3),
    ('Approved', 4),
    ('Approved', 5),
    ('Approved', 6),
    ('Approved', 7),
    ('Approved', 8),
    ('Approved', 9),
    ('Approved', 10),
    ('Approved', 11),
    ('Approved', 12),
    ('Approved', 13),
    ('Approved', 14),
    ('Approved', 15);

-- Insert test data into inventory_status_type ENUM
INSERT INTO public.employee (emp_firstname, emp_lastname, hire_date, salary, employee_type, account_id) VALUES
('Lily-Mae', 'Robyns', '2020-01-01', 70000.00, 'Service Technicians', 2),
('Charley', 'Villanueva', '2010-10-20', 65000.00, 'Service Advisors', 3);

INSERT INTO public.maintenance_history (maintenance_date, maintenance_type, maintenance_description, cost, parts_replaced, notes, emp_id, inv_id, inv_status_id)
VALUES
    ('2022-03-01', 'Oil Change', 'Regular oil change', 50.00, ARRAY['Oil Filter'], 'No specific notes', 2, 1, 1),
    ('2022-03-15', 'Brake Inspection', 'Check and replace brake pads if necessary', 100.00, ARRAY['Brake Pads'], 'Brakes in good condition', 2, 2, 2),
    ('2022-04-01', 'Tire Rotation', 'Rotate tires for even wear', 30.00, ARRAY['None'], 'Tires rotated as per schedule', 2, 3, 3),
    ('2022-04-15', 'Engine Tune-up', 'Inspect and tune the engine components', 120.00, ARRAY['Spark Plugs', 'Air Filter'], 'Engine performance optimized', 2, 4, 4),
    ('2022-05-01', 'Transmission Fluid Change', 'Replace old transmission fluid with new fluid', 80.00, ARRAY['Transmission Fluid'], 'Transmission function improved', 2, 5, 5),
    ('2022-05-15', 'Brake Fluid Flush', 'Flush and replace brake fluid', 70.00, ARRAY['Brake Fluid'], 'Brake system efficiency enhanced', 2, 6, 6),
    -- Add more records with different maintenance_type and maintenance_description values
    ('2022-06-01', 'Coolant Flush', 'Flush and replace engine coolant', 60.00, ARRAY['Coolant'], 'Optimized engine cooling performance', 2, 7, 7),
    ('2022-06-15', 'Air Filter Replacement', 'Replace old air filter with a new one', 25.00, ARRAY['Air Filter'], 'Improved air intake for the engine', 2, 8, 8),
    ('2022-07-01', 'Wheel Alignment', 'Adjust wheel angles for optimal tire wear', 40.00, ARRAY['None'], 'Wheels aligned to manufacturer specifications', 2, 9, 9),
    ('2022-07-15', 'Battery Replacement', 'Replace old battery with a new one', 90.00, ARRAY['Battery'], 'Improved electrical system performance', 2, 10, 10),
    ('2022-08-01', 'Spark Plug Replacement', 'Replace old spark plugs with new ones', 35.00, ARRAY['Spark Plugs'], 'Enhanced engine ignition efficiency', 2, 11, 11),
    ('2022-08-15', 'Fuel System Cleaning', 'Clean and optimize fuel system components', 55.00, ARRAY['Fuel System Cleaner'], 'Improved fuel efficiency', 2, 12, 12),
    ('2022-09-01', 'Power Steering Fluid Flush', 'Flush and replace power steering fluid', 50.00, ARRAY['Power Steering Fluid'], 'Enhanced power steering performance', 2, 13, 13),
    ('2022-09-15', 'Cabin Air Filter Replacement', 'Replace old cabin air filter', 20.00, ARRAY['Cabin Air Filter'], 'Improved air quality inside the vehicle', 2, 14, 14),
    ('2022-10-01', 'Exhaust System Inspection', 'Inspect and address issues in the exhaust system', 75.00, ARRAY['None'], 'Optimized exhaust system function', 2, 15, 15);
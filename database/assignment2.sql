-- Insert Record for `Tony Stark` into table `account`
INSERT INTO public.account(account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Update Record for `Tony Stark` account_type to be `Admin`
UPDATE public.account 
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Delete Record for `Tony Stark` from table `account`
DELETE FROM public.account
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';

-- Modify Record `GM Hummer` to update `small interiors` to be `a huge interior`
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Using inner join to select the make and model fields from table `inventory` 
-- and the classification name field from the table `classification` 
-- for inventory items that belong to the `Sport` classification. 
SELECT i.inv_make, i.inv_model 
FROM inventory i 
INNER JOIN classification c 
ON i.classification_id = c.classification_id
WHERE classification_name = 'Sport';

-- Update all Records in table `inventory` to add '/vehicles' to the middle of 
-- the file path in the inv_image and inv_thumbnail columns. 
-- e.g., /images/vehicles/a-car-name.jpg
UPDATE public.inventory
SET 
    inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
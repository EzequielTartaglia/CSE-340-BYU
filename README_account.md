## Accounts from JWT Authorization Activity

account_firstname: Basic
account_lastname: Client
account_email: basic@340.edu
account_password: I@mABas1cCl!3nt

account_firstname: Happy
account_lastname: Employee
account_email: happy@340.edu
account_password: I@mAnEmpl0y33

account_firstname: Manager
account_lastname: User
account_email: manager@340.edu
account_password: I@mAnAdm!n1strat0r

test password
account_password: hI@mAnAdm!n1strat0r98


## Assignment 6 - Account Information

### Client
account_firstname: Steve 
account_lastname: Lindsay
account_email: steve.lindsay@test.com
account_password: !BR3Cunrv@gKk

### Employee
account_firstname: Lily-Mae 
account_lastname: Robyns
account_email: lily.robyns@test.com
account_password: j0H7pCAMv!#EVnn8!

### Admin
account_firstname: Charley 
account_lastname: Villanueva
account_email: charley.villanueva@test.com
account_password: $*k5WS!XSm3Z9fB@


#### Queries

INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password) VALUES
('Basic', 'Client', 'basic@340.edu', 'I@mABas1cCl!3nt'),
('Happy', 'Employee', 'happy@340.edu', 'I@mAnEmpl0y33'),
('Manager', 'User', 'manager@340.edu', 'I@mAnAdm!n1strat0r'),
('Steve', 'Lindsay', 'steve.lindsay@test.com', '!BR3Cunrv@gKk'),
('Lily-Mae', 'Robyns', 'lily.robyns@test.com', 'j0H7pCAMv!#EVnn8!'),
('Charley', 'Villanueva', 'charley.villanueva@test.com', '$*k5WS!XSm3Z9fB@');

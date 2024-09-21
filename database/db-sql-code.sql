CREATE TYPE public.account_type AS ENUM
    ('Employee', 'Client', 'Admin');

ALTER TYPE public.account_type
    OWNER TO class340_wwp7_user;
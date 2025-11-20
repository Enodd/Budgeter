CREATE TABLE public.USERS (
    id INTEGER PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    mail VARCHAR(40) NOT NULL,
    password VARCHAR(40) NOT NULL,
    nickname VARCHAR(40),
    dateOfBirth date not null
);
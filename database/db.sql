-- CREATE DATABASE usersdb;
-- \l
--  \c firstapi


DROP TABLE IF EXISTS USERS;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(40),
  email TEXT NOT NULL UNIQUE
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

select * from users;

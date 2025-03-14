--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE admin;
ALTER ROLE admin WITH NOSUPERUSER INHERIT NOCREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:3Q5uW+t/ka1Kc/nCVORQYg==$QvQwVa/pJJNUgZuoChb9lplQaPcaqw59cQ4NfK+nwn4=:RmgRcWYrGkQ3tTSiamVsCCeACQVR0wSTAgTkfj3M82k=';
CREATE ROLE admin_user;
ALTER ROLE admin_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:LcZu4TZBAMNyqUoYTXtmCg==$jJ+F3cczutYLwW/cdJI5qIOBTteUzH/ExQ/0cnvUsec=:cAxcJKoD/rKy6AuH6glOJLy23qMbZjOCvFD+pUNsEd8=';
CREATE ROLE hr_user;
ALTER ROLE hr_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:vMVOkmUR3jBJ5fZfTD0qHg==$HYwCQnZxdEc/RivAu1YGIculoUi4WVKpWEQhJ/h2fdI=:B2SwUuUoyibIy6uoaQWoEp0gIhUShNZ45bGbn9cira8=';
CREATE ROLE kundeservice_user;
ALTER ROLE kundeservice_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:zGMVNVi7BN59B9RxCUqnNw==$m1YUViexjDIR1sAOQ86hp0xgIXjJkCbr5UiaxSrXGqQ=:naWMBNiHgxZ0xHVpfZa94DftL5x2Ne0ipRnOKCgqPrg=';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:AQMDEYcNp2ISf82jFjqJxQ==$3HnPn8XBXzXXUfPeuOzUjVe2foy39E+Y7eAbf7GyW5U=:tNk0uUCqQtfNaUuuX+c/R1uLxnPBVKmtJXJrYGKrimE=';

--
-- User Configurations
--






--
-- PostgreSQL database cluster dump complete
--


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
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "cia" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cia; Type: DATABASE; Schema: -; Owner: admin_user
--

CREATE DATABASE cia WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE cia OWNER TO admin_user;

\connect cia

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: b2b; Type: TABLE; Schema: public; Owner: admin_user
--

CREATE TABLE public.b2b (
    id integer NOT NULL,
    cvr text NOT NULL,
    name text NOT NULL,
    phoneno text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public.b2b OWNER TO admin_user;

--
-- Name: b2b_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_user
--

CREATE SEQUENCE public.b2b_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.b2b_id_seq OWNER TO admin_user;

--
-- Name: b2b_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_user
--

ALTER SEQUENCE public.b2b_id_seq OWNED BY public.b2b.id;


--
-- Name: customer; Type: TABLE; Schema: public; Owner: admin_user
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    name text NOT NULL,
    phoneno text NOT NULL,
    email text NOT NULL
);


ALTER TABLE public.customer OWNER TO admin_user;

--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_user
--

CREATE SEQUENCE public.customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customer_id_seq OWNER TO admin_user;

--
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_user
--

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: admin_user
--

CREATE TABLE public.employees (
    id integer NOT NULL,
    name text NOT NULL,
    department text NOT NULL,
    salary numeric NOT NULL
);


ALTER TABLE public.employees OWNER TO admin_user;

--
-- Name: employees_id_seq; Type: SEQUENCE; Schema: public; Owner: admin_user
--

CREATE SEQUENCE public.employees_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employees_id_seq OWNER TO admin_user;

--
-- Name: employees_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin_user
--

ALTER SEQUENCE public.employees_id_seq OWNED BY public.employees.id;


--
-- Name: b2b id; Type: DEFAULT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.b2b ALTER COLUMN id SET DEFAULT nextval('public.b2b_id_seq'::regclass);


--
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);


--
-- Name: employees id; Type: DEFAULT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.employees ALTER COLUMN id SET DEFAULT nextval('public.employees_id_seq'::regclass);


--
-- Data for Name: b2b; Type: TABLE DATA; Schema: public; Owner: admin_user
--

COPY public.b2b (id, cvr, name, phoneno, email) FROM stdin;
1	123456789	Michael	123456789	mc@b2b.com
2	987654321	Sara	987654321	Sara@b2b.com
3	456789123	Tom	456789123	Tom@b2b.com
\.


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: admin_user
--

COPY public.customer (id, name, phoneno, email) FROM stdin;
1	Jack	123456789	Jack@tst.com
2	Jill	987654321	Jill@tst.com
3	John	456789123	John@tst.com
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: admin_user
--

COPY public.employees (id, name, department, salary) FROM stdin;
1	Jafar	HR	50000
2	Alan	Finance	60000
3	Rasho	IT	55000
\.


--
-- Name: b2b_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_user
--

SELECT pg_catalog.setval('public.b2b_id_seq', 3, true);


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_user
--

SELECT pg_catalog.setval('public.customer_id_seq', 3, true);


--
-- Name: employees_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin_user
--

SELECT pg_catalog.setval('public.employees_id_seq', 5, true);


--
-- Name: b2b b2b_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.b2b
    ADD CONSTRAINT b2b_pkey PRIMARY KEY (id);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: employees employees_pkey; Type: CONSTRAINT; Schema: public; Owner: admin_user
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);


--
-- Name: employees; Type: ROW SECURITY; Schema: public; Owner: admin_user
--

ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

--
-- Name: employees hr_access; Type: POLICY; Schema: public; Owner: admin_user
--

CREATE POLICY hr_access ON public.employees FOR SELECT USING (((CURRENT_USER = 'hr_user'::name) AND (department = 'HR'::text)));


--
-- Name: employees hr_policy; Type: POLICY; Schema: public; Owner: admin_user
--

CREATE POLICY hr_policy ON public.employees FOR SELECT USING ((pg_has_role(CURRENT_USER, 'hr_user'::name, 'USAGE'::text) AND (department = 'HR'::text)));


--
-- Name: DATABASE cia; Type: ACL; Schema: -; Owner: admin_user
--

GRANT CONNECT ON DATABASE cia TO hr_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO admin_user;
GRANT USAGE ON SCHEMA public TO hr_user;
GRANT USAGE ON SCHEMA public TO kundeservice_user;


--
-- Name: TABLE customer; Type: ACL; Schema: public; Owner: admin_user
--

GRANT SELECT ON TABLE public.customer TO kundeservice_user;


--
-- Name: TABLE employees; Type: ACL; Schema: public; Owner: admin_user
--

GRANT SELECT ON TABLE public.employees TO hr_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT ON TABLES TO hr_user;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Debian 17.4-1.pgdg120+2)
-- Dumped by pg_dump version 17.4 (Debian 17.4-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--


--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: cat_gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cat_gender_enum AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.cat_gender_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    birth date NOT NULL,
    neutering boolean NOT NULL,
    pregnant boolean DEFAULT false NOT NULL,
    ribcage numeric,
    gender public.cat_gender_enum DEFAULT 'male'::public.cat_gender_enum NOT NULL,
    "userUuid" uuid NOT NULL,
    "feedId" integer,
    "kindsId" integer,
    "LIM" numeric,
    "BMI" integer,
    image character varying,
    "createdAt" date DEFAULT now() NOT NULL,
    "updatedAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.cat OWNER TO postgres;

--
-- Name: cat_feed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_feed (
    id integer NOT NULL,
    title character varying NOT NULL,
    kcal numeric NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cat_feed OWNER TO postgres;

--
-- Name: cat_feed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cat_feed_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cat_feed_id_seq OWNER TO postgres;

--
-- Name: cat_feed_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cat_feed_id_seq OWNED BY public.cat_feed.id;


--
-- Name: cat_kinds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_kinds (
    id integer NOT NULL,
    title character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.cat_kinds OWNER TO postgres;

--
-- Name: cat_kinds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cat_kinds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cat_kinds_id_seq OWNER TO postgres;

--
-- Name: cat_kinds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cat_kinds_id_seq OWNED BY public.cat_kinds.id;


--
-- Name: cat_weight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cat_weight (
    id integer NOT NULL,
    weight numeric NOT NULL,
    "catUuid" uuid,
    "createdAt" date DEFAULT now() NOT NULL,
    "updatedAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.cat_weight OWNER TO postgres;

--
-- Name: cat_weight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cat_weight_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cat_weight_id_seq OWNER TO postgres;

--
-- Name: cat_weight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cat_weight_id_seq OWNED BY public.cat_weight.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    username character varying,
    "secretCode" character varying,
    activation boolean DEFAULT false NOT NULL,
    password character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: cat_feed id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_feed ALTER COLUMN id SET DEFAULT nextval('public.cat_feed_id_seq'::regclass);


--
-- Name: cat_kinds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_kinds ALTER COLUMN id SET DEFAULT nextval('public.cat_kinds_id_seq'::regclass);


--
-- Name: cat_weight id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_weight ALTER COLUMN id SET DEFAULT nextval('public.cat_weight_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: cat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat (uuid, name, birth, neutering, pregnant, ribcage, gender, "userUuid", "feedId", "kindsId", "LIM", "BMI", image, "createdAt", "updatedAt") FROM stdin;
a74e5a19-de39-4345-aa12-19551ef623c3	kkamange	2000-01-01	f	f	30.0	male	3acdb463-60f9-49f3-8d37-d49ea9d680d1	4	1	10.0	50	\N	2019-04-15	2019-04-15
ba607f68-c27b-445d-a0c6-3ebfce05d2e9	cat1	2000-01-01	t	f	\N	male	3acdb463-60f9-49f3-8d37-d49ea9d680d1	\N	1	\N	\N	\N	2019-04-15	2019-04-15
8cba25fa-4c2c-4ef7-9a0b-5a9685661ecc	cat2	20030-01-01	t	f	\N	male	3acdb463-60f9-49f3-8d37-d49ea9d680d1	\N	1	\N	\N	\N	2019-04-15	2019-04-15
fdf34438-0a74-49f8-9566-5628704bde8c	testcat	1985-01-01	t	f	\N	male	96a15df0-1cc1-49cd-85e6-dc672d24e0a8	\N	1	\N	\N	\N	2019-04-15	2019-04-15
59ce8f43-afff-4009-b7ec-d8b0d8a052e6	춘삼이	2004-12-01	t	f	\N	male	96a15df0-1cc1-49cd-85e6-dc672d24e0a8	\N	1	\N	\N	\N	2019-04-15	2019-04-15
\.


--
-- Data for Name: cat_feed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_feed (id, title, kcal, "createdAt", "updatedAt") FROM stdin;
4	good grainfree meal	300.0	2019-04-07 20:17:14.841306	2019-04-07 20:17:14.841306
\.


--
-- Data for Name: cat_kinds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_kinds (id, title, "createdAt", "updatedAt") FROM stdin;
1	코레안숏컷	2019-04-07 20:17:14.841306	2019-04-07 20:17:14.841306
\.


--
-- Data for Name: cat_weight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cat_weight (id, weight, "catUuid", "createdAt", "updatedAt") FROM stdin;
1	7.5	a74e5a19-de39-4345-aa12-19551ef623c3	2019-04-15	2019-04-15
2	6.5	a74e5a19-de39-4345-aa12-19551ef623c3	2019-04-15	2019-04-15
4	4.5	a74e5a19-de39-4345-aa12-19551ef623c3	2019-04-15	2019-04-15
5	3.5	a74e5a19-de39-4345-aa12-19551ef623c3	2019-04-15	2019-04-15
11	5.5	fdf34438-0a74-49f8-9566-5628704bde8c	2019-04-15	2019-04-15
29	5.9	59ce8f43-afff-4009-b7ec-d8b0d8a052e6	2019-04-15	2019-04-15
30	6.9	59ce8f43-afff-4009-b7ec-d8b0d8a052e6	2019-04-15	2019-04-15
31	6.9	59ce8f43-afff-4009-b7ec-d8b0d8a052e6	2019-04-15	2019-04-15
32	6.9	59ce8f43-afff-4009-b7ec-d8b0d8a052e6	2019-04-15	2019-04-15
43	4.4	fdf34438-0a74-49f8-9566-5628704bde8c	2019-04-15	2019-04-15
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (uuid, email, "createdAt", "updatedAt", username, "secretCode", activation, password) FROM stdin;
3acdb463-60f9-49f3-8d37-d49ea9d680d1	vovoboss@gmail.com	2019-04-06 14:48:38.016376	2019-04-07 21:28:28.247384	dfd	\N	t	$2b$10$9Eqw7Wnvs/miquY.yLhJe.3WYhKjiBWlXiAfs74TQQ/2/48Inv15S
96a15df0-1cc1-49cd-85e6-dc672d24e0a8	test@test.com	2019-04-10 00:28:48.629372	2019-04-10 00:31:07.917324	\N	\N	t	$2b$10$f1v/h4CXJCM/pThz8MZvqu.W57udWRMZnU0YbCE4obMBmAc3zkB42
\.


--
-- Name: cat_feed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_feed_id_seq', 4, true);


--
-- Name: cat_kinds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_kinds_id_seq', 1, true);


--
-- Name: cat_weight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cat_weight_id_seq', 43, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- Name: cat PK_1c283b0003e591ba1b59183c52e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat
    ADD CONSTRAINT "PK_1c283b0003e591ba1b59183c52e" PRIMARY KEY (uuid);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: cat_feed PK_91e124b0b76b66265a451fd188d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_feed
    ADD CONSTRAINT "PK_91e124b0b76b66265a451fd188d" PRIMARY KEY (id);


--
-- Name: user PK_a95e949168be7b7ece1a2382fed; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_a95e949168be7b7ece1a2382fed" PRIMARY KEY (uuid);


--
-- Name: cat_kinds PK_cd29f88b4ec6baac8161f33c646; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_kinds
    ADD CONSTRAINT "PK_cd29f88b4ec6baac8161f33c646" PRIMARY KEY (id);


--
-- Name: cat_weight PK_d8011117ae7c0387beb8d067409; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_weight
    ADD CONSTRAINT "PK_d8011117ae7c0387beb8d067409" PRIMARY KEY (id);


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: cat FK_2876d7f6d616b7743d31fbb71c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat
    ADD CONSTRAINT "FK_2876d7f6d616b7743d31fbb71c4" FOREIGN KEY ("kindsId") REFERENCES public.cat_kinds(id);


--
-- Name: cat FK_2d3478ea5c12683a9bf187c1d6f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat
    ADD CONSTRAINT "FK_2d3478ea5c12683a9bf187c1d6f" FOREIGN KEY ("feedId") REFERENCES public.cat_feed(id);


--
-- Name: cat FK_69e3638dc7966fd471360c53b93; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat
    ADD CONSTRAINT "FK_69e3638dc7966fd471360c53b93" FOREIGN KEY ("userUuid") REFERENCES public."user"(uuid) ON DELETE CASCADE;


--
-- Name: cat_weight FK_bb75f1539c812e6961b7c2995eb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cat_weight
    ADD CONSTRAINT "FK_bb75f1539c812e6961b7c2995eb" FOREIGN KEY ("catUuid") REFERENCES public.cat(uuid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


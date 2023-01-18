
-- first create SEQUENCE for id to increment by 1
CREATE SEQUENCE application_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1

-- create application table 
CREATE TABLE "application" ("id" integer DEFAULT nextval('application_id_seq') NOT NULL,
    "id" character varying(50),
    "name" character varying(50),
    "usage_per_minute" character varying(50),
    CONSTRAINT "application_pkey" PRIMARY KEY ("id")
    ) WITH (oids = false)

-- first create SEQUENCE for id to increment by 1
CREATE SEQUENCE learner_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1

-- create learner table 
CREATE TABLE "learner" ("id" integer DEFAULT nextval('learner_id_seq') NOT NULL,
    "first_name" character varying(50),
    "last_name" character varying(50),
    "email" character varying(50),
    "usercode" character varying(50),
    "data_balance" integer,
    CONSTRAINT "learner_pkey" PRIMARY KEY ("id")
    ) WITH (oids = false)
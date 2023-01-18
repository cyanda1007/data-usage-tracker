
-- first create SEQUENCE for id to increment by 1
CREATE SEQUENCE learner_application_usage_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1

-- create learner_application_usage table 
CREATE TABLE "learner_application_usage" ("id" integer DEFAULT nextval('learner_application_usage_id_seq') NOT NULL,
    "leaner_id" character varying(50),
    "app_id" character varying(50),
    "minutes_used" character varying(50),
    CONSTRAINT "learner_application_usage_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "fk_learner" FOREIGN KEY(leaner_id)  REFERENCES learner(id) ON DELETE SET NULL,
    CONSTRAINT "fk_application" FOREIGN KEY(app_id)  REFERENCES application(id) ON DELETE SET NULL
    ) WITH (oids = false)
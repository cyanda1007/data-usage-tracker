create table learner (
	id serial not null primary key,
	first_name text not null,
    last_name text not null,
    email  varchar(80),
    usercode text not null,
    data_balance int text
);

create table applications (
id serial not null primary key,
first_name text not null,
usage_per_minute numeric text
);

create table learner_application_usage(
    id serial not null primary key,
   foreign key learner_id serial not null primary key,
   foreign key app_id serial not null primary key,
    minutes_used int 
);
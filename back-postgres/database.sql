create Table users(
 id serial primary key,
 email varchar(255) ,
 name varchar(255),
 phone varchar(255),
 password varchar(255),
 image TEXT

);
create table posts(
 id serial primary key,
 titile varchar(255),
 description varchar(255),
 user_id integer,
 foreign key (user_id) references users (id)
);

create table user_followers(
 id serial primary key,
 user_id integer,
 follower_id integer,
 foreign key (user_id) references users (id),
 foreign key (follower_id) references users (id)
);



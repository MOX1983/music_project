create table users (
	user_id serial primary key, 
	login varchar(50) not null unique,
	email varchar(255) not null unique,
	password_hash varchar(255) not null
);

create table tracks(
	track_id serial primary key,
	title varchar(255) not null,
	author varchar(255) not null,
	path_file varchar(255) not null
);

create table users_tracks(
	user_id int,
	track_id int,
	primary key (user_id, track_id),
	foreign key (user_id) references users(user_id) 
		on delete cascade 
		on update cascade,
	foreign key (track_id ) references tracks(track_id)
		on delete cascade
		on update cascade
);

insert into users(login, email, password_hash)
values('admin', 'admin@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

select *
from users;

delete from users 
where user_id = 2;



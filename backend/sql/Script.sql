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
	path_file varchar(255) not null,
	duration time not null,
	category varchar(255),
	picture varchar(255)
);

create table users_tracks(
	user_id int,
	track_id int,
	foreign key (user_id) references users(user_id) 
		on delete cascade 
		on update cascade,
	foreign key (track_id ) references tracks(track_id)
		on delete cascade
		on update cascade
);

insert into users(login, email, password_hash)
values('admin', 'admin@gmail.com', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

insert into tracks(title, author, path_file, duration) 
values ('test_mus23gdfg d 23', 'mox lox', '/test/path', '00:03:50');

insert into users_tracks(user_id, track_id)
values (4, 2), (4, 3), (4, 4);


select *
from users;

select *
from tracks;

select *
from users_tracks;

select ut.user_id, ut.track_id , t.title, t.author, t.path_file
from users_tracks ut
left join tracks t on ut.track_id = t.track_id
where ut.user_id = 1;

select ut.user_id, ut.track_id, t.title, t.author, t.path_file
from users_tracks ut
left join tracks t on ut.track_id = t.track_id
where ut.user_id = 1 and ut.track_id = 2;


delete from users 
where user_id = 7;




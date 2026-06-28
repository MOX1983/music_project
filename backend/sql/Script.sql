create table users (
	user_id serial primary key, 
	login varchar(50) not null unique,
	email varchar(255) not null unique,
	password_hash varchar(255) not null,
	photo varchar(255)
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

--insert into users(login, email, password_hash, photo)
--values('admin', 'admin@gmail.com', 'e7e50bf29236bc06836d573b43514a24cec854a71ca4fbd454c0b9c1a2b91df4', 'cat.jpg' ); 

update users 
set photo = '/img/cat.jpg'
where user_id = 1; --admin678

insert into tracks(title, author, path_file, duration, picture) 
values ('НАЙТИ СЕБЯ', 'SUTKI, ДЛЯ ДУР', 'tmp6r6876fb.mp3', '02:08', '/img/cat.jpg'),
('This Fire', 'Franz Ferdinand', 'Franz_Ferdinant-This_fire.mp3', '04:14', '/img/cat.jpg'),
('Обнял, поцеловал', 'Whole Lotta Swag', '-2001704121_148704121_8996afef-c23.mp3', '02:38', '/img/photo_2026-04-10_21-41-02.jpg');

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




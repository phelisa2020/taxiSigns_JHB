  create table player (
    id serial primary key not null,
    names text
    );  

    create table taxiSigns (
    id serial primary key not null,
    nameSigns text,
    modelTag int);

    create table playerTaxiSigns(
	player_id int not null,
	taxiSigns_id int not null,
    foreign key (player_id) references player(id),
	foreign key (taxiSigns_id) references taxiSigns (id)

);



insert into player(names) values ('Themba');
insert into player(names) values ('Patience');
insert into player(names) values ('Momeleze');
insert into player(names) values ('Phelisa');


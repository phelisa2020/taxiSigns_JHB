
DROP TABLE playertaxiSigns;

DROP TABLE playersigns_table;

DROP TABLE taxisigns_table;

create table players_table(
    id serial not null primary key,
    playername text not null
);

create table taxisigns_table(
    id serial not null primary key,
    signname text not null,
    tm_model_tag int
);

create table playertaxisigns_table(
    id serial not null primary key,
    player_id int not null,
    taxisigns_id int not null,
    player_score int not null,
    foreign key (player_id) references players_table(id),
    foreign key (taxisigns_id) references taxisigns_table(id)
);

insert into
    players_table(playername)
values
    ('Themba');

insert into
    players_table(playername)
values
    ('Patience');

insert into
    players_table(playername)
values
    ('Momeleze');

insert into
    players_table(playername)
values
    ('Phelisa');

Insert into
    taxiSigns_table(signname, tm_model_tag)
values
    ('Central', '2');

Insert into
    taxiSigns_table(signname, tm_model_tag)
values
    ('Fourways', '3');

Insert into
    taxiSigns_table(signname, tm_model_tag)
values
    ('Midrand', '1');

Insert into
    playertaxisigns_table(player_id, taxisigns_id, player_score)
values
    ('1', '1', '2');

Insert into
    playertaxisigns_table(player_id, taxisigns_id, player_score)
values
    ('2', '1', '3');

Insert into
    playertaxisigns_table(player_id, taxisigns_id, player_score)
values
    ('3', '2', '1');

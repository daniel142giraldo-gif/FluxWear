CREATE DATABASE Flux_Wear CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE Flux_Wear;

create table usuarios (
id_usuario int auto_increment primary key,
nombre varchar(50) not null,
nombre_usuario varchar(50) not null unique,
correo varchar(100) not null unique,
password varchar(255) not null,
telefono varchar(20) not null unique,
fecha_nacimiento date not null,
peso decimal(5,2) not null,
estatura decimal(3,2) not null,
verificado boolean not null default FALSE,
foto_perfil varchar(255) not null,
biografia varchar(255) null,
fecha_registro timestamp default current_timestamp,
check(peso is null or peso between 5 and 200),
check(estatura is null or estatura between 0.50 and 2.60)
);

create table estilos (
id_estilos int auto_increment primary key,
nombre varchar(40) not null unique
);

insert into estilos (nombre) values 
('Casual'), ('Formal'), ('Urbano'), ('Deportivo'),
('Vintage'), ('Elegante'), ('Minimalista'), ('Bohemio');

		select * from estilos order by id_estilos asc;

create table categorias_prenda (
id_categoria int auto_increment primary key,
nombre varchar(40) not null unique
);

insert into categorias_prenda (nombre) values
('Camisa/Camiseta'), ('Pantalón'), ('Falda/Vestido'), ('Chaqueta/Abrigo'),
('Zapatos'), ('Accesorios'), ('Ropa deportiva'), ('Ropa interior');

		select * from categorias_prenda order by id_categoria asc;

create table verificaciones (
id_verificacion int auto_increment primary key,
id_usuario int not null,
red_social enum('instagram','tiktok','youtube','facebook','x','otra') not null,
enlace_perfil varchar(255) not null,
seguidores_externos int unsigned null,
estado enum('pendiente','aprobada','rechazada') not null default 'pendiente',
motivo_rechazo varchar(255) null,
fecha_solicitud timestamp default current_timestamp,
fecha_respuesta timestamp null,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade

);

ALTER TABLE usuarios MODIFY foto_perfil VARCHAR(255) NULL;
ALTER TABLE usuarios MODIFY biografia   VARCHAR(255) NULL;

insert into usuarios (nombre, nombre_usuario, correo, password, telefono, fecha_nacimiento, peso, estatura)
values ('Daniel Giraldo','Mono777','mono@gmail.com','123','+573026000260','2003-05-12','58.8','1.75');
insert into verificaciones (id_usuario, red_social, enlace_perfil, seguidores_externos)
values (3,'instagram','https://instagram.com/mono777', 25000);

		select v.id_verificacion, u.nombre_usuario, v.red_social, v.enlace_perfil, v.seguidores_externos
		from verificaciones v
		join usuarios u on u.id_usuario = v.id_usuario
		where v.estado = 'pendiente'
		order by v.fecha_solicitud;

update verificaciones 
set estado = 'aprobada', fecha_respuesta = now()
where id_verificacion = 1;

update usuarios set verificado = true where id_usuario = 1;

		select nombre, nombre_usuario, verificado, timestampdiff(year, fecha_nacimiento, curdate()) as edad
		from usuarios;

		select id_verificacion, id_usuario, red_social, estado, fecha_respuesta
		from verificaciones;

show triggers from Flux_Wear;

use flux_wear;

DELIMITER $$

create trigger trg_verificacion_aprobada
after update on verificaciones
for each row
begin
  if new.estado = 'aprobada' and old.estado <> 'aprobada' then
    update usuarios set verificado = true where id_usuario = new.id_usuario;
  end if;
end$$

DELIMITER ;

show triggers from flux_wear;

SET SQL_SAFE_UPDATES = 0;
UPDATE usuarios SET verificado = TRUE WHERE nombre_usuario = 'Mono777';

		show tables;

		select count(*) as estilos from estilos;
		select count(*) as categorias from categorias_prenda;

create table usuario_estilos (
id_usuario int not null,
id_estilos int not null,
primary key (id_usuario, id_estilos),
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_estilos) references estilos(id_estilos) on delete cascade
);

create table prendas (
id_prenda int auto_increment primary key,
id_usuario int not null,
id_categoria int not null,
nombre varchar(80) not null,
color varchar(30) null,
marca varchar(50) null,
talla varchar(10) null,
temporada enum('verano','invierno','otoño','primavera','todo el año') not null default 'todo el año',
imagen varchar(255) null,
fecha timestamp default current_timestamp,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_categoria) references categorias_prenda(id_categoria)
);

insert into usuario_estilos (id_usuario, id_estilos)
values
(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_estilos from estilos where nombre = 'Casual')
),
(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_estilos from estilos where nombre = 'Urbano')
);

insert into prendas (id_usuario, id_categoria, nombre, color, marca, talla, temporada )
values
(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_categoria from categorias_prenda where nombre = 'Camisa/Camiseta'),
'Camiseta blanca basica', 'blanco', 'Nike','M','todo el año'
),
(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_categoria from categorias_prenda where nombre = 'Pantalon'),
'Jeans azules', 'azul', 'Levis','30','todo el año'
),
(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_categoria from categorias_prenda where nombre = 'Zapatos'),
'Tenis blancos', 'blanco', 'Adidas','41','todo el año'
);

		select u.nombre_usuario, e.nombre as estilos
		from usuario_estilos ue
		join usuarios u on u.id_usuario = ue.id_usuario
		join estilos e on e.id_estilos = ue.id_estilos
		where u.nombre_usuario = 'Mono777';

		select p.nombre, p.color, p.marca, p.talla, c.nombre as categoria
		from prendas p
		join categorias_prenda c on c.id_categoria = p.id_categoria
		join usuarios u on u.id_usuario = p.id_usuario
		where u.nombre_usuario = 'Mono777';

insert into usuario_estilos (id_usuario, id_estilos)
values (
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_estilos from estilos where nombre = 'Casual')
);

		show tables;

		select count(*) as estilos from estilos;
		select count(*) as categorias from categorias_prenda;
		select count(*) as usuarios from usuarios where nombre_usuario = 'Mono777';
		select count(*) as prendas_daniel
		from prendas p join usuarios u on u.id_usuario = p.id_usuario
		where u.nombre_usuario = 'Mono777';

		select table_name, engine 
		from information_schema.tables
		where table_schema = 'Flux_Wear';

describe prendas;
describe usuario_estilos;


create table outfits (
id_outfit int auto_increment primary key,
id_usuario int not null,
id_estilos int null,
nombre varchar(80) not null,
ocasion varchar(50) null,
descripcion varchar(255) null,
fecha timestamp default current_timestamp,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_estilos) references estilos(id_estilos) on delete set null
);


create table outfit_prendas (
id_outfit int not null,
id_prenda int not null,
primary key (id_outfit, id_prenda),
foreign key (id_outfit) references outfits(id_outfit) on delete cascade,
foreign key (id_prenda) references prendas(id_prenda) on delete cascade
);

insert into outfits (id_usuario, id_estilos, nombre, ocasion, descripcion)
values (
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_estilos from estilos where nombre = 'Casual'),
'Look casual de diario',
'diario',
'Basico y comodo para el dia a dia'
);

insert into outfit_prendas (id_outfit, id_prenda)
select o.id_outfit, p.id_prenda
from outfits o 
join prendas p on p.id_usuario = o.id_usuario
where o.nombre = 'Look casual de diario'
and p.nombre in ('Camiseta blanca basica','Jeans azules','Tenis blancos');

		select o.nombre as outfit, p.nombre as prenda, p.color, c.nombre as categoria
		from outfit_prendas op
		join outfits o on o.id_outfit = op.id_outfit
		join prendas p on p.id_prenda = op.id_prenda
		join categorias_prenda c on c.id_categoria = p.id_categoria
		where o.nombre = 'Look casual de diario';

		select o.nombre, o.ocasion, e.nombre as estilos, count(op.id_prenda) as total_prendas
		from outfits o 
		left join estilos e on e.id_estilos = o.id_estilos
		left  join outfit_prendas op on op.id_outfit = o.id_outfit
		join usuarios u on u.id_usuario = o.id_usuario
		where u.nombre_usuario = 'Mono777'
		group by o.id_outfit, o.nombre, o.ocasion, e.nombre;


insert into outfit_prendas (id_outfit, id_prenda)
select o.id_outfit, p.id_prenda
from outfits o 
join prendas p on p.id_usuario = o.id_usuario
where o.nombre = 'Look casual de diario' and p.nombre = 'Jeans azules';

set sql_safe_updates = 0;

insert into outfits (id_usuario, nombre)
values((select id_usuario from usuarios where nombre_usuario = 'Mono777'),'Outfit temporal');

delete from outfits where nombre = 'Outfit temporal';

		select count(*) as prendas_en_armario from prendas;

		show tables;

		describe outfits;
		describe outfit_prendas;

create table seguidores (
id_seguidor int not null,
id_seguido int not null,
fecha timestamp default current_timestamp,
primary key (id_seguidor, id_seguido),
foreign key (id_seguidor) references usuarios(id_usuario) on delete cascade,
foreign key (id_seguido) references usuarios(id_usuario) on delete cascade,
check (id_seguidor <> id_seguido)
);

insert into  usuarios (nombre, nombre_usuario, correo, password, telefono, fecha_nacimiento, peso, estatura)
values ('Thomas','Alguien','thomas@gmail.com','321','+573204608293','2007-09-20',64.3,1.74);

		select id_usuario, nombre, nombre_usuario from usuarios;

insert into seguidores (id_seguidor, id_seguido)
values (
(select id_usuario from usuarios where nombre_usuario = 'Alguien'),
(select id_usuario from usuarios where nombre_usuario = 'Mono777')
);

insert into seguidores (id_seguidor, id_seguido)
values (
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_usuario from usuarios where nombre_usuario = 'Alguien')
);

		select u.nombre_usuario,
		(select count(*) from seguidores where id_seguido = u.id_usuario) as seguidores,
		(select count(*) from seguidores where id_seguidor = u.id_usuario) as seguidos
		from usuarios u;

		select u.nombre_usuario 
		from seguidores s 
		join usuarios u on u.id_usuario = s.id_seguido
		where s.id_seguidor = (select id_usuario from usuarios where nombre_usuario = 'Mono777');

		select u.nombre_usuario
		from seguidores s 
		join usuarios u on u.id_usuario = s.id_seguidor 
		where s.id_seguido = (select id_usuario from usuarios where nombre_usuario = 'Mono777');

		insert into seguidores (id_seguidor, id_seguido)
		values (
		(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
		(select id_usuario from usuarios where nombre_usuario = 'Mono777')
		);
        
        set sql_safe_updates = 0;
        
        delete from seguidores 
        where id_seguidor = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
        and id_seguido = (select id_usuario from usuarios where nombre_usuario = 'Mono777');
        
        show tables;
        describe seguidores;
        describe prendas;
        
create table temporadas (
id_temporada int auto_increment primary key,
nombre varchar (40) not null unique
);

insert into temporadas (nombre) 
values ('Verano'), ('Invierno'), ('Otoño'), ('Primavera');

create table prenda_temporadas (
id_prenda int not null,
id_temporada int not null,
primary key (id_prenda, id_temporada),
foreign key (id_prenda) references prendas(id_prenda) on delete cascade,
foreign key (id_temporada) references temporadas(id_temporada) on delete cascade
);

insert ignore into prenda_temporadas (id_prenda, id_temporada)
select p.id_prenda, t.id_temporada
from prendas p
join temporadas t 
on p.temporada = 'todo el año'
or t.nombre = p.temporada;

		select p.nombre, p.temporada as temporada_vieja,
		group_concat(t.nombre order by t.id_temporada separator ', ') as temporadas_nuevas
		from prendas p 
		left join prenda_temporadas pt on pt.id_prenda = p.id_prenda
		left join temporadas t on t.id_temporada = pt.id_temporada
		group by p.id_prenda, p.nombre, p.temporada;

alter table prendas drop column temporas;
		select * from prendas;

insert into prendas (id_usuario, id_categoria, nombre, color, marca, talla)
values(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_categoria from categorias_prenda where nombre = 'Chaqueta/Abrigo'),
'Caqueta de cuero negra', 'negro', 'Zara', 'M'
);

insert into prenda_temporadas (id_prenda, id_temporada)
select p.id_prenda, t.id_temporada
from prendas p 
join temporadas t 
where p.nombre = 'Chaqueta de cuero negra'
and t.nombre in ('Otoño','Invierno');

		select p.nombre,
		group_concat(t.nombre order by t.id_temporada separator', ') as temporadas
		from prendas p 
		left join prenda_temporadas pt on pt.id_prenda = p.id_prenda
		left join temporadas t on t.id_temporada = pt.id_temporada
		group by p.id_prenda, p.nombre;

		select p.nombre, p.color
		from prendas p
		join prenda_temporadas pt on pt.id_prenda = p.id_prenda
		join temporadas t on t.id_temporada = pt.id_temporada
		where t.nombre = 'Invierno';

insert into prenda_temporadas (id_prenda, id_temporada)
select p.id_prenda, t.id_temporada
from prendas p join temporadas t 
where p.nombre = 'Chaqueta de cuero negra' and t.nombre = 'Otoño';

show tables;
describe prendas;

create table publicaciones (
id_publicacion int auto_increment primary key,
id_usuario int not null,
id_outfit int null,
id_estilos int null,
texto text null,
anclada  boolean not null default false,
fecha timestamp default current_timestamp,
fecha_edicion timestamp null,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_outfit) references outfits(id_outfit) on delete set null,
foreign key (id_estilos) references estilos(id_estilos) on delete set null
);

create table multimedia (
id_multimedia int auto_increment primary key,
id_publicacion int not null,
tipo enum('foto','video') not null,
ruta varchar(255) not null,
orden tinyint not null default 1,
foreign key (id_publicacion) references publicaciones(id_publicacion) on delete cascade
);

insert into publicaciones (id_usuario, id_outfit, id_estilos, texto)
values (
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_outfit from outfits where nombre = 'Look casual de diario'),
(select id_estilos from estilos where nombre = 'Casual'),
'Mi outfit favorito para el dia a dia'
);

insert into publicaciones (id_usuario, id_estilos, texto)
values(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_estilos from estilos where nombre = 'Urbano'),
'Nuevo look urbano para el fin de semana'
);

insert into multimedia (id_publicacion, tipo, ruta, orden)
select id_publicacion, 'foto', 'uploads/outfits/look_casual_1.jpg', 1
from publicaciones where texto = 'Mi outfit favorito para el dia a dia';

insert into multimedia (id_publicacion, tipo, ruta, orden)
select id_publicacion, 'foto', 'uploads/outfits/look_casual_2.jpg', 2
from publicaciones where texto = 'Mi outfit favorito para el dia a dia';

insert into multimedia (id_publicacion, tipo, ruta, orden)
select id_publicacion, 'video', 'uploads/outfits/look_urbano.mp4', 1
from publicaciones where texto = 'Nuevo look urbano para el fin de semana';

		select p.id_publicacion, u.nombre_usuario, e.nombre as estilos, p.texto, p.anclada
		from publicaciones p 
		join usuarios u on u.id_usuario = p.id_usuario
		left join estilos e on e.id_estilos = p.id_estilos
		order by p.fecha desc;

		select p.texto, m.tipo, m.ruta, m.orden
		from publicaciones p 
		join multimedia m on m.id_publicacion = p.id_publicacion
		order by p.id_publicacion, m.orden;

		select p.id_publicacion, u.nombre_usuario, p.texto
		from publicaciones p 
		join usuarios u on u.id_usuario = p.id_usuario
		where p.id_usuario in (
				select id_seguido from seguidores
				where id_seguidor = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
				)
		order by p.anclada desc, p.fecha desc;

set sql_safe_updates = 0;

update publicaciones 
set anclada  = true
where texto = 'Mi outfit favorito para el dia a dia';

update publicaciones
set texto = 'Mi outfit favorito para el dia a dia ✨', fecha_edicion = now()
where anclada = true;

		select id_publicacion, texto, anclada, fecha_edicion from publicaciones;

delete from publicaciones where texto = 'Nuevo look urbano para el fin de semana';
		select count(*) as filas_multimedia from multimedia;

show tables;
describe publicaciones;
describe multimedia;

create table comentarios (
id_comentario int auto_increment primary key,
id_publicacion int not null,
id_usuario int not null,
texto text not null,
fecha timestamp default current_timestamp,
foreign key (id_publicacion) references publicaciones(id_publicacion) on delete cascade,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade
);

create table likes (
id_usuario int not null,
id_publicacion int not null,
fecha timestamp default current_timestamp,
primary key (id_usuario, id_publicacion),
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_publicacion) references publicaciones(id_publicacion) on delete cascade
);

create table favoritos (
id_usuario int not null,
id_publicacion int not null,
fecha timestamp default current_timestamp,
primary key (id_usuario, id_publicacion),
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_publicacion) references publicaciones(id_publicacion) on delete cascade
);

create table compartidos (
id_compartido int auto_increment primary key,
id_usuario int not null,
id_publicacion int not null,
fecha timestamp default current_timestamp,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_publicacion) references publicaciones(id_publicacion) on delete cascade
);

create table mensajes(
id_mensaje int auto_increment primary key,
id_emisor int not null,
id_receptor int not null,
texto text not null,
leido boolean not null default false,
fecha timestamp default current_timestamp,
foreign key (id_emisor) references usuarios(id_usuario) on delete cascade,
foreign key (id_receptor) references usuarios(id_usuario) on delete cascade,
check (id_emisor <> id_receptor),
index idx_conversacion (id_emisor, id_receptor, fecha),
index idx_no_leidos (id_receptor, leido)
);

insert into mensajes (id_emisor, id_receptor, texto)
values
(
(select id_usuario from usuarios where nombre_usuario = 'Alguien'),
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
'Hola, ¿donde compro los jeans que tienes?👖'
),
(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_usuario from usuarios where nombre_usuario = 'Alguien'),
'Hola, los compre en el centro comercial estan baratos'
),
(
(select id_usuario from usuarios where nombre_usuario = 'Alguien'),
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
'Muchas Gracias, me gusto su outfit'
);

		select u.nombre_usuario as emisor, m.texto, m.leido, m.fecha
		from mensajes m
		join usuarios u on u.id_usuario = m.id_emisor
		where (m.id_emisor = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
		and m.id_receptor = (select id_usuario from usuarios where nombre_usuario = 'Mono777'))
		or(m.id_emisor = (select id_usuario from usuarios where nombre_usuario = 'Mono777')
		and m.id_receptor = (select id_usuario from usuarios where nombre_usuario = 'Alguien'))
		order by m.fecha, m.id_mensaje;
        
        select count(*) as no_leidos
        from mensajes 
        where id_receptor = (select id_usuario from usuarios where nombre_usuario = 'Mono777')
        and leido = false;
        
set sql_safe_updates = 0;

update mensajes
set leido = true 
where id_receptor = (select id_usuario from usuarios where nombre_usuario = 'Mono777')
and id_emisor = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
and leido = false;

set @yo = (select id_usuario from usuarios where nombre_usuario = 'Mono777');

		select u.nombre_usuario as conversacion_con, m.texto as ultimo_mensaje, m.fecha
		from mensajes m
		join usuarios u on u.id_usuario = if(m.id_emisor = @yo, m.id_receptor, m.id_emisor)
		where m.id_mensaje in (
			select max(id_mensaje)
			from mensajes where id_emisor = @yo or id_receptor = @yo
			group by least(id_emisor, id_receptor), greatest(id_emisor, id_receptor)
		)
		order by m.fecha desc;

insert into mensajes (id_emisor, id_receptor, texto)
values(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
'Hola yo'
);

show tables;
describe mensajes;
show index from mensajes;

alter table usuarios 
add column rol enum('usuario','admin') not null default 'usuario';

set sql_safe_updates = 0;
update usuarios set rol = 'admin' where nombre_usuario = 'Alguien';

describe usuarios;

create table bloqueos (
id_bloqueador int not null,
id_bloqueado int not null,
fecha timestamp default current_timestamp,
primary key (id_bloqueador, id_bloqueado),
foreign key (id_bloqueador) references usuarios(id_usuario) on delete cascade,
foreign key (id_bloqueado) references usuarios(id_usuario) on delete cascade,
check (id_bloqueador <> id_bloqueado)
);

create trigger trg_bloqueo_quita_seguimientos
after insert on bloqueos 
for each row
delete from seguidores 
where (id_seguidor = new.id_bloqueador and id_seguido = new.id_bloqueado)
or (id_seguidor = new.id_bloqueado and id_seguido = new.id_bloqueador);

delimiter $$

create trigger trg_validar_mensaje
before insert on mensajes
for each row
begin 
	if exists(
		select 1 from bloqueos 
		where (id_bloqueador = new.id_emisor and id_bloqueado = new.id_receptor)
			or (id_bloqueador = new.id_receptor and id_bloqueado = new.id_emisor)
	) then
		signal sqlstate '45000'
			set message_text = 'No puedes enviar mensajes a este usuario';
		end if;
        
        if(select perfil_restringido from usuarios where id_usuario = new.id_receptor) = true
			and not exists (
				select 1 from seguidores 
				where id_seguidores = new.id_receptor and id_seguido = new.id_emisor
            )
            and not exists (
				select 1 from mensajes
				where id_emisor = new.id_receptor and id_receptor  = new.id_emisor
            )then
            signal sqlstate '45000'
				set message_text = 'Este usuario solo recibe mensajes de personas que sigue'; 
			end if;
		end$$
            
		delimiter ;

insert into bloqueos (id_bloqueador, id_bloqueado)
values (
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_usuario from usuarios where nombre_usuario = 'Alguien')
);

		select count(*) as seguimientos_entre_ellos
        from seguidores
        where id_seguidor in (select id_usuario from usuarios where nombre_usuario in ('Mono777','Alguien'))
        and id_seguido in (select id_usuario from usuarios where nombre_usuario in ('Mono777','Alguien'));
        
insert into mensajes (id_emisor, id_receptor, texto)
values (
(select id_usuario from usuarios where nombre_usuario = 'Alguien'),
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
'Hola,¿sigues ahi?'
);

insert into mensajes (id_emisor, id_receptor, texto)
values(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_usuario from usuarios where nombre_usuario = 'Alguien'),
'Te escribo yo'
);

set sql_safe_updates = 0;

delete from bloqueos 
where id_bloqueador = (select id_usuario from usuarios where nombre_usuario = 'Mono777')
and id_bloqueado = (select id_usuario from usuarios where nombre_usuario = 'Alguien');

insert into usuarios (nombre, nombre_usuario, correo, password,  telefono, fecha_nacimiento, peso, estatura)
values('Prueba', 'prueba_msg','prueba@ejemplo.com','111','+573000000001', '2000-01-01', 60.00, 1.70);

update usuarios set perfil_restringido = true where nombre_usuario = 'Mono777';

insert into mensajes (id_emisor, id_receptor, texto)
values(
(select id_usuario from usuarios where nombre_usuario = 'prueba_msg'),
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
'Hola desde un perfil que Mono777 no sigue'
);

insert into seguidores (id_seguidor, id_seguido)
values(
(select id_usuario from usuarios where nombre_usuario = 'Mono777'),
(select id_usuario from usuarios where nombre_usuario = 'prueba_msg')
);

update usuarios set perfil_restringido = false where nombre_usuario = 'Mono777';
delete from usuarios where nombre_usuario = 'prueba_msg';

		select u.nombre_usuario, b.fecha
		from bloqueos b
		join usuarios u on u.id_usuario = b.id_bloqueado
		where b.id_bloqueador = (select id_usuario from usuarios where nombre_usuario = 'Mono777');


		select p.id_publicacion, u.nombre_usuario, p.texto
		from publicaciones p
		join usuarios u on u.id_usuario = p.id_usuario
		where p.id_usuario in (
				select id_seguido from seguidores
				where id_seguidor = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
			  )
		and p.id_usuario not in (
			select id_bloqueado from bloqueos where id_bloqueador = 1
			union 
			select id_bloqueador from bloqueos where id_bloqueado = 1
		)
		order by p.anclada desc, p.fecha desc;

show tables;
show triggers from flux_wear;
describe usuarios;

		select table_name, engine
        from information_schema.tables
        where table_schema = 'flux_wear';
        
        select table_name, column_name,referenced_table_name, referenced_column_name
        from information_schema.key_column_usage
        where table_schema = 'flux_wear' and referenced_table_name is not null
        order by table_name;
        
insert into usuarios (nombre, nombre_usuario, correo, password, telefono, fecha_nacimiento, peso, estatura)
values ('Sofía Ruiz', 'sofi_look', 'sofia@ejemplo.com', '123', '+573000000002', '2001-03-08', 55.00, 1.62);

insert into publicaciones (id_usuario, id_estilos, texto)
values (
(select id_usuario from usuarios where nombre_usuario = 'sofi_look'),
(select id_estilos from estilos where nombre = 'Casual'),
'Outfit casuala para la universidad'
);

insert into publicaciones (id_usuario, id_estilos, texto)
values(
(select id_usuario from usuarios where nombre_usuario = 'sofi_look'),
(select id_estilos from estilos where nombre = 'Elegante'),
'Look elegante para una cena'
);

insert into likes (id_usuario, id_publicacion)
select  u.id_usuario, p.id_publicacion
from usuarios u join publicaciones p
where u.nombre_usuario = 'Alguien' and p.texto like 'Mi outfit favorito%';

insert into favoritos (id_usuario, id_publicacion)
select  u.id_usuario, p.id_publicacion
from usuarios u join publicaciones p
where u.nombre_usuario = 'Alguien' and p.texto like 'Mi outfit favorito%';

insert into comentarios (id_publicacion, id_usuario, texto)
select  p.id_publicacion, u.id_usuario, '¡Me encanta ese look!'
from usuarios u join publicaciones p
where u.nombre_usuario = 'Alguien' and p.texto like 'Mi outfit favorito%';

insert into compartidos (id_usuario, id_publicacion)
select u.id_usuario, p.id_publicacion
from usuarios u join publicaciones p
where u.nombre_usuario = 'Alguien'and p.texto like 'Mi outfit favorito%';

		select p.id_publicacion, p.texto,
		  (select COUNT(*) from likes       where id_publicacion = p.id_publicacion) as likes,
		  (select COUNT(*) from comentarios where id_publicacion = p.id_publicacion) as comentarios,
		  (select COUNT(*) from favoritos   where id_publicacion = p.id_publicacion) as favoritos,
		  (select COUNT(*) from compartidos where id_publicacion = p.id_publicacion) as compartidos
		from publicaciones p;
        
insert into likes (id_usuario, id_publicacion)
select u.id_usuario, p.id_publicacion
from usuarios u join publicaciones p
where u.nombre_usuario = 'Alguien' and p.texto like 'Mi outfit favorito%';

		select u.nombre_usuario, u.nombre, u.verificado, u.biografia,
		  (select COUNT(*) from seguidores   where id_seguido  = u.id_usuario) as seguidores,
		  (select COUNT(*) from seguidores   where id_seguidor = u.id_usuario) as seguidos,
		  (select COUNT(*) from publicaciones where id_usuario = u.id_usuario) as publicaciones,
		  exists (select 1 from seguidores
				  where id_seguidor = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
					and id_seguido  = u.id_usuario) as lo_sigo
		from usuarios u
		where u.nombre_usuario = 'Mono777';
        
        select id_publicacion, texto, anclada, fecha
		from publicaciones
		where id_usuario = (select id_usuario from usuarios where nombre_usuario = 'Mono777')
		order by anclada desc, fecha desc;
        
        select p2.id_publicacion, p2.texto
		from publicaciones p1
		join publicaciones p2 on p2.id_usuario = p1.id_usuario
							 and p2.id_publicacion <> p1.id_publicacion
		where p1.texto like 'Mi outfit favorito%'
		order by  p2.fecha desc;
        
        select u.nombre_usuario as seguidor
		from seguidores s join usuarios u ON u.id_usuario = s.id_seguidor
		where s.id_seguido = (select id_usuario from usuarios where nombre_usuario = 'Mono777');

		select u.nombre_usuario as seguido
		from seguidores s join usuarios u ON u.id_usuario = s.id_seguido
		where s.id_seguidor = (select id_usuario from usuarios where nombre_usuario = 'Mono777');
        
        select u.nombre_usuario, c.texto, c.fecha
		from comentarios c
		join usuarios u on u.id_usuario = c.id_usuario
		where c.id_publicacion = (select id_publicacion from publicaciones where texto like 'Mi outfit favorito%' limit 1)
		order by c.fecha;
        
        select p.id_publicacion, u.nombre_usuario, e.nombre as estilo, p.texto, COUNT(*) as afinidad
		from publicaciones p
		join usuarios u on u.id_usuario = p.id_usuario
		join estilos e  on e.id_estilos = p.id_estilos
		where p.id_estilos in (
				select p2.id_estilos from favoritos f
				join publicaciones p2 on p2.id_publicacion = f.id_publicacion
				where f.id_usuario = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
				  and p2.id_estilos is not null
				union
				select p3.id_estilos from likes l
				join publicaciones p3 on p3.id_publicacion = l.id_publicacion
				where l.id_usuario = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
				  and p3.id_estilos is not null
			  )
		  and p.id_usuario <> (select id_usuario from usuarios where nombre_usuario = 'Alguien')
		  and p.id_publicacion not in (
				select id_publicacion FROM favoritos
				where id_usuario = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
			  )
		  and p.id_usuario not in (
				select id_bloqueado  from bloqueos where id_bloqueador = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
				union
				select id_bloqueador from bloqueos where id_bloqueado  = (select id_usuario from usuarios where nombre_usuario = 'Alguien')
			  )
		group by p.id_publicacion, u.nombre_usuario, e.nombre, p.texto, p.fecha
		order by afinidad desc, p.fecha desc
		limit 20;
        
insert into favoritos (id_usuario, id_publicacion)
select u.id_usuario, p.id_publicacion
from usuarios u join publicaciones p
where u.nombre_usuario = 'Alguien' and p.texto = 'Look elegante para una cena';

update usuarios set perfil_restringido = true where nombre_usuario = 'sofi_look';

insert into mensajes (id_emisor, id_receptor, texto)
values (
  (select id_usuario from usuarios where nombre_usuario = 'Mono777'),
  (select id_usuario from usuarios where nombre_usuario = 'sofi_look'),
  'Hola Sofía'
);

insert into  seguidores (id_seguidor, id_seguido)
values (
  (select id_usuario from usuarios where nombre_usuario = 'sofi_look'),
  (select id_usuario from usuarios where nombre_usuario = 'Mono777')
);

update usuarios set perfil_restringido = false where nombre_usuario = 'sofi_look';
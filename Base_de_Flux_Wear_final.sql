CREATE DATABASE Flux_Wear CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE Flux_Wear;

create table usuarios (
id_usuario int auto_increment primary key,
nombre varchar(50) not null,
nombre_usuario varchar(50) not null unique,
correo varchar(100) not null unique,
password varchar(255) not null,
telefono varchar(20) null unique,
fecha_nacimiento date null,
peso decimal(5,2) null,
perfil_restringido BOOLEAN NOT NULL DEFAULT FALSE,
estatura decimal(3,2) null,
verificado boolean not null default FALSE,
foto_perfil varchar(255) null,
biografia varchar(255) null,
rol enum('usuario','admin') not null default 'usuario',
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

create table categorias_prenda (
id_categoria int auto_increment primary key,
nombre varchar(40) not null unique
);

insert into categorias_prenda (nombre) values
('Camisa/Camiseta'), ('Pantalón'), ('Falda/Vestido'), ('Chaqueta/Abrigo'),
('Zapatos'), ('Accesorios'), ('Ropa deportiva'), ('Ropa interior');

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
imagen varchar(255) null,
fecha timestamp default current_timestamp,
foreign key (id_usuario) references usuarios(id_usuario) on delete cascade,
foreign key (id_categoria) references categorias_prenda(id_categoria)
);

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

create table seguidores (
id_seguidor int not null,
id_seguido int not null,
fecha timestamp default current_timestamp,
primary key (id_seguidor, id_seguido),
foreign key (id_seguidor) references usuarios(id_usuario) on delete cascade,
foreign key (id_seguido) references usuarios(id_usuario) on delete cascade,
check (id_seguidor <> id_seguido)
);

        
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
fecha_edicion timestamp null,
eliminado_para_todos BOOLEAN NOT NULL DEFAULT FALSE,
fecha_eliminacion_global timestamp null,
fecha_limite_recuperacion timestamp null,
fecha_entregado timestamp null,
fecha_leido timestamp null,
foreign key (id_emisor) references usuarios(id_usuario) on delete cascade,
foreign key (id_receptor) references usuarios(id_usuario) on delete cascade,
index idx_conversacion (id_emisor, id_receptor, fecha),
index idx_no_leidos (id_receptor, leido)
);

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

DELIMITER $$

CREATE TRIGGER trg_validar_mensaje
BEFORE INSERT ON mensajes
FOR EACH ROW
BEGIN

    -- Permitir notas personales
    IF NEW.id_emisor = NEW.id_receptor THEN

        SET NEW.leido = TRUE;
        SET NEW.fecha_leido = CURRENT_TIMESTAMP;

    ELSE

        -- Impedir mensajes entre usuarios que se han bloqueado
        IF EXISTS (
            SELECT 1
            FROM bloqueos
            WHERE
                (id_bloqueador = NEW.id_emisor
                 AND id_bloqueado = NEW.id_receptor)
                OR
                (id_bloqueador = NEW.id_receptor
                 AND id_bloqueado = NEW.id_emisor)
        ) THEN

            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'No puedes enviar mensajes a este usuario';

        END IF;

    END IF;

END$$

DELIMITER ;

SHOW TRIGGERS FROM Flux_Wear;

create or replace view v_publicaciones_resumen as
select p.id_publicacion, p.id_usuario, p.id_outfit, p.id_estilos,
       p.texto, p.anclada, p.fecha, p.fecha_edicion,
  (select count(*) from likes       where id_publicacion = p.id_publicacion) as total_likes,
  (select count(*) from comentarios where id_publicacion = p.id_publicacion) as total_comentarios,
  (select count(*) from favoritos   where id_publicacion = p.id_publicacion) as total_favoritos,
  (select count(*) from compartidos where id_publicacion = p.id_publicacion) as total_compartidos
from  publicaciones p;

CREATE TABLE mensajes_usuarios (
  id_mensaje INT NOT NULL,
  id_usuario INT NOT NULL,

  oculto TINYINT(1) NOT NULL DEFAULT 0,
  fecha_eliminacion TIMESTAMP NULL DEFAULT NULL,
  fecha_limite_recuperacion TIMESTAMP NULL DEFAULT NULL,
  restaurable TINYINT(1) NOT NULL DEFAULT 0,

  PRIMARY KEY (id_mensaje, id_usuario),

  CONSTRAINT fk_mensajes_usuarios_mensaje
  FOREIGN KEY (id_mensaje)
  REFERENCES mensajes(id_mensaje)
  ON DELETE CASCADE,
  CONSTRAINT fk_mensajes_usuarios_usuario
  FOREIGN KEY (id_usuario)
  REFERENCES usuarios(id_usuario)
  ON DELETE CASCADE
);

CREATE TABLE historial_ediciones_mensajes (
  id_historial INT NOT NULL AUTO_INCREMENT,
  id_mensaje INT NOT NULL,
  texto_anterior TEXT NOT NULL,
  fecha_edicion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id_historial),

  INDEX idx_historial_mensaje (id_mensaje, fecha_edicion),

  CONSTRAINT fk_historial_mensaje
  FOREIGN KEY (id_mensaje)
  REFERENCES mensajes(id_mensaje)
  ON DELETE CASCADE
);
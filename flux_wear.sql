-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2026 a las 04:13:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `flux_wear`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bloqueos`
--

CREATE TABLE `bloqueos` (
  `id_bloqueador` int(11) NOT NULL,
  `id_bloqueado` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Disparadores `bloqueos`
--
DELIMITER $$
CREATE TRIGGER `trg_bloqueo_quita_seguimientos` AFTER INSERT ON `bloqueos` FOR EACH ROW delete from seguidores 
where (id_seguidor = new.id_bloqueador and id_seguido = new.id_bloqueado)
or (id_seguidor = new.id_bloqueado and id_seguido = new.id_bloqueador)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_prenda`
--

CREATE TABLE `categorias_prenda` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_prenda`
--

INSERT INTO `categorias_prenda` (`id_categoria`, `nombre`) VALUES
(6, 'Accesorios'),
(1, 'Camisa/Camiseta'),
(4, 'Chaqueta/Abrigo'),
(3, 'Falda/Vestido'),
(2, 'Pantalón'),
(7, 'Ropa deportiva'),
(8, 'Ropa interior'),
(5, 'Zapatos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL,
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id_comentario`, `id_publicacion`, `id_usuario`, `texto`, `fecha`) VALUES
(1, 1, 2, '¡Me encanta ese look!', '2026-11-10 03:11:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compartidos`
--

CREATE TABLE `compartidos` (
  `id_compartido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_publicacion` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compartidos`
--

INSERT INTO `compartidos` (`id_compartido`, `id_usuario`, `id_publicacion`, `fecha`) VALUES
(1, 2, 1, '2026-11-10 03:11:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estilos`
--

CREATE TABLE `estilos` (
  `id_estilos` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estilos`
--

INSERT INTO `estilos` (`id_estilos`, `nombre`) VALUES
(8, 'Bohemio'),
(1, 'Casual'),
(4, 'Deportivo'),
(6, 'Elegante'),
(2, 'Formal'),
(7, 'Minimalista'),
(3, 'Urbano'),
(5, 'Vintage');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id_usuario` int(11) NOT NULL,
  `id_publicacion` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id_usuario`, `id_publicacion`, `fecha`) VALUES
(2, 1, '2026-11-10 03:11:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `id_usuario` int(11) NOT NULL,
  `id_publicacion` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `likes`
--

INSERT INTO `likes` (`id_usuario`, `id_publicacion`, `fecha`) VALUES
(2, 1, '2026-11-10 03:11:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_mensaje` int(11) NOT NULL,
  `id_emisor` int(11) NOT NULL,
  `id_receptor` int(11) NOT NULL,
  `texto` text NOT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id_mensaje`, `id_emisor`, `id_receptor`, `texto`, `leido`, `fecha`) VALUES
(1, 2, 1, 'Hola, ¿donde compro los jeans que tienes?👖', 0, '2026-11-10 03:08:47'),
(2, 1, 2, 'Hola, los compre en el centro comercial estan baratos', 0, '2026-11-10 03:08:47'),
(3, 2, 1, 'Muchas Gracias, me gusto su outfit', 0, '2026-11-10 03:08:47'),
(4, 2, 1, 'Hola, ¿donde compro los jeans que tienes?👖', 0, '2026-11-10 03:08:58'),
(5, 1, 2, 'Hola, los compre en el centro comercial estan baratos', 0, '2026-11-10 03:08:58'),
(6, 2, 1, 'Muchas Gracias, me gusto su outfit', 0, '2026-11-10 03:08:58'),
(7, 2, 1, 'Hola, ¿donde compro los jeans que tienes?👖', 0, '2026-11-10 03:09:00'),
(8, 1, 2, 'Hola, los compre en el centro comercial estan baratos', 0, '2026-11-10 03:09:00'),
(9, 2, 1, 'Muchas Gracias, me gusto su outfit', 0, '2026-11-10 03:09:00');

--
-- Disparadores `mensajes`
--
DELIMITER $$
CREATE TRIGGER `trg_validar_mensaje` BEFORE INSERT ON `mensajes` FOR EACH ROW begin 
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
		end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimedia`
--

CREATE TABLE `multimedia` (
  `id_multimedia` int(11) NOT NULL,
  `id_publicacion` int(11) NOT NULL,
  `tipo` enum('foto','video') NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `orden` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `multimedia`
--

INSERT INTO `multimedia` (`id_multimedia`, `id_publicacion`, `tipo`, `ruta`, `orden`) VALUES
(1, 1, 'foto', 'uploads/outfits/look_casual_1.jpg', 1),
(2, 1, 'foto', 'uploads/outfits/look_casual_2.jpg', 2),
(3, 2, 'video', 'uploads/outfits/look_urbano.mp4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `outfits`
--

CREATE TABLE `outfits` (
  `id_outfit` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_estilos` int(11) DEFAULT NULL,
  `nombre` varchar(80) NOT NULL,
  `ocasion` varchar(50) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `outfits`
--

INSERT INTO `outfits` (`id_outfit`, `id_usuario`, `id_estilos`, `nombre`, `ocasion`, `descripcion`, `fecha`) VALUES
(1, 1, 1, 'Look casual de diario', 'diario', 'Basico y comodo para el dia a dia', '2026-11-10 03:00:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `outfit_prendas`
--

CREATE TABLE `outfit_prendas` (
  `id_outfit` int(11) NOT NULL,
  `id_prenda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `outfit_prendas`
--

INSERT INTO `outfit_prendas` (`id_outfit`, `id_prenda`) VALUES
(1, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prendas`
--

CREATE TABLE `prendas` (
  `id_prenda` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `color` varchar(30) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `talla` varchar(10) DEFAULT NULL,
  `temporada` enum('verano','invierno','otoño','primavera','todo el año') NOT NULL DEFAULT 'todo el año',
  `imagen` varchar(255) DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prendas`
--

INSERT INTO `prendas` (`id_prenda`, `id_usuario`, `id_categoria`, `nombre`, `color`, `marca`, `talla`, `temporada`, `imagen`, `fecha`) VALUES
(1, 1, 1, 'Camiseta blanca basica', 'blanco', 'Nike', 'M', 'todo el año', NULL, '2026-11-10 03:00:14'),
(2, 1, 2, 'Jeans azules', 'azul', 'Levis', '30', 'todo el año', NULL, '2026-11-10 03:00:14'),
(3, 1, 5, 'Tenis blancos', 'blanco', 'Adidas', '41', 'todo el año', NULL, '2026-11-10 03:00:14'),
(4, 1, 1, 'Camiseta blanca basica', 'blanco', 'Nike', 'M', 'todo el año', NULL, '2026-11-10 03:03:42'),
(5, 1, 2, 'Jeans azules', 'azul', 'Levis', '30', 'todo el año', NULL, '2026-11-10 03:03:42'),
(6, 1, 5, 'Tenis blancos', 'blanco', 'Adidas', '41', 'todo el año', NULL, '2026-11-10 03:03:42'),
(7, 1, 4, 'Caqueta de cuero negra', 'negro', 'Zara', 'M', 'todo el año', NULL, '2026-11-10 03:06:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prenda_temporadas`
--

CREATE TABLE `prenda_temporadas` (
  `id_prenda` int(11) NOT NULL,
  `id_temporada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prenda_temporadas`
--

INSERT INTO `prenda_temporadas` (`id_prenda`, `id_temporada`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(4, 1),
(4, 2),
(4, 3),
(4, 4),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(6, 1),
(6, 2),
(6, 3),
(6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `id_publicacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_outfit` int(11) DEFAULT NULL,
  `id_estilos` int(11) DEFAULT NULL,
  `texto` text DEFAULT NULL,
  `anclada` tinyint(1) NOT NULL DEFAULT 0,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_edicion` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`id_publicacion`, `id_usuario`, `id_outfit`, `id_estilos`, `texto`, `anclada`, `fecha`, `fecha_edicion`) VALUES
(1, 1, 1, 1, 'Mi outfit favorito para el dia a dia', 0, '2026-11-10 03:07:37', NULL),
(2, 1, NULL, 3, 'Nuevo look urbano para el fin de semana', 0, '2026-11-10 03:07:41', NULL),
(3, 3, NULL, 1, 'Outfit casuala para la universidad', 0, '2026-11-10 03:10:55', NULL),
(4, 3, NULL, 6, 'Look elegante para una cena', 0, '2026-11-10 03:11:02', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporadas`
--

CREATE TABLE `temporadas` (
  `id_temporada` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temporadas`
--

INSERT INTO `temporadas` (`id_temporada`, `nombre`) VALUES
(2, 'Invierno'),
(3, 'Otoño'),
(4, 'Primavera'),
(1, 'Verano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `peso` decimal(5,2) NOT NULL,
  `estatura` decimal(3,2) NOT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT 0,
  `foto_perfil` varchar(255) DEFAULT NULL,
  `biografia` varchar(255) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `nombre_usuario`, `correo`, `password`, `telefono`, `fecha_nacimiento`, `peso`, `estatura`, `verificado`, `foto_perfil`, `biografia`, `fecha_registro`) VALUES
(1, 'Daniel Giraldo', 'Mono777', 'mono@gmail.com', '123', '+573026000260', '2003-05-12', 58.80, 1.75, 1, NULL, NULL, '2026-11-10 03:00:14'),
(2, 'Thomas', 'Alguien', 'thomas@gmail.com', '321', '+573204608293', '2007-09-20', 64.30, 1.74, 0, NULL, NULL, '2026-11-10 03:04:53'),
(3, 'Sofía Ruiz', 'sofi_look', 'sofia@ejemplo.com', '123', '+573000000002', '2001-03-08', 55.00, 1.62, 0, NULL, NULL, '2026-11-10 03:10:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_estilos`
--

CREATE TABLE `usuario_estilos` (
  `id_usuario` int(11) NOT NULL,
  `id_estilos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_estilos`
--

INSERT INTO `usuario_estilos` (`id_usuario`, `id_estilos`) VALUES
(1, 1),
(1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verificaciones`
--

CREATE TABLE `verificaciones` (
  `id_verificacion` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `red_social` enum('instagram','tiktok','youtube','facebook','x','otra') NOT NULL,
  `enlace_perfil` varchar(255) NOT NULL,
  `seguidores_externos` int(10) UNSIGNED DEFAULT NULL,
  `estado` enum('pendiente','aprobada','rechazada') NOT NULL DEFAULT 'pendiente',
  `motivo_rechazo` varchar(255) DEFAULT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_respuesta` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `verificaciones`
--

INSERT INTO `verificaciones` (`id_verificacion`, `id_usuario`, `red_social`, `enlace_perfil`, `seguidores_externos`, `estado`, `motivo_rechazo`, `fecha_solicitud`, `fecha_respuesta`) VALUES
(1, 1, 'instagram', 'https://instagram.com/mono777', 25000, 'pendiente', NULL, '2026-11-10 03:00:14', NULL);

--
-- Disparadores `verificaciones`
--
DELIMITER $$
CREATE TRIGGER `trg_verificacion_aprobada` AFTER UPDATE ON `verificaciones` FOR EACH ROW begin
  if new.estado = 'aprobada' and old.estado <> 'aprobada' then
    update usuarios set verificado = true where id_usuario = new.id_usuario;
  end if;
end
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bloqueos`
--
ALTER TABLE `bloqueos`
  ADD PRIMARY KEY (`id_bloqueador`,`id_bloqueado`),
  ADD KEY `id_bloqueado` (`id_bloqueado`);

--
-- Indices de la tabla `categorias_prenda`
--
ALTER TABLE `categorias_prenda`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `id_publicacion` (`id_publicacion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `compartidos`
--
ALTER TABLE `compartidos`
  ADD PRIMARY KEY (`id_compartido`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `estilos`
--
ALTER TABLE `estilos`
  ADD PRIMARY KEY (`id_estilos`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id_usuario`,`id_publicacion`),
  ADD KEY `id_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id_usuario`,`id_publicacion`),
  ADD KEY `id_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`),
  ADD KEY `idx_conversacion` (`id_emisor`,`id_receptor`,`fecha`),
  ADD KEY `idx_no_leidos` (`id_receptor`,`leido`);

--
-- Indices de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD PRIMARY KEY (`id_multimedia`),
  ADD KEY `id_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `outfits`
--
ALTER TABLE `outfits`
  ADD PRIMARY KEY (`id_outfit`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_estilos` (`id_estilos`);

--
-- Indices de la tabla `outfit_prendas`
--
ALTER TABLE `outfit_prendas`
  ADD PRIMARY KEY (`id_outfit`,`id_prenda`),
  ADD KEY `id_prenda` (`id_prenda`);

--
-- Indices de la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD PRIMARY KEY (`id_prenda`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `prenda_temporadas`
--
ALTER TABLE `prenda_temporadas`
  ADD PRIMARY KEY (`id_prenda`,`id_temporada`),
  ADD KEY `id_temporada` (`id_temporada`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_outfit` (`id_outfit`),
  ADD KEY `id_estilos` (`id_estilos`);

--
-- Indices de la tabla `temporadas`
--
ALTER TABLE `temporadas`
  ADD PRIMARY KEY (`id_temporada`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `telefono` (`telefono`);

--
-- Indices de la tabla `usuario_estilos`
--
ALTER TABLE `usuario_estilos`
  ADD PRIMARY KEY (`id_usuario`,`id_estilos`),
  ADD KEY `id_estilos` (`id_estilos`);

--
-- Indices de la tabla `verificaciones`
--
ALTER TABLE `verificaciones`
  ADD PRIMARY KEY (`id_verificacion`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias_prenda`
--
ALTER TABLE `categorias_prenda`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id_comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `compartidos`
--
ALTER TABLE `compartidos`
  MODIFY `id_compartido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `estilos`
--
ALTER TABLE `estilos`
  MODIFY `id_estilos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `multimedia`
--
ALTER TABLE `multimedia`
  MODIFY `id_multimedia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `outfits`
--
ALTER TABLE `outfits`
  MODIFY `id_outfit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `prendas`
--
ALTER TABLE `prendas`
  MODIFY `id_prenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `id_publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `temporadas`
--
ALTER TABLE `temporadas`
  MODIFY `id_temporada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `verificaciones`
--
ALTER TABLE `verificaciones`
  MODIFY `id_verificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bloqueos`
--
ALTER TABLE `bloqueos`
  ADD CONSTRAINT `bloqueos_ibfk_1` FOREIGN KEY (`id_bloqueador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `bloqueos_ibfk_2` FOREIGN KEY (`id_bloqueado`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `compartidos`
--
ALTER TABLE `compartidos`
  ADD CONSTRAINT `compartidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `compartidos_ibfk_2` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_emisor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_receptor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `multimedia`
--
ALTER TABLE `multimedia`
  ADD CONSTRAINT `multimedia_ibfk_1` FOREIGN KEY (`id_publicacion`) REFERENCES `publicaciones` (`id_publicacion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `outfits`
--
ALTER TABLE `outfits`
  ADD CONSTRAINT `outfits_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `outfits_ibfk_2` FOREIGN KEY (`id_estilos`) REFERENCES `estilos` (`id_estilos`) ON DELETE SET NULL;

--
-- Filtros para la tabla `outfit_prendas`
--
ALTER TABLE `outfit_prendas`
  ADD CONSTRAINT `outfit_prendas_ibfk_1` FOREIGN KEY (`id_outfit`) REFERENCES `outfits` (`id_outfit`) ON DELETE CASCADE,
  ADD CONSTRAINT `outfit_prendas_ibfk_2` FOREIGN KEY (`id_prenda`) REFERENCES `prendas` (`id_prenda`) ON DELETE CASCADE;

--
-- Filtros para la tabla `prendas`
--
ALTER TABLE `prendas`
  ADD CONSTRAINT `prendas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `prendas_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_prenda` (`id_categoria`);

--
-- Filtros para la tabla `prenda_temporadas`
--
ALTER TABLE `prenda_temporadas`
  ADD CONSTRAINT `prenda_temporadas_ibfk_1` FOREIGN KEY (`id_prenda`) REFERENCES `prendas` (`id_prenda`) ON DELETE CASCADE,
  ADD CONSTRAINT `prenda_temporadas_ibfk_2` FOREIGN KEY (`id_temporada`) REFERENCES `temporadas` (`id_temporada`) ON DELETE CASCADE;

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `publicaciones_ibfk_2` FOREIGN KEY (`id_outfit`) REFERENCES `outfits` (`id_outfit`) ON DELETE SET NULL,
  ADD CONSTRAINT `publicaciones_ibfk_3` FOREIGN KEY (`id_estilos`) REFERENCES `estilos` (`id_estilos`) ON DELETE SET NULL;

--
-- Filtros para la tabla `usuario_estilos`
--
ALTER TABLE `usuario_estilos`
  ADD CONSTRAINT `usuario_estilos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario_estilos_ibfk_2` FOREIGN KEY (`id_estilos`) REFERENCES `estilos` (`id_estilos`) ON DELETE CASCADE;

--
-- Filtros para la tabla `verificaciones`
--
ALTER TABLE `verificaciones`
  ADD CONSTRAINT `verificaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

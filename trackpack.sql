-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2020 a las 10:37:48
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `trackpack`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargas`
--

CREATE TABLE `cargas` (
  `idCarga` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  `idEstado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `celulares`
--

CREATE TABLE `celulares` (
  `idCelular` int(11) NOT NULL,
  `celular` varchar(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idCliente` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  `verificado` tinyint(1) DEFAULT 0,
  `email` varchar(100) DEFAULT NULL,
  `passwd` varchar(256) DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT curdate(),
  `ultimoInicio` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `direccionDefecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos`
--

CREATE TABLE `codigos` (
  `idCodigo` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `codigo` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curriers`
--

CREATE TABLE `curriers` (
  `idCurrier` int(11) NOT NULL,
  `nombreCurrier` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `curriers`
--

INSERT INTO `curriers` (`idCurrier`, `nombreCurrier`) VALUES
(1, 'UPS'),
(2, 'DHL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `idDepartamento` int(11) NOT NULL,
  `departamento` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`idDepartamento`, `departamento`) VALUES
(1, 'Atlántida'),
(2, 'Colón'),
(3, 'Comayagua'),
(4, 'Copán'),
(5, 'Cortés'),
(6, 'Choluteca'),
(7, 'El Paraíso'),
(8, 'Francisco Morazán'),
(9, 'Gracias a Dios'),
(10, 'Intibucá'),
(11, 'Islas de la Bahía'),
(12, 'La Paz'),
(13, 'Lempira'),
(14, 'Ocotepeque'),
(15, 'Olancho'),
(16, 'Santa Bárbara'),
(17, 'Valle'),
(18, 'Yoro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `idDireccion` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `idMunicipio` int(11) DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` float DEFAULT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `idEmpleado` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `userLogin` varchar(50) NOT NULL,
  `passwd` varchar(256) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fechaRegistro` datetime DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`idEmpleado`, `nombre`, `apellido`, `userLogin`, `passwd`, `activo`, `fechaRegistro`) VALUES
(3, 'ADMIN', 'ADMIN', 'admin', '$2b$10$59.Z2ZnYRNfLH0QqIJGVjeHoMDvX.dse0fsSYPO.XnQRdztTKOiIW', 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoscargas`
--

CREATE TABLE `estadoscargas` (
  `idEstado` int(11) NOT NULL,
  `estado` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estadoscargas`
--

INSERT INTO `estadoscargas` (`idEstado`, `estado`) VALUES
(1, 'En espera de recepción'),
(2, 'En espera de ser despachada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipios`
--

CREATE TABLE `municipios` (
  `idMunicipio` int(11) NOT NULL,
  `idDepartamento` int(11) DEFAULT NULL,
  `municipio` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `municipios`
--

INSERT INTO `municipios` (`idMunicipio`, `idDepartamento`, `municipio`) VALUES
(1, 1, 'La Ceiba'),
(2, 1, 'El Porvenir'),
(3, 1, 'Esparta'),
(4, 1, 'Jutiapa'),
(5, 1, 'La Masica'),
(6, 1, 'San Francisco'),
(7, 1, 'Tela'),
(8, 1, 'Arizona'),
(9, 2, 'Trujillo'),
(10, 2, 'Balfate'),
(11, 2, 'Iriona'),
(12, 2, 'Limon'),
(13, 2, 'Saba'),
(14, 2, 'Santa Fe'),
(15, 2, 'anta Rosa de Aguan'),
(16, 2, 'Sonaguera'),
(17, 2, 'Tocoa'),
(18, 2, 'Bonito Oriental'),
(19, 3, 'Comayagua'),
(20, 3, 'Ajuterique'),
(21, 3, 'El Rosario'),
(22, 3, 'Esquias'),
(23, 3, 'Humuya'),
(24, 3, 'La Libertad'),
(25, 3, 'Lamani'),
(26, 3, 'La Trinidad'),
(27, 3, 'Lejamani'),
(28, 3, 'Meambar'),
(29, 3, 'Minas de Oro'),
(30, 3, 'Ojos de Agua'),
(31, 3, 'San Jeronimo'),
(32, 3, 'San Jose de Comayagua'),
(33, 3, 'San Jose del Potrero'),
(34, 3, 'San Luis'),
(35, 3, 'San Sebastian'),
(36, 3, 'Siguatepeque'),
(37, 3, 'Villa de San Antonio'),
(38, 3, 'Las Lajas'),
(39, 3, 'Taulabe'),
(40, 4, 'Santa Rosa de Copan'),
(41, 4, 'Cabañas'),
(42, 4, 'Concepcion'),
(43, 4, 'Copan Ruinas'),
(44, 4, 'Corquin'),
(45, 4, 'Cucuyagua'),
(46, 4, 'Dolores'),
(47, 4, 'Dulce Nombre'),
(48, 4, 'El Paraiso'),
(49, 4, 'Florida'),
(50, 4, 'La Jigua'),
(51, 4, 'La Union'),
(52, 4, 'Nueva Arcadia'),
(53, 4, 'San Agustin'),
(54, 4, 'San Antonio'),
(55, 4, 'San Jeronimo'),
(56, 4, 'San Jose'),
(57, 4, 'San Juan de Opoa'),
(58, 4, 'San Nicolas'),
(59, 4, 'San Pedro'),
(60, 4, 'Santa Rita'),
(61, 4, 'Trinidad de Copan'),
(62, 4, 'Veracruz'),
(63, 5, 'San Pedro Sula'),
(64, 5, 'Choloma'),
(65, 5, 'Omoa'),
(66, 5, 'Pimienta'),
(67, 5, 'Potrerillos'),
(68, 5, 'Puerto Cortes'),
(69, 5, 'San Antonio de Cortes'),
(70, 5, 'San Francisco de Yojoa'),
(71, 5, 'San Manuel'),
(72, 5, 'Santa Cruz de Yojoa'),
(73, 5, 'Villanueva'),
(74, 5, 'La Lima'),
(75, 6, 'Choluteca'),
(76, 6, 'Apacilagua'),
(77, 6, 'Concepcion de Maria'),
(78, 6, 'Duyure'),
(79, 6, 'El Corpus'),
(80, 6, 'El Triunfo'),
(81, 6, 'Marcovia'),
(82, 6, 'Morolica'),
(83, 6, 'Namasigue'),
(84, 6, 'Orocuina'),
(85, 6, 'Pespire'),
(86, 6, 'San Antonio de Flores'),
(87, 6, 'San Isidro'),
(88, 6, 'San Jose'),
(89, 6, 'San Marcos de Colon'),
(90, 6, 'Santa Ana de Yusguare'),
(91, 7, 'Yuscaran'),
(92, 7, 'Alauca'),
(93, 7, 'Danli'),
(94, 7, 'El Paraiso'),
(95, 7, 'Guinope'),
(96, 7, 'Jacaleapa'),
(97, 7, 'Liure'),
(98, 7, 'Moroceli'),
(99, 7, 'Oropoli'),
(100, 7, 'Potrerillos'),
(101, 7, 'San Antonio de Flores'),
(102, 7, 'San Lucas'),
(103, 7, 'San Matias'),
(104, 7, 'Soledad'),
(105, 7, 'Teupasenti'),
(106, 7, 'Texiguat'),
(107, 7, 'Vado Ancho'),
(108, 7, 'Yauyupe'),
(109, 7, 'Trojes'),
(110, 8, 'Distrito Central'),
(111, 8, 'Alubaren'),
(112, 8, 'Cedros'),
(113, 8, 'Curaren'),
(114, 8, 'El Porvenir'),
(115, 8, 'Guaimaca'),
(116, 8, 'La Libertad'),
(117, 8, 'La Venta'),
(118, 8, 'Lepaterique'),
(119, 8, 'Maraita'),
(120, 8, 'Marale'),
(121, 8, 'Nueva Armenia'),
(122, 8, 'Ojojona'),
(123, 8, 'Orica'),
(124, 8, 'Reitoca'),
(125, 8, 'Sabanagrande'),
(126, 8, 'San Antonio de Oriente'),
(127, 8, 'San Buenaventura'),
(128, 8, 'San Ignacio'),
(129, 8, 'San Juan de Flores (Cantarranas)'),
(130, 8, 'San Miguelito'),
(131, 8, 'Santa Ana'),
(132, 8, 'Santa Lucia'),
(133, 8, 'Talanga'),
(134, 8, 'Tatumba'),
(135, 8, 'Valle de Angeles'),
(136, 8, 'Villa de San Francisco'),
(137, 8, 'Vallecillo'),
(138, 9, 'Puerto Lempira'),
(139, 9, 'Brus Laguna'),
(140, 9, 'Ahuas'),
(141, 9, 'Juan Francisco Bulnes'),
(142, 9, 'Ramon Villeda Morales'),
(143, 9, 'Wampusirpe'),
(144, 10, 'La Esperanza'),
(145, 10, 'Camasca'),
(146, 10, 'Colomoncagua'),
(147, 10, 'Concepcion'),
(148, 10, 'Dolores'),
(149, 10, 'Intibuca'),
(150, 10, 'Jesus de Otoro'),
(151, 10, 'Magdalena'),
(152, 10, 'Masaguara'),
(153, 10, 'San Antonio'),
(154, 10, 'San Isidro'),
(155, 10, 'San Juan'),
(156, 10, 'San Marcos de la Sierra'),
(157, 10, 'San Miguel Guancapla'),
(158, 10, 'Santa Lucia'),
(159, 10, 'Yamaranguila'),
(160, 10, 'San Francisco de Opalaca'),
(161, 11, 'Roatán'),
(162, 11, 'Guanaja'),
(163, 11, 'Jose Santos Guardiola'),
(164, 11, 'Útila'),
(165, 12, 'La Paz'),
(166, 12, 'Aguantequerique'),
(167, 12, 'Cabañas'),
(168, 12, 'Cane'),
(169, 12, 'Chinacla'),
(170, 12, 'Guajiquiro'),
(171, 12, 'Lauterique'),
(172, 12, 'Marcala'),
(173, 12, 'Mercedes de Oriente'),
(174, 12, 'Opatoro'),
(175, 12, 'San Antonio del Norte'),
(176, 12, 'San Jose'),
(177, 12, 'San Juan'),
(178, 12, 'San Pedro de Tutule'),
(179, 12, 'Santa Ana'),
(180, 12, 'Santa Elena'),
(181, 12, 'Santa Maria'),
(182, 12, 'Santiago de Puringla'),
(183, 12, 'Yarula'),
(184, 13, 'Gracias'),
(185, 13, 'Belén'),
(186, 13, 'Candelaria'),
(187, 13, 'Cololaca'),
(188, 13, 'Erandique'),
(189, 13, 'Gualcine'),
(190, 13, 'Guarita'),
(191, 13, 'La Campa'),
(192, 13, 'la Iguala'),
(193, 13, 'Las Flores'),
(194, 13, 'La Unión'),
(195, 13, 'La Virtud'),
(196, 13, 'Lepaera'),
(197, 13, 'Mapulaca'),
(198, 13, 'Piraera'),
(199, 13, 'San Andres'),
(200, 13, 'San Francisco'),
(201, 13, 'San Juan Guarita'),
(202, 13, 'San Manuel Colahete'),
(203, 13, 'San Rafael'),
(204, 13, 'San Sebastian'),
(205, 13, 'Santa Cruz'),
(206, 13, 'Talgua'),
(207, 13, 'Tambla'),
(208, 13, 'Tomala'),
(209, 13, 'Valladolid'),
(210, 13, 'Virginia'),
(211, 13, ' San Marcos de Caiquin'),
(212, 14, 'Nueva Ocotepeque'),
(213, 14, 'Belen Gualcho'),
(214, 14, 'Concepcion'),
(215, 14, 'Dolores Merendon'),
(216, 14, 'Fraternidad'),
(217, 14, 'La Encarnacion'),
(218, 14, 'La Labor'),
(219, 14, 'Lucerna'),
(220, 14, 'Mercedes'),
(221, 14, 'San Fernando'),
(222, 14, 'San Francisco de Valle'),
(223, 14, 'San Jorge'),
(224, 14, 'San Marcos'),
(225, 14, 'Santa Fe'),
(226, 14, 'Sensenti'),
(227, 14, 'Sinuapa'),
(228, 15, 'Juticalpa'),
(229, 15, 'Campamento'),
(230, 16, 'Catacamas'),
(231, 15, 'Concordia'),
(232, 15, 'Dulce Nombre de Culmi'),
(233, 15, 'El Rosario'),
(234, 15, 'Esquipulas del Norte'),
(235, 15, 'Gualaco'),
(236, 15, 'Guarizama'),
(237, 15, 'Guata'),
(238, 15, 'Guayape'),
(239, 15, 'Jano'),
(240, 15, 'La Union'),
(241, 15, 'Mangulile'),
(242, 15, 'Manto'),
(243, 15, 'Salama'),
(244, 15, 'San Esteban'),
(245, 15, 'San Francisco de Becerra'),
(246, 15, 'San Francisco de la Paz'),
(247, 15, 'Santa Maria del Real'),
(248, 15, 'Silca'),
(249, 15, 'Yocon'),
(250, 15, 'Patuca'),
(251, 16, 'Santa Barbara'),
(252, 16, 'Arada'),
(253, 16, 'Atima'),
(254, NULL, 'Azacualpa'),
(255, 16, 'Ceguaca'),
(256, 16, 'San Jose de las Colinas'),
(257, 16, 'Concepcion del Norte'),
(258, 16, 'Concepcion del Sur'),
(259, 16, 'Chinda'),
(260, 16, 'El Nispero'),
(261, 16, 'Gualala'),
(262, 16, 'Ilama'),
(263, 16, 'Macuelizo'),
(264, 16, 'Naranjito'),
(265, 16, 'Nuevo Celilac'),
(266, 16, 'Petoa'),
(267, 16, 'Proteccion'),
(268, 16, 'Quimistan'),
(269, 16, 'San Francisco de Ojuera'),
(270, 16, 'San Luis'),
(271, 16, 'San Marcos'),
(272, 16, 'San Nicolas'),
(273, 16, 'San Pedro Zacapa'),
(274, 16, 'Santa Rita'),
(275, 16, 'San Vicente Centenario'),
(276, 16, 'Trinidad'),
(277, 16, 'Las Vegas'),
(278, 16, 'Nueva Frontera'),
(279, 17, 'Alianza'),
(280, 17, 'Amapala'),
(281, 17, 'Aramecina'),
(282, 17, 'Caridad'),
(283, 17, 'Goascoran'),
(284, 17, 'Langue'),
(285, 17, 'Nacaome'),
(286, 17, 'San Francisco de Coray'),
(287, 17, 'San Lorenzo'),
(288, 18, 'Yoro'),
(289, 18, 'Arenal'),
(290, 18, 'El Negrito'),
(291, 18, 'El Progreso'),
(292, 18, 'Jocon'),
(293, 18, 'Morazán'),
(294, 18, 'Olanchito'),
(295, 18, 'Santa Rita'),
(296, 18, 'Sulaco'),
(297, 18, 'Victoria'),
(298, 18, 'Yorito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquetes`
--

CREATE TABLE `paquetes` (
  `idPaquete` int(11) NOT NULL,
  `idCarga` int(11) NOT NULL,
  `trackingUsa` varchar(256) NOT NULL,
  `idTipo` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `datetimeRecibido` datetime DEFAULT NULL,
  `idCurrier` int(11) NOT NULL,
  `recibidoPor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `telefonos`
--

CREATE TABLE `telefonos` (
  `idTelefono` int(11) NOT NULL,
  `telefono` varchar(11) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipospaquetes`
--

CREATE TABLE `tipospaquetes` (
  `idTipo` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipospaquetes`
--

INSERT INTO `tipospaquetes` (`idTipo`, `tipo`) VALUES
(1, 'Electrodomésticos'),
(2, 'Dispositivos Electrónicos'),
(3, 'Perfumes'),
(4, 'Ropa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tracking`
--

CREATE TABLE `tracking` (
  `idTracking` int(11) NOT NULL,
  `idCarga` int(11) NOT NULL,
  `idEmpleado` int(11) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `datetimeTrack` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargas`
--
ALTER TABLE `cargas`
  ADD PRIMARY KEY (`idCarga`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `idDireccion` (`idDireccion`),
  ADD KEY `idEstado` (`idEstado`);

--
-- Indices de la tabla `celulares`
--
ALTER TABLE `celulares`
  ADD PRIMARY KEY (`idCelular`),
  ADD UNIQUE KEY `celular` (`celular`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD PRIMARY KEY (`idCodigo`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `curriers`
--
ALTER TABLE `curriers`
  ADD PRIMARY KEY (`idCurrier`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`idDepartamento`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`idDireccion`),
  ADD KEY `idCliente` (`idCliente`),
  ADD KEY `idMunicipio` (`idMunicipio`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- Indices de la tabla `estadoscargas`
--
ALTER TABLE `estadoscargas`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD PRIMARY KEY (`idMunicipio`),
  ADD KEY `idDepartamento` (`idDepartamento`);

--
-- Indices de la tabla `paquetes`
--
ALTER TABLE `paquetes`
  ADD PRIMARY KEY (`idPaquete`),
  ADD KEY `idCarga` (`idCarga`),
  ADD KEY `idTipo` (`idTipo`),
  ADD KEY `idCurrier` (`idCurrier`),
  ADD KEY `recibidoPor` (`recibidoPor`);

--
-- Indices de la tabla `telefonos`
--
ALTER TABLE `telefonos`
  ADD PRIMARY KEY (`idTelefono`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `tipospaquetes`
--
ALTER TABLE `tipospaquetes`
  ADD PRIMARY KEY (`idTipo`);

--
-- Indices de la tabla `tracking`
--
ALTER TABLE `tracking`
  ADD PRIMARY KEY (`idTracking`,`idCarga`),
  ADD KEY `idCarga` (`idCarga`),
  ADD KEY `idEmpleado` (`idEmpleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargas`
--
ALTER TABLE `cargas`
  MODIFY `idCarga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `celulares`
--
ALTER TABLE `celulares`
  MODIFY `idCelular` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `codigos`
--
ALTER TABLE `codigos`
  MODIFY `idCodigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `curriers`
--
ALTER TABLE `curriers`
  MODIFY `idCurrier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `idDepartamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `idDireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estadoscargas`
--
ALTER TABLE `estadoscargas`
  MODIFY `idEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `municipios`
--
ALTER TABLE `municipios`
  MODIFY `idMunicipio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT de la tabla `paquetes`
--
ALTER TABLE `paquetes`
  MODIFY `idPaquete` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `telefonos`
--
ALTER TABLE `telefonos`
  MODIFY `idTelefono` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tipospaquetes`
--
ALTER TABLE `tipospaquetes`
  MODIFY `idTipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tracking`
--
ALTER TABLE `tracking`
  MODIFY `idTracking` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cargas`
--
ALTER TABLE `cargas`
  ADD CONSTRAINT `cargas_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  ADD CONSTRAINT `cargas_ibfk_2` FOREIGN KEY (`idDireccion`) REFERENCES `direcciones` (`idDireccion`),
  ADD CONSTRAINT `cargas_ibfk_3` FOREIGN KEY (`idEstado`) REFERENCES `estadoscargas` (`idEstado`);

--
-- Filtros para la tabla `celulares`
--
ALTER TABLE `celulares`
  ADD CONSTRAINT `celulares_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`);

--
-- Filtros para la tabla `codigos`
--
ALTER TABLE `codigos`
  ADD CONSTRAINT `codigos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`);

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`),
  ADD CONSTRAINT `direcciones_ibfk_2` FOREIGN KEY (`idMunicipio`) REFERENCES `municipios` (`idMunicipio`);

--
-- Filtros para la tabla `municipios`
--
ALTER TABLE `municipios`
  ADD CONSTRAINT `municipios_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `departamentos` (`idDepartamento`);

--
-- Filtros para la tabla `paquetes`
--
ALTER TABLE `paquetes`
  ADD CONSTRAINT `paquetes_ibfk_1` FOREIGN KEY (`idCarga`) REFERENCES `cargas` (`idCarga`),
  ADD CONSTRAINT `paquetes_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `tipospaquetes` (`idTipo`),
  ADD CONSTRAINT `paquetes_ibfk_3` FOREIGN KEY (`idCurrier`) REFERENCES `curriers` (`idCurrier`),
  ADD CONSTRAINT `paquetes_ibfk_4` FOREIGN KEY (`recibidoPor`) REFERENCES `empleados` (`idEmpleado`);

--
-- Filtros para la tabla `telefonos`
--
ALTER TABLE `telefonos`
  ADD CONSTRAINT `telefonos_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`idCliente`);

--
-- Filtros para la tabla `tracking`
--
ALTER TABLE `tracking`
  ADD CONSTRAINT `tracking_ibfk_1` FOREIGN KEY (`idCarga`) REFERENCES `cargas` (`idCarga`),
  ADD CONSTRAINT `tracking_ibfk_2` FOREIGN KEY (`idEmpleado`) REFERENCES `empleados` (`idEmpleado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

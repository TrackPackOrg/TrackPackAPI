CREATE TABLE clientes(
    idCliente int PRIMARY KEY AUTO_INCREMENT not null,
    nombre varchar(50) not null,
    apellido varchar(50) not null,
    email varchar(100) not null,
    passwd varchar(256) not null
),

CREATE TABLE telefonos(
    idTelefono int PRIMARY KEY AUTO_INCREMENT not null,
    telefono varchar(8) not null,
    idCliente int not null,
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)
),

CREATE TABLE departamentos(
    idDepartamento int PRIMARY KEY AUTO_INCREMENT not null,
    departamento varchar(20) not null
),

CREATE TABLE municipios(
    idMunicipio int PRIMARY KEY AUTO_INCREMENT not null,
    idDepartamento int not null,
    municipio varchar(40) not null,
    FOREIGN KEY (idDepartamento) REFERENCES departamentos(idDepartamento)
),

CREATE TABLE direcciones(
    idDireccion int PRIMARY KEY AUTO_INCREMENT not null,
    idCliente int not null,
    idMunicipio int not null,
    latitud varchar(10) not null, 
    longitud varchar(10) not null,
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente),
    FOREIGN KEY (idMunicipio) REFERENCES municipios(idMunicipio)
),

CREATE TABLE estadosCargas(
    idEstado int PRIMARY KEY AUTO_INCREMENT not null,
    estado varchar(40) not null
)

CREATE TABLE cargas(
    idCarga int PRIMARY KEY AUTO_INCREMENT NOT null,
    idCliente int not null, 
    idDireccion int not null, 
    idEstado int not null,
    FOREIGN KEY (idCliente) REFERENCES clientes(idCliente),
    FOREIGN KEY (idDireccion) REFERENCES direcciones(idDireccion),
    FOREIGN KEY (idEstado) REFERENCES estadoscargas(idEstado)
),

CREATE TABLE empleados(
    idEmpleado int PRIMARY KEY AUTO_INCREMENT NOT null,
    nombre varchar(40) not null,
    apellido varchar(40) not null,
    userLogin varchar(50) not null,
    passwd varchar(256) not null
),

CREATE TABLE tiposPaquetes(
	idTipo int PRIMARY KEY AUTO_INCREMENT NOT null,
    tipo varchar(100) not null
),

CREATE TABLE curriers(
	idCurrier int PRIMARY KEY AUTO_INCREMENT NOT null,
    nombreCurrier varchar(100) not null
),

CREATE TABLE paquetes(
	idPaquete int PRIMARY KEY AUTO_INCREMENT NOT null,
    idCarga int NOT null, 
    trackingUsa varchar(256) NOT null,
    idTipo int NOT null,
    desripcion varchar(200) NOT null,
    datetimeRecibido datetime,
    idCurrier int not null,
    recibidoPor int,
    FOREIGN KEY (idCarga) REFERENCES cargas(idCarga),
    FOREIGN KEY (idTipo) REFERENCES tipospaquetes(idTipo),
    FOREIGN KEY (idcurrier) REFERENCES curriers(idCurrier),
    FOREIGN KEY (recibidoPor) REFERENCES empleados(idEmpleado)
),

CREATE TABLE tracking(
	idTracking int AUTO_INCREMENT not null,
    idCarga int not null,
    idEmpleado int NOT null,
    descripcion varchar(200) not null,
    datetimeTrack datetime not null,
    PRIMARY KEY (idTracking, idCarga),
    FOREIGN KEY (idCarga) REFERENCES cargas(idCarga),
    FOREIGN KEY (idEmpleado) REFERENCES empleados(idEmpleado)  
)
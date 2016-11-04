Create database sicecui;

create table Carrera(
	CarreraID varchar(255) NOT NULL,
	Nombre varchar(255),
	PRIMARY KEY (CarreraID)
);

create table Cuatrimestre(
	CuatrimestreID integer NOT NULL,
	Nombre varchar(255),
	PRIMARY KEY (CuatrimestreID)
);

create table Materias(
	MateriaID varchar(255) NOT NULL,
	Nombre varchar(255),
	Seriacion varchar(255),
	HorasDoc integer,
	HorasInd integer,
	Creditos integer,
	Instalaciones varchar(255),
	CuatrimestreID integer,
	CarreraID varchar(255),
	PRIMARY KEY (MateriaID),
	FOREIGN KEY (CuatrimestreID) REFERENCES Cuatrimestre(CuatrimestreID),
	FOREIGN KEY (CarreraID) REFERENCES Carrera(CarreraID)
);

create table Perfil(
	PerfilID integer NOT NULL AUTO_INCREMENT,
	Nombre varchar(255),
	Descripcion varchar(255),
	PRIMARY KEY (PerfilID)
);

create table Persona(
	PersonaID integer NOT NULL AUTO_INCREMENT,
	Nombre varchar(255),
	ApellidoPeterno varchar(255),
	ApellidoMaterno varchar(255),
	Telefono varchar(255),
	municipio varchar(255),
	Entidad varchar(255),
	Direccion varchar(255),
	RFC varchar(255),
	CURP varchar(255),
	Trabaja char(2),
	Email varchar(255),
	PerfilID integer,
	NombreBeneficiario varchar(255),
	DireccionBeneficiario varchar(255),
	CuatrimestreID integer,
	CarreraID varchar(255),
	PRIMARY KEY (PersonaID),
	FOREIGN KEY (PerfilID) REFERENCES Perfil(PerfilID),
	FOREIGN KEY (CuatrimestreID) REFERENCES Cuatrimestre(CuatrimestreID),
	FOREIGN KEY (CarreraID) REFERENCES Carrera(CarreraID)
);

create table Imparte(
	MateriaID varchar(255),
	PersonaID integer,
	PRIMARY KEY (MateriaID,PersonaID),
	FOREIGN KEY (MateriaID) REFERENCES Materias(MateriaID),
	FOREIGN KEY (PersonaID) REFERENCES Persona(PersonaID)
);

create table Cursando(
	CursoID integer NOT NULL AUTO_INCREMENT,
	PrimerParcial decimal,
	SegundoParcial decimal,
	TercerParcial decimal,
	Promedio decimal,
	MateriaID varchar(255) NOT NULL,
	AlumnoID integer NOT NULL,
	PRIMARY KEY (CursoID,MateriaID,AlumnoID),
	FOREIGN KEY (MateriaID) REFERENCES Materias(MateriaID),
	FOREIGN KEY (AlumnoID) REFERENCES Persona(PersonaID)
);

create table Mes(
	MesID integer NOT NULL,
	Nombre varchar(255) NOT NULL,
	PRIMARY KEY (MesID)
);

/*
insert into Mes values(1,'Enero');
insert into Mes values(2,'Febrero');
insert into Mes values(3,'Marzo');
insert into Mes values(4,'Abril');
insert into Mes values(5,'Mayo');
insert into Mes values(6,'Junio');
insert into Mes values(7,'Julio');
insert into Mes values(8,'Agosto');
insert into Mes values(9,'Septiembre');
insert into Mes values(10,'Octubre');
insert into Mes values(11,'Noviembre');
insert into Mes values(12,'Diciembre');
	*/


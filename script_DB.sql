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
	MateriaID varchar(255),
	AlumnoID integer,
	PRIMARY KEY (CursoID),
	FOREIGN KEY (MateriaID) REFERENCES Materias(MateriaID),
	FOREIGN KEY (AlumnoID) REFERENCES Persona(PersonaID)
);
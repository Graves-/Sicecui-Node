Create database sicecui;

create table Carrera(
	CarreraID varchar(255) NOT NULL,
	Nombre varchar(255),
	PRIMARY KEY (CarreraID)
);

/*
insert into Carrera values('LEI','LICENCIATURA EN INFORMÁTICA');
insert into Carrera values('LEA','LICENCIATURA EN ADMINISTRACIÓN');
insert into Carrera values('LED','LICENCIATURA EN DERECHO');
*/

create table Cuatrimestre(
	CuatrimestreID integer NOT NULL,
	Nombre varchar(255),
	PRIMARY KEY (CuatrimestreID)
);

/*
insert into Cuatrimestre values(1,'PRIMER CUATRIMESTRE');
insert into Cuatrimestre values(2,'SEGUNDO CUATRIMESTRE');
insert into Cuatrimestre values(3,'TERCER CUATRIMESTRE');
insert into Cuatrimestre values(4,'CUARTO CUATRIMESTRE');
insert into Cuatrimestre values(5,'QUINTO CUATRIMESTRE');
insert into Cuatrimestre values(6,'SEXTO CUATRIMESTRE');
insert into Cuatrimestre values(7,'SEPTIMO CUATRIMESTRE');
insert into Cuatrimestre values(8,'OCTAVO CUATRIMESTRE');
insert into Cuatrimestre values(9,'NOVENO CUATRIMESTRE');
insert into Cuatrimestre values(10,'DECIMO CUATRIMESTRE');
*/


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

/*
insert into Perfil values(1,'Alumno','El perfil tiene permisos y opciones correspondientes a Alumnos.');
insert into Perfil values(2,'Maestro','El perfil tiene permisos y opciones correspondientes a Maestros.');
*/

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
	StatusID varchar(3),
	PRIMARY KEY (PersonaID),
	FOREIGN KEY (PerfilID) REFERENCES Perfil(PerfilID),
	FOREIGN KEY (CuatrimestreID) REFERENCES Cuatrimestre(CuatrimestreID),
	FOREIGN KEY (CarreraID) REFERENCES Carrera(CarreraID),
	FOREIGN KEY (StatusID) REFERENCES StatusAlumno(StatusID)
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

create table StatusAlumno(
	StatusID varchar(3) NOT NULL,
	Nombre varchar(255),
	PRIMARY KEY (StatusID)
);

/*
insert into StatusAlumno values('REG','Regular');
insert into StatusAlumno values('IRG','Irregular');
insert into StatusAlumno values('MLB','Materias Libres');
insert into StatusAlumno values('BAJ','Baja');
insert into StatusAlumno values('EGR','Egresado');
insert into StatusAlumno values('TIT','Titulado');
*/
//MODULES
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

//EXPRESS
var app = express();
var router = express.Router();

//EXPRESS - HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//SERVE STATIC CONTENT
app.use(express.static('public'));

app.use("/",router);

//USE Body Parser
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//CONEXION A LA BD
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sicecui'
});
connection.connect();

//RUTA PARA LA RAIZ DE LA APP / INDEX
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/inscripcionAlumno', function (req, res) {
    res.render('alumnos');
});

app.get('/inscripcionMaestros', function (req, res) {
    res.render('maestros');
});

app.get('/listaAlumnos', function (req, res) {
    res.render('listaAlumnos');
});

app.get('/listaMaestros', function (req, res) {
    res.render('listaMaestros');
});

app.get('/listaMaterias', function(req,res) {
	res.render('listaMaterias');
});

app.get('/asignarMaterias', function(req,res) {
	res.render('asignarMaterias');
});

app.get('/kardex', function(req,res) {
	res.render('kardex');
});

app.get('/pagos', function(req,res) {
	res.render('pagos');
});

app.get('/modificaAlumno', function(req, res) {
	res.render('modificaAlumno');
});

app.get('/modificaMaestro', function(req, res) {
	res.render('modificaMaestro');
});

app.get('/modificaMateria', function(req,res) {
	res.render('modificaMateria');
});

//POST HEADERS - application/x-www-form-urlencoded
//GET POST DATA WITH ExpressJS - req.body.variable_name

//INSERTA MAESTRO EN LA BD (en la tabla Persona) DE ACUERDO A LOS DETALLES DEL FORMULARIO LLENADO POR EL USUARIO
app.post('/insertMaestro',function(req,res){
	//PARA INSERTAR DATOS EN LA BD MEDIANTE UN OBJETO
	var persona  = {
		Nombre: req.body.Nombre,
		ApellidoPeterno : req.body.ApellidoPeterno,
		ApellidoMaterno : req.body.ApellidoMaterno,
		Telefono : req.body.Telefono,
		municipio : req.body.municipio,
		Entidad : req.body.Entidad,
		Direccion :  req.body.Direccion,
		RFC : req.body.RFC,
		CURP : req.body.CURP,
		Email : req.body.Email,
		PerfilID : 2,
		NombreBeneficiario : req.body.NombreBeneficiario,
		DireccionBeneficiario : req.body.DireccionBeneficiario
	};
	var query = connection.query('INSERT INTO Persona SET ?', persona, function(err, result) {
		if (err){
			console.log(err);
			res.render('500');
		}else{
			console.log(result);
			res.redirect('/inscripcionMaestros');
		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL' 
});

//INSERTA ALUMNO EN LA BD (en tabla Persona) DE ACUERDO A LOS DETALLES DEL FORMULARIO LLENADO POR EL USUARIO
app.post('/insertAlumno',function(req,res){
	//PARA INSERTAR DATOS EN LA BD MEDIANTE UN OBJETO
	var persona  = {
		Nombre: req.body.Nombre,
		ApellidoPeterno : req.body.ApellidoPeterno,
		ApellidoMaterno : req.body.ApellidoMaterno,
		Telefono : req.body.Telefono,
		municipio : req.body.municipio,
		Entidad : req.body.Entidad,
		Direccion :  req.body.Direccion,
		CURP : req.body.CURP,
		Email : req.body.Email,
		PerfilID : 1,
		CuatrimestreID : req.body.CuatrimestreID,
		CarreraID: req.body.CarreraID,
		Trabaja: req.body.Trabaja
	};
	var query = connection.query('INSERT INTO Persona SET ?', persona, function(err, result) {
		if (err){
			console.log(err);
			res.render('500');
		}else{
			console.log(result);
			res.redirect('/inscripcionAlumno');
		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL' 
});

//UPDATE DE ALUMNO (tabla Persona) DE ACUARDO A LOS DATOS LLENADOS EN EL FORMULARIO
app.post('/updateAlumno', function(req,res) {
	var sql = "UPDATE Persona SET Nombre='"+req.body.Nombre+"', ApellidoPeterno='"+req.body.ApellidoPeterno+"',ApellidoMaterno='"+req.body.ApellidoMaterno+"',Telefono='"+req.body.Telefono+"',municipio='"+req.body.municipio+"',Entidad='"+req.body.Entidad+"',Direccion='"+req.body.Direccion+"',CURP='"+req.body.CURP+"',Email='"+req.body.Email+"',CuatrimestreID="+req.body.CuatrimestreID+",CarreraID='"+req.body.CarreraID+"',Trabaja='"+req.body.Trabaja+"' WHERE PersonaID = " + req.body.PersonaID + " AND PerfilID = 1"
	console.log(sql);
	connection.query(sql, function (err, result) {
	  if (err){
			console.log(err);
			res.render('500');
		}else{
			console.log(result);
			res.redirect('/modificaAlumno');
		}
	});
});

//UPDATE DE MAESTRO (tabla Persona) DE ACUARDO A LOS DATOS LLENADOS EN EL FORMULARIO
app.post('/updateMaestro', function(req,res) {
	var sql = "UPDATE Persona SET Nombre='"+req.body.Nombre+"', ApellidoPeterno='"+req.body.ApellidoPeterno+"',ApellidoMaterno='"+req.body.ApellidoMaterno+"',Telefono='"+req.body.Telefono+"',municipio='"+req.body.municipio+"',Entidad='"+req.body.Entidad+"',Direccion='"+req.body.Direccion+"',CURP='"+req.body.CURP+"',Email='"+req.body.Email+"',RFC='"+req.body.RFC+"', NombreBeneficiario = '"+req.body.NombreBeneficiario+"', DireccionBeneficiario = '"+req.body.DireccionBeneficiario+"' WHERE PersonaID = " + req.body.PersonaID + " AND PerfilID = 2"
	console.log(sql);
	connection.query(sql, function (err, result) {
	  if (err){
			console.log(err);
			res.render('500');
		}else{
			console.log(result);
			res.redirect('/modificaAlumno');
		}
	});
});

//UPDATE DE MATERIA (tabla Materias) DE ACUARDO A LOS DATOS LLENADOS EN EL FORMULARIO
app.post('/updateMateria', function(req,res) {
	var sql = "Update Materias SET Nombre='"+req.body.Nombre+"',Seriacion='"+req.body.Seriacion+"',HorasDoc="+req.body.HorasDoc+",HorasInd="+req.body.HorasInd+",Creditos="+req.body.Creditos+",Instalaciones='"+req.body.Instalaciones+"' WHERE MateriaID='"+req.body.MateriaID+"'";
	console.log(sql);

	connection.query(sql, function (err, result) {
	  if (err){
			console.log(err);
			res.render('500');
		}else{
			console.log(result);
			res.redirect('/modificaMateria');
		}
	});
});

//INSERTA UNA CARRERA EN LA BD
app.get('/insertCarrera',function(req,res){
	//PARA INSERTAR DATOS EN LA BD MEDIANTE UN OBJETO
	var post  = {CarreraID: req.query.id, Nombre: req.query.nombre};
	var query = connection.query('INSERT INTO Carrera SET ?', post, function(err, result) {
		if (err){
			console.log(err);
		}else{
			console.log(result);
		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL' 
});

//INSERTA DATOS EN LA TABLA Cursando PARA INSCRIBIR A UN ALUMNO EN UNA MATERIA/CUATRIMESTRE
app.get('/insertCursando', function(req,res) {
	var Cursando = {
		MateriaID : req.query.MateriaID,
		AlumnoID : req.query.PersonaID
	};
	var query = connection.query('INSERT INTO Cursando SET ?', Cursando, function(err, result) {
		if (err){
			console.log(err);
		}else{
			console.log(result);
			res.send("ok");
		}
	});
});

//OBTIENE LA INFORMACION DE LAS CARRERAS QUE EXISTEN EN LA BD
app.get('/getCarreras', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query('SELECT * FROM Carrera', function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE LA LISTA DE TODOS LOS ALUMNOS EN LA TABLA Persona EN LA BD
app.get('/getAlumnos', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD - de la lista de alumnos
	connection.query('select p.PersonaID,p.Nombre,ApellidoPeterno,ApellidoMaterno,Telefono,municipio,Entidad,Direccion,CURP,Trabaja,Email,c.CarreraID,c.Nombre as NombreCarrera, CuatrimestreID from persona p left join carrera c on c.CarreraID=p.CarreraID where PerfilID = 1', function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE DETALLES E INFORMACION DEL ALUMNO DE LA TABLA Persona
app.get('/getPersonaAlumno', function(req,res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD - de una persona en específico
	var sql = 'select * from Persona where PersonaID = ' + req.query.id + ' and PerfilID = 1';
	console.log(sql);
	connection.query(sql, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE DETALLES E INFORMACION DEL MAESTRO DE LA TABLA Persona
app.get('/getPersonaMaestro', function(req,res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD - de una persona en específico
	var sql = 'select * from Persona where PersonaID = ' + req.query.id + ' and PerfilID = 2';
	console.log(sql);
	connection.query(sql, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE LOS DETALLES DE TODOS LOS MAESTROS DE LA TABLA Persona
app.get('/getMaestros', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query('SELECT * FROM Persona WHERE PerfilID = 2', function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE LOS DETALLES DE MATERIAS EN LA BD
app.get('/getMaterias', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	var sql = 'SELECT * FROM Materias';
	if (req.query.id != null) {
		sql = sql + " WHERE MateriaID = '" + req.query.id + "'";
	}
	console.log(sql);
	connection.query(sql, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE LAS MATERIAS QUE PUEDE CURSAR EL ALUMNO ESPECIFICADO (tablas Persona y Materias)
app.get('/getMateriasAlumno', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query("select * from Materias where CuatrimestreID = "+req.query.cuat+" and CarreraID = '"+req.query.carrera+"'", function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//OBTIENE DE TALLES DE LAS LISTAS DE CADA MATERIA
app.get('/getCursando', function(req,res) {
	connection.query("select * from Cursando c join Materias m on c.MateriaID=m.MateriaID where AlumnoID = " + req.query.AlumnoID, function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

//RUTA PARA CUANDO NO EXISTE LA PAGINA SOLICITADA
app.use("*",function(req,res){
  res.render('404');
});

//CORRE EL SERVIDOR EN EL PUERO ESPECIFICADO
app.listen(3000,function(){
  console.log("Live at Port 3000");
});

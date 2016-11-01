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
//POST HEADERS - application/x-www-form-urlencoded
//GET POST DATA WITH ExpressJS - req.body.variable_name

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
			res.redirect('/inscripcionMaestro');
		}
	});
	console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL' 
});

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

app.get('/getCarreras', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query('SELECT * FROM Carrera', function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

app.get('/getAlumnos', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query('select p.PersonaID,p.Nombre,ApellidoPeterno,ApellidoMaterno,Telefono,municipio,Entidad,Direccion,CURP,Trabaja,Email,c.CarreraID,c.Nombre as NombreCarrera, CuatrimestreID from persona p left join carrera c on c.CarreraID=p.CarreraID where PerfilID = 1', function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

app.get('/getMaestros', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query('SELECT * FROM Persona WHERE PerfilID = 2', function(err, rows, fields) {
	  if (err) throw err;
	  res.send(JSON.stringify(rows));
	});
});

app.get('/getMaterias', function (req, res) {
	//PARA LLEVAR A CABO UN SELECT EN LA BD
	connection.query('SELECT * FROM Materias', function(err, rows, fields) {
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

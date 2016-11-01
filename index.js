//MODULES
var express = require('express');
var exphbs  = require('express-handlebars');

//EXPRESS
var app = express();
var router = express.Router();

//EXPRESS - HANDLEBARS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//SERVE STATIC CONTENT
app.use(express.static('public'));

app.use("/",router);

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

app.get('/inscripcionMaestro', function (req, res) {
    res.render('maestros');
});

app.get('/insertMaestro',function(req,res){
	//PARA INSERTAR DATOS EN LA BD MEDIANTE UN OBJETO
	var persona  = {
		Nombre: 'Maestro 1',
		ApellidoPeterno : 'A',
		ApellidoMaterno : 'B',
		Telefono : '1234567890',
		municipio : 'Celaya',
		Entidad : 'Guanajuato',
		Direccion :  'Saturno 111, Santa Anita',
		RFC : '7854587845784',
		CURP : '147852369874563210',
		Email : 'correo1@gmail.com',
		PerfilID : 2,
		NombreBeneficiario : 'Ben 1',
		DireccionBeneficiario : 'Dir Ben 1'
	};
	var query = connection.query('INSERT INTO Persona SET ?', persona, function(err, result) {
		if (err){
			console.log(err);
			res.render('500');
		}else{
			console.log(result);
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

//RUTA PARA CUANDO NO EXISTE LA PAGINA SOLICITADA
app.use("*",function(req,res){
  res.render('404');
});

//CORRE EL SERVIDOR EN EL PUERO ESPECIFICADO
app.listen(3000,function(){
  console.log("Live at Port 3000");
});

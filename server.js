var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jwt = require('jwt-simple');
var app = express();
var secretword = "secretword";
var fs = require('fs');
var cheerio = require('cheerio');
// Controllers
var cons = require('consolidate');
var dataController = require('./server/controllers/data-controller');
var serverData = [];
var allPizzas=[];
//app settings
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//engine settings


app.listen(3000, function () {
	console.log("server is up");
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/server/views/index.html'));
});

app.get('/createPizza', function (req, res) {
	res.sendFile(path.join(__dirname + '/server/views/createPizza.html'));
});

app.get('/pizza', function (req, res, next) {
	res.render(__dirname + '/server/views/pizzaIndex.ejs',{data:allPizzas});
});

app.post('/post-data', function (req, res) {
	var newNombre = req.body.nombre;
	var newApellido = req.body.apellido;
	serverData.push({
		nombre: newNombre,
		apellido: newApellido
	});
	console.log("Register added succesfully.");
	return res.redirect('/');
});

app.post('/postPizza',function(req,res)
{
	var nombre=req.body.nombre;
	var desc=req.body.desc;
	var ingredientes=req.body.section;
	var masa=req.body.tipoMasa;
	var trozos=req.body.trozos;
	var conqueso=req.body.conQ
	if(conqueso==undefined)
	{
		conqueso="no";
	}
	else{
		conqueso="si";
	}
	var pizza={
		Nombre:nombre,
		Descripcion:desc,
		Ingredientes:ingredientes,
		Masa:masa,
		Trozos:trozos,
		ExtraQueso:conqueso
	};
	allPizzas.push(pizza);
	res.render(path.join(__dirname + '/server/views/pizzaIndex.ejs'),{data:allPizzas});
});
app.get('/get-ciphered', function (req, res) {
	var ciphered = jwt.encode(serverData, secretword);
	var toAdd = '<textarea class=container rows="4" cols="50">' + ciphered + '</textarea>'
	fs.readFile(__dirname + '/server/views/index.html', 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}
		//console.log(data);
		var $ = cheerio.load(data + toAdd);
		$('h2.title').text('Hello there!')
		$('h2').addClass('welcome')

		res.set('Content-Type', 'text/html; charset=utf-8');
		res.send($.html());
	});
});
app.get('/pizza/:Nombre',function(req,res)
{
	console.log("getting a pizza");
	var k=req.params.Nombre;
	for(var i=0;i<allPizzas.length;i++)
	{
		if(allPizzas[i].Nombre==k)
		{
			//llamar a la vista  de editar
			return res.render(path.join(__dirname + '/server/views/edit.ejs'),{key:k,data:allPizzas[i]});
		}
	}
	return res.render(__dirname + '/server/views/pizzaIndex.ejs',{data:allPizzas});//Aqui si no encuentra nada enviar un error
});

app.post('/Update/:Nombre',function(req,res)
{
    console.log("------------");
    console.log(k);
	var k=req.params.Nombre;
	var nombre=req.body.nombre;
	var desc=req.body.desc;
	var ingredientes=req.body.section;
	var masa=req.body.tipoMasa;
	var trozos=req.body.trozos;
	var conqueso=req.body.conQ
	if(conqueso==undefined)
	{
		conqueso="no";
	}
	else{
		conqueso="si";
	}
	var pizza={
		Nombre:nombre,
		Descripcion:desc,
		Ingredientes:ingredientes,
		Masa:masa,
		Trozos:trozos,
		ExtraQueso:conqueso
	};
	for(var i=0;i<allPizzas.length;i++)
	{
		if(allPizzas[i].Nombre==k)
		{
			//llamar a la vista  de editar
		  allPizzas[i]=pizza;
		  return res.render(__dirname + '/server/views/pizzaIndex.ejs',{data:allPizzas});//Aqui si no encuentra nada enviar un error
		}
	}
});



app.use('/deletePizza/:id',function(req, res, next){
	console.log("verifiying method");
	if(req.query._method == 'DELETE'){
		console.log("deleting");
		req.method = 'DELETE';
		req.url = req.path;
	}else if(req.query._method == 'PUT'){
		req.method='PUT';
		req.url = req.path;
	}
	next();
});


app.delete('/deletePizza/:Nombre',function(req,res)
{
	console.log("deleting " + req.params.Nombre);
	var index=0;
	for(var i=0;i<allPizzas.length;i++)
	{
		if(allPizzas[i].Nombre==req.params.Nombre)
		{
			console.log("item " +i);
			index=i;
		}
	}
	console.log("allPizzas");
	allPizzas.splice(index, 1);
	return res.redirect('/pizza');
});

app.get('/api/get-data', function (req, res) {
	res.json({
		data: serverData
	});
});



app.post('/Buscar',function(req,res)
{
	var busqueda=req.body.search;
	console.log(busqueda);
	for(var i=0;i<allPizzas.length;i++)
	{
		if(allPizzas[i].Nombre==busqueda)
		{
		  return res.render(__dirname + '/server/views/view.ejs',{data:allPizzas[i]});
		}
	}
   return res.render(__dirname + '/server/views/pizzaIndex.ejs',{data:allPizzas}); //aqui agregar el not found*/

});

app.get('/Buscar/:Nombre',function(req,res)
{
	var busqueda=req.params.Nombre;
	console.log(busqueda);
	for(var i=0;i<allPizzas.length;i++)
	{
		if(allPizzas[i].Nombre==busqueda)
		{
		  return res.render(__dirname + '/server/views/view.ejs',{data:allPizzas[i]});
		}
	}
   return res.render(__dirname + '/server/views/pizzaIndex.ejs',{data:allPizzas}); //aqui agregar el not found*/

});
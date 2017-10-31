var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var jwt = require('jwt-simple');
var app = express();
var secretword= "secretword";
var fs = require('fs');
var cheerio = require('cheerio');
// Controllers
var dataController = require('./server/controllers/data-controller');

var serverData = [];

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.listen(5000, function(){
	console.log("server is up");
})
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/server/views/index.html'));
});
app.post('/post-data', function(req, res){
	var newNombre = req.body.nombre;
	var newApellido = req.body.apellido;
	serverData.push({
		nombre: newNombre,
		apellido: newApellido
	});
	console.log("Register added succesfully.");
	return res.redirect('/');
});

app.get('/get-ciphered', function(req, res){
	var ciphered = jwt.encode(serverData, secretword);
	var toAdd = '<textarea class=container rows="4" cols="50">'+ciphered+'</textarea>'
	fs.readFile(__dirname+'/server/views/index.html', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        //console.log(data);
        var $ = cheerio.load(data+toAdd);
        $('h2.title').text('Hello there!')
        $('h2').addClass('welcome')    

        res.set('Content-Type', 'text/html; charset=utf-8');
        res.send($.html());
    });


});

app.get('/api/get-data', function(req, res){
	res.json({
		data: serverData
	});
});
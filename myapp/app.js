//Modulos necesarios para Express
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Modulos para crear el servidor http
var http = require('http');
var app = module.exports.app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

//Modulos para sensores
var sensorLib = require('node-dht-sensor');
var gpio = require('rpi-gpio');

//Modulo para usar GPIO de Relevadores
var GPIOS = require('onoff').Gpio;

//Modulo y variables usadas para los procesos de la Raspberry Pi
var exec = require('child_process').exec;
var child;
var child1;

//Metodos para express
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Modulos necesarios para MongoDB
var MongoClient = require ('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/raspberry';


//Conexión con MongoDB
MongoClient.connect(url, function(err, db){
	assert.equal(null,err);
	console.log("Conexión exitosa a : " + url);
	db.close();
});

//Función para actualizar el estado del relevador 1 en MongoDB
var actualizarBASERelay1 = function(db, valRelay1, callback){
	db.collection('raspberry').updateOne(
		{ "datosRaspBerry.mac" : "b8:27:eb:e4:91:38" },
		 {
			$set:{
					"statusCasa.relay1": valRelay1
			}
		},function(err, results){
				callback();
		});
};

//Función para actualizar el estado del relevador 2 en MongoDB
var actualizarBASERelay2 = function(db, valRelay2, callback){
	db.collection('raspberry').updateOne(
		{ "datosRaspBerry.mac" : "b8:27:eb:e4:91:38" },
		 {
			$set:{
					"statusCasa.relay2": valRelay2
			}
		},function(err, results){
				callback();
		});
};

//Función para actualizar el estado del relevador 3 en MongoDB
var actualizarBASERelay3 = function(db, valRelay3, callback){
	db.collection('raspberry').updateOne(
		{ "datosRaspBerry.mac" : "b8:27:eb:e4:91:38" },
		 {
			$set:{
					"statusCasa.relay3": valRelay3
			}
		},function(err, results){
				callback();
		});
};

//Función para actualizar el estado del relevador 4 en MongoDB
var actualizarBASERelay4 = function(db, valRelay4, callback){
	db.collection('raspberry').updateOne(
		{ "datosRaspBerry.mac" : "b8:27:eb:e4:91:38" },
		 {
			$set:{
					"statusCasa.relay4": valRelay4
			}
		},function(err, results){
				callback();
		});
};

//Variables para los GPIO usados por los relevadores
var relay1 = new GPIOS(17, 'out'); //GPIO numero 17
var relay2 = new GPIOS(18, 'out'); //GPIO numero 18
var relay3 = new GPIOS(19, 'out'); //GPIO numero 19
var relay4 = new GPIOS(20, 'out'); //GPIO numero 20

//Funcion para recuperar el estado de los relevadores desde MongoDB
var estadoRelay = function(db, callback){
	var cursor =db.collection('raspberry').find();

	cursor.each(function(err, doc){
		assert.equal(err, null);

		if(doc != null){
			relay1.writeSync(doc.statusCasa.relay1);
			relay2.writeSync(doc.statusCasa.relay2);
			relay3.writeSync(doc.statusCasa.relay3);
			relay4.writeSync(doc.statusCasa.relay4);
		}
		else{
			callback();
		}
	});
}

//Llamada a la función "estadoRelay"
MongoClient.connect(url,function(err,db){
	assert.equal(null, err);
	estadoRelay(db, function(){
		db.close();
	});
});


//Establecemos una conexión cuando se abra el navegador
io.sockets.on('connection', function(socket) {

	//Variables para memoria
  var memTotal;
	var memUsed = 0;
	var	memFree = 0;
	var memBuffered = 0;
	var memCached = 0;
	var sendData = 1;
	var	percentBuffered;
	var percentCached;
  var	percentUsed;
	var percentFree;

	//Variables para almacenar valor de relays
	var valRelay1 = 0;
	var valRelay2 = 0;
	var valRelay3 = 0;
	var valRelay4 = 0;

	//Codigo para obtener el dato del usuario conectado
	var direccion = socket.request.connection.remoteAddress;
 	var puerto = socket.request.connection.remotePort;
	console.log("Nueva conexion desde: " + direccion + ":" + puerto );

	//Codigo para saber cuando un usuario se desconecta de la aplicación
	socket.on('disconnect', function () {
    console.log("La dirección: "+direccion+":"+puerto+" se ha desconectado de la aplicación");
  });

	//Funcion para recuperar los valores de los Relays almacenados en la base de datos
	//Posteriormente se emiten por socket.io a las vistas para cambiar los labels
	var mandarRelay = function(db, callback){
	var cursor =db.collection('raspberry').find();
	cursor.each(function(err, doc) {
			assert.equal(err, null);
			if (doc != null) {
				socket.emit('statusRelay1', doc.statusCasa.relay1);
				socket.emit('statusRelay2', doc.statusCasa.relay2);
				socket.emit('statusRelay3', doc.statusCasa.relay3);
				socket.emit('statusRelay4', doc.statusCasa.relay4);
			}
			else {
				callback();
			}
		});
	}

	MongoClient.connect(url,function(err,db){
		assert.equal(null, err);
		mandarRelay(db, function(){
			db.close();
		});
	});

  //usa GPIO 17 para encender/apagar relay 1
  socket.on('relay1', function (data) {
    console.log(data);
    if (data == 'on'){
          relay1.writeSync(1);
					valRelay1 = 1;
    }else{
        	relay1.writeSync(0);
					valRelay1 = 0;
		}
			//Almaceno valRelay1 y muestro
		  MongoClient.connect(url, function(err, db){
			assert.equal(null, err);
			actualizarBASERelay1(db, valRelay1, function(){

			db.close();
			});
		});//MongoClient
  });

  //usa GPIO 18 para encender/apagar relay 2
  socket.on('relay2', function (data) {
    console.log(data);
    if (data == 'on'){
          relay2.writeSync(1);
					valRelay2 = 1;
    }else{
        	relay2.writeSync(0);
					valRelay2 = 0;
		}
			//Almaceno valRelay2 y muestro
			MongoClient.connect(url, function(err, db){
			assert.equal(null, err);
			actualizarBASERelay2(db, valRelay2, function(){

			db.close();
			});
		});//MongoClient
  });

//usa GPIO 19 para encender/apagar relay 3
  socket.on('relay3', function (data) {
    console.log(data);
    if (data == 'on'){
          relay3.writeSync(1);
					valRelay3 = 1;
    }else{
        	relay3.writeSync(0);
					valRelay3 = 0;
    }
			//Almaceno valRelay3 y muestro
			MongoClient.connect(url, function(err, db){
			assert.equal(null, err);
			actualizarBASERelay3(db, valRelay3, function(){

			db.close();
			});
		});//MongoClient
  });

  //usa GPIO 20 para encender/apagar relay 4
  socket.on('relay4', function (data) {
    console.log(data);
    if (data == 'on'){
          relay4.writeSync(1);
					valRelay4 = 1;
    }else{
        	relay4.writeSync(0);
					valRelay4 = 0;
		}
			//Almaceno valRelay4 y muestro
			MongoClient.connect(url, function(err, db){
			assert.equal(null, err);
			actualizarBASERelay4(db, valRelay4, function(){

			db.close();
			});
		});//MongoClient
  });

	// Function for measuring temperature
	setInterval(function(){
				//Modulo y variables para obtener la fecha, etc.
				var fecha = new Date();
				var hora = fecha.getHours();
				var minutos = fecha.getMinutes();

				if(hora == 11 && minutos >= 15){
					relay4.writeSync(1);
					valRelay4 = 1;
					socket.emit('statusRelay4', valRelay4);
				}else{
					relay4.writeSync(0);
					valRelay4 = 0;
					socket.emit('estatusRelay4', valRelay4);
				}
				console.log("TIEMPITO"+hora+":"+minutos);
				//Almaceno valRelay4 y muestro
				MongoClient.connect(url, function(err, db){
				assert.equal(null, err);
				actualizarBASERelay4(db, valRelay4, function(){

				db.close();
				});
			});//MongoClient
		}, 2000);



  // Funcion para revisar el estado de la memoria
    child = exec("egrep --color 'MemTotal' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      memTotal = stdout;
      socket.emit('memoryTotal', stdout);
    }
  });

  // Funcion para obtener el nombre del host
    child = exec("hostname", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('hostname', stdout);
    }
  });

    child = exec("uptime | tail -n 1 | awk '{print $1}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('uptime', stdout);
    }
  });

    child = exec("uname -r", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      socket.emit('kernel', stdout);
    }
  });

    child = exec("top -d 0.5 -b -n2 | tail -n 10 | awk '{print $12}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('toplist', stdout);
	    }
	  });


  setInterval(function(){
    // Function for checking memory free and used
    child1 = exec("egrep --color 'MemFree' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memFree = stdout;
      memUsed = parseInt(memTotal)-parseInt(memFree);
      percentUsed = Math.round(parseInt(memUsed)*100/parseInt(memTotal));
      percentFree = 100 - percentUsed;
    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

    // Function for checking memory buffered
    child1 = exec("egrep --color 'Buffers' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memBuffered = stdout;
      percentBuffered = Math.round(parseInt(memBuffered)*100/parseInt(memTotal));
    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

    // Function for checking memory buffered
    child1 = exec("egrep --color 'Cached' /proc/meminfo | egrep '[0-9.]{4,}' -o", function (error, stdout, stderr) {
    if (error == null) {
      memCached = stdout;
      percentCached = Math.round(parseInt(memCached)*100/parseInt(memTotal));
    } else {
      sendData = 0;
      console.log('exec error: ' + error);
    }
  });

    if (sendData == 1) {
      socket.emit('memoryUpdate', percentFree, percentUsed, percentBuffered, percentCached);
    } else {
      sendData = 1;
    }
  }, 3000);

  // Function for measuring temperature
  setInterval(function(){
    child = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      //Es necesario mandar el tiempo (eje X) y un valor de temperatura (eje Y).
      var date = new Date().getTime();
      var temp = parseFloat(stdout)/1000;
      socket.emit('temperatureUpdate', date, temp);
    }
  });}, 2000);

  setInterval(function(){
    child = exec("top -d 0.5 -b -n2 | grep 'Cpu(s)'|tail -n 1 | awk '{print $2 + $4}'", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      //Es necesario mandar el tiempo (eje X) y un valor de temperatura (eje Y).
      var date = new Date().getTime();
      socket.emit('cpuUsageUpdate', date, parseFloat(stdout));
    }
  });}, 2000);

	// Uptime
  setInterval(function(){
    child = exec("uptime | tail -n 1 | awk '{print $3 $4 $5}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('uptime', stdout);
	    }
	  });}, 5000);

// TOP list
  setInterval(function(){
    child = exec("ps aux --width 30 --sort -rss --no-headers | head  | awk '{print $11}'", function (error, stdout, stderr) {
	    if (error !== null) {
	      console.log('exec error: ' + error);
	    } else {
	      socket.emit('toplist', stdout);
	    }
	  });}, 5000);

// Humidity
setInterval(function(){
var sensor = {
  sensors: [ {
      name: "Indoor",
      type: 11,
      pin: 4
  }],

  read: function() {
      for (var a in this.sensors) {
          var b = sensorLib.readSpec(this.sensors[a].type, this.sensors[a].pin);
          var date = new Date().getTime();
          temp = parseFloat(b.temperature.toFixed(2));
          hum = parseFloat(b.humidity.toFixed(2));
          socket.emit('temperatura', temp, date);
          socket.emit('humedad', hum, date);
      }
  }
};
sensor.read();
}, 2000);

/*COMENTADO PARA PRUEBAS
setInterval(function(){
  gpio.setup(10, gpio.DIR_IN, readInput);

  function readInput(){
    gpio.read(10, function(err, value){
      var date = new Date().getTime();
      socket.emit('gas', value, date);
    });
  }
}, 2000);
*/

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

});

server.listen(3000);

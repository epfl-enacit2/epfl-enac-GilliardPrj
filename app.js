var configs = require('./configs')('toto.json');
var stringBuilder = require('string');
var sPort = require('serialport');
var store = require('./DAL/store.js')(configs.store);

var debug = configs.logging.logToConsole;
var SerialPort = sPort.SerialPort;
//var port = new SerialPort("COM3", {
var port = new SerialPort(configs.Module.port, {
  baudrate: configs.Module.rate,
  parser: sPort.parsers.readline('\n')
});

port.on('open', function () {
  logIfDebug('open');
  port.on('data', function (data) {
    if (stringBuilder(data).left(1).s == '>') {
      parseData(data, function (cleanData) {
        logElements(cleanData);
        logIfDebug(" \r")
      });
    }
    else {
      //Si le caractère est / c'est un commentaire --> dans console
      if (stringBuilder(data).left(1).s == '/') {
        logIfDebug('Commentaires: ' + data);
      }
      else {
        logIfDebug('Error :' + data)
      }
    }
  });
});

function logElements(elements) {
  elements.forEach(function (element) {
          console.log(element);
        });
}

function logIfDebug(msg) {
  if(debug == true){
    console.log(msg);
  }
}

function parseData(data, next) {
  var cleanData = [];
  var dataSplitted = data.split(',');
  var ModuleID = dataSplitted[0].substring(1);
  //console.logIfDebug('BoardId : ' + ModuleID);
  for (var i in dataSplitted) {

    if (i != 0) {
      var dataReSplitted = dataSplitted[i].split('=');
      
      cleanData.push({
        boardID: dataSplitted[0].substring(1),
        sensorID: dataReSplitted[0],
        sensorVal:  dataReSplitted[1]
      });

      //console.logIfDebug('BoardID : ' + ModuleID + ' Capteur : ' + sensID + ' Valeur : ' + val);
    }
    //Voir si faire un test de split(*) sur dataReSplitted[1] avec la dernière incrémentation (Vérifier qu'il y aie pas de checksum *)
  }
  next(cleanData, null);
};

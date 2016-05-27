var stringBuilder = require('string');

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var store = require("./DAL/store.js")

var port = new SerialPort("COM3", {
  baudrate: 9600,
  parser: serialport.parsers.readline('\n')
});

port.on('open', function () {
  console.log('open');
  port.on('data', function (data) {
    if (stringBuilder(data).left(1).s == '>') {
      parseData(data, function next(cleanData) {
        cleanData.forEach(function (element) {
          console.log(element);
        })
        console.log(" \r")
      });
    }
    else {
      //Si le caractère est / c'est un commentaire --> dans console
      if (stringBuilder(data).left(1).s == '/') {
        console.log('Commentaires: ' + data);
      }
      else {
        console.log('Error :' + data)
      }
    }
  });
});

function parseData(data, next) {

  var cleanData = [];
  var dataSplitted = data.split(',');
  var ModuleID = dataSplitted[0].substring(1);
  //console.log('BoardId : ' + ModuleID);
  for (var i in dataSplitted) {

    if (i != 0) {
      var dataReSplitted = dataSplitted[i].split('=');
      var sensID = dataReSplitted[0];
      var val = dataReSplitted[1];


      cleanData.push(new CurrentData.addData(ModuleID, sensID, val));

      //console.log('BoardID : ' + ModuleID + ' Capteur : ' + sensID + ' Valeur : ' + val);
    }
    //Voir si faire un test de split(*) sur dataReSplitted[1] avec la dernière incrémentation (Vérifier qu'il y aie pas de checksum *)
  }
  next(cleanData, null);
};



//objet pour remplissage du tableau CleanData
var CurrentData = {
  boardID: "",
  sensorID: "",
  sensorVal: "",

  addData: function (Moduleid, sens, valSens) {
    this.boardID = Moduleid;
    this.sensorID = sens;
    this.sensorVal = valSens;
  }
};
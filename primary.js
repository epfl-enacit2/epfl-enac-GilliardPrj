var S = require('string');

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var InsertSQL = require('InsertSQL.js');

var port = new SerialPort("COM3", {
  baudrate: 9600,
  parser: serialport.parsers.readline('\n')
});

port.on('open', function () {
  console.log('open');
  port.on('data', function (data) {
    if (S(data).left(1).s == '>') {
      var dataSplitted = data.split(',');
      for (var i in dataSplitted) {
        if (i == 0) {
          console.log('BoardId : ' + dataSplitted[0].substring(1));
        }
        else {
          var dataReSplitted = dataSplitted[i].split('=');
          console.log('Capteur : ' + dataReSplitted[0] + ' Valeur : ' + dataReSplitted[1]);

          //Voir si faire un test de split(*) sur dataReSplitted[1] avec la dernière incrémentation (Vérifier qu'il y aie pas de checksum *)
        }
      }
    }
    else {

      //Si le caractère est / c'est un commentaire --> dans console
      if (S(data).left(1).s == '/') {
        console.log('Commentaires: ' + data);
      }
      else {
        console.log('Error :' + data)
      }

    }

  });
});
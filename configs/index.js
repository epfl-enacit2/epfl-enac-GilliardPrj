var fs = require('fs');

module.exports = function (configFilePath) {

    return  JSON.parse(fs.readFileSync('./configs/'+configFilePath, 'utf8'));

}
var fs = require('fs');

module.exports = function (configFilePath) {
    return  JSON.parse(fs.readFileSync(
        configFilePath, 'UTF-8'));
}
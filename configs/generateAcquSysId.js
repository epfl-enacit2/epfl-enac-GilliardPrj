module.exports = function () {
    var fs = require('fs');
    var uuid = require('uuid');
    var retour;
    try {
        fs.accessSync("./configs/secret.txt", fs.R_OK | fs.W_OK)
        retour = fs.readFileSync("./configs/secret.txt","UTF-8");

    } catch (e) {
        var retour = uuid.v1();
        fs.writeFile('./configs/secret.txt', retour);
    }
    return retour;
}
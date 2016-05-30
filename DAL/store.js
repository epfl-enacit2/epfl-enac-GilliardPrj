var SeqInit = require('sequelize');
var sequelize = new SeqInit('test_node', 'user', 'pass')
module.exports = function(objConfig){
    var User = sequelize.define('users', {
  username: SeqInit.STRING,
  birthday: SeqInit.DATE
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe6',
    birthday: new Date(1980, 6, 20)
  });
})
};


/*
var db = {
    Module: [],
    addModule: function (mod, sens, val) {

    }
};


exports.db = db;
*/
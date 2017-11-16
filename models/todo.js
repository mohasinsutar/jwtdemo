var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ToDoSchema   = new Schema({
    name: String,
    description: String,
    status: String
});

var ToDo =  mongoose.model('ToDo', ToDoSchema);
module.exports = ToDo;
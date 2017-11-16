var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema   = new Schema({
    username: String,
    password: String,
    email: String
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}
var User =  mongoose.model('User', UserSchema);
module.exports = User;
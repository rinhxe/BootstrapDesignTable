var db = require('./db');
var userSchema = new db.mongoose.Schema(
    {
        username: {type: String , required: true},
        passwd: {type: String, required: true},
        email:  {type: String, required: true},
        role:   {type: String}
    },{ collection: 'users'}
);

let userModel = db.mongoose.model('userModel', userSchema);

module.exports = { userModel};
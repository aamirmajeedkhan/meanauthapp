const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const dbConfig = require ('../config/db');

const UserSchema= mongoose.Schema({
    name:{type: String},
    email : {type:String, unique:true, require:true},
    username:{type:String, unique:true , required:true},
    password : {type:String, required:true}
});

const User=module.exports=mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findOne({_id:id},callback);
};

module.exports.getUserByUsername = function(username,callback){
    User.findOne({username:username},callback);
};

module.exports.comparePassword = function(password,hashPassword,callback){
    // bcrypt.compare(password,hashPassword,(error,isMatch) => {
    //     if(error) throw error;
    //     callback(null,isMatch);
    // });
    if (bcrypt.compareSync(password,hashPassword)){
        callback(null,true);
    }
    else
        callback(null,false);
};
module.exports.addUser = function(newUser,callback) {
    bcrypt.genSalt(10,(error,salt) => {
        if (error) throw error;
        bcrypt.hash(newUser.password,salt,(error,hash) => {
            if (error) throw error;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
};
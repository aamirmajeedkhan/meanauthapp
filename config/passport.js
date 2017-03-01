const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const dbConfig = require('./db');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeader();
    opts.secretOrKey = dbConfig.secret;
    passport.use(new JwtStrategy(opts,function(jwt_payload, done){
        console.log(jwt_payload._doc._id);
        User.getUserById(jwt_payload._doc._id,(error,user) => {
            if (error) {
            return done(error, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account 
        }
        })
    }));
};
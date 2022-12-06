var JwtStrategy= require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;

var options={};
var User=require('../models/UserModel');
var passport=require('passport');

options.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey='SECRET';


passport.use(new JwtStrategy(options,function(jwt_payload,done){
    User.findOne({_id:jwt_payload.id},function(err,user){
        if(err){
            return done(err,false);
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));
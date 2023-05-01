const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//load user model
const User= require('../models/User');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done)=> {
            //Match user
            User.findOne({email:email})
                .then(user => {
                    if(!user){
                        return done(null,false, {message: 'Ten email nie jest zarejestrowany'} )
                    }

            //Match password
            bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(err) throw err;

                if(isMatch){
                    return done(null, user)
                }else {
                    return done(null, false, {message: 'Haslo nieprawidlowe'})
                }
            })
                })
                .catch(err=> console.log(err))
        })
    )

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, { id: user.id, username: user.username });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });
}
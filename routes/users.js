const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

//Model user
const User = require('../models/User')

//Logowanie
router.get('/login', (req, res) => res.render('login'));


//Rejestracja
router.get('/register', (req, res) => res.render('register'))
   
//Register handle
router.post('/register', (req,res) => {
    const {name, email, password, password2} = req.body;
    let errors =[];;

    // spr wymaganych pól
    if(!name || !email || !password || !password2) {
        errors.push({msg:'Wypełnij pola'})
    }

    //spr poprawnosci hasel
    if(password !== password2) {
        errors.push({msg:'Hasła nie sa jednakowe'})
    }

    //spr dlugosci hasla
    if (password.length <6 ){
        errors.push({msg:'Hasło powinno posiadać conajmniej 6 znakow'})
    }

    if(errors.length>0){
        res.render('register', {  // jesli wyskoczy ktorys z blędow, to chce wczytac formularz
            errors,
            name,email,password,password2
        })
    }else{
        //pass
        User.findOne({email:email})
            .then(user => {
                if (user) {
                  //user istnieje
                  errors.push({msg:'Email jest już zarejestrowany'})
                  res.render('register', {  
                    errors,
                    name,email,password,password2
                })
                }else{ 
                    const newUser = new User({
                        name,email,password
                    })

                    //Hash haslo
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err,hash) =>{
                            if (err) throw err;

                            //ustawienie haslo jako hash
                            newUser.password = hash;
                            //zapisanie user
                            newUser.save()
                                .then(user =>{
                                    req.flash('success_msg', 'Wlasnie zostales zarejestrowany')
                                    res.redirect('/users/login')
                                })
                                .catch(err=>console.log(err))
                        }))
                } 
            })
    }
})

module.exports = router
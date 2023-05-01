const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');

//serwer
const {port} = require('./config')
const app = express();

//Passport config
require('./config/passport')(passport)

//DB config
const {database} = require('./config');
//const passport = require('./config/passport');

//connect to Mongo
mongoose.connect(database);
mongoose.set('strictQuery', false) 

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Bodyparser
app.use(express.urlencoded({extended:false}));

//express session  ==z npm
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))

  //Passport --stara wersja? musi byc po exp session
app.use(passport.initialize());
app.use(passport.session())

  //connect flash
  app.use(flash())

  //ZMIENNE GLOBALNE -- z flash
  app.use((req,res,next) =>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error= req.flash('error');
    next();
  });


//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(port, console.log( `serwer slucha na:  ${port}`))
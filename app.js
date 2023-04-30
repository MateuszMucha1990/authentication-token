const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')

//serwer
const {port} = require('./config')
const app = express();

//DB config
const {database} = require('./config')

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

  //connect flash
  app.use(flash())

  //Global Vars -- z flash
  app.use((req,res,next) =>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.ERROR_msg= req.flash('ERROR_msg');
    next();
  });


//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(port, console.log( `serwer slucha na:  ${port}`))
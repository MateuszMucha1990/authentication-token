const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

//Strona glowna
router.get('/', (req,res) =>
    res.render('welcome')
);

//dashboard
router.get('/dashboard',(req,res) =>
    res.render('dashboard')
    );
  
module.exports = router;
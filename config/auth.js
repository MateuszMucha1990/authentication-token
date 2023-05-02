module.exports = {
    ensureAuthenticated: function(req,res, next) {
       
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Prosze  sie zalogowac')
        res.redirect('/users/login')
    }
}
module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be authenticatd to create a new campground')
        return res.redirect('/login');
    }
    next();
}



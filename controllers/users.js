const User = require('../models/user.js');

module.exports.renderSignupForm = (req,res) => {
    res.render('listings/signup');
}

module.exports.signup = async (req,res) => {
    try {
        let {username,email,password} = req.body;
        //to add a new user
        const user1 = new User({username,email});
        let newUser = await User.register(user1,password);
        console.log(newUser);
        req.login(newUser,(err) => {
            if(err) {
                return next(err);
            }
                req.flash('success','Welcome to StayNest!');
                res.redirect('/listings');
        })
        
        } catch(e) {
            req.flash('error',e.message);
            res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req,res) => {
    res.render('listings/login');
}

module.exports.login = async(req,res) => {
    req.flash('success','Welcome again!');
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        };
        req.flash('success','You have logged out!');
        res.redirect('/login');
    });
};

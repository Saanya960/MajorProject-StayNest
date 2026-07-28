const express=require("express");
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync.js');
const User = require('../models/user.js');

router.get('/signup',(req,res) => {
    res.render('listings/signup');
});

router.post('/signup', wrapAsync( async (req,res) => {
    try {
        let {username,email,password} = req.body;
        //to add a new user
        const user1 = new User({username,email});
        let newUser = await User.register(user1,password);
        console.log(newUser);
        req.flash('success','Welcome to StayNest!');
        res.redirect('/listings');
        } catch(e) {
            req.flash('error',e.message);
            res.redirect('/signup');
    }
}));

router.get('/login', (req,res) => {
    res.render('listings/login');
});

router.post('/login',passport.authenticate('local', { failureRedirect: '/login', failureFlash: true, }), async(req,res) => {
    req.flash('success','Welcome again!');
    res.redirect('/listings');
})

router.post('/logout', (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        };
        req.flash('success','You have logged out!');
        res.redirect('/login');
    });
});
module.exports = router;

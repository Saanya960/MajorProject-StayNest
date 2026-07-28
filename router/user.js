const express=require("express");
const router = express.Router();
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
            req.flash('You have signed up already!');
            res.redirect('/signup');
    }
}));


module.exports = router;

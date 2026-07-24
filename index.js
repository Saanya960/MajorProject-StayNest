const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const Listing = require('./models/listing.js');
const flash = require('connect-flash');
const listings = require('./router/listings.js');
const reviews = require('./router/reviews.js');

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/stayNest")
}

main().then(() => {
console.log("MONGODB Connected")
})
.catch((err) => {console.log(err)})

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

const sessionOptions = {
    secret : 'secretcode',
    resave : false,
    saveUninitialized : true
}

app.get("/",(req,res) => {
    res.send('hi');
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next) => {
    res.locals.success = req.flash('success');
    next();
})

app.use('/listings',listings);
app.use('/listings/:id/reviews' , reviews);

app.use((req,res,next) => {
    return next(new ExpressError(404, "Page not found"));
} );

app.use((err, req, res, next) => {
    let {status = 500, message = 'Error'} = err;
    res.status(status).render('error',{err});
    console.log(err.message);
});

app.listen(8080,() => {
    console.log("app is working")
})




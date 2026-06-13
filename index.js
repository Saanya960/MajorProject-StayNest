const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const Listing = require('./models/listings.js');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');

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




app.get("/",(req,res) => {
    res.send('hi');
})

//Index Route
app.get('/listings',wrapAsync(async (req,res) => {
   const allListings = await Listing.find({});
   res.render('listings/index.ejs', {allListings});
}) );

//Create Route
app.get('/listings/new' ,(req,res) => {
    res.render('listings/new.ejs');
});

app.post('/listings', wrapAsync (async (req,res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for the listing");
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));

//Read Route
app.get('/listings/:id', wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs',{listing});
}) );

//Edit Route
app.get('/listings/:id/edit' , wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs' , {listing});
}) );

//Update Route
app.put('/listings/:id' , wrapAsync(async (req,res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for the listing");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    res.redirect(`/listings/${id}`);
}));

app.delete('/listings/:id' , wrapAsync(async (req,res) => {
    let {id} = req.params;
   await Listing.findByIdAndDelete(id);
   res.redirect('/listings');
}) );



app.use((req,res,next) => {
    return next(new ExpressError(404, "Page not found"));
} );

app.use((err, req, res, next) => {
    let {status = 500, message = 'Error'} = err;
    res.render('error',{err});
});

app.listen(8080,() => {
    console.log("app is working")
})

const express=require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../schema.js');
const Listing = require('../models/listing.js');

const validateListing = (req,res,next) => {
const {error} = listingSchema.validate(req.body);
    if(error) {
        const errMsg = error.details.map((el) => el.message).join(',');
        throw new ExpressError(400,errMsg);
    } else {
        next();
    }};

//Index Route
router.get('/',wrapAsync(async (req,res) => {
   const allListings = await Listing.find({});
   res.render('listings/index.ejs', {allListings});
}) );

//Create Route
router.get('/new' ,(req,res) => {
    res.render('listings/new.ejs');
});

router.post('/',
    validateListing,
    wrapAsync (async (req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash('success','Your listing is created successfully!');
    res.redirect('/listings');
}));

//Read Route
router.get('/:id',wrapAsync(async (req,res) => 
    {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    if (!listing) {
    router.use((req,res,next) => {
        return next(new ExpressError(404, "Listing not found"));
    })
  };
    res.render('listings/show.ejs',{listing});
}) );

//Edit Route
router.get('/:id/edit' ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
    router.use((req,res,next) => {
        return next(new ExpressError(404, "Listing not found"));
    })
  };
    res.render('listings/edit.ejs' , {listing});
}) );

//Update Route
router.put('/:id' , 
    validateListing,
    wrapAsync(async (req,res) => {
    if(!req.body.listing) {
        throw new ExpressError(400, "Send valid data for the listing");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    req.flash('success','Your listing is updated successfully!');

    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete('/:id' ,wrapAsync(async (req,res) => 
{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Your listing is deleted successfully!');
    res.redirect('/listings');
}) );


module.exports = router;
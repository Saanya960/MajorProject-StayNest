const express=require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { listingSchema } = require('../schema.js');


const listingValidate = (req,res,next) => {
let result = listingSchema.validate(req.body);
    if(result.error) {
        throw new ExpressError(400,result.error.message);
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
    listingValidate,
    wrapAsync (async (req,res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}));

//Read Route
router.get('/:id',wrapAsync(async (req,res) => 
    {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs',{listing});
}) );

module.exports = router;
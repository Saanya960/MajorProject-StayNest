const express=require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const passport = require('passport');
const { isLoggedIn, isOwner ,validateListing,} = require('../middleware.js');

// const validateOwner = (req,res,next) => {
// const {error} = listingSchema.validate(req.body);
//     if(error) {
//         const errMsg = error.details.map((el) => el.message).join(',');
//         req.flash('error',errMsg);

//         return res.redirect(req.get('Referer'));
//     } 
//         next();
//     };

const listingController = require('../controllers/listings.js');

router.route('/')
    .get(wrapAsync(listingController.index) )
    .post(
    isLoggedIn,
    validateListing,
    wrapAsync (listingController.postListing));

//Create Route
router.get('/new' ,isLoggedIn, listingController.create);

router.route('/:id')
        .get(wrapAsync(listingController.read) )
        .put( 
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing))
        .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing) );



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;
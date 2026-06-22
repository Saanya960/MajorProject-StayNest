const express=require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listings.js');
const Review = require('../models/review.js')
const { reviewSchema } = require('../schema.js');

const reviewValidate = (req,res,next) => {
    let result = reviewSchema.validate(req.body);
    if(result.error) {
        throw new ExpressError(400,result.error.message);
    } else {
        next();
    }
}

//reviews
router.post('/' ,
    reviewValidate,
    wrapAsync(async (req,res) => {
    let listing =await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route
router.delete('/:reviewId' , wrapAsync(async (req,res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{ $pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}))

module.exports = router;
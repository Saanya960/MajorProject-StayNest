const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema, reviewSchema } = require('./schema.js');



module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl=req.originalUrl;
        req.flash('error','You are not logged in');
        return res.redirect('/login');
    } 
        next();
    };

module.exports.saveRedirectUrl = (req,res,next) => {
        if(req.session.redirectUrl) {
            res.locals.redirectUrl=req.session.redirectUrl;
        }
        next();
};

module.exports.isOwner = async(req,res,next) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!(listing && listing.owner._id.equals(req.user._id))) {
        req.flash('error','you donot have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req,res,next) => {
const {error} = listingSchema.validate(req.body);
    if(error) {
        const errMsg = error.details.map((el) => el.message).join(',');
        req.flash('error',errMsg);

        return res.redirect(req.get('Referer'));
    } 
        next();
    };

module.exports.validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error) {
        const errMsg = error.details.map((el) => el.message).join(',');
        req.flash('error',errMsg);
        return res.redirect(req.get('Referer'));
    } 
        next();
};

module.exports.isAuthor = async(req,res,next) => {
    const {reviewId, id} = req.params;
    const review = await Review.findById(reviewId);
    if(!(review && review.author.equals(req.user._id))) {
        req.flash('error','you donot have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}
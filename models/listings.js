const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    default:"villa.jpg", //as a testing purpose
    image:{
        type:String,
        set : (v) => v===""? "villa.jpg" : v,
    },
    price:Number,
    location:String,
    country:String,
});

const Listing = mongoose.model('Listing' , listingSchema);

module.exports = Listing;
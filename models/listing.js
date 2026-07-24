const mongoose = require('mongoose');
const {Schema} = mongoose;

const listingSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    image: {
        url: {
            type: String,
            default: 'villa.jpg',
            set: (v) => v === '' ? 'villa.jpg' : v,
        },
    },
    price: {
        type:Number,
        required: true,
    },
    location: {
        type:String,
        required: true,
    },
    country: {
        type:String,
        required: true,
    },
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;

const mongoose = require('mongoose');
const {Schema} = mongoose;
const review = require('./review.js');

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
            default: '/villa.jpg',
            set: (v) => v === '' ? '/villa.jpg' : v,
        },
        filename: String,
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
    ],
    owner: 
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    // category: {
    //         type:String,
    //         enum:['Trending' , 'Bedrooms' , 'Farms' , 'Amazing Pools' , 'Mountains' , 'Lakefront' , 'Cabins' , 'Amazing Views' , 'Surfing'],
    //     },
    
});

listingSchema.post('findOneAndDelete', async(listing) => {
    if(listing.reviews.length) {
        await review.deleteMany( {_id : {$in : listing.reviews}});
    }
})

module.exports = mongoose.model('Listing', listingSchema);


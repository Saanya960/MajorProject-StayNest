const mongoose=require('mongoose');

const {Schema}=mongoose;

const DEFAULT_IMAGE_URL = "/villa.jpg";

const normalizeImageUrl = (v) => {
    if (!v || v.trim() === "") return DEFAULT_IMAGE_URL;
    if (v.startsWith("http://") || v.startsWith("https://") || v.startsWith("/")) return v;
    return `/${v}`;
};

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    reviews: [{
        type : Schema.Types.ObjectId,
        ref : 'Review'
    }],
    description:String,
    image:{
        filename:{ type : String},
        url:{type : String,
        default: DEFAULT_IMAGE_URL,
        set : normalizeImageUrl},
    },
    price:{
    type : Number,
    min : 0 },
    location:String,
    country:String,
});

const Listing = mongoose.model('Listing' , listingSchema);

module.exports = Listing;

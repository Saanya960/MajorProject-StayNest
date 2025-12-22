const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{type:String,
            required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        set:(v) =>v===""?
        "https://images.trvl-media.com/lodging/2000000/1170000/1163200/1163193/f126c740.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
        :v,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String
    }
})


const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;


const express=require("express")
const app=express();
const port=3000;
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");


main().then(() => {
    console.log("connected successfully")
}).catch((err) => {
    console.log(err)
});
async function main() {await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));

app.get("/",(req,res) => {
    res.send("server working")
});



app.get("/listings",async (req,res) => {
    let allListings=await Listing.find({});
    console.log(allListings);
    res.render("listings/index.ejs",{allListings});
})

app.get("/listings/new",async (req,res)=> {
    //  let {id}=req.params;
    // let listing=await Listing.findById(id);
    res.render("listings/new.ejs");
})

app.get("/listings/:id",async (req,res) => {
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
});

app.get("/listings/:id/edit",async (req,res) => {
    let {id} = req.params;
       let listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

app.post("/listings",async (req,res) => {
    const newList=new Listing(req.body.listing);
    await newList.save();
    res.redirect("/listings");
});

app.put("/listings/:id",async (req,res) => {
    let {id} = req.params;
      await Listing.findByIdAndUpdate(id,{...req.body.listing});
       res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id",async (req,res) => {
        let {id} = req.params;
      await Listing.findByIdAndDelete(id);
       res.redirect("/listings");
})

// app.get("/testListing",async (req,res)=> {
//    try { let samplelisting=new Listing({
//         title:"my villa",
//         description:"by the beach",
//         price:1200
//     });
//     await samplelisting.save();
//    res.send("testing done")} catch(err) {
//     console.log(err)
//     res.send("error occurred")}
// });


app.listen(port,() => {
    console.log("app is listening")
});
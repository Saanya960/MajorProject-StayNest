const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const Listing = require('../models/listings.js');

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/stayNest")
}

main().then(() => {
console.log("MONGODB Connected")
})
.catch((err) => {console.log(err)})

app.listen(8080,() => {
    console.log("app is working")
})


app.get("/",(req,res) => {
    res.send('hi');
})

app.get('/')

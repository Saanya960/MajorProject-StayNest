//initialisation works

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listings.js');

async function main() {
    await mongoose.connect("mongodb://127.0.0.1/stayNest")
}

main().then(() => {
console.log("MONGODB Connected")
})
.catch((err) => {console.log(err)})

const intitDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany( initData.data);
    console.log('data was initialised');
} 

intitDB();
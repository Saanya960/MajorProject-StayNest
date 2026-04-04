const express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");

main().then(() => {
console.log("MONGODB Connected")
})
.catch((err) => {console.log(err)})


async function main() {
    await mongoose.connect("mongodb://127.0.0.1/wanderlust")
}
app.get("/",() => {
    console.log("hi");
})

app.listen(8080,() => {
    console.log("app is working")
})
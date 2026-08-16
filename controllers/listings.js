const Listing = require('../models/listing.js');

module.exports.index = async (req,res) => {
   const allListings = await Listing.find({});
   res.render('listings/index.ejs', {allListings});
}

module.exports.create = (req,res) => {
    res.render('listings/new.ejs');
};

module.exports.postListing = async (req,res) => {
    const { path, filename } = req.file;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {
        url:req.file.path,
        filename:req.file.filename
    };
    await newListing.save();
    req.flash('success','Your listing is created successfully!');
    res.redirect('/listings');
};

module.exports.read = async (req,res) => 
    {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : 'reviews', populate: { path: 'author' }}).populate('owner');
    if (!listing) {
        req.flash('error','This listing does not exist!');
        return res.redirect('/listings');
  };
    res.render('listings/show.ejs',{listing});
}

module.exports.editListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
    let originalImageURL = listing.image.url;
    originalImageURL = originalImageURL.replace(
        '/upload/',
        '/upload/c_fill,w_150,h_150,q_30/');
    res.render('listings/edit.ejs',{ listing, originalImageURL });
};

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    let listing =await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    if(typeof req.file !== 'undefined') {
    const { path, filename } = req.file;
    listing.image = {
        url:req.file.path,
        filename:req.file.filename
    };
}
    await listing.save();
    req.flash('success','Your listing is updated successfully!');

    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res) => 
{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success','Your listing is deleted successfully!');
    res.redirect('/listings');
};
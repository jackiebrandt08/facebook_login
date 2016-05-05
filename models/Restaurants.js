var mongoose = require("mongoose");

var RestaurantsSchema = new mongoose.Schema ({
    _id: String,
    value: Number,
},
{
    collection: 'restaurant_counts'
});

mongoose.model('Restaurants', RestaurantsSchema);
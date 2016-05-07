var mongoose = require('mongoose');

var RestaurantDataSchema = new mongoose.Schema({
  Year: String,
  Sales: String,
  Expenses: String
}, 
{
  collection: 'restaurant-data-collection'
});

mongoose.model('RestaurantData', RestaurantDataSchema);
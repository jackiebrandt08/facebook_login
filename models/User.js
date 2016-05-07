var mongoose = require("mongoose");

module.exports = mongoose.model('User', {
    id: String,
    access_token: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
});

email : String,
local : {
    password : String
},
facebook {
    id: String,
    token: String,
    name: String
    }
    });
    
    
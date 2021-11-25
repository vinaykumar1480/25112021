const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type:String,
        required: true
    },
    landmarks: {
        type: String
    },
    city_name: {
        type: String,
        required: true
    },
    state_name: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    UID: {
        type: String,
        required: true,
    },
}, {collection:'Apartments_Data'});

module.exports = mongoose.model('ApartmentSchema', apartmentSchema);
const mongoose = require('mongoose');

const childrenSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type:String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    mother_name: {
        type: String,
        required: true
    },
    school_name: {
        type: String
    },
    apartment_ref: {
        type: String,
        required: true
    },
    UID: {
        type: String,
        required: true,
    },
}, {collection:'Children_Data'});

module.exports = mongoose.model('ChildrenSchema', childrenSchema);
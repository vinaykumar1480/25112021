const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    UID: {
        type: String,
        required: true,
    },
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
    mobile_number: {
        type: String,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'Mobile number required'],
        unique: true
    },
    apartment_ref: {
        type: String,
        required: true
    },
    subscription: {
        type: String
    },
}, {collection:'Person_Data'});

module.exports = mongoose.model('PersonSchema', personSchema);
const mongoose = require('mongoose');

const ImageUploadSchema = new mongoose.Schema({
    apartment_ref: {
        type: String,
        required: true
    },
    image_path: {
        type:String,
        required: true
    },
    UID: {
        type: String,
        required: true,
    },
}, {collection:'Events_Images'});

module.exports = mongoose.model('ImageUploadSchema', ImageUploadSchema);
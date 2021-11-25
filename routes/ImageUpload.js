const express = require('express').Router();
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink);
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { uploadFile, getFileStream } = require('../utils/s3');
const verified = require('./verifyJwt');
const ImageUploadSchema = require('../models/ImageUploadSchema');
const Joi = require('joi');
const attendance = require("../models/Attendance");
const Children = require("../models/Children");

const imageSchema = Joi.object().keys({
    apartment_ref: Joi.string().required(),
    UID: Joi.string().required()
});


express.get('/images/:key', (req, res) => {
    const key = req.params.key
    const readStream = getFileStream(key);
    readStream.pipe(res);
})

express.get('/images', verified, async (req, res, next) => {
    try {
        var reqImageData = await ImageUploadSchema.find();
        const user = req.user;

        if (reqImageData.length > 0) {
            return res.status(200).send({
                status: 200,
                message: "Images.",
                user: user,
                data: reqImageData
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "No Data found.",
                data: {},
                user: user
            });
        }

    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.message,
                data: {}
            });
        }
    }

})

express.post('/images',verified, upload.single('image'), async (req, res) => {
    const file = req.file
    const { apartment_ref, UID } = req.body;
    const userDetails = req.user;
    try {
        Joi.assert(req.body, imageSchema);
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.details[0].message,
                data: {},
            });
        }
    }
    try {
        // apply filter
        // resize
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        const description = req.body.description;
        const reqImageData = new ImageUploadSchema({
            apartment_ref: apartment_ref,
            UID: UID,
            image_path:`/images/${result.Key}`
        });
        const saveImage = await reqImageData.save();
        res.status(200).send({
            status: 200,
            message: 'Image Uploaded Successfully.',
            data: saveImage,
            user: userDetails,
        });

    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
            data: {}
        });
    };
})

module.exports = express;

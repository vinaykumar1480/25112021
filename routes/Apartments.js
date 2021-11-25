const express = require('express');
const router = express.Router();
const Apartment = require('../models/Apartments');
const Joi = require('joi');
const verified = require("./verifyJwt");

const apartmentSchema = Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    landmarks: Joi.string(),
    city_name: Joi.string().required(),
    state_name: Joi.string().required(),
    pincode: Joi.string().required(),
    UID: Joi.string().required(),
});

router.post('/register', verified, async (req, res, next) => {
    const { UID, name, address, landmarks, city_name, state_name, pincode, } = req.body;
    const userDetails = req.user;
    const reqAtt = new Apartment({
        UID:UID,
        name: name,
        address: address,
        landmarks: landmarks,
        city_name: city_name,
        state_name: state_name,
        pincode: pincode
    });
    try {
        Joi.assert(req.body, apartmentSchema);
    } catch (error) {
        if (error) {
            return res.status(400).send({
                status: 400,
                message: error.details[0].message,
                data: {}
            });
        }
    }

    try {
        const saveUser = await reqAtt.save();
        res.status(200).send({
            status: 200,
            message: 'Recorded successfully.',
            data: saveUser,
            user: userDetails
        });

    } catch (err) {
        res.status(400).send({
            status: 400,
            message: err.message,
            data: {}
        });
    };
});

router.get('/all', verified, async (req, res, next) => {
    try {
        var reqAttData = await Apartment.find();
        const user = req.user;
        /*if (req.query.id) {
            reqAttData = reqAttData.filter(function (ele) {
                if (ele["UID"] == req.query.id) {
                    return true;
                }
            });*/

        if (reqAttData.length > 0) {
            return res.status(200).send({
                status: 200,
                message: "Apartments.",
                user: user,
                data: reqAttData
            });
        } else {
            res.status(404).send({
                status: 404,
                message: "No Data found.",
                data: {},
                user: user
            });
        }
        /* }*/


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

module.exports = router;
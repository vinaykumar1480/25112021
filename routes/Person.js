const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const Joi = require('joi');
const assert = require('assert');

const personSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.string().required(),
    mobile_number: Joi.string().required(),
    apartment_ref: Joi.string().required(),
    subscription: Joi.string(),
    UID: Joi.string().required()
});

router.post('/register', async (req, res, next) => {
    const { UID, first_name, last_name, gender, age, mobile_number, apartment_ref, subscription } = req.body;
    const userDetails = req.user;

    const reqAtt = new Person({
        UID:UID,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        age: age,
        mobile_number: mobile_number,
        apartment_ref:apartment_ref,
        subscription:subscription
    });

    try {
        Joi.assert(req.body, personSchema);
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

router.get('/all', async (req, res, next) => {
    try {
        var reqAttData = await Person.find();
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
                message: "Person Details.",
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
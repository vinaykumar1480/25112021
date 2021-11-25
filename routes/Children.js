const express = require('express');
const router = express.Router();
const Children = require('../models/Children');
const Joi = require('joi');

const childrenSchema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.string().required(),
    father_name: Joi.string().required(),
    mother_name: Joi.string().required(),
    school_name: Joi.string(),
    apartment_ref: Joi.string().required(),
    UID: Joi.string().required(),
});

router.post('/register', async (req, res, next) => {
    const { UID, first_name, last_name, gender, age, father_name, mother_name, school_name, apartment_ref } = req.body;
    const userDetails = req.user;
    const reqAtt = new Children({
        UID:UID,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        age: age,
        father_name: father_name,
        mother_name: mother_name,
        school_name:school_name,
        apartment_ref:apartment_ref
    });
    try {
        Joi.assert(req.body, childrenSchema);
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
        var reqAttData = await Children.find();
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
                message: "Children.",
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
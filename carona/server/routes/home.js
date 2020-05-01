const router = require('express').Router();
const dbconfig = require('../config/database');
const cloudinary = require('cloudinary');
let Images = require('../models/images.model');

cloudinary.config({
    cloud_name: dbconfig.cloud_name,
    api_key: dbconfig.api_key,
    api_secret: dbconfig.api_secret
});

router.get('/', async (req, res) => {
    Images.getAll()
        .then(x => {
            res.status(200).json(x);
        })
        .catch(err => res.status(400).send(err));
})

module.exports = router;
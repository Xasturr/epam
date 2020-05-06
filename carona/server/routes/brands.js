const router = require('express').Router();
let Brand = require('../models/brands.model');

router.get('/', (req, res) => {
    Brand.getAll()
        .then(x => res.status(200).json(x))
        .catch(err => res.status(404).send(err));
})

router.get('/:brand', (req, res) => {
    const brand = req.params.brand;

    Brand.getBrandModels(brand)
        .then(models => res.json(models))
        .catch(err => res.status(404).send(err));
})

module.exports = router;
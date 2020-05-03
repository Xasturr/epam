const router = require('express').Router();
let Car = require('../models/car.model');

router.get('/', (req, res) => {
    Car.getAll()
        .then(x => res.status(200).json(x))
        .catch(err => res.status(404).send(err));
})

router.get('/:id', (req, res) => {
    const carId = req.params.id;

    Car.getCar(carId)
        .then(car => res.json(car))
        .catch(err => res.status(404).send(err));
})

module.exports = router;
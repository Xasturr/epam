const router = require('express').Router();
let Car = require('../models/car.model');

router.get('/', (req, res) => {
    Car.getAll()
        .then(x => res.status(200).json(x))
        .catch(err => res.send(err));
})

router.get('/:id', (req, res) => {
    const carId = req.params.id;

    Car.getCar(carId)
        .then(car => res.json(car))
        .catch(err => res.send(err));
})

router.post('/search', (req, res) => {
    let carArray = [];

    Car.getAll()
        .then(cars => {
            for (let i = 0; i < cars.length; i++) {
                const car = cars[i];
                if (!Car.compare(req.body.brand, car.brand) ||
                    !Car.compare(req.body.model, car.model) ||
                    !Car.compare(req.body.class, car.class))
                    continue;
                if (req.body.yearFrom.length > 0)
                    if (req.body.yearFrom > car.year)
                        continue;
                if (req.body.yearTo.length > 0)
                    if (req.body.yearTo < car.year)
                        continue;
                carArray.push(car);
            }
            res.status(200).json(carArray);
        })
        .catch(err => res.send(err))
})

module.exports = router;
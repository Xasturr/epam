const router = require('express').Router();
const Car = require('../models/car.model');
const pmongo = require('promised-mongo');
const ObjectId = pmongo.ObjectId;

router.get('/', (req, res) => {
    const q = req.query.class;
    console.log(q);
    console.log('-----------------------------------------------');
    Car.getAll()
        .then(x => {
            if (q) {
                let cars = [];
                for (let i = 0; i < x.length; i++) {
                    const car = x[i];
                    if (!Car.compare(q, car.class))
                        continue;
                    cars.push(car);
                }
                console.log(cars);
                res.status(200).json(cars);
            }
            else
                res.status(200).json(x);
        })
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
                    !Car.compare(req.body.class, car.class) ||
                    !Car.compare(req.body.country, car.country))
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

router.post('/:id/order', (req, res) => {
    res.status(200).send(req.body.number);
})

router.put('/:id/deletecomment', (req, res) => {
    Car.update(req.body.carId, { $pull: { 'commentsId': ObjectId(req.body.commentId) } })
        .then(x => { res.status(202).send("Updated") })
        .catch(err => { res.status(404).send(err) })
})

module.exports = router;
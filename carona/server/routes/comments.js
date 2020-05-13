const router = require('express').Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment.model');
const Car = require('../models/car.model');
const pmongo = require('promised-mongo');
const ObjectId = pmongo.ObjectId;

router.get('/', (req, res) => {
    Comment.getAll()
        .then(x => res.status(200).json(x))
        .catch(err => res.send(err));
})

router.post('/create', (req, res) => {
    const date = new Date();

    let newComment = new Comment();

    newComment._id = new mongoose.Types.ObjectId();
    newComment.fullname = "Unknown user";
    newComment.comment = req.body.comment;
    newComment.createdAt = date;
    newComment.image = "https://api.adorable.io/avatars/48/name@adorable.io.png";

    Comment.insert(newComment)
        .then(comment => {
            return Car.update(req.body.carId, { $push: { 'commentsId': comment._id } });
        })
        .then(x => res.status(201).send(newComment._id))
        .catch(err => res.send(err))
})

router.get('/:id', (req, res) => {
    const commentId = req.params.id;

    Comment.getComment(commentId)
        .then(comment => res.json(comment))
        .catch(err => res.send(err));
})

router.delete('/:id/delete', (req, res) => {

    Comment.delete(req.params.id)
        .then(x => res.status(200).send("Deleted"))
        .catch(err => res.send(err))
})

module.exports = router;
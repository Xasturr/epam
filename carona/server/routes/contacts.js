const router = require('express').Router();
let Contacts = require('../models/contacts.model');

router.get('/', (req, res) => {
    Contacts.getAll()
        .then(x => res.status(200).json(x))
        .catch(err => res.status(400).send(err));
})

router.get('/:id', (req, res) => {
    const contactId = req.params.id;

    Contacts.getContact(contactId)
        .then(contact => res.json(contact))
        .catch(err => res.status(404).send(err));
})

module.exports = router;
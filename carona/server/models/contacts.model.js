let mongoose = require('mongoose');

let ContactsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    phonenum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

let ContactsModel = mongoose.model('Contacts', ContactsSchema);

ContactsModel.getAll = function () {
    return ContactsModel.find();
}

ContactsModel.getContact = function (id) {
    return ContactsModel.find({ '_id': id });
}

module.exports = mongoose.model('Contacts', ContactsSchema);
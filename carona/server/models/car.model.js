let mongoose = require('mongoose');

let CarSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    commentsId: {
        type: Array,
        required: true
    },
    info: {
        type: String, 
        required: true
    }
});

let CarModel = mongoose.model('Car', CarSchema);

CarModel.getAll = function () {
    return CarModel.find();
}

CarModel.getCar = function (id) {
    return CarModel.find({ '_id': id });
}

CarModel.compare = function (queryParam, carParam) {
    if (queryParam.length > 0)
        if (queryParam !== carParam)
            return false
    return true;
}

CarModel.update = function (id, updateInfo) {
    return CarModel.updateOne({ _id: id }, updateInfo);
}

module.exports = mongoose.model('Car', CarSchema);
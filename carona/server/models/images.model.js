let mongoose = require('mongoose');
// mongoose.set('debug', true);

let ImagesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    images: Array
});

let ImagesModel = mongoose.model('Images', ImagesSchema);

ImagesModel.getAll = function () {
    return ImagesModel.find();
}

module.exports = mongoose.model('Images', ImagesSchema);
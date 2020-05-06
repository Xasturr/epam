let mongoose = require('mongoose');

let BrandSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: {
        type: String,
        required: true
    },
    models: {
        type: Array,
        required: true
    },
});

let BrandModel = mongoose.model('Brands', BrandSchema);

BrandModel.getAll = function () {
    return BrandModel.find();
}

BrandModel.getBrandModels = function (brand) {
    return BrandModel.find({ 'brand': brand });
}

module.exports = mongoose.model('Brands', BrandSchema);
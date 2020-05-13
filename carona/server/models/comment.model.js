let mongoose = require('mongoose');

let CommentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullname: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    }
});

let CommentModel = mongoose.model('Comments', CommentSchema);

CommentModel.getAll = function () {
    return CommentModel.find();
}

CommentModel.getComment = function (id) {
    return CommentModel.find({ '_id': id });
}

CommentModel.insert = function (comment) {
    return new CommentModel(comment).save();
}

CommentModel.delete = function (id) {
    return CommentModel.findByIdAndDelete(id);
}

module.exports = mongoose.model('Comments', CommentSchema);
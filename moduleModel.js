var mongoose = require('mongoose');

var moduleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    mc: Number,
    grade: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export Module model
var Module = module.exports = mongoose.model('module', moduleSchema);
module.exports.get = function (callback, limit) {
    Module.find(callback).limit(limit);
}

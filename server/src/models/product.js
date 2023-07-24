const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: Array, required: true},
    logo: {type: String, required: true},
    link: {type: String, required: true},
    description: {type: String, required: true},
    comments: Array,
    upvotes: Number
})

module.exports = mongoose.model('Product', productSchema)
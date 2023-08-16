const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        equired: true,
        set: value => parseFlroat(value),
    },
    status: {
        type: Boolean,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        set: value => parseInt(value),
    },
    category: {
        type: String,
        required: true,
    },
    thumbnails: {
        type: Array,
        validate: {
            validator: value => {
                if (!value) {
                    return []
                }
            }
        }
    },
})

module.exports = mongoose.model('products', productSchema)
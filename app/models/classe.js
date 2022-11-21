const mongoose = require('mongoose')

const classeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Classe', classeSchema)

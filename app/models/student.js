const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: false,
        trim: true
    },
    lastname: {
        type: String,
        required: false,
        trim: true
    },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('Student', studentSchema)
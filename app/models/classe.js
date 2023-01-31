const mongoose = require('mongoose')

const classeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Classe', classeSchema)

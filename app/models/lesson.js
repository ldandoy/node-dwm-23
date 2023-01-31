const mongoose = require('mongoose')

const lessonSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    classe: { type: mongoose.Schema.Types.ObjectId, ref: 'Classe' },
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Lesson', lessonSchema)
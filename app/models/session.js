const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    attendances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = mongoose.model('Session', sessionSchema)
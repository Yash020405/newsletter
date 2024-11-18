const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
    state: {
        type: String,
        enum: ['IDLE', 'FIRST_REMINDER', 'WAITING_FIRST', 'SECOND_REMINDER', 'WAITING_SECOND', 'COMPLETED_SUCCESS', 'COMPLETED_FAILURE'],
        default: 'IDLE',
        required: true
    },
    completedAt: { 
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Flow', flowSchema);
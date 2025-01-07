const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }],
    start_time: { type: String, required: true }, // Exemple : '08:00'
    end_time: { type: String, required: true },   // Exemple : '18:00'
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = { Schedule };

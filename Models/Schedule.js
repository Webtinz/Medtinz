const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scheduleSchema = new mongoose.Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'users', 
        required: true 
    },
    hospital_id: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital', // Lien avec le modèle Hospital
        default: null,   // Par défaut, null
    },
    schedule: [
        {
            day: { 
                type: String, 
                enum: [
                        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 
                        'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
                      ], 
                required: true 
            },
            start_time: { 
                type: String, 
                required: true // Exemple : '08:00'
            },
            end_time: { 
                type: String, 
                required: true // Exemple : '18:00'
            },
            duration_unit: { 
                type: Number, 
                required: true // Exemple : 30 (minutes)
            }
        }
    ]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = { Schedule };

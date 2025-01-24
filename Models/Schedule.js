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
        ref: 'Hospital',
        default: null,
    },
    schedules: [
        {
            start_date: { 
                type: Date, 
                required: false // Exemple : '2025-01-01'
            },
            end_date: { 
                type: Date, 
                required: false // Exemple : '2025-01-07'
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
            ],
            created_at: { 
                type: Date, 
                default: Date.now 
            },
            updated_at: { 
                type: Date, 
                default: Date.now 
            }
        }
    ]
});

// Middleware pour mettre à jour le champ `updated_at`
scheduleSchema.pre('save', function (next) {
    this.schedules.forEach(schedule => {
        if (this.isModified(`schedules.${schedule._id}`)) {
            schedule.updated_at = new Date();
        }
    });
    next();
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = { Schedule };



/*
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
*/
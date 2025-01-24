const { Schedule } = require('../Models/Schedule'); // Chemin vers votre modèle Schedule

const addSchedule = async (req, res) => {
    try {
        const { user, hospital_id, schedules } = req.body;

        const newSchedule = new Schedule({
            user,
            hospital_id,
            schedules, // Ici, `schedules` doit inclure start_date, end_date, et le détail des jours.
        });

        const savedSchedule = await newSchedule.save();
        return res.status(200).json({ success: true, data: savedSchedule });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const getSchedulesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const { start_date, end_date } = req.query; // Permet de filtrer par période

        const query = { user: userId };
        if (start_date && end_date) {
            query["schedules.start_date"] = { $lte: new Date(end_date) };
            query["schedules.end_date"] = { $gte: new Date(start_date) };
        }

        const schedules = await Schedule.find(query);

        if (!schedules || schedules.length === 0) {
            return res.status(404).json({ success: false, message: "No schedules found for this user." });
        }

        return res.status(200).json({ success: true, data: schedules });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params; // L'identifiant de l'horaire
        const { schedules } = req.body; // Données mises à jour, incluant start_date, end_date, etc.

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            { $set: { schedules } },
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        return res.status(200).json({ success: true, data: updatedSchedule });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const updateOrAddDay = async (req, res) => {
    try {
        const { id } = req.params;
        const { start_date, end_date, dayData } = req.body; // Inclut la période et la journée à ajouter ou mettre à jour.

        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        const intervalIndex = schedule.schedules.findIndex(
            s => s.start_date.toISOString() === start_date && s.end_date.toISOString() === end_date
        );

        if (intervalIndex === -1) {
            return res.status(404).json({ success: false, message: "Interval not found." });
        }

        const existingDayIndex = schedule.schedules[intervalIndex].schedule.findIndex(d => d.day === dayData.day);
        if (existingDayIndex >= 0) {
            schedule.schedules[intervalIndex].schedule[existingDayIndex] = dayData;
        } else {
            schedule.schedules[intervalIndex].schedule.push(dayData);
        }

        const savedSchedule = await schedule.save();
        return res.status(200).json({ success: true, data: savedSchedule });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};


const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await Schedule.findByIdAndDelete(id);
        if (!deletedSchedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }
        return res.status(200).json({ success: true, data: deletedSchedule });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const deleteDayFromSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { start_date, end_date, day } = req.body; // Inclut la période et le jour à supprimer.

        const schedule = await Schedule.findById(id);
        if (!schedule) {
            return res.status(404).json({ success: false, message: "Schedule not found" });
        }

        const intervalIndex = schedule.schedules.findIndex(
            s => s.start_date.toISOString() === start_date && s.end_date.toISOString() === end_date
        );

        if (intervalIndex === -1) {
            return res.status(404).json({ success: false, message: "Interval not found." });
        }

        schedule.schedules[intervalIndex].schedule = schedule.schedules[intervalIndex].schedule.filter(
            d => d.day !== day
        );

        const savedSchedule = await schedule.save();
        return res.status(200).json({ success: true, data: savedSchedule });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};








/*

    const addSchedule = async (req, res) => {
        try {
            const { user, hospital_id, schedule } = req.body;
            const newSchedule = new Schedule({
                user,
                hospital_id,
                schedule,
            });

            const savedSchedule = await newSchedule.save();
            return res.status(200).json({ success: true, data: savedSchedule });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    };


    const getSchedulesByUserId = async (req, res) => {
        try {
            const { userId } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête

            // Rechercher les schedules associés à cet utilisateur
            const schedules = await Schedule.find({ user: userId });

            if (!schedules || schedules.length === 0) {
                return res.status(404).json({ success: false, message: "No schedules found for this user." });
            }

            return res.status(200).json({ success: true, data: schedules });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    const updateSchedule = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            const updatedSchedule = await Schedule.findByIdAndUpdate(
                id,
                { $set: updatedData },
                { new: true, runValidators: true }
            );
            if (!updatedSchedule) {
                return res.status(404).json({ success: false, message: "Schedule not found" });
            }
            return res.status(200).json({ success: true, data: updatedSchedule });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    const deleteSchedule = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedSchedule = await Schedule.findByIdAndDelete(id);
            if (!deletedSchedule) {
                return res.status(404).json({ success: false, message: "Schedule not found" });
            }
            return res.status(200).json({ success: true, data: deletedSchedule });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    const updateOrAddDay = async (req, res) => {
        try {
            const { id } = req.params;
            const dayData = req.body;

            const schedule = await Schedule.findById(id);
            if (!schedule) {
                return res.status(404).json({ success: false, message: "Schedule not found" });
            }

            const existingDayIndex = schedule.schedule.findIndex(d => d.day === dayData.day);
            if (existingDayIndex >= 0) {
                // Mettre à jour la journée existante
                schedule.schedule[existingDayIndex] = dayData;
            } else {
                // Ajouter une nouvelle journée
                schedule.schedule.push(dayData);
            }

            const savedSchedule = await schedule.save();
            return res.status(200).json({ success: true, data: savedSchedule });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    };

    const deleteDayFromSchedule = async (req, res) => {
        try {
            const { id } = req.params;
            const { day } = req.body;

            const schedule = await Schedule.findById(id);
            if (!schedule) {
                return res.status(404).json({ success: false, message: "Schedule not found" });
            }

            schedule.schedule = schedule.schedule.filter(d => d.day !== day);

            const savedSchedule = await schedule.save();
            return res.status(200).json({ success: true, data: savedSchedule });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    };
*/

module.exports = {
    addSchedule,
    updateSchedule,
    deleteSchedule,
    updateOrAddDay,
    deleteDayFromSchedule,
    getSchedulesByUserId
};

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import Timetable from './timetable'; // Assurez-vous que le composant Timetable est correctement importé
import api from '../../../service/caller'; // Assurez-vous que l'API est correctement importée

const DoctorSelectionrdv = ({ visible, onClose, onAppointmentConfirmed }) => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [doctorMessage, setDoctorMessage] = useState('');
    const [doctorSchedule, setDoctorSchedule] = useState([]);
    const location = useLocation();
    const appointmentInfo = location.state;

    // Accès direct à hospitalId
    const hospitalId = appointmentInfo?.hospitalId;

    useEffect(() => {
        if (hospitalId) {
            // Récupérer les médecins du même hôpital
            fetchDoctors();
        }
    }, [hospitalId]);

    const fetchDoctors = async () => {
        try {
            const response = await api.get(`api/usersbydepartment?hospital_id=${hospitalId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            });
            setDoctors(response.data);
        } catch (error) {
            setDoctorMessage('Erreur lors de la récupération des médecins.');
        }
    };

    // Vous pouvez utiliser selectedDoctor._id ici en dehors des fonctions
    const doctorId = selectedDoctor ? selectedDoctor._id : null;
    console.log(doctorId);

    const fetchDoctorSchedule = async (doctorId) => {
        try {
            const response = await api.get(`/api/schedule/${doctorId}`); 
            console.log('Réponse de l\'API:', response.data.data[0].schedules);  // Log avant de définir l'état
            setDoctorSchedule(response.data.data[0].schedules); 
        } catch (error) {
            console.error('Erreur lors de la récupération des horaires du médecin:', error);
        }
    };

    useEffect(() => {
        console.log('État mis à jour:', doctorSchedule);
    }, [doctorSchedule]);

    useEffect(() => {
        if (doctorId) {
            fetchDoctorSchedule(doctorId);
        }
    }, [doctorId]);

    const handleDoctorSelection = (doctor) => {
        setSelectedDoctor(doctor);
        fetchDoctorSchedule(doctor._id); // Récupérer les horaires du médecin sélectionné
    };

    const handleDateChange = (date) => {
        setAppointmentDate(date); // Mettre à jour la date de rendez-vous sélectionnée
    };

    const handleConfirmAppointment = () => {
        if (!selectedDoctor || !appointmentDate) {
            alert('Veuillez sélectionner un médecin et une date.');
            return;
        }

        const finalAppointmentData = {
            doctorId: selectedDoctor._id,
            appointmentDate,
        };
        onAppointmentConfirmed(finalAppointmentData); // Passez les données finales à la page principale
        onClose(); // Fermez la modal
    };

    return (
        <CModal className='newregistermodal xl'
            alignment="center"
            scrollable
            size='xl'
            visible={true}
            onClose={onClose}
            aria-labelledby="schedulemodal">
            <CModalHeader>
                <CModalTitle id="schedulemodal" className='Titleformsmodal'>Register New Appointment</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div>
                    {doctorMessage && <p>{doctorMessage}</p>}
                    <div className="form-group">
                        <label htmlFor="doctor">Doctor</label>
                        <select name="doctorId" required onChange={(e) => handleDoctorSelection(doctors.find(d => d._id === e.target.value))}>
                            <option>Select Doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.lastname} {doctor.firstname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedDoctor && doctorSchedule.length > 0 && (
                        <div>
                            <p>
                                Doctor <strong>Dr. {selectedDoctor.lastname} {selectedDoctor.firstname} </strong> timetable:
                            </p>
                            <Timetable doctorSchedule={doctorSchedule} />
                        </div>
                    )}

                    {selectedDoctor && doctorSchedule.length === 0 && (
                        <div>
                            <p>Aucune disponibilité pour ce médecin.</p>
                        </div>
                    )}

                    <div className="savenewuser form-group d-flex justify-content-center">
                        <CButton type="submit" onClick={handleConfirmAppointment}>
                            Save Appointment &nbsp; <BsArrowRight />
                        </CButton>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    );
};

export default DoctorSelectionrdv;

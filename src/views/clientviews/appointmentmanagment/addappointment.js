import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import '../../../assets/css/mainstyle.css';

const AddAppointmentModal = ({ visible, onClose, onAppointmentAdded }) => {
    const navigate = useNavigate(); // Initialisez useNavigate
    const [patients, setPatients] = useState([]);
    const [appointmentData, setAppointmentData] = useState({
        patientId: '',
        department: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/clinic/patients?page=1&limit=100'); // Adaptez les paramètres si nécessaire
                setPatients(response.data.patients); // Met à jour la liste des patients
            } catch (error) {
                console.error('Erreur lors de la récupération des patients :', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentData({ ...appointmentData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/clinic/createBaseAppointment', appointmentData);
            console.log('Appointment added:', response.data);
            onAppointmentAdded(response.data.appointment);
            onClose(); // Fermez le modal
            navigate('/hospitaladmin/payment', { state: { appointment: response.data.appointment } }); // Redirigez avec les données de rendez-vous
        } catch (error) {
            console.error('Error adding appointment:', error);
            alert('Failed to add appointment');
        }
    };

    return (
        <CModal className='newregistermodal '
            alignment="center"
            scrollable
            size='lg'
            visible={visible}
            onClose={onClose}
            aria-labelledby="VerticallyCenteredScrollableExample2"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register New Appointment</CModalTitle>
            </CModalHeader>
            <CModalBody className="p-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patientId">Patient</label>
                        <select name="patientId" id="patientId" value={appointmentData.patientId} onChange={handleChange} required>
                            <option value="">Select Patient</option>
                            {patients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.name} {/* Affiche le nom du patient */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department</label>
                        <select name="department" value={appointmentData.department} onChange={handleChange} required>
                            <option value="">Select Department</option>
                            <option value="ORL">ORL</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Onthology">Onthology</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentDate">Date</label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={appointmentData.appointmentDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="appointmentTime">Time</label>
                        <input
                            type="time"
                            name="appointmentTime"
                            value={appointmentData.appointmentTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            name="notes"
                            value={appointmentData.notes}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="savenewuser form-group d-flex justify-content-center">
                        <CButton type="submit">
                            Save Appointment &nbsp; <BsArrowRight />
                        </CButton>
                    </div>
                </form>
            </CModalBody>
        </CModal>
    );
};

export default AddAppointmentModal;

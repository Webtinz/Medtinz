import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft } from "react-icons/fa";
import './horaire.css';
import api from '../../../service/caller';
import { ToastContainer, toast } from 'react-toastify';
import WeekSelector from './WeekSelector';  // Ajustez le chemin selon votre structure


const Horaire = () => {
  const [showhoraireModal, setshowhoraireModal] = useState(true);

  const navigate = useNavigate();

  const [scheduleData, setScheduleData] = useState({
    Monday: { start_time: "", end_time: "", duration_unit: 30 },
    Tuesday: { start_time: "", end_time: "", duration_unit: 30 },
    Wednesday: { start_time: "", end_time: "", duration_unit: 30 },
    Thursday: { start_time: "", end_time: "", duration_unit: 30 },
    Friday: { start_time: "", end_time: "", duration_unit: 30 },
    Saturday: { start_time: "", end_time: "", duration_unit: 30 },
    Sunday: { start_time: "", end_time: "", duration_unit: 30 }
  });
  const [customDuration, setCustomDuration] = useState('');
  const location = useLocation();
  
  // Ajoutez cet état pour le sélecteur de semaine
  const [selectedWeek, setSelectedWeek] = useState({
    start_date: '',
    end_date: ''
  });

  // Extraire les paramètres de l'URL
  const queryParams = new URLSearchParams(location.search);
  const hospitalId = queryParams.get('hospital_id');
  const userId = queryParams.get('_id');

  const handleDurationChange = (day, duration) => {
    const validDuration = duration % 5 === 0 ? duration : 30;
    setScheduleData(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        duration_unit: validDuration
      }
    }));
  };

  const handleTimeChange = (day, type, value) => {
    setScheduleData(prevState => ({
      ...prevState,
      [day]: {
        ...prevState[day],
        [type]: value
      }
    }));
  };

  const handleCustomDurationChange = (e) => {
    const value = e.target.value;
    const numValue = parseInt(value, 10);
    if (numValue % 5 === 0 || value === '') {
      setCustomDuration(value);
    }
  };

  // Applique la durée sélectionnée à toutes les journées
  const handleDefaultDuration = (duration) => {
    setScheduleData(prevState => {
      const newScheduleData = {};
      Object.keys(prevState).forEach(day => {
        newScheduleData[day] = {
          ...prevState[day],
          duration_unit: duration
        };
      });
      return newScheduleData;
    });
    setCustomDuration(`${duration} min`); // Met à jour l'affichage de la durée personnalisée
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Ajoutez les dates au payload que vous envoyez
  //   const payload = {
  //     ...scheduleData,
  //     start_date: selectedWeek.start_date,
  //     end_date: selectedWeek.end_date
  //   };
  //   // Votre logique d'envoi existante
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: userId,
      hospital_id: hospitalId,
      schedules: [
        {
          start_date: selectedWeek.start_date,
          end_date: selectedWeek.end_date,
          schedule: Object.keys(scheduleData).map(day => ({
            day: day,
            start_time: scheduleData[day].start_time,
            end_time: scheduleData[day].end_time,
            duration_unit: scheduleData[day].duration_unit
          }))
        }
      ]
    };
console.log(formData);

    try {
        const response = await api.post('api/schedule', formData);

        console.log(response);
        if ((response.status == 200 || response.status == 201)) {
            // Succès
            
            toast.success("Schedule registered successfully! You will be redirect now.");
                        
            setTimeout(() => {
              // Ajouter les données aux paramètres de l'URL
              navigate({
                pathname: '/hospitaladmin/staff_details',
                search: `?hospital_id=${response?.data?.data?.hospital_id}&_id=${response?.data?.data?.user}&schedule=${JSON.stringify(formData.schedule)}`
              });
            }, 2000); // 2000 ms = 2 secondes
        } else {
            // Échec géré dans la réponse
            toast.error(response.data.message || "Failed to register schedule. Please try again.");
        }
    } catch (error) {
        toast.error(`Registration failed: ${error?.response?.data?.message || 'An unexpected error occurred. Please try again.'}`);
        console.error('Error:', error?.response|| 'No error message available.');
    }
  };

  return (
    <div>
      <Modal
        show={showhoraireModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="mx-auto hius">Configurer les horaires</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ToastContainer />

          <Form onSubmit={handleSubmit}>
            {/* <div className="mb-3">
              <button className="essuie"><FaArrowLeft /> Retour</button>
            </div> */}

            {/* <h3 className="sete">Configurez les horaires de cet utilisateur :</h3> */}
            <div className="mb-3">
              <button className="essuie"><FaArrowLeft /> Retour</button>
            </div>

            {/* Ajoutez le sélecteur de semaine ici */}
            <WeekSelector 
              onWeekChange={(dates) => setSelectedWeek(dates)} 
            />

<h3 className="sete">Configurez les horaires de cet utilisateur :</h3>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Jour</th>
                  <th className="text-center kul">De :</th>
                  <th>À :</th>
                  <th className="text-center kul">Durée (min)</th>
                </tr>
              </thead>
              <tbody>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>
                      <input
                        type="time"
                        value={scheduleData[day].start_time}
                        onChange={(e) => handleTimeChange(day, "start_time", e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={scheduleData[day].end_time}
                        onChange={(e) => handleTimeChange(day, "end_time", e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={scheduleData[day].duration_unit}
                        onChange={(e) => handleDurationChange(day, e.target.value)}
                        className="time-input"
                        min="5"
                        step="5"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="sete">Définissez une durée moyenne de consultation pour ce docteur :</h3>
            <div className="duration-buttons">
              {[15, 20, 25, 30].map((duration) => (
                <Button
                  key={duration}
                  className={`duration-button ${customDuration === `${duration} min` ? 'active' : ''}`}
                  onClick={() => handleDefaultDuration(duration)}
                  variant="outline-primary"
                >
                  {duration} min
                </Button>
              ))}
            </div>
            <Modal.Footer>
              <Button type="submit" variant="primary" className="mx-auto modify-button">
                Soumettre
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Horaire;

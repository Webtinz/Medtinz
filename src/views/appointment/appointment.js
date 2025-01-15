import React, { useEffect, useRef } from 'react';
import icone from '../../assets/images/info.png';
import icone2 from '../../assets/images/coeur.png';
import { useLocation, useNavigate } from "react-router-dom";

import './appointment.css';

const Appointments = () => {
  const navigate = useNavigate();
  const handleViewHistory = () => {
    navigate("/hospitaladmin/appointment_history"); // Redirigez à la page d'historique
  };

  const popoverRefs = useRef([]);

  const appointments = [
    {
      time: '9:00',
      endtime:'__:__',
      date: '2024-12-06',
      patient: 'Markiz Oceane Malwine',
      phone: '+229 01 00 99 00',
      status: true,
      vitalSigns: {
        temperature: '35.7°C',
        bloodPressure: '120/90 mmHg',
        note: 'Patient has some problems breathing. Patient is very disturbed.',
      },
    },
    {
        time: '9:00',
        endtime:'__:__',
        date: '2024-12-06',
        patient: 'Markiz Oceane Malwine',
        phone: '+229 01 00 99 00',
        status: false,
        vitalSigns: {
          temperature: '35.7°C',
          bloodPressure: '120/90 mmHg',
          note: 'Patient has some problems breathing. Patient is very disturbed.',
        },
      },
      {
        time: '9:00',
        endtime:'__:__',
        date: '2024-12-06',
        patient: 'Markiz Oceane Malwine',
        phone: '+229 01 00 99 00',
        status: true,
        vitalSigns: {
          temperature: '35.7°C',
          bloodPressure: '120/90 mmHg',
          note: 'Patient has some problems breathing. Patient is very disturbed.',
        },
      },
    // Add more appointments as needed
  ];

  useEffect(() => {
    popoverRefs.current.forEach((popoverEl) => {
      // Initialiser le popover Bootstrap uniquement si l'élément est défini
      if (popoverEl) {
        new window.bootstrap.Popover(popoverEl, {
          html: true, // Permet de rendre le contenu HTML
        });
      }
    });
  }, []);

  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h2 className="fw-bold" style={{ color: '#0056B3', fontSize: '42px', marginBottom: '70px' }}>
        Your appointments
      </h2>

      <div className="card p-4">
        <div className="card-body">
          <div className="row mb-3 justify-content-between">
            <div className="col-md-4" style={{ borderRadius: '15px' }}>
              <div className="input-group" style={{ borderRadius: '15px 0px 0px 15px' }}>
                <span className="input-group-text" style={{ borderRadius: '15px 0px 0px 15px' }}>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  style={{ borderRadius: '0px 15px 15px 0px' }}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-primary me-2">
                View calendar <i className="bi bi-calendar3"></i>
              </button>
              <button className="btn btn-primary" onClick={handleViewHistory}>
                View history <i className="bi bi-clock-history"></i>
            </button>
            </div>
          </div>

          <table className="table">
            <thead className="thead-light">
              <tr className='text-primary'>
                <th className='text-primary' scope="col">Time</th>
                <th className='text-primary' scope="col">Date</th>
                <th className='text-primary' scope="col">Patient</th>
                <th className='text-primary' scope="col">Phone number</th>
                <th className='text-primary' scope="col">Actions</th>
                <th className='text-primary' scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td className='d-flex flex-column text-primary'>
                    <p>{appointment.time}</p>
                    <p>{appointment.endtime}</p>
                  </td>
                  <td style={{ height: '90px' }}>{appointment.date}</td>
                  <td>{appointment.patient}</td>
                  <td>{appointment.phone}</td>
                  <td>
                    <img
                      className="btn me-2 cursor-pointer"
                      data-bs-toggle="popover"
                      data-bs-title="Vital Signs"
                      data-bs-content={`Body Temperature: <strong style="color: 'red';">${appointment.vitalSigns.temperature}</strong><br /><hr>Blood Pressure: <strong>${appointment.vitalSigns.bloodPressure}</strong><br />Note: <strong>${appointment.vitalSigns.note}</strong>`}
                      data-bs-placement="bottom"
                      data-bs-custom-class="custom-popover"
                      src={icone}
                      ref={(el) => (popoverRefs.current[index] = el)} // Référence à chaque image
                    />
                    <img className="me-2 btn cursor-pointer" src={icone2} alt="Heart Icon" />
                  </td>
                  <td>
                    {appointment.status && (

                    <button className="btn" style={{ color: '#0056B3', backgroundColor: '#DFEAF5' }}>
                      Start appointment
                    </button>
                    )}
                    {!appointment.status && (

                    <button className="btn" style={{ color: '#1A5D1A', backgroundColor: '#28A7452B' }}>
                    Start online appointment
                    </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end">Showing 1-09 of 78</div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

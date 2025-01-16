import React, { useEffect, useRef } from 'react';
import icone from '../../assets/images/info.png';
import icone2 from '../../assets/images/coeur.png';
import './appointment.css';
import { useLocation, useNavigate } from "react-router-dom";


const AppointmentHistory = () => {
  const navigate = useNavigate();
  const handleViewHistory = () => {
    navigate("/hospitaladmin/patient_details"); // Redirigez à la page d'historique
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
  ];

  useEffect(() => {
    popoverRefs.current.forEach((popoverEl) => {
      if (popoverEl) {
        new window.bootstrap.Popover(popoverEl, {
          html: true,
        });
      }
    });
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Cela permet de revenir à la page précédente dans l'historique
  };

  return (
    <div className="container py-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      

      <h2 className="fw-bold" style={{ color: '#0056B3', fontSize: '42px', marginBottom: '70px' }}>
        Your appointments
      </h2>

      <div className="card p-4">
        <div className="card-body">
          {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4">
        <div className="d-flex align-items-center gap-3 w-100">
          <button className="btn btn-outline-primary d-flex align-items-center" onClick={handleGoBack}>
            <i className="bi bi-arrow-left me-2"></i>
            Retour
          </button>
          
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search"></i>
            </span>
            <input type="text" className="form-control border-start-0" placeholder="Search..."/>
          </div>
          
          <select className="form-select" style={{ maxWidth: '150px' }}>
            <option value="">Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          
          <select className="form-select" style={{ maxWidth: '150px' }}>
            <option value="">Past years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          
          <div className="input-group" style={{ maxWidth: '200px' }}>
            <input type="date" className="form-control" placeholder="Search by date"/>
            
          </div>
        </div>
      </nav>

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
                    <img className="me-2 btn cursor-pointer" onClick={handleViewHistory} src={icone} alt="Heart Icon" />
                  </td>
                  <td>
                    {appointment.status ? (
                      <button className="btn" style={{ color: '#28A745', backgroundColor: '#28A74521' }}>
                        Completed
                      </button>
                    ) : (
                      <button className="btn" style={{ color: '#EF3826', backgroundColor: '#EB001B70' }}>
                        Cancelled
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

export default AppointmentHistory;
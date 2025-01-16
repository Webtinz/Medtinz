import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";


const MedicalAppointments = () => {
  const navigate = useNavigate();

  const patientData = {
    nom: "Badoss",
    prenom: "Austin Miller",
    dateOfBirth: "20 / 12 / 2000",
    address: "Cadjehou",
    gender: "F"
  };

  const appointments = [
    { id: 1, date: "20 Dec 2024", type: "Consultation", doctor: "Dr. Badoss Succes", service: "Analyses sanguins" },
    { id: 2, date: "20 Dec 2024", type: "Consultation", doctor: "Dr. Badoss Succes", service: "Analyses sanguins" },
    { id: 3, date: "20 Dec 2024", type: "Controle", doctor: "Dr. Badoss Succes", service: "Analyses sanguins" },
    { id: 4, date: "20 Dec 2024", type: "Controle", doctor: "Dr. Badoss Succes", service: "Analyses sanguins" }
  ];

  const styles = {
    container: {
      padding: '1.5rem',
      minHeight: '100vh'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      padding: '1.5rem'
    },
    title: {
      color: '#2563EB',
      fontSize: '42px',
      fontWeight: 'bold',
      marginBottom: '1.5rem'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      color: '#2563EB',
      border: 'solid blue 2px',
      background: 'none',
      cursor: 'pointer',
      borderRadius: "15px",
      height: "50px",
      width: "100px",
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      borderLeft: '4px solid #22C55E',
      paddingLeft: '1rem',
      marginBottom: '0.5rem'
    },
    sectionTitleText: {
      fontSize: "18px",
      color: '#4B5563',
      fontWeight: '500'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '1rem',
      marginTop: '1rem',
      marginBottom: '2rem'
    },
    label: {
      color: '#4B5563',
      fontSize: '0.875rem',
      marginBottom: '0.25rem'
    },
    value: {
      fontWeight: 'bold'
    },
    tableContainer: {
      backgroundColor: '#28A7452B',
      borderRadius: '0.5rem',
      padding: '1rem'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      textAlign: 'left',
      paddingBottom: '1rem',
      color: '#4B5563',
      fontSize: '0.875rem',
      fontWeight: 'normal'
    },
    td: {
      padding: '0.5rem 0',
      color: '#374151'
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Cela permet de revenir à la page précédente dans l'historique
  };


  return (
    <div style={styles.container}>
        <h1 style={styles.title}>Your appointments</h1>
      <div style={styles.card}>
        
        <button className="btn btn-outline-primary d-flex align-items-center mb-4" onClick={handleGoBack} >
          ← Retour
        </button>

        <div className='mt-4'>
          <div style={styles.sectionTitle}>
            <h2 style={styles.sectionTitleText}>Patient Details</h2>
          </div>
          
          <div style={styles.gridContainer}>
            <div>
              <p style={styles.label}>Nom :</p>
              <p style={styles.value}>{patientData.nom}</p>
            </div>
            <div>
              <p style={styles.label}>Prénom:</p>
              <p style={styles.value}>{patientData.prenom}</p>
            </div>
            <div>
              <p style={styles.label}>Date of birth :</p>
              <p style={styles.value}>{patientData.dateOfBirth}</p>
            </div>
            <div>
              <p style={styles.label}>Address</p>
              <p style={styles.value}>{patientData.address}</p>
            </div>
            <div>
              <p style={styles.label}>Gender :</p>
              <p style={styles.value}>{patientData.gender}</p>
            </div>
          </div>
        </div>

        <div>
          <div style={styles.sectionTitle}>
            <h2 style={styles.sectionTitleText}>Medical history</h2>
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th className='text-center' style={styles.th}><p style={{backgroundColor:"#fff", margin:"7px", padding: "7px"}}># <i class="bi bi-arrow-down"></i></p></th>
                  <th className='text-center' style={styles.th}> <p style={{backgroundColor:"#fff", margin:"7px", padding: "7px"}}>Last Visit <i class="bi bi-arrow-down"></i></p></th>
                  <th className='text-center' style={styles.th}><p style={{backgroundColor:"#fff", margin:"7px", padding: "7px"}}>Type <i class="bi bi-arrow-down"></i></p></th>
                  <th className='text-center' style={styles.th}><p style={{backgroundColor:"#fff", margin:"7px", padding: "7px"}}>Doctor <i class="bi bi-arrow-down"></i></p></th>
                  <th className='text-center' style={styles.th}><p style={{backgroundColor:"#fff", margin:"7px", padding: "7px"}}>Services <i class="bi bi-arrow-down"></i></p></th>
                  <th className='text-center' style={styles.th}><p style={{backgroundColor:"#fff", margin:"7px", padding: "7px"}}>Voir détails <i class="bi bi-arrow-down"></i></p></th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className='text-center' style={styles.td}>{appointment.id}</td>
                    <td className='text-center' style={styles.td}>{appointment.date}</td>
                    <td className='text-center' style={styles.td}>{appointment.type}</td>
                    <td className='text-center' style={styles.td}>{appointment.doctor}</td>
                    <td className='text-center' style={styles.td}>{appointment.service}</td>
                    <td className='text-center text-success' style={styles.td}><i class="bi bi-eye"></i></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAppointments;
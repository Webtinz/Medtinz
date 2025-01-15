import React from 'react';

const MedicalAppointments = () => {
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
      backgroundColor: 'rgba(240, 253, 244, 0.5)',
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

  return (
    <div style={styles.container}>
        <h1 style={styles.title}>Your appointments</h1>
      <div style={styles.card}>
        
        <button style={styles.backButton}>
          ← Retour
        </button>

        <div>
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
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Last Visit</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Doctor</th>
                  <th style={styles.th}>Services</th>
                  <th style={styles.th}>Voir détails</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td style={styles.td}>{appointment.id}</td>
                    <td style={styles.td}>{appointment.date}</td>
                    <td style={styles.td}>{appointment.type}</td>
                    <td style={styles.td}>{appointment.doctor}</td>
                    <td style={styles.td}>{appointment.service}</td>
                    <td style={styles.td}>👁️</td>
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
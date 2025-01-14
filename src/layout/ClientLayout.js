import React from 'react';
import { Outlet } from 'react-router-dom'; // Utilisation de Outlet pour les pages imbriquées
import ClientSidebar from '../components/ClientSidebar'; // Sidebar

const ClientLayout = () => {
  return (
    <div style={{ backgroundColor: '#DFEAF5' }} className="allmyclientpage">
      <ClientSidebar /> {/* Sidebar à gauche */}
      <div className="wrapper d-flex flex-column min-vh-100 p-4" style={{ marginLeft: '300px', paddingRight: '10px' }}>
        <div className="body flex-grow-1" style={{ backgroundColor: '#DFEAF5', overflowX: 'hidden', width:'100%' , height:'100%' }}>
          <Outlet /> {/* Affichage des pages à l'intérieur de cet espace */}
        </div>
      </div>
    </div>
  );
}

export default ClientLayout;

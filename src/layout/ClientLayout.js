import React from 'react';
import Sidebar from '../components/ClientSidebar'; // Sidebar

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="content">
        <div className="main-content">
          {/* Le contenu dynamique de la page */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;

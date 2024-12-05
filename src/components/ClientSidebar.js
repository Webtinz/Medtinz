// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>MedTinz</h2>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/patients">Patient Management</Link></li>
        <li><Link to="/appointments">Appointment Scheduling</Link></li>
        <li><Link to="/billing">Billing</Link></li>
        <li><Link to="/inventory">Inventory & Pharmacy</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;

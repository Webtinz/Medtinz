import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import { BsTextParagraph } from 'react-icons/bs';
import { MdDashboard, MdPerson, MdPeople, MdAddBox, MdMoney, MdLocalHospital, MdLibraryBooks } from 'react-icons/md'; 
import '../assets/css/mainstyle.css';
import '../assets/css/ClientSidebar.css'
import medocImage from '../assets/images/medocplastics.png'; 
import logomedtinz from '../assets/images/Bright Web.png'; 

const ClientSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`sidebar-container ${sidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className='sidebartop'>
          <img src={logomedtinz} className='cardicon' alt="Consultation Icon" />
          {/* Toggle button */}
          <div className='ms-auto'>
            <FaBars onClick={toggleSidebar} className='sidebar-toggle-btn' />
          </div>
        </div>
      </div>

      <div className={`sidebar-menu-container ${sidebarOpen ? 'visible' : 'hidden'}`}>
        <div className="sidebar-menu">
          <ul>
            <li><Link to="/hospitaladmin/dashboard"><MdDashboard className="nav-icon" />Dashboard</Link></li>
            <li><Link to="/hospitaladmin/hospitalsetting"><MdDashboard className="nav-icon" />Hospital Settings</Link></li>
            <li><Link to="/hospitaladmin/patientlist"><MdPerson className="nav-icon" />Patient Management</Link></li>
            {/* <li><Link to="/hospitaladmin/department"><MdPeople className="nav-icon" />Department Management</Link></li>
            <li><Link to="/hospitaladmin/speciality"><MdAddBox className="nav-icon" />Speciality Management</Link></li> */}
            <li><Link to="/hospitaladmin/stafflist"><MdPeople className="nav-icon" />Staff Management</Link></li>
            <li><Link to="/hospitaladmin/addappointment"><MdAddBox className="nav-icon" />Appointment Scheduling</Link></li>
            <li><Link to=""><MdMoney className="nav-icon" />Billing</Link></li>
            <li><Link to=""><MdLocalHospital className="nav-icon" />Inventory and Pharmacy</Link></li>
            <li><Link to=""><MdLibraryBooks className="nav-icon" />Laboratory Records</Link></li>
            <li><Link to="/hospitaladmin/telemedecine"><MdLibraryBooks className="nav-icon" />Telemedicine</Link></li>
            {/* <li><Link to="https://e77f-156-0-213-50.ngrok-free.app/call" target='_blank'><MdLibraryBooks className="nav-icon" />Telemedicine</Link></li> */}
            <li><Link to=""><MdLibraryBooks className="nav-icon" />Reports and Analytics</Link></li>
          </ul>
        </div>
      </div>

      <div className="footersid">
        <div className="footermenu">
          <h4><FaCog /> Settings</h4>
          <h4><FaSignOutAlt /> Logout</h4>
        </div>
        <div className="blueband">
          <div className='boitemed'>
            <div>
              <img src={medocImage} className='medocfooterimg' alt="Consultation Icon" />
            </div>
            <div>
              <button className="footersidebtn me-auto">Upgrade plan</button>
            </div>
          </div>
          <p>The hospital management is facing a shortage of medication</p>
        </div>
      </div>
    </div>
  );
}

export default ClientSidebar;

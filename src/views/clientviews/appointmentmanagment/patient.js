import React from "react";
import { Search, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import "./patient.css"; // Updated CSS file name for clarity
import { FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFilter } from "react-icons/fa";
import { FaSortNumericUp } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PatientList = () => {
    const navigate = useNavigate(); // Initialize useNavigate

  // Example data for patients
  const patients = [
    {
      id: "00001",
      name: "ASSESS Nourah",
      address: "Houeyho 1 carre 1104",
      lastVisit: "04 Sep 2019",
      phone: "+229 90 00 00 00",
    },
    {
      id: "00002",
      name: "ASSESS Nourah",
      address: "Houeyho 1 carre 1104",
      lastVisit: "04 Sep 2019",
      phone: "+229 90 00 00 00",
    },
    {
        id: "00003",
        name: "ASSESS Nourah",
        address: "Houeyho 1 carre 1104",
        lastVisit: "04 Sep 2019",
        phone: "+229 90 00 00 00",
      },
  ];
  const handleOpenFile = (patientId) => {
    // Navigate to the Appointment component with the patient ID as a parameter
    navigate(`/appointment/${patientId}`);
  };

  return (
    <div className="custom-container mt-5 p-4">
      {/* Navigation Tabs */}
      <div className="custom-tabs  mb-4">
        <a href=""  className="tab-active">All patients</a>
        <a href=""  className="tab-inactive">Day's record</a>
      </div>

      {/* Search and Register Section */}
      <div className="search-register-container mb-4">
        <div className="search-bar relative">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, phone, ID..."
            className="search-input"
          />
        </div>
        <button className="register-button">
        <FaUser /> Register new patient
        </button>
      </div>

      {/* Filters */}
      <div className="filter-container  ">
        <div className="filter-select"> 
            <div className="avar">
            <span>Filter by <FaFilter /></span>
            </div>
            <div className="solange">
            <select>
                <option>Order Type <FaSortNumericUp /></option>
                <option>14-11-2025</option>
                <option>14-11-2025</option>
                <option>14-11-2025</option>
                <option>14-11-2025</option>
            </select>
            </div>
         
        </div>
        <div className="wish">
        <button className="reset-filter"><FaUndo /> Reset Filter </button>
        </div>
      
      </div>

      {/* Table */}
      <div className="custom-table-container mt-4">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>LAST VISIT</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.address}</td>
                <td>{patient.lastVisit}</td>
                <td>{patient.phone}</td>
                <td>
                  <button
                    onClick={() => handleOpenFile(patient.id)}
                    className="open-file-button"
                  >
                    <FileText className="icon" />
                    Open patient file
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button className="pagination-button">
          <ChevronLeft />
        </button>
        <button className="pagination-button">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PatientList;

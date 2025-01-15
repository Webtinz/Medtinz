// import React from "react";
import React, { useState } from "react";
import "./appointment.css"; // Importing styles if needed
import Timetable from './timetable';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import voix from './image/voix.png';
// import "bootstrap-icons/font/bootstrap-icons.css";
const Appointment = () => {
  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showThirdModal, setShowThirdModal] = useState(false); // For the new modal
  const [showFourthModal, setShowFourthModal] = useState(false); // For the new modal
  const [selectedDoctor, setSelectedDoctor] = useState(""); // État pour stocker le docteur sélectionné

  const handleShowFirst = () => {
    setShowFirstModal(true);
  };

  const handleContinue = () => {
    setShowFirstModal(false);
    setShowSecondModal(true);
  };

  const handleDoctorSelect = () => {
    setShowSecondModal(false);
    setShowThirdModal(true);
  };

  const handleClose = () => {
    setShowFirstModal(false);
    setShowSecondModal(false);
    setShowThirdModal(false);
  };

  
 
  return (
    <div
      className="container mt-5 p-4 appointment-container"
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-primary d-flex align-items-center france">
        <FaLongArrowAltLeft />    Retour
        </button>
      <div>
      {/* Button to trigger modal */}
      <div className="securetinz">
        <button className="btn btn magic" onClick={handleShowFirst}>
          <FaRegAddressBook /> New Appointment
        </button>
      </div>

        {/* Modal1 */}
        {showFirstModal && (
            <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
            <div className="modal-dialog modal-dialog-centered modal-lg ">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title mx-auto">New Appointment</h5>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="mb-3">
                        <label htmlFor="appointment-id" className="form-label">
                        ID
                        </label>
                        <input
                        type="text"
                        className="form-control sabaoth"
                        id="appointment-id"
                        value="CB-2345674"
                        
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                        Name
                        </label>
                        <input
                        type="text"
                        className="form-control sabaoth"
                        id="name"
                        value="Casos Billal"
                        
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="motif" className="form-label">
                        Motif
                        </label>
                        <select id="motif" className="form-select sabaoth">
                        <option>Consultation</option>
                        <option>Follow-up</option>
                        <option>Emergency</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label">
                        Type of consultation
                        </label>
                        <select id="type" className="form-select sabaoth">
                        <option>In-person</option>
                        <option>Online</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="department" className="form-label">
                        Department
                        </label>
                        <select id="department" className="form-select sabaoth">
                        <option>ORL</option>
                        <option>Cardiology</option>
                        <option>Neurology</option>
                        </select>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <div className="flex-grow-1 me-2">
                            <label htmlFor="amount" className="form-label">
                            Enter Amount
                            </label>
                            <div className="input-group">
                            <input
                                type="text"
                                className="form-control sabaoth"
                                placeholder="Enter amount"
                                aria-label="Amount"
                                aria-describedby="currency-addon"
                                id="amount"
                            />
                            <span className="input-group-text" id="currency-addon">
                                XOF
                            </span>
                            </div>
                        </div>
                    </div>

                    </form>
                </div>
                <div className="modal-footer">
                    <div className="mx-auto">
                    <button
                        type="button"
                        className="btn btn deborath w-60 text-center"
                        onClick={handleContinue}
                    >
                        Continue →
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

        {/* Modal2 */}
        {showSecondModal && (
            <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title mx-auto">New Appointment</h5>
                   
                </div>
                <div className="modal-body">
                    <div className="">
                      <button className="mb-3 faty"> <FaLongArrowAltLeft /> Retour</button>
                    <p className="mb-3 px-3">
                    *Choisissez si vous souhaitez voir le docteur principal dans ce département :
                    </p>
                    <div className="mb-3 reason">
                    <p className="cordial px-4">Docteur principal :</p>
                    <div className="form-check d-flex justify-content-between pedigre">
                        
                        <label className="form-check-label" htmlFor="doctor1">
                        Dr. Badoss Succes Rafou
                        </label>
                        <input
                        className=""
                        type="radio"
                        name="doctor"
                        id="doctor1"
                        onClick={handleDoctorSelect}
                        />
                    </div>
                    </div>
                    </div>
                    
                    <p className="text-start">Or</p>
                    <div className="mb-3">
  <label htmlFor="selectDoctor" className="form-label">
    Select another doctor
  </label>
  <div>
    <div>
      <input
        type="radio"
        id="doctor2"
        name="doctor"
        value="Dr. Jane Doe"
        onChange={() => {
          setSelectedDoctor("Dr. Jane Doe");
          setShowFourthModal(true); // Ouvrir le quatrième modal
        }}
      />
      <label className="form-check-label" htmlFor="doctor2">
        Dr. Jane Doe
      </label>
    </div>
    <div>
      <input
        type="radio"
        id="doctor3"
        name="doctor"
        value="Dr. John Smith"
        onChange={() => {
          setSelectedDoctor("Dr. John Smith");
          setShowFourthModal(true); // Ouvrir le quatrième modal
        }}
      />
      <label className="form-check-label" htmlFor="doctor3">
        Dr. John Smith
      </label>
    </div>
    <div>
      <input
        type="radio"
        id="doctor4"
        name="doctor"
        value="Dr. Alice Brown"
        onChange={() => {
          setSelectedDoctor("Dr. Alice Brown");
          setShowFourthModal(true); // Ouvrir le quatrième modal
        }}
      />
      <label className="form-check-label" htmlFor="doctor4">
        Dr. Alice Brown
      </label>
    </div>
  </div>
                    </div>


                </div>
                <div className="modal-footer">
                    <div className="mx-auto">
                    <button
                        type="button"
                        className="btn btn w-60 deborath"
                        style={{ height: "62px" }}
                        onClick={handleClose}
                    >
                        Continue →
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

         {/* Modal3 */}
       {showThirdModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title mx-auto">New Appointment</h5>
              </div>
              <div className="modal-body">
                <div>
                  <button className="mb-3 faty" onClick={() => setShowSecondModal(false)}>
                    <FaLongArrowAltLeft /> Retour
                  </button>
                  <p className="mb-3 px-3">
                    *Choisissez si vous souhaitez voir le docteur principal dans ce
                    département :
                  </p>
                  <div className="mb-3 reason">
                    <p className="cordial px-4">Docteur principal :</p>
                    <div className="form-check d-flex justify-content-between pedigre">
                      <label className="form-check-label" htmlFor="doctor1">
                        Dr. Badoss Succes Rafou
                      </label>
                      <input
                        className=""
                        type="radio"
                        name="doctor"
                        id="doctor1"
                        checked
                      />
                    </div>
                  </div>
                </div>
                <p>
                  Doctor <strong>Dr. Badoss Succes Rafou</strong> timetable:
                </p>
                <Timetable/>
               

              </div>
              <div className="modal-footer">
                <div className="mx-auto">
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    style={{ height: "62px" }}
                    onClick={handleClose}
                  >
                    Confirm Appointment →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
         )}
        {/* Modal4 */}
        {showFourthModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title mx-auto">Doctor Appointment Details</h5>
                </div>
                <div className="modal-body">
                  <div>
                    <button
                      className="mb-3 faty"
                      onClick={() => setShowFourthModal(false)}
                    >
                      <FaLongArrowAltLeft /> Retour
                    </button>
                    <p className="mb-3 px-3">
                      *Details of the selected doctor:
                    </p>
                    <div className="mb-3 reason">
                      <p className="cordial px-4">Selected Doctor:</p>
                      <div className="form-check d-flex justify-content-between pedigre">
                        <label className="form-check-label">
                          {selectedDoctor} {/* Display selected doctor */}
                        </label>
                        <input
                          className=""
                          type="radio"
                          name="selected-doctor"
                          checked
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <p>
                    Doctor <strong>{selectedDoctor}</strong>'s timetable:
                  </p>
                  <Timetable />
                </div>
                <div className="modal-footer">
                  <div className="mx-auto">
                    <button
                      type="button"
                      className="btn btn-success w-100"
                      style={{ height: "62px" }}
                      onClick={() => {
                        setShowFourthModal(false);
                      }}
                    >
                      Confirm Appointment →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


    </div>
        
      </div>
      <div className="mt-4">
        <h5 className="text-success mb-3">Patient Details</h5>
        <div className="row">
          <div className="col-md-2">
            <strong>Nom :</strong> 
            <p>Badoss</p>
          </div>
          <div className="col-md-2">
            <strong>Prénom :</strong> 
            <p>Austin Miller</p>
          </div>
          <div className="col-md-3">
            <strong>Date of birth :</strong>
            <p>20 / 12 / 2000</p> 
          </div>
          <div className="col-md-3">
            <strong>Address :</strong> 
            <p>Cadjehou</p>
          </div>
          <div className="col-md-2">
            <strong>Gender :</strong> 
            <p>F</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h5 className="text-success mb-3">Medical History</h5>
        <div className="azan ">
          <h5 className="mt-5">No medical history yet</h5>
          <img src={voix} alt="voix" className="voix" />
        </div>
      </div>
    </div>
  );
};

export default Appointment;

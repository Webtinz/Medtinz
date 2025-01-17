import React, { useState } from "react";
import "../new/infirmier.css";

const Infirmier = () => {
  const patients = [
    { id: "00056", name: "ASSESS Nourah", department: "Gynecology", action: "Add vital signs" },
    { id: "00052", name: "ASSESS Nourah", department: "Dermatology", action: "Add vital signs" },
    { id: "00056", name: "ASSESS Nourah", department: "ORL", action: "Awaiting" },
    { id: "00067", name: "ASSESS Nourah", department: "Gynecology", action: "Awaiting" },
    { id: "00021", name: "ASSESS Nourah", department: "Ophthalmology", action: "Done" },
  ];

  const [isFocused, setIsFocused] = useState(false); // État pour gérer le focus
  const [selectedPatient, setSelectedPatient] = useState(null); // Patient sélectionné
  const [showModal, setShowModal] = useState(false); // État pour gérer l'affichage du modal
  const [showSecondModal, setShowSecondModal] = useState(false); // État pour afficher le deuxième modal

  const handleModalOpen = (patient) => {
    setSelectedPatient(patient); // Enregistre le patient sélectionné
    setShowModal(true); // Affiche le modal
  };

  const handleModalClose = () => {
    setSelectedPatient(null); // Réinitialise le patient sélectionné
    setShowModal(false); // Cache le modal
  };

  const handleContinueClick = () => {
    setShowModal(false); // Ferme le premier modal
    setShowSecondModal(true); // Ouvre le second modal
  };

  const handleSecondModalClose = () => {
    setShowSecondModal(false); // Ferme le second modal
  };

  return (
    <div className="container p-4 bg-white" style={{ borderRadius: "25px" }}>
      <div
        className="my-3 search rounded-pill d-flex align-items-center"
        style={{ backgroundColor: "#0056B329", padding: "10px" }}
      >
        <input
          className="form-control fcl rounded-pill"
          placeholder="Search for a patient (Enter ID, name or Tel)"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ border: "none", boxShadow: "none" }}
        />
        {!isFocused && <i className="bi bi-search sea"></i>}
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-6 mx-auto">
          <div
            className="search px-3 rounded-pill d-flex justify-content-between"
            style={{ backgroundColor: "#0056B329" }}
          >
            <div className="align-self-center my-3">
              <a style={{ color: "#17426F", textDecoration: "none" }} href="">
                Filter By <i className="bi bi-funnel ms-1"></i>
              </a>
            </div>
            <span className="d-block" style={{ borderRight: ".3px solid #979797" }}></span>
            <div className="align-self-center my-3">
              <a style={{ color: "#17426F", textDecoration: "none" }} href="">
                Order Type <i className="bi bi-arrow-down-up ms-1"></i>
              </a>
            </div>
            <span className="d-block" style={{ borderRight: ".3px solid #979797" }}></span>
            <div className="align-self-center my-3">
              <a style={{ color: "#EA0234", textDecoration: "none" }} href="">
                <i className="bi bi-arrow-counterclockwise me-1"></i> Reset Filter
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6"></div>
      </div>

      <table className="table table-responsive text-center">
        <thead>
          <tr>
            <th>No att</th>
            <th>NAME</th>
            <th>Depart</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td className="py-3">{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.department}</td>
              <td>
                {patient.action === "Add vital signs" ? (
                  <button
                    className="btn btn-primary rounded-pill"
                    onClick={() => handleModalOpen(patient)}
                  >
                    <i className="bi bi-heart me-2"></i>Add vital signs
                  </button>
                ) : patient.action === "Awaiting" ? (
                  <span className="text-warning">Awaiting</span>
                ) : (
                  <span className="text-success">✔ Done</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end align-items-center mt-3">
        <span className="mb-3 me-2">Showing 1-09 of 78</span>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link text-dark">
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            <li className="page-item">
              <button className="page-link text-dark">
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Modal 1 */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="py-3">
                <h5 className="text-center pb-2" style={{borderBottom:'1px solid #E5E7E8'}}>Vital signs</h5>
                {/* <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleModalClose}
                ></button> */}
              </div>
              <div className="modal-body">
                <div className="row">
                    <div className="col-12 mx-auto mb-3">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control py-2 fcl1"
                            id="nameInput"
                            placeholder=" " // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                background: '#EFF7FF',
                                border: '2px solid #0056B3',
                            }}
                            />
                            <label htmlFor="nameInput" style={{ color: '#0056B3', top: '-10px', left: '14px' }}>Name</label>
                        </div>
                    </div>
                    <div className="col-12 mx-auto mb-3">
                        <div className="form-floating position-relative">
                            <select
                                className="form-select py-2 fcl1"
                                id="departmentSelect"
                                aria-label="Default select example"
                                style={{
                                border: '2px solid #0056B3',
                                }}
                            >
                                <option value="" disabled selected>
                                ORL
                                </option>
                                <option value="1">GENICOLOGY</option>
                                <option value="2">PEDIATRIE</option>
                            </select>
                            <label htmlFor="departmentSelect" style={{ color: '#0056B3', top: '-10px', left: '14px' }}>Department</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mx-auto mb-3">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control py-2 fcl1"
                            id="nameInput"
                            placeholder=" " // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                
                                border: '2px solid #FF0000',
                            }}
                            />
                            <label htmlFor="nameInput" style={{ color: '#191B1C', top: '-10px', left: '14px' }}>Body temperature</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mx-auto mb-3">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control py-2 fcl1"
                            id="nameInput"
                            placeholder=" " // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                
                                border: '2px solid #FF0000',
                            }}
                            />
                            <label htmlFor="nameInput" style={{ color: '#191B1C', top: '-10px', left: '14px' }}>Heart rate ou pulse</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mx-auto mb-3">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control py-2 fcl1"
                            id="nameInput"
                            placeholder=" " // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                
                                border: '2px solid #0056B3',
                            }}
                            />
                            <label htmlFor="nameInput" style={{ color: '#191B1C', top: '-10px', left: '14px' }}>Blood pressure</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mx-auto mb-3">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control py-2 fcl1"
                            id="nameInput"
                            placeholder=" " // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                
                                border: '2px solid #0056B3',
                            }}
                            />
                            <label htmlFor="nameInput" style={{ color: '#191B1C', top: '-10px', left: '14px' }}>Weight</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mx-auto mb-3">
                        <div className="form-floating">
                            <input
                            type="text"
                            className="form-control py-2 fcl1"
                            id="nameInput"
                            placeholder=" " // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                
                                border: '2px solid #0056B3',
                            }}
                            />
                            <label htmlFor="nameInput" style={{ color: '#191B1C', top: '-10px', left: '14px' }}>Height</label>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mx-auto mb-3">
                        <p>
                        <strong style={{color:'#191B1C'}}>BMI =</strong> <strong style={{color:'#28A745'}}>20.2</strong>  
                        <br/>
                        <span style={{color:'#191B1CB8'}}>(Normal BMI)</span> 
                        </p>
                    </div>
                    <div className="col-12 mx-auto mb-3">
                        <div className="">
                            <input
                            type="text"
                            className="form-control py-3 fcl1"
                            id="nameInput"
                            placeholder="Details" // Placeholder vide pour permettre au label de s'afficher
                            style={{
                                
                                border: '2px solid #0056B3',
                            }}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mx-auto mb-3">
                        <button className="btn btn-suc w-100 text-white py-3" 
                        style={{background:'#28A745'}}
                        onClick={handleContinueClick}
                        >Continue <i class="bi bi-arrow-right ms-1"></i></button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

       {/* Modal 2 */}
       {showSecondModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="py-2" style={{background:'#28A7451A'}}>
                <h5 className="text-center fw-bold" style={{color:'#28A745'}}>SUCCESS</h5>
                
                {/* <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-secondary"
                    onClick={handleSecondModalClose}
                  >
                    Close
                  </button>
                </div> */}
              </div>
              <div className="modal-body">
                <p className="text-center" style={{color:'#6D7278'}}>Patient: <strong className="text-dark ms-2">00056</strong></p>
                <p className="text-center">Vital signs for patient <span style={{textDecoration:'underline'}}>Casos Billal</span> updated sucessfully</p>
                <p className="text-center" style={{textDecoration:'underline'}}>The patient can now wait for his consultation</p>

                <div className="col-12 col-md-6 mx-auto mb-3">
                        <button className="btn btn-suc w-100 text-white py-3" 
                        style={{background:'#28A745'}}
                        onClick={handleSecondModalClose}
                        >Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Infirmier;

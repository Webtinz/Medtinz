import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingInput from './FloatingInput';
import logo from '../../assets/images/Logo.png';
import group208 from '../../assets/images/Group 208.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { Modal, Button } from 'react-bootstrap';
import { FaArrowRight,FaLocationDot } from "react-icons/fa6";
import '../../assets/css/admin.css'; 

const Admin = () => {
  const navigate = useNavigate();
  
  // États pour les champs du formulaire
  const [adminName, setAdminName] = useState('');
  const [email, setEmail] = useState('');
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [errors, setErrors] = useState({});
  
  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    const newErrors = {};
    if (!adminName) newErrors.adminName = "Admin Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!tel1) newErrors.tel1 = "Tel 1 is required";
    if (!tel2) newErrors.tel2 = "Tel 2 is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si aucune erreur, formulaire valide
  };

 // Fonction pour soumettre le formulaire
 const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Si le formulaire est valide, redirige vers la page OTP
      navigate('/otp');  // Rediriger vers la page OTP
    }
  };
  return (
        <div className='trois'>
          <div className="sign-up-container">
            <div className='row'>
              <div className="right-section px-5 col-lg-4">
                <div className="header">
                  <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="mb-2">
                  <h2>Create an account</h2>
                  <p>Already have an account? <span className="hugue"><a href="#" className="hugue">Log In</a></span></p>
                  <p className="inline-text">Administrator’s details <span className="hr-container"><hr className='julio'/></span></p>

                </div>
                <form onSubmit={handleSubmit}>
                  {/* Clinic's Name and Clinic's Address */}
                  <div className="row g-2">
                    <div className="col-md-12 ">
                      <FloatingInput
                        label="Admin's Name"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                      />
                      {errors.adminName && <span className="error">{errors.adminName}</span>}
                    </div>
                    <div className="col-md-12 mb-2">
                      <FloatingInput
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Tel 1 and Tel 2 */}
                  <div className="row g-2 mt-1">
                    <div className="col-md-6">
                      <FloatingInput
                        label="Tel 1"
                        value={tel1}
                        onChange={(e) => setTel1(e.target.value)}
                      />
                      {errors.tel1 && <span className="error">{errors.tel1}</span>}
                    </div>
                    <div className="col-md-6">
                      <FloatingInput
                        label="Tel 2"
                        value={tel2}
                        onChange={(e) => setTel2(e.target.value)}
                      />
                      {errors.tel2 && <span className="error">{errors.tel2}</span>}
                    </div>
                  </div>
                  <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="custom-checkbox crime"
                        />
                        <label htmlFor="checkbox" className="checkbox-label ">
                        Agree to our<a href="#" className="link">Terms of use</a> and <a href="#" className="link"> Privacy Policy</a>.
                        </label>
                    </div>
                  {/* Submit Button */}
                  <button type="submit" className="continue-btn ">Continue  <FaArrowRight /></button>
                  <p className='mt-2 '>© 2024 | Développé par ITTIQ </p>
                  
                </form>
              
              </div>

              {/* lefte section with images */}
              <div className="col-lg-8 lefte d-none d-md-block">
            <div className="into mt-4">
              <h3 className="ninas mx-5">
                Manage your hospital with <span className="toy">ease</span> now..
              </h3>
              
              <img src={rectangle15} alt="Group 208" className="Morije" />
              
             
            </div>
          </div>
            </div>
              
          </div>
        </div>



   
  );
};

export default Admin;

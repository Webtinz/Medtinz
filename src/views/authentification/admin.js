import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingInput from './FloatingInput';
import logo from '../../assets/images/Logo.png';
import group208 from '../../assets/images/Group 208.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { Modal, Button } from 'react-bootstrap';
import { FaArrowRight,FaLocationDot } from "react-icons/fa6";
import '../../assets/css/admin.css'; 
import api from '../../service/caller';

const Admin = () => {

  const location = useLocation();
  const formData = location.state; // Données envoyées depuis SignUp

  const navigate = useNavigate();
  
  // États pour les champs du formulaire
  const [adminName, setAdminName] = useState('');
  const [adminUsername, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [terms_and_conditions, setTerms_and_conditions] = useState('');
  const [errors, setErrors] = useState({});
  
  // Fonction pour valider les champs du formulaire
  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!adminName) newErrors.adminName = "Admin Name is required";
    if (!adminUsername) newErrors.adminUsername = "Admin Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmpassword) newErrors.confirmpassword = "Confirm Password is required";
    if (password && confirmpassword && password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }
    if (!address) newErrors.address = "Address is required";
    if (!tel1) newErrors.tel1 = "Tel 1 is required";
    if (!tel2) newErrors.tel2 = "Tel 2 is required";
    if (!terms_and_conditions) newErrors.terms_and_conditions = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Si aucune erreur, formulaire valide
  };


 // Fonction pour soumettre le formulaire
 const handleSubmit  = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      const newFormData = {
        hospital_name: formData.clinicName,
        // clinicAddress: formData.clinicAddress,
        hospital_country: formData.selectedCountry,
        hospital_city: formData.selectedCity,
        hospital_state_province: formData.selectedDepartment,
        hospital_phone: formData.telephone1,
        hospital_phone2: formData.telephone2,
        terms_and_conditions: terms_and_conditions,
        name: adminName,
        username: adminUsername,
        email: email,
        password: password,
        address: address,
        phone: tel1,
        phone2: tel2,
      };

      try {
        const response = await api.post('api/register', newFormData);

        console.log('Success:', response.data);

        // Supposons que l'OTP soit dans response.data.otp
        const otp = response.data.otp;

        // Redirige vers la page OTP après le succès
        navigate('/Otp', { state: newFormData  });
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        // Gérez les erreurs ici, comme afficher un message d'erreur à l'utilisateur
      }
    }
  };
  return (
        <div className=''>
          <div className="container-fluid trois">
            <div className='row'>
              <div className="right1  col-lg-5">
                <div className="when1">
                  <img src={logo} alt="Logo" className="" />
                </div>
                <div className="mb-2">
                  <h2>Create an account</h2>
                  <p>Already have an account? <span className="hugue"><a href="#" className="hugue">Log In</a></span></p>
                  <p className="inline-text">Administrator’s details <span className="hr-container"><hr className='julio'/></span></p>

                </div>
                <form onSubmit={handleSubmit}>
                  {/* Clinic's Name and Clinic's Address */}
                  <div className="row">
                    {/* <div className="row g-2 mt-1"> */}
                      <div className="col-12 col-md-6 mb-2">
                        <FloatingInput
                          label="Admin's Name"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                        />
                        {errors.adminName && <span className="error">{errors.adminName}</span>}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FloatingInput
                          label="Admin's Username"
                          value={adminUsername}
                          onChange={(e) => setUsername(e.target.value)} 
                        />
                        {errors.adminUsername && <span className="error">{errors.adminUsername}</span>}
                      </div>
                    {/* </div> */}
                    <div className="col-12 mb-2">
                      <FloatingInput
                        label="Email"
                        type="email" // Ajoutez cette ligne pour définir le type
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="col-12 mb-2">
                      <FloatingInput
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                  {/* Tel 1 and Tel 2 */}
                  {/* <div className="row g-2 mt-1"> */}
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
                  {/* </div> */}
                    {/* <div className="row g-2 mt-1"> */}
                      <div className="col-12 col-md-6 mb-2">
                        <FloatingInput
                          label="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                      </div>
                      <div className="col-12 col-md-6 mb-2">
                        <FloatingInput
                          label="Confirm Password"
                          value={confirmpassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmpassword && <span className="error">{errors.confirmpassword}</span>}
                      </div>
                    {/* </div> */}
                  </div>
                  <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="checkbox"
                            className="custom-checkbox crime"
                            value={terms_and_conditions}
                            onChange={(e) => setTerms_and_conditions(e.target.checked)}
                        />
                        <label htmlFor="checkbox" className="checkbox-label ">
                        Agree to our<a href="#" className="link">Terms of use</a> and <a href="#" className="link"> Privacy Policy</a>.
                        </label>
                        {errors.terms_and_conditions && <span className="error">{errors.terms_and_conditions}</span>}
                    </div>
                  {/* Submit Button */}
                  <div className='d-flex justify-content-center cargot'>
                  <button type="submit" className="continue-btn text-white w-100">Continue  <FaArrowRight /></button>
                  </div>
                 
                  <p className='mt-2 '>© 2024 | Développé par ITTIQ </p>
                  
                </form>
              
              </div>

              {/* lefte section with images */}
              <div className="col-lg-7 lefte1 d-none d-lg-block">
            <div className="into1 mt-4">
              <h3 className="ninas1 texte-center">
                Manage your hospital with <span className="toy1">ease</span> now..
              </h3>
              <img src={rectangle15} alt="Group 208" className="Morije1" />
            </div>
          </div>
            </div>
              
          </div>
        </div>



   
  );
};

export default Admin;

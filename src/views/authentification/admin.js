import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingInput from './FloatingInput';
import FloatingSelect from './FloatingSelect'; // Importation de FloatingSelect
import logo from '../../assets/images/Logo.png';
import group208 from '../../assets/images/Group 208.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { Modal, Button } from 'react-bootstrap';
import { FaArrowRight,FaLocationDot } from "react-icons/fa6";
import './admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../service/caller';


const Admin = () => {
  const location = useLocation();
  const formData = location.state;
  const navigate = useNavigate();
  
  // Add new state for title and civility
  const [adminLastName, setAdminLastName] = useState('');
  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminUsername, setUsername] = useState('');
  const [civility, setCivility] = useState('M.');  // New state
  const [title, setTitle] = useState('');  // New state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [tel1, setTel1] = useState('');
  const [tel2, setTel2] = useState('');
  const [terms_and_conditions, setTerms_and_conditions] = useState('');
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};

    if (!adminLastName) newErrors.adminLastName = "Admin Last name is required";
    if (!adminFirstName) newErrors.adminFirstName = "Admin First name is required";
    if (!adminUsername) newErrors.adminUsername = "Admin Username is required";
    if (!civility) newErrors.civility = "Civility is required";
    if (!title) newErrors.title = "Title/Specialty is required";
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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newFormData = {
        hospital_name: formData.clinicName,
        hospital_country: formData.selectedCountry,
        hospital_city: formData.selectedCity,
        hospital_state_province: formData.selectedDepartment,
        hospital_phone: formData.telephone1,
        hospital_phone2: formData.telephone2,
        terms_and_conditions: terms_and_conditions,
        lastname: adminLastName,
        firstname: adminFirstName,
        username: adminUsername,
        civility: civility,  // Add new field
        title: title,      // Add new field
        email: email,
        password: password,
        address: address,
        phone: tel1,
        phone2: tel2,
      };

      try {
        const response = await api.post('api/register', newFormData);
        console.log('Success:', response.data);
        toast.success("Registration successful!");
        localStorage.setItem("access_token", response.data.token)
        navigate('/otp', { state: newFormData, other: response.data  });
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        const errorMessage = error.response?.data.error || error.message || "An unknown error occurred";
        toast.error(`Error: ${errorMessage}. Please try again.`);
      }
    }
  };

  return (
    <div className='trois'>
      <ToastContainer />
      <div className="sign-up-container">
        <div className='row'>
          <div className="right-section ps-5 col-lg-4">
            <div className="header">
              <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="mb-2">
              <h2>Create an account</h2>
              <p>Already have an account? <span className="hugue"><a href="#" className="hugue">Log In</a></span></p>
              <p className="inline-text">Administrator's details <span className="hr-container"><hr className='julio'/></span></p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="row g-2 mt-1">
                  <div className="col-md-6">
                    <FloatingInput
                      label="Admin's Last Name"
                      value={adminLastName}
                      onChange={(e) => setAdminLastName(e.target.value)}
                    />
                    {errors.adminLastName && <span className="error">{errors.adminLastName}</span>}
                  </div>
                  <div className="col-md-6">
                    <FloatingInput
                      label="Admin's First Name"
                      value={adminFirstName}
                      onChange={(e) => setAdminFirstName(e.target.value)}
                    />
                    {errors.adminFirstName && <span className="error">{errors.adminFirstName}</span>}
                  </div>
                  <div className="col-md-12">
                    <FloatingInput
                      label="Admin's Username"
                      value={adminUsername}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.adminUsername && <span className="error">{errors.adminUsername}</span>}
                  </div>
                  {/* Add new fields for civility and title */}
                  <div className="col-md-6">
                    <FloatingSelect
                      label="Civilité"
                      value={civility}
                      onChange={(e) => setCivility(e.target.value)}
                      options={[
                        { value: 'M.', label: 'M.' },
                        { value: 'Mme.', label: 'Mme.' }
                      ]}
                    />
                    {errors.civility && <span className="error">{errors.civility}</span>}

                    {/* <div className="form-floating">
                      <select
                        className="form-select"
                        value={civility}
                        onChange={(e) => setCivility(e.target.value)}
                      >
                        <option value="M.">M.</option>
                        <option value="Mme.">Mme.</option>
                      </select>
                      <label>Civilité</label>
                    </div> */}
                    {/* {errors.civility && <span className="error">{errors.civility}</span>} */}
                  </div>
                  <div className="col-md-6">
                    <FloatingInput
                      label="Title/Specialty"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Specialist / Doctor"
                    />
                    {errors.title && <span className="error">{errors.title}</span>}
                  </div>
                </div>
                <div className="col-md-12 mb-2">
                  <FloatingInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
                {/* Rest of the form remains the same */}
                <div className="col-md-12 mb-2">
                  <FloatingInput
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <span className="error">{errors.address}</span>}
                </div>
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
                <div className="row g-2 mt-1">
                  <div className="col-md-6 mb-2">
                    <FloatingInput
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                  </div>
                  <div className="col-md-6 mb-2">
                    <FloatingInput
                      label="Confirm Password"
                      type="password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmpassword && <span className="error">{errors.confirmpassword}</span>}
                  </div>
                </div>
              </div>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="custom-checkbox crime"
                  checked={terms_and_conditions}
                  onChange={(e) => setTerms_and_conditions(e.target.checked)}
                />
                <label htmlFor="checkbox" className="checkbox-label">
                  Agree to our<a href="#" className="link">Terms of use</a> and <a href="#" className="link"> Privacy Policy</a>.
                </label>
                {errors.terms_and_conditions && <span className="error">{errors.terms_and_conditions}</span>}
              </div>
              <button type="submit" className="continue-btn">Continue <FaArrowRight /></button>
              <p className='mt-2'>© 2024 | Développé par ITTIQ</p>
            </form>
          </div>
          <div className="col-lg-8 lefte d-none d-md-block">
            <div className="into mt-4">
              <h3 className="ninas mx-5 mt-5">
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
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import '../../assets/css/otp.css'; 

import api from '../../service/caller';

const Otp = () => {

  const location = useLocation();
  const newformData = location.state; // Data sent from SignUp

  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState(Array(6).fill(false));
  const [showResendPopup, setShowResendPopup] = useState(false);
  const [otpReceived, setOtpReceived] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const inputRefs = useRef([]);

  // Simulate sending OTP code after a 10-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!otpReceived) {
        setShowResendPopup(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [otpReceived]);

  // Handle changes in OTP input fields
  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;

    const newErrors = [...errors];
    if (/[^0-9]/.test(value) && value !== '') {
      newErrors[index] = true;
    } else {
      newErrors[index] = false;
    }

    // Move to next field if a digit is entered and it's not the last field
    if (value && index < 5 && /^[0-9]$/.test(value)) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
    setErrors(newErrors);
  };

  // Handle Backspace key to move focus to the previous field
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

// Form submission handler
const handleSubmit = async (e) => {
  e.preventDefault();

  // Vérification de la validité de l'OTP
  const isOtpValid = otp.every(digit => digit !== '' && !errors[otp.indexOf(digit)]);

  // Si l'OTP est invalide, ajoutez la classe "error"
  if (!isOtpValid) {
    setShowValidationPopup(true);
    // Ajouter la classe "error" à tous les champs OTP
    document.querySelectorAll('.otp-input').forEach(input => {
      input.classList.add('error');
    });
  } else {
    // Supprimer la classe "error" en cas de succès
    document.querySelectorAll('.otp-input').forEach(input => {
      input.classList.remove('error');
    });

    // Convertir l'OTP en entier
    const otpAsString = otp.join('');  
    const otpAsInteger = parseInt(otpAsString, 10); 
    console.log(otpAsInteger); 

    const otpCheckData = {
      email: newformData.email,
      otp: otpAsInteger,
    };

    try {
      const response = await api.post('api/verify-otp', otpCheckData);

      if (response.status === 200) {
        // Rediriger vers la page '/success' si la réponse est 200
        navigate('/Sucess');
      } else {

        setShowValidationPopup(true);
        // Ajouter la classe "error" à tous les champs OTP
        document.querySelectorAll('.otp-input').forEach(input => {
          input.classList.add('error');
        });

        // Gérer les erreurs autres que le statut 200 (par exemple, afficher un message d'erreur)
        toast.error('OTP invalid, veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
        
        setShowValidationPopup(true);
        // Ajouter la classe "error" à tous les champs OTP
        document.querySelectorAll('.otp-input').forEach(input => {
          input.classList.add('error');
        });

        // Gérer les erreurs autres que le statut 200 (par exemple, afficher un message d'erreur)
        toast.error('OTP invalid, veuillez réessayer.');
    }
  }
};

const hideEmail = (email) => {
  if (!email) {
    return "Invalid email"; // Retournez une chaîne par défaut si l'email est indéfini
  }
  const emailParts = email.split('@');
  const localPart = emailParts[0];
  const domainPart = emailParts[1];
  const hiddenLocalPart = localPart.substring(0, 2) + '****';  // Replace with stars
  return `${hiddenLocalPart}@${domainPart}`;
};

  // Function to simulate OTP reception
  const receiveOtp = (otpCode) => {
    setOtp(otpCode.split(''));
    setOtpReceived(true);
  };

  // Function to handle OTP resend link and display toast
  const handleResendOtp = () => {
    toast.success(
      <div>
        A <a href='hrt' style={{ color: 'black', fontWeight: 'bold' }}>new</a> code has been sent to your e-mail, <br /> enter the code to verify your account
      </div>, 
      {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        icon: false,
        closeButton: false,
        style: {
          width: 'auto',
          minWidth: '250px',
          padding: '20px 30px',
          fontSize: '12px',
          lineHeight: '1.5',
          borderRadius: '5px',
        },
      }
    );
    setOtpReceived(false);
  };

  return (
    <div className=''>
      <div className='container-fluid sia'>
        <div className='row'>
          <div className='col-lg-5 px-5 team'>
            <div className="unbutu">
            <div className='when '>
              <img src={logo} alt="Logo" className="img-fluid mb-2" />
              </div>
              <div className='coq '>
                <h2>Create an account</h2>
                <p className='mb-3'>
                  Already have an account? <span className='hugue'>
                    <a href="Log In" className='hugue'>Log In</a>
                  </span>
                </p>
                <p>
                  We have sent the OTP to your e-mail, enter the code <br />
                  to verify your account <span className='yess'>
                    <a href={`mailto:${newformData?.email}`} className='yes'>{hideEmail(newformData?.email)}</a>
                  </span> 
                </p>
              </div>
            </div>
            <div className='kaki mt-3'>
              <form onSubmit={handleSubmit} className="otp-inputs">
                <div className="otp-container mb-5">
                  <div className="otp-group">
                    {otp.slice(0, 3).map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        value={digit}
                        ref={el => inputRefs.current[index] = el}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength="1"
                        className={`otp-input ${errors[index] ? 'error' : ''}`}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <div className="separator"></div>

                  <div className="otp-group">
                    {otp.slice(3, 6).map((digit, index) => (
                      <input
                        key={index + 3}
                        type="text"
                        value={digit}
                        ref={el => inputRefs.current[index + 3] = el}
                        onChange={(e) => handleChange(e, index + 3)}
                        onKeyDown={(e) => handleKeyDown(e, index + 3)}
                        maxLength="1"
                        className={`otp-input ${errors[index + 3] ? 'error' : ''}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="otp-resend mb-3 mt-2">
                  Didn't Receive OTP? 
                  <a href="#" className="igor" onClick={handleResendOtp}>Resend</a>
                </p>
                {/* <button type="submit" className="btn btn-primary btn-block mt-4">Verify</button> */}
               <div className='courtney'>
                                 <button type="submit" className="btn w-100 mt-3 vyne"> 
                                 Continue <FaArrowRight />
                                 </button>
                               </div>
              </form>
            </div>
          </div>
          <div className="col-lg-7 lefte d-none d-lg-block">
            <div className="into mt-4">
              <h3 className="ninas ">
                Manage your hospital with <span className="toy">ease</span> now..
              </h3>
              <img src={rectangle15} alt="Group 208" className="Morije" />
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Otp;

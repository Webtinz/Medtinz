import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowRight, FaLocationDot } from "react-icons/fa6";
import './otp.css'; 

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!otpReceived) {
        setShowResendPopup(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [otpReceived]);

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

    if (value && index < 5 && /^[0-9]$/.test(value)) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
    setErrors(newErrors);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isOtpValid = otp.every(digit => digit !== '' && !errors[otp.indexOf(digit)]);
  
    if (!isOtpValid) {
      setShowValidationPopup(true);
      document.querySelectorAll('.otp-input').forEach(input => {
        input.classList.add('error');
      });
    } else {
      document.querySelectorAll('.otp-input').forEach(input => {
        input.classList.remove('error');
      });
  
      const otpAsString = otp.join('');  
      const otpAsInteger = parseInt(otpAsString, 10);
  
      const otpCheckData = {
        email: newformData.email,
        otp: otpAsInteger,
      };
  
      try {
        const response = await api.post('api/verify-otp', otpCheckData);
  
        // Log la réponse complète ici
        // console.log("Réponse complète:", response);  // Affiche toute la réponse dans la console
  
        if (response.status === 200) {
          console.log("Réponse avec statut 200:", response.data.data._id); // Affiche la réponse quand le statut est 200
          navigate('/sucess', { state: response.data.data._id });
        } else {
          setShowValidationPopup(true);
          document.querySelectorAll('.otp-input').forEach(input => {
            input.classList.add('error');
          });
          toast.error('OTP invalid, veuillez réessayer.');
        }
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        setShowValidationPopup(true);
        document.querySelectorAll('.otp-input').forEach(input => {
          input.classList.add('error');
        });
        toast.error('OTP invalid, veuillez réessayer.');
      }
    }
  };
  

  const hideEmail = (email) => {
    const emailParts = email.split('@');
    const localPart = emailParts[0];
    const domainPart = emailParts[1];
    const hiddenLocalPart = localPart.substring(0, 2) + '****';
    return `${hiddenLocalPart}@${domainPart}`;
  };

  const handleResendOtp = () => {
    toast.success(
      <div>
        Un <a href='hrt' style={{ color: 'black', fontWeight: 'bold' }}>nouveau</a> code a été envoyé à votre e-mail, <br /> entrez le code pour vérifier votre compte
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
    <div className='sia'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-4 px-5 team'>
            <div className="unbutu">
              <img src={logo} alt="Logo" className="when mb-2" />
              <div>
                <h2>Créer un compte</h2>
                <p className='mb-3'>
                  Déjà un compte? <span className='hugue'>
                    <a href="Log In" className='hugue'>Connexion</a>
                  </span>
                </p>
                <p>
                  Nous avons envoyé l'OTP à votre e-mail, entrez le code <br />
                  pour vérifier votre compte <span className='yess'>
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
                  Vous n'avez pas reçu l'OTP ? 
                  <a href="#" className="igor" onClick={handleResendOtp}>Réexpédier</a>
                </p>
                <button type="submit" className="continue-btn mt-3">
                  Continuer <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
          <div className='col-lg-8 p-0'>
            <img src={rectangle15} alt="Background" className='img-fluid'/>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Otp;

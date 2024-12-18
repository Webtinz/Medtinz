// Otp.js
import React, { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import group208 from '../../assets/images/Group 208.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import { Modal, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';  // Importer react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Importer les styles de react-toastify
import { FaArrowRight,FaLocationDot } from "react-icons/fa6";
import '../../assets/css/otp.css'; 
const Otp = () => {
  const navigate = useNavigate(); // Initialisation de la fonction de navigation

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState(Array(6).fill(false));
  const [showResendPopup, setShowResendPopup] = useState(false);
  const [otpReceived, setOtpReceived] = useState(false);
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  // Simuler l'envoi du code OTP après un délai de 10 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!otpReceived) {
        setShowResendPopup(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [otpReceived]);

  // Fonction de gestion des changements dans les champs OTP
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

    setOtp(newOtp);
    setErrors(newErrors);
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si le code OTP est valide et complet
    const isOtpValid = otp.every(digit => digit !== '' && !errors[otp.indexOf(digit)]);

    if (!isOtpValid) {
      setShowValidationPopup(true); // Afficher le pop-up si le OTP est incorrect
    } else {
      console.log('OTP Submitted:', otp.join(''));
      // Rediriger vers la page de succès
      navigate('/Sucess');
    }
  };

  // Fonction pour simuler la réception de l'OTP
  const receiveOtp = (otpCode) => {
    setOtp(otpCode.split(''));
    setOtpReceived(true);
  };

 // Fonction pour gérer le lien "Resend OTP" et afficher un toast
const handleResendOtp = () => {
  toast.success(
    <div>
      A <a href='#' style={{ color: 'black', fontWeight: 'bold' }}>new</a> code has been sent to your e-mail, <br /> enter the code to verify your account
    </div>, 
    {
      position: "bottom-left", // Affiche le toast en bas à gauche
      autoClose: 5000, // Ferme automatiquement après 5 secondes
      hideProgressBar: false, // Affiche la barre de progression
      pauseOnHover: true, // Fait une pause lorsque la souris survole le toast
      draggable: false, // Désactive le fait de faire glisser le toast
      progress: undefined, // La barre de progression sera visible avec la durée d'affichage
      icon: false, // Supprime l'icône de succès
      closeButton: false, // Supprime le bouton de fermeture
      style: { // Style personnalisé pour ajuster la taille de la div
        width: 'auto',
        minWidth: '250px',
        padding: '20px 30px',
        fontSize: '12px',
        lineHeight: '1.5',
        borderRadius: '5px',
      },
    }
  );
  setOtpReceived(false); // Réinitialise le statut OTP reçu
};


  return (
    <div className='sia '>
        <div className='container-fluide'>
          <div className='row'>
          <div className='col-lg-4 px-5 team'>
                    <div className="unbutu ">
            <img src={logo} alt="Logo" className="when mb-2" />
                        <div className=''>
                        <h2 >Create an account</h2>
                        <p className='mb-3'>Already have an account? <span className='hugue'><a href="Log In" className='hugue'>Log In</a></span></p>
                        <p>We have sent the OTP to your e-mail, enter the code <br></br> to verify your account <span className='yess'>
                            <a href="mailto:admin@s********.net" className='yes'>admin@s********.net</a>
                            </span> </p>
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
                                          onChange={(e) => handleChange(e, index)}
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
                                          onChange={(e) => handleChange(e, index + 3)}
                                          maxLength="1"
                                          className={`otp-input ${errors[index + 3] ? 'error' : ''}`}
                                        />
                                      ))}
                                    </div>
                                </div>

                                <p className="otp-resent mb-3 mt-2">Didn't Receive OTP? <a href="#" className="igor" onClick={handleResendOtp}>Resend</a></p>
                                
                                <button type="submit" className="continue-btn mt-3">Continue <FaArrowRight /></button>
                            </form>
                        
                    </div>
                    <p className=' mt-3'>© 2024 | Développé par ITTIQ </p>
          </div>
          <div className="col-lg-8 live d-none d-md-block">
            <div className="intos mt-4">
              <h3 className="nid ">
                Manage your hospital with <span className="toye">ease</span> now..
              </h3>
              
              <img src={rectangle15} alt="Group 208" className="Morija" />
              
             
            </div>
            <ToastContainer />
          </div>
          
        </div>
        </div>
    </div>
  );
};

export default Otp;  // Assurez-vous d'utiliser `export default`
 
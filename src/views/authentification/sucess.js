import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import group208 from '../../assets/images/Group 208.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import asset51 from '../../assets/images/Asset 5 1.png';
import { FaArrowRight,FaLocationDot } from "react-icons/fa6";
import '../../assets/css/sucess.css'; 
import { TbBackground } from 'react-icons/tb';

const Success = () => {
  const navigate = useNavigate();

  // Fonction qui sera appelée lors du clic sur le bouton
  const handleContinue = (e) => {
    e.preventDefault(); // Prévenir la soumission du formulaire (bien que ce ne soit pas strictement nécessaire ici)
    navigate('/Subscription'); // Redirige l'utilisateur vers la page Subscription
  };

  return (
    
    <div className="container-fluid kenet ">
      <div className="row">
          <div className='col-lg-5 px-5 pingre'>
          <div className="header">
           <img src={logo} alt="Logo" className="logo" />
         </div>
         <div className='mb-2 Dev'>
        <h2>Create an account</h2>
          <p>Already have an account? <span className='hugue'><a href="#" className='hugue'>Log In</a></span></p>
        </div>
         <div className='mt-1 chaos'>
          <div className='torija '>
            <img src={asset51} alt="Group 208" className="img-fluid" />
          </div>
          
          <div className='pintagone'>
             <h4 className='tuaux'>SUCCESS</h4>
           </div>
        </div>
         {/* Submit Button */}
         <div className='d-flex justify-content-center'>
            <button onClick={handleContinue} className="btn btn-success mt-3 mb-2 text-white w-100">Continue  <FaArrowRight /></button>
         </div>
         <p className='mt-2'>© 2024 | Développé par ITTIQ </p>
          </div>
        {/* Colonne gauche */}
        <div className="col-lg-7 lefte3 d-none d-lg-block">
            <div className="into3 mt-4">
              <h3 className="ninas3 text-center ">
                Manage your hospital with <span className="toy3">ease</span> now..
              </h3>
              <img src={rectangle15} alt="Group 208" className="Morije3" />
            </div>
          </div>

      </div>
    </div>
  
  );
};

export default Success;

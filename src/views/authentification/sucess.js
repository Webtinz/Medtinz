import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import group208 from '../../assets/images/Group 208.png';
import rectangle15 from '../../assets/images/Rectangle 15.png';
import asset51 from '../../assets/images/Asset 5 1.png';
import { FaArrowRight,FaLocationDot } from "react-icons/fa6";
import '../../assets/css/sucess.css'; 

const Success = () => {
  const navigate = useNavigate();

  // Fonction qui sera appelée lors du clic sur le bouton
  const handleContinue = (e) => {
    e.preventDefault(); // Prévenir la soumission du formulaire (bien que ce ne soit pas strictement nécessaire ici)
    navigate('/subscription'); // Redirige l'utilisateur vers la page Subscription
  };

  return (
    <div className="bodya">
    <div className="container-fluid signup mt-3">
      <div className="row">
          <div className='col-lg-4 px-5 pingre'>
          <div className="header">
           <img src={logo} alt="Logo" className="logo" />
         </div>
         <div className='mb-2 Dev'>
        <h2>Create an account</h2>
          <p>Already have an account? <span className='hugue'><a href="#" className='hugue'>Log In</a></span></p>
        </div>
         <div className='mt-1 chaos'>
           <img src={asset51} alt="Group 208" className="torija img-fluid" />
          <div className='pintagone'>
             <h4 className='tuaux'>SUCCESS</h4>
           </div>
        </div>
         {/* Submit Button */}
         <button onClick={handleContinue} className="continue-btn mt-3 mb-2">Continue  <FaArrowRight /></button>
         <p className='mt-2'>© 2024 | Développé par ITTIQ </p>
          </div>

        {/* Colonne gauche */}
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



    // <div className="sign-up-container1">
    //   <div className="left-section1 px-5">
    //     <div className="header">
    //       <img src={logo} alt="Logo" className="logo" />
    //     </div>
    //     <div className='mb-2 Dev'>
    //       <h2>Create an account</h2>
    //       <p>Already have an account? <span className='hugue'><a href="#" className='hugue'>Log In</a></span></p>
    //     </div>
    //     <div className='mt-1 chaos'>
    //       <img src={asset51} alt="Group 208" className="torija img-fluid" />
    //       <div className='pintagone'>
    //         <h4 className='tuaux'>SUCCESS</h4>
    //       </div>
    //     </div>
    //     {/* Submit Button */}
    //     <button onClick={handleContinue} className="continue-btn mt-3 mb-2">Continue  <FaArrowRight /></button>
    //   </div>
    //   <div className="right-section1">
    //     <img src={group208} alt="Group 208" className="tablet-image" />
    //     <div className='polygone'>
    //       <p>Manage your hospital with <span className='hugue'>ease</span> now..</p>
    //     </div>
    //     <div className='intrigue mt-5'>
    //       <img src={rectangle15} alt="Group 208" className="Morija img-fluid" />
    //     </div>
    //   </div>
    // 
    // </div>
  );
};

export default Success;

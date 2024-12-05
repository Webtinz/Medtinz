import React from 'react';
import '../../assets/css/selectroledash.css';  // Assurez-vous que le CSS est bien lié

// Importation des images orange
import imageOrangeTopLeft from '../../assets/images/Medic symbol circle.png'; // Image en haut à gauche
import imageOrangeBottomLeft from '../../assets/images/Checklist.png'; // Image en bas à gauche
import imageOrangeBottomright from '../../assets/images/DNA.png'; // Image en bas à gauche
import BottomLeftmedication from '../../assets/images/Pil.png'; // Image en bas à gauche
import logomedtinz from '../../assets/images/MedTinz.png'; // Image en bas à gauche

const SelectRolePage = () => {
  return (
    <div className="Selectrole">
      {/* Bannière bleu avec une image */}
      <div className="selecthead">
        <div className="container d-flex">
          <div>
          <img src={logomedtinz} alt="Bottom left orange" className="logomedtinz" />
          </div>
          <div>
            <h2>Connect Now To Your<br /> Dashboard</h2>
            <br></br>
            <p className="container">
              Choose the plan that's right for your business. Whether you're just getting started with email marketing <br /> or well down the path to personalization, we've got you covered.
            </p>
          </div>
        </div>
        {/* Image orange en haut à gauche */}
        <img src={imageOrangeTopLeft} alt="Top right orange" className="image-orange-top-right" />
      </div>

      {/* Section des rôles */}
      <div className="rolesection mt-4">
        <h3 className="title text-center">Select your role to login</h3>
        <div className="role-selection container d-flex justify-content-center">
          <div className="row row-cols-1 row-cols-md-3 mt-3">
            <button className="role-btn col">Receptionist</button>
            <button className="role-btn col active">Admin</button>
            <button className="role-btn col">Doctor</button>
            <button className="role-btn col">Nurse</button>
            <button className="role-btn col">Patient</button>
            <button className="role-btn col">Patient</button>
          </div>
        </div>
        <a className="continue-btn mx-auto">Continue</a>
        <img src={imageOrangeBottomright} alt="Bottom right orange" className="image-orange-right" />
      </div>

      {/* Footer */}
      <footer className="text-left container mt-5">
        <img src={BottomLeftmedication} alt="Bottom left orange" className="image-medication-left" />
        <p>&copy; 2024 Développé par ITTIQ</p>  
      </footer>

      {/* Image orange en bas à gauche */}
      <img src={imageOrangeBottomLeft} alt="Bottom left orange" className="image-orange-bottom-left" />
    </div>
  );
}

export default SelectRolePage;

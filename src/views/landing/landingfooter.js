import React from "react";
import "./landingfooter.css";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container py-5 text-center">
        {/* Titre principal */}
        <h2 className="footer-title">
          MedTinz Company. <strong>We’re here</strong>
        </h2>
        <p className="footer-text mt-2 mb-4">
          Hello, we are ABC, trying to make an effort to put the right people
          for you to get the best results. <br />
          Just insight
        </p>
        <p className="steri">Newsletter</p>
        {/* Formulaire Newsletter */}
        <div className="newsletter d-flex justify-content-center mb-4">
          <input
            type="email"
            placeholder="Your email"
            className="form-control me-2"
          />
          <button className="btn btn-primary send-btn">
            <FiSend />
          </button>
        </div>

        {/* Boutons */}
        <div className="footer-buttons mb-4">
          <button className=" colon me-2">Insights</button>
          <button className="colon">Contact</button>
        </div>

        {/* Copyright et Réseaux Sociaux */}
        <div className="lendemain mt-5">
            <h4 className="tidi"><span className="cruel">MED</span>TINZ</h4>
            <p className="footer-copyright mb-4">
                 © 2024 Ittiq All Rights Reserved.
            </p>
            <div className="footer-social-icons">
                <FaFacebookF className="social-icon me-3" />
                <FaLinkedinIn className="social-icon me-3" />
                <FaInstagram className="social-icon" />
            </div>
        </div>


       
        
      </div>
    </div>
  );
};

export default Footer;

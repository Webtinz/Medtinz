import React, { useState } from 'react';
import './pricing.css';
import { FaCircleCheck } from "react-icons/fa6";

const Pricing = () => {
  // State pour le plan sélectionné
  const [selectedPlan, setSelectedPlan] = useState(null);

  // State pour basculer entre Monthly et Annually
  const [isAnnual, setIsAnnual] = useState(false);

  // Prix pour chaque plan (Mensuel et Annuel)
  const prices = {
    standart: isAnnual ? 50 : 5,  // 50 fcfa Annuel, 5 fcfa Mensuel
    extended: isAnnual ? 120 : 12,
    premium: isAnnual ? 160 : 16,
  };

  // Fonction pour gérer la sélection du plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="marjolaine ">
      <div className="sieux container text-center ">
        <h2 className="text-warning fw-bold mb-4 ">Our pricing</h2>
        <p className="text-muted mb-4">
          Pay securely online and manage the booking via desktop or via the mobile app.
        </p>

        {/* Toggle Monthly/Annual */}
        <div className="d-flex justify-content-center align-items-center mb-5">
          <span className="me-2">Monthly</span>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={() => setIsAnnual(!isAnnual)}
              checked={isAnnual}
            />
          </div>
          <span className="ms-2">Annually</span>
        </div>

        {/* Pricing Plans */}
        <div className="row g-4">
          {/* Standart Plan */}
          <div className="col-md-4">
            <div className={`card shadow-sm p-4 ${selectedPlan === 'standart' ? 'border-warning text-warning' : 'border-2'}`}>
              <h5 className="fw-bold">Standart</h5>
              <p className="text-muted">The national average cost of buying coin easy.</p>
              <h3 className="fw-bold mb-4">{prices.standart}<span className="text-dark">fcfa</span></h3>
              <button
                className={`btn w-100 mb-3 ${selectedPlan === 'standart' ? 'btn-orange' : 'btn-primary'}`}
                onClick={() => handleSelectPlan('standart')}
              >
                Select Plan
              </button>
              <ul className="list-unstyled text-start">
                <li className='mb-3'><FaCircleCheck /> 5 collections</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className="mb-3 text-muted strikethrough">
                <FaCircleCheck className="icon-muted" /> Worldwide accessibility
                </li>
                <li className="mb-3 text-muted strikethrough">
                <FaCircleCheck className="icon-muted" /> Worldwide accessibility
                </li>
              </ul>
            </div>
          </div>

          {/* Extended Plan */}
          <div className="col-md-4">
            <div className={`card shadow-sm p-4 ${selectedPlan === 'extended' ? 'border-warning text-warning' : 'border-2'}`}>
              <h5 className="fw-bold ">Extended</h5>
              <p className="text-muted">The national average cost of buying coin easy.</p>
              <h3 className="fw-bold mb-4">{prices.extended}<span className="text-dark">fcfa</span></h3>
              <button
                className={`btn w-100 mb-3 ${selectedPlan === 'extended' ? 'btn-orange' : 'btn-primary'}`}
                onClick={() => handleSelectPlan('extended')}
              >
                Select Plan
              </button>
              <ul className="list-unstyled text-start">
                <li className='mb-3'><FaCircleCheck /> 5 collections</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
              </ul>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="col-md-4">
            <div className={`card shadow-sm p-4 ${selectedPlan === 'premium' ? 'border-warning text-warning' : 'border-2'}`}>
              <h5 className="fw-bold">Premium+</h5>
              <p className="text-muted">The national average cost of buying coin easy.</p>
              <h3 className="fw-bold mb-4">{prices.premium}<span className="text-dark">fcfa</span></h3>
              <button
                className={`btn w-100 mb-3 ${selectedPlan === 'premium' ? 'btn-orange' : 'btn-primary'}`}
                onClick={() => handleSelectPlan('premium')}
              >
                Select Plan
              </button>
              <ul className="list-unstyled text-start">
                <li className='mb-3'><FaCircleCheck /> 5 collections</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
                <li className='mb-3'><FaCircleCheck /> Worldwide accessibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../../assets/css/subscription.css';
import medic from '../../assets/images/Medic.png';
import puis from '../../assets/images/puis.png';
import Pil from '../../assets/images/Pil.png';
import DNA from '../../assets/images/DNA.png';
import { FaArrowDown } from "react-icons/fa6";
import { motion } from 'framer-motion';


const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate(); // Hook pour la navigation

  // Données du tableau
  const data = [
    { col1: 'Medical Repatriation Cover', col2: '✔️', col3: '✔️', col4: '✔️' },
    { col1: 'Public Hospital Accommodation', col2: '-', col3: '✔️', col4: '✔️' },
    { col1: 'Medical Repatriation Cover', col2: '-', col3: '-', col4: '✔️' },
    { col1: 'Entry Age', col2: 'Minimum 18 years', col3: 'Minimum 18 years', col4: 'Minimum 18 years' },
    { col1: 'Critical Illness Coverage', col2: 'Max $5,000/mo', col3: 'Max $15,000/mo', col4: 'Max $22,000/mo' },
    { col1: 'Maternity Facilities', col2: '-', col3: '-', col4: '-' },
    { col1: 'Emergency Ambulance Cover', col2: '-', col3: '-', col4: '-' },
    { col1: 'Maternity Facilities', col2: '-', col3: '-', col4: '-' },
    { col1: 'Emergency Ambulance Cover', col2: '-', col3: '-', col4: '-' },
    { col1: 'Maternity Facilities', col2: '-', col3: '-', col4: '-' },
    { col1: 'Emergency Ambulance Cover', col2: '-', col3: '-', col4: '-' },
    { col1: 'Maternity Facilities', col2: '-', col3: '-', col4: '-' },
  ];

  // Fonction pour gérer la sélection d'un plan
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // Fonction pour afficher plus/moins de contenu
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="subscription-container">
       <motion.div
      initial={{ x: '-100vw' }}  // Slide in from the left
      animate={{ x: 0 }}         // Slide to its normal position
      exit={{ x: '100vw' }}      // Slide out to the right
      transition={{ duration: 0.5 }}
    >
      <div className='microbe'>
        <div className='couleur'>
          <img src={medic} alt="Medic" className="medic mb-3 mt-2" />
          <div className='container one'>
            <div className='row'>
              <div className='col-lg-3'>
                <h1 className='prune'><span className='fous1'>Med</span><span className='fous2'>Tinz</span></h1>
              </div>
              <div className='col-lg-6'>
                <div className='cana'>
                  <h2 className='claude text-center mt-2'>
                    Choose the right 
                    medical subscription for you
                  </h2>
                  <p className='rich'>
                    Choose the plan that’s right for your business. Whether you’re just getting started with email marketing or well down the path to personalization, we’ve got you covered.
                  </p>
                </div>
              </div>
              <div className='col-lg-4'></div>
            </div>
          </div>
        </div>

        <div className='container two'>
          <div className='row'>
            <div className='col-lg-12 mt-4 mb-5'>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="hidden-th">Basic</th>
                    <th>
                      <p onClick={() => handleSelectPlan('basic')}>
                        Basic
                        <br />
                        <span className='trip'>$9</span> <span className='solo'>user / mo <br /> (Paid Yearly)</span>
                      </p>
                    </th>
                    <th>
                      <p onClick={() => handleSelectPlan('standard')}>
                        Standard
                        <br />
                        <span className='trip'>$14</span> <span className='solo'>user / mo <br /> (Paid Yearly)</span>
                      </p>
                    </th>
                    <th>
                      <p onClick={() => handleSelectPlan('premium')}>
                        Premium
                        <br />
                        <span className='trip'>$23</span> <span className='solo'>user / mo <br /> (Paid Yearly)</span>
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, showAll ? data.length : 5).map((row, index) => (
                    <tr key={index}>
                      <td className='reve'>{row.col1}</td>
                      <td className={`rive ${selectedPlan === 'basic' ? 'selected' : ''}`}>{row.col2}</td>
                      <td className={`rive ${selectedPlan === 'standard' ? 'selected' : ''}`}>{row.col3}</td>
                      <td className={`rive ${selectedPlan === 'premium' ? 'selected' : ''}`}>{row.col4}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td> <button 
                  className="btn btn-link more-info-btn"
                  onClick={toggleShowAll}
                >
                    <FaArrowDown /> {showAll ? ' CLICK TO VIEW MORE FEATURES' : ' CLICK TO VIEW MORE FEATURES'}
                </button></td>
                    <td>
                      <button className="choose-btn" onClick={() => navigate('/plan/choose1')}>Choose</button>
                    </td>
                    <td>
                      <button className="choose-btn" onClick={() => navigate('/plan/choose2')}>Choose</button>
                    </td>
                    <td>
                      <button className="choose-btn" onClick={() => navigate('/plan/choose3')}>Choose</button>
                    </td>
                  </tr>
                </tfoot>
              </table>
              
            </div>
          </div>
        </div> 
      </div>
    </motion.div>
      
      <div className='clinic'>
      <img src={puis} alt="puis" className="gerard mb-3 mt-2" /> 
      </div>
      <div className='clinique'>
      <img src={Pil} alt="Pil" className="credo mb-3 mt-2" /> 
      </div>
      <div className='clan'>
      <img src={DNA} alt="DNA" className="cris mb-3 mt-2" /> 
      </div>
             
    </div>
  );
};

export default Subscription;

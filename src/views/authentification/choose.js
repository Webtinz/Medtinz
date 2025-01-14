import React, { useState, useEffect } from 'react';
import './choose1.css'; // Importer les styles pour Choose1
import { FaCircleCheck, FaCircle } from "react-icons/fa6";
import medic from '../../assets/images/Medic.png';
import success from '../../assets/images/success.png';
import paypal from '../../assets/images/paypal.png';
import mtn from '../../assets/images/mtn.png';
import bank from '../../assets/images/bank.png';
import { FaFile } from "react-icons/fa6";
import { motion } from 'framer-motion';
import api from '../../service/caller'; // Axios instance configurée

const Choose1 = ({ planId }) => {
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); 
  const [paymentSectionVisible, setPaymentSectionVisible] = useState(true); // Section de paiement visible
  const [features, setFeatures] = useState([]); // Etat pour stocker les fonctionnalités

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const subscriptionResponse = await api.get(`/api/subscriptions/${planId}`);
        console.log(planId);
        
        setSubscriptionDetails(subscriptionResponse.data);
      } catch (error) {
        console.error('Error fetching subscription plan:', error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const { data } = await api.get('/api/getallfeatures');
        setFeatures(data); // Stocker les fonctionnalités dans l'état
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchPlan();
    fetchFeatures();
  }, [planId]);

  const handleSelectPaymentMethod = (e) => {
    const method = e.target.value;
    setPaymentMethod(method); 
  };

  const handlePaymentConfirmation = async (e) => {
    e.preventDefault();
    
    // Préparation des données de paiement
    const paymentData = {
      item_name: 'Subscription Payment', 
      price: subscriptionDetails?.price, // Récupérer le prix de l'abonnement
      currency: 'USD' // Monnaie en USD
    };

    // Console log des données prêtes à être envoyées
    console.log('Données prêtes pour la soumission:', paymentData);

    try {
      // Soumettre les données au backend pour générer le lien de redirection PayPal
      const paymentResponse = await api.post(`/payment/pay`, paymentData);

      // Si PayPal a généré une URL d'approbation
      if (paymentResponse.data.approval_url) {
        // Ouvrir l'URL d'approbation dans un nouvel onglet
        window.open(paymentResponse.data.approval_url, '_blank');
      } else {
        console.error('Erreur : approval_url non trouvé dans la réponse.');
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
    }
  };

  return (
    <div className="choose1-container">
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '100vw' }}
        transition={{ duration: 0.5 }}
      >
        <div className='microbes'>
          <div className='coule'>
            <img src={medic} alt="Medic" className="medical mb-3 mt-2" />
            <div className='container ones'>
              <div className='row'>
                <div className='col-lg-3'>
                  <h1 className='prunel'><span className='fou1'>Med</span><span className='fou2'>Tinz</span></h1>
                </div>
                <div className='col-lg-6'>
                  <div className='canas'>
                    <h2 className='claudia text-center'>
                      Choose the right <br />
                      medical subscription for you
                    </h2>
                    <p className='riches'>
                      Choose the plan that’s right for your business. Whether you’re just getting started with email marketing or well down the path to personalization, we’ve got you covered.
                    </p>
                  </div>
                </div>
                <div className='col-lg-4'></div>
              </div>
            </div>
          </div>

          <div className='container mt-4'>
            <div className='row'>
              {paymentSectionVisible && (
                <>
                  <div className='col-lg-6 mt-4'>
                    <h1 className='pingo'>Payment</h1>
                    <hr className='hin'></hr>
                    <p className='mt-3 shilo'>Pay With:</p>
                    <div className="loli">
                      <div className='nina'>
                        <div>
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={handleSelectPaymentMethod}
                          />
                          <label htmlFor="paypal">
                            <img src={paypal} alt="PayPal" className="paypal mb-3 mt-2" />
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="bank"
                            name="paymentMethod"
                            value="bank"
                            checked={paymentMethod === 'bank'}
                            onChange={handleSelectPaymentMethod}
                          />
                          <label htmlFor="bank">
                            <img src={mtn} alt="Bank Transfer" className="paypal mb-3 mt-2" />
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="card"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={handleSelectPaymentMethod}
                          />
                          <label htmlFor="card">
                            <img src={bank} alt="Credit Card" className="paypal mb-3 mt-3 px-2" />
                          </label>
                        </div>
                      </div>
                      {paymentMethod === 'paypal' && (
                        <div className="payment-form">
                          <button
                            onClick={handlePaymentConfirmation}
                            className='gigo mb-3'
                          >
                            <b>Confirm Payment</b>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-6 mt-5 mb-2'>
                    <div className='yaourt'>
                      <h3 className='tibus'>{subscriptionDetails?.name}</h3>
                      <h1 className='tern'>{subscriptionDetails?.price} fcfa <span className='ray'>
                        per {subscriptionDetails?.duration}
                        {subscriptionDetails?.duration < 12 ? ` months` : ' year'}
                      </span></h1>
                    </div>
                  </div>
                </>
              )}
              {paymentSuccessful && !paymentSectionVisible && (
                <div className="row">
                  <div className='col-lg-6 mt-3'>
                    <div className="payment-success">
                      <h1 className='joy'>Successful payment</h1>
                      <p>You have successfully subscribed to the standard plan.</p>
                      <button className='troy'>Continue configuration</button>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='yaourt mt-5'>
                      <h3>Plan Name: {subscriptionDetails?.name}</h3>
                      <h1>{subscriptionDetails?.price} fcfa <span className='ray'>
                        per {subscriptionDetails?.duration}
                        {subscriptionDetails?.duration < 12 ? ` months` : ' year'}</span></h1>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Choose1;

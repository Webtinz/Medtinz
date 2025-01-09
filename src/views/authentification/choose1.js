
import React, { useState } from 'react';
import './choose1.css'; // Importer les styles pour Choose1
import { FaCircleCheck } from "react-icons/fa6";
import medic from '../../assets/images/Medic.png';
import success from '../../assets/images/success.png';
import paypal from '../../assets/images/paypal.png';
import mtn from '../../assets/images/mtn.png';
import bank from '../../assets/images/bank.png';
import puis from '../../assets/images/puis.png';
import Pil from '../../assets/images/Pil.png';
import DNA from '../../assets/images/DNA.png';
import { FaFile } from "react-icons/fa6";
import { motion } from 'framer-motion';

const Choose1 = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSuccessful, setPaymentSuccessful] = useState(false); // Nouvel état pour gérer le succès du paiement
  const [paymentFormVisible, setPaymentFormVisible] = useState(true); // État pour gérer l'affichage du formulaire de paiement
  const [paymentSectionVisible, setPaymentSectionVisible] = useState(true); // Gère l'affichage de toute la section de paiement

  const handleSelectPlan = (e) => {
    setSelectedPlan(e.target.value); // Mettre à jour le plan sélectionné
  };

  const handleSelectPaymentMethod = (e) => {
    setPaymentMethod(e.target.value); // Mettre à jour la méthode de paiement sélectionnée
    setPaymentFormVisible(true); // Afficher le formulaire de paiement
  };

  const handlePaymentConfirmation = (e) => {
    e.preventDefault(); // Empêche la soumission par défaut du formulaire
    setPaymentSuccessful(true); // Mise à jour de l'état pour afficher la partie succès
    setPaymentFormVisible(false); // Masquer le formulaire de paiement
    setPaymentSectionVisible(false); // Masquer toute la section de paiement (radio, images, texte)
  };

  return (
    <div className="choose1-container">
      <motion.div
      initial={{ x: '-100vw' }}  // Slide in from the left
      animate={{ x: 0 }}         // Slide to its normal position
      exit={{ x: '100vw' }}      // Slide out to the right
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
            {/* Affichage de la section de paiement si non confirmé */}
            {paymentSectionVisible && (
              <>
                <div className='col-lg-6 mt-4'>
                  <h1 className='pingo'>Payment</h1>
                  <hr className='hin'></hr>
                  <p className='mt-3 shilo'>Pay With:</p>
                  <div className="loli">
                    <div className='nina'>
                      {/* PayPal */}
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

                      {/* Bank Transfer */}
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

                      {/* Credit Card */}
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

                    {/* Affichage dynamique du formulaire de paiement en fonction de la méthode choisie */}
                    {paymentFormVisible && (
                      <div className="payment-form">
                        <form onSubmit={handlePaymentConfirmation}>
                          {/* Formulaire pour PayPal */}
                          {paymentMethod === 'paypal' && (
                            <div>
                              <p>Redirecting to PayPal for payment...</p>
                            </div>
                          )}

                          {/* Formulaire pour Bank Transfer */}
                          {paymentMethod === 'bank' && (
                            <div className='cards'>
                              <div className='mt-3 mb-3 tiens'>
                                <label htmlFor="NomComplet">Enter your phone number</label>
                                <input
                                  type="phone"
                                  id="NomComplet"
                                  name="NomComplet"
                                  placeholder="+229 90 00 00 00"
                                />
                              </div>
                            </div>
                          )}

                          {/* Formulaire pour Credit Card */}
                          {paymentMethod === 'card' && (
                            <div className='cards'>
                              <div className='mt-3 mb-2 tiens'>
                                <label htmlFor="NomComplet">Nom Complet</label>
                                <input
                                  type="text"
                                  id="NomComplet"
                                  name="NomComplet"
                                  placeholder="Salome Barak"
                                />
                              </div>
                              
                              <div className='mt-3 mb-2 tiens'>
                                <label htmlFor="Email">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="salome@mail.com"
                                />
                              </div>
                              
                              <div className='mt-3 mb-3'>
                                <label htmlFor="BankName">Bank’s name</label>
                                <select className="form-select" aria-label="Default select example">
                                  <option selected>ORABANK</option>
                                  <option value="1">BGFI Bank</option>
                                  <option value="2">Atlantique Bank</option>
                                  <option value="3">Societe Generale</option>
                                </select>
                              </div>
                            </div>
                          )}

                          <button type="submit" className='gigo mb-3'> <b>Confirm Payement</b></button>
                          <p className='plonge'>Your personal data will be used to process your order, support your <br />
                             experience throughout this website, and for other purposes described in <br />
                              our privacy policy.</p>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                <div className='col-lg-6 mt-5 mb-2'>
                  <div className='yaourt '>
                    <h3 className='tibus'>Basic</h3>
                    <h1 className='tern'>9 fcfa <span className='ray'>per Month</span></h1>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Future updates for additional modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Future updates for additional modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Future updates for additional modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Discord community</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <button>Selected</button>
                  </div>
                </div>
              </>
            )}

            {/* Après paiement, afficher seulement la section de succès avec les deux colonnes */}
            {paymentSuccessful && !paymentSectionVisible && (
              <div className="row">
                <div className='col-lg-6 mt-3'>
                  <div className="payment-success">
                    <h1 className='joy'>Successful payment</h1>
                    <p className='mb-3 miel'>You have sucessfully subscribed to a standard plan.<br></br>
                    You will be provided a <a href='#' className='train'> HMS Instance </a>and redirected to your admin dasboard</p>
                    <p className='octogone'><FaFile  className='sonic'/> <a href='#' className='traine'> Click here</a> to download your receipt </p>
                      <div className='honey mt-3 mb-3'>
                      <img src={success} alt="success" className="success mb-3 mt-3 px-2" />
                      </div>
                      <button className='troy'>Continue configuration</button>
                  </div>
                </div>

                <div className='col-lg-6 mb-3'>
                  <div className='yaourt mt-5 '>
                    <h3 className='tibus'>Basic</h3>
                    <h1 className='tern'>9 fcfa <span className='ray'>per Month</span></h1>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Future updates for additional modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Future updates for additional modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Future updates for additional modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Discord community</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <p><FaCircleCheck /> <span className='rio'> Access to all modules</span></p>
                    <button>Selected</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
     
      <div className='tigre'>
      <img src={puis} alt="pius" className="puis mb-3 mt-2" />
      </div>
      <div className='tigres'>
      <img src={Pil} alt="Pil" className="Pil " />
      </div>
      <div className='tigress'>
      <img src={DNA} alt="DNA" className="DNA" />
      </div>
    </div>
  );
};

export default Choose1;

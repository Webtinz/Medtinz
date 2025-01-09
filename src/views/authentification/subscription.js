import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './subscription.css';
import medic from '../../assets/images/Medic.png';
import { FaArrowDown } from "react-icons/fa6";
import { motion } from 'framer-motion';
import api from '../../service/caller'; // Axios instance configurée

const Subscription = () => {

  const location = useLocation();
  const hospital_admin_id = location.state; // Data sent from SignUp

  const [subscriptions, setSubscriptions] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Récupération des abonnements
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/api/subscriptions');
        setSubscriptions(data);
      } catch (err) {
        setError('Erreur lors de la récupération des abonnements.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  // Récupération des fonctionnalités
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data } = await api.get('/api/getallfeatures');
        setFeatures(data);
      } catch (err) {
        setError('Erreur lors de la récupération des fonctionnalités.');
        console.error(err);
      }
    };

    fetchFeatures();
    getHospitalsByAdmin(hospital_admin_id);
  }, [hospital_admin_id]);

  // Déplacer la fonction ici pour la rendre accessible
  const getHospitalsByAdmin = async (hospitalId) => {
    try {
      // Effectuer l'appel à l'API pour obtenir l'hôpital
      const responseHospital = await api.get(`/api/hospitals/admin/${hospitalId}`);
      
      // Vérifier si la réponse contient des données
      if (responseHospital.data && responseHospital.data.length > 0) {
        const hospital = responseHospital.data[0]; // Accéder au premier élément du tableau
        // console.log('Hospital Id:', hospital.hospital_spec_id);
        return hospital.hospital_spec_id;
      } else {
        console.log('Aucun hôpital trouvé');
        return null;
      }
    } catch (error) {
      console.error('Error fetching hospital:', error);
      return null;
    }
  };

  const handleChoose = async (subscription) => {
    try {
      // Envoi des données à la route POST
      const hospitalSpecIdGet = await getHospitalsByAdmin(hospital_admin_id);  // Attendez la réponse avant d'envoyer
      await api.post('/api/selectplan', { subscription_id: subscription._id, hospitalSpecId: hospitalSpecIdGet });

      // Redirection après succès
      navigate(`/plan/${subscription._id}`);
    } catch (err) {
      console.error('Erreur lors de la soumission du plan :', err);
      setError('Une erreur est survenue lors de la sélection du plan.');
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  if (loading) return <div>Chargement en cours...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="subscription-container">
      <motion.div
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        exit={{ x: '100vw' }}
        transition={{ duration: 0.5 }}
      >
        <div className="microbe">
          <div className="couleur">
            <img src={medic} alt="Medic" className="medic mb-3 mt-2" />
            <div className="container one">
              <div className="row">
                <div className="col-lg-3">
                  <h1 className="prune">
                    <span className="fous1">Med</span>
                    <span className="fous2">Tinz</span>
                  </h1>
                </div>
                <div className="col-lg-6">
                  <div className="cana">
                    <h2 className="claude text-center mt-2">
                      Choose the right medical subscription for you
                    </h2>
                    <p className="rich">
                      Choose the plan that’s right for your business. Whether you’re just getting started with email marketing or well down the path to personalization, we’ve got you covered.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container two">
            <div className="row">
              <div className="col-lg-12 mt-4 mb-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="hidden-th">Features</th>
                      {subscriptions.map((subscription, index) => (
                        <th key={index}>
                          <p onClick={() => setSelectedPlan(subscription.name)}>
                            {subscription.name}
                            <br />
                            <span className="trip">${subscription.price}</span> 
                            <span className="solo">/ {subscription.duration} month</span>
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index}>
                        <td className="reve">{feature.name}</td>
                        {subscriptions.map((subscription) => {
                          const featureValue = subscription.features[index];
                          const valueToDisplay = featureValue && typeof featureValue === 'object' ? JSON.stringify(featureValue) : featureValue;

                          return (
                            <td
                              key={subscription._id}
                              className={`rive ${selectedPlan === subscription.name ? 'selected' : ''}`}
                            >
                              {valueToDisplay === "true" ? '✔' : (valueToDisplay === "false" || !valueToDisplay) ? '−' : valueToDisplay}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        <button
                          className="btn btn-link more-info-btn"
                          onClick={toggleShowAll}
                        >
                          <FaArrowDown /> {showAll ? ' CLICK TO VIEW MORE FEATURES' : ' CLICK TO VIEW MORE FEATURES'}
                        </button>
                      </td>
                      {subscriptions.map((subscription, index) => (
                        <td key={index}>
                          <button
                            className="choose-btn"
                            onClick={() => handleChoose(subscription)}
                          >
                            Choose
                          </button>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Subscription;

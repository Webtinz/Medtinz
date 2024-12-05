import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Pour obtenir l'ID de l'URL
import { CForm, CFormInput, CFormSelect, CButton, CCol, CCard, CFormTextarea } from '@coreui/react';

const EditPlanForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    description_fr: '',
    duration: '',
    price: '',
    features: [''],
    features_fr: [''],
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Récupérer l'ID de l'abonnement depuis l'URL

  // Récupérer l'abonnement à modifier
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/editsubscriptions/${id}`);
        setFormData(response.data.subscription);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'abonnement:', error);
        setErrorMessage('Impossible de récupérer les données de l\'abonnement.');
      }
    };
    fetchSubscription();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, value, language) => {
    const newFeatures = language === 'fr' ? [...formData.features_fr] : [...formData.features];
    newFeatures[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      [language === 'fr' ? 'features_fr' : 'features']: newFeatures,
    }));
  };

  const handleAddFeature = (language) => {
    if (language === 'fr') {
      setFormData((prevData) => ({
        ...prevData,
        features_fr: [...prevData.features_fr, ''],
        features: [...prevData.features, ''],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        features: [...prevData.features, ''],
        features_fr: [...prevData.features_fr, ''],
      }));
    }
  };

  const handleRemoveFeature = (index, language) => {
    const updatedFeatures = language === 'fr' ? formData.features_fr : formData.features;
    const updatedFeatures_fr = language === 'fr' ? formData.features : formData.features_fr;
    const newFeatures = updatedFeatures.filter((_, i) => i !== index);
    const newFeatures_fr = updatedFeatures_fr.filter((_, i) => i !== index);

    setFormData((prevData) => ({
      ...prevData,
      [language === 'fr' ? 'features_fr' : 'features']: newFeatures,
      [language === 'fr' ? 'features' : 'features_fr']: newFeatures_fr,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation des champs requis
    if (!formData.name || !formData.description || !formData.price) {
      setErrorMessage('Tous les champs doivent être remplis.');
      return;
    }

    const featuresToSubmit = formData.features.length === 1 && typeof formData.features[0] === 'string'
      ? formData.features[0]
      : formData.features;

    const dataToSubmit = {
      ...formData,
      features: featuresToSubmit,
    };

    try {
      // Envoi des données modifiées au backend
      const response = await axios.put(`http://localhost:5000/api/updatesubscriptions/${id}`, dataToSubmit);
      setSuccessMessage('Les modifications ont été enregistrées avec succès!');
      setTimeout(() => {
        navigate('/admin/listplan');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la soumission', error);
      setErrorMessage(error.response?.data?.message || 'Erreur lors de la mise à jour de l\'abonnement');
    }
  };

  return (
    <div className="p-5">
      <h2 style={{ fontWeight: 700, fontSize: '20px' }}>Edit Plan</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <CCard className="p-5" style={{ background: 'white' }}>
        <CForm onSubmit={handleSubmit} className="row g-3">
          {/* Nom de la souscription */}
          <CCol md={12}>
            <CFormSelect
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            >
              <option value="home">STARTER</option>
              <option value="small">SMALL</option>
              <option value="pro">ENTERPRISE</option>
            </CFormSelect>
          </CCol>

          {/* Description */}
          <CCol xs={12}>
            <CFormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </CCol>

          {/* Durée */}
          <CCol md={6}>
            <CFormSelect
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </CFormSelect>
          </CCol>

          {/* Prix */}
          <CCol md={6}>
            <CFormInput
              type="number"
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />
          </CCol>

          {/* Features en anglais */}
          <CCol xs={12}>
            <div className="mb-4">
              <label>Features (English)</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="d-flex mb-2">
                  <CFormInput
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value, 'en')}
                    className="me-2"
                    required
                  />
                  {index > 0 && (
                    <CButton style={{ color: 'white' }}
                      color="danger"
                      type="button"
                      onClick={() => handleRemoveFeature(index, 'en')}
                    >
                      Delete
                    </CButton>
                  )}
                </div>
              ))}
              <CButton style={{ color: 'white' }}
                color="success"
                type="button"
                onClick={() => handleAddFeature('en')}
              >
                Add Feature
              </CButton>
            </div>
          </CCol>

          <h2 style={{ fontWeight: 700, fontSize: '18px' }}>French Version</h2>
          <br></br>

          {/* Description en français */}
          <CCol xs={12}>
            <CFormTextarea
              label="Description (French)"
              name="description_fr"
              value={formData.description_fr}
              onChange={handleChange}
              required
            />
          </CCol>

          {/* Features en français */}
          <CCol xs={12}>
            <div className="mb-4">
              <label>Features (French)</label>
              {formData.features_fr.map((feature, index) => (
                <div key={index} className="d-flex mb-2">
                  <CFormInput
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value, 'fr')}
                    className="me-2"
                    required
                  />
                  {index > 0 && (
                    <CButton style={{ color: 'white' }}
                      color="danger"
                      type="button"
                      onClick={() => handleRemoveFeature(index, 'fr')}
                    >
                      Delete
                    </CButton>
                  )}
                </div>
              ))}
              <CButton
                color="success" style={{ color: 'white' }}
                type="button"
                onClick={() => handleAddFeature('fr')}
              >
                Add Feature
              </CButton>
            </div>
          </CCol>

          {/* Bouton de soumission */}
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Update Plan
            </CButton>
          </CCol>
        </CForm>
      </CCard>
    </div>
  );
};

export default EditPlanForm;

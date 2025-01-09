import React from 'react';
import { useParams } from 'react-router-dom';
import Choose from './choose';  // Importer le composant pour le plan 1

const PlanDetail = () => {
  const { planId } = useParams(); // Récupère l'ID du plan depuis l'URL

  // Rendre le bon composant en fonction du plan sélectionné
  let planComponent;
  
    planComponent = <Choose planId={planId} />;

  return (
    <div>
      {planComponent} {/* Affiche le composant en fonction de l'ID du plan */}
    </div>
  );
};

export default PlanDetail;

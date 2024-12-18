import React from 'react';
import { useParams } from 'react-router-dom';
import Choose1 from './choose1';  // Importer le composant pour le plan 1
import Choose2 from './choose2';  // Importer le composant pour le plan 2
import Choose3 from './choose3';  // Importer le composant pour le plan 3

const PlanDetail = () => {
  const { planId } = useParams(); // Récupère l'ID du plan depuis l'URL

  // Rendre le bon composant en fonction du plan sélectionné
  let planComponent;
  switch (planId) {
    case 'choose1':
      planComponent = <Choose1 />;
      break;
    case 'choose2':
      planComponent = <Choose2 />;
      break;
    case 'choose3':
      planComponent = <Choose3 />;
      break;
    default:
      planComponent = <div>Plan not found</div>;
  }

  return (
    <div>
      {planComponent} {/* Affiche le composant en fonction de l'ID du plan */}
    </div>
  );
};

export default PlanDetail;

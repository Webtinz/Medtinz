import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Only one Router should be used here
import ClientLayout from './layout/ClientLayout'; // Layout with sidebar
import Clientroutesnodash from './routes/clientnodash'; // Routes without sidebar
import ClientRoutesWithDash from './routes/clientRoutes'; // Routes with sidebar
import Login from './views/clientviews/login'; // Page Login
import DashboardPage from './views/clientviews/Dashboardclient'; // Page Dashboard

const App = () => {
  return (
    <Router> {/* Wrap everything with Router here */}
      <Routes>
        {/* Routes without sidebar */}
        {Clientroutesnodash.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={<route.element />} // Rendu direct pour les pages sans sidebar
          />
        ))}

        {/* Routes with sidebar */}
        {ClientRoutesWithDash.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ClientLayout />} // Layout with sidebar
          >
            <Route path={route.path} element={<route.element />} />
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default App;

// src/routes/Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importation des pages (sans React.lazy, mais de manière classique)
import SelectRoledash from '../views/clientviews/selectroledash';
import Login from '../views/clientviews/login';
import Layout from '../layout/ClientLayout';  // Le layout de base
import DashboardPage from '../views/clientviews/dashboardclient/Dashboardclient';  // Page dynamique


const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/selectroledash" name="Select Roledash" element={<SelectRoledash />} />
      <Route path="/clientlogin" name="Login" element={<Login />} />

      {/* <Route path="/client" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/dashboardclient" element={<DashboardPage />} />
      </Route> */}

    </Routes>

  );
};

export default RoutesComponent;

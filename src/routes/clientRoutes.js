import React from 'react'

// backend admin
const PatientList = React.lazy(() => import('../views/clientviews/dashboardclient/Patientmanagment/patientlist'))
const DashboardPage = React.lazy(() => import('../views/clientviews/dashboardclient/Dashboardclient'))

const clientroutes = [
  { path: '/Dashboardclient', name: 'Dashboardclient', element: DashboardPage },
  { path: '/patientslist', name: 'PatientList', element: PatientList , exact: true },

]

export default clientroutes

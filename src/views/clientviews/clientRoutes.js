import React from 'react'

// backend admin
const StaffList = React.lazy(() => import('../views/clientviews/staffmanagment/stafflist'))
const DashboardPage = React.lazy(() => import('../views/clientviews/Dashboardclient'))
const Medicalhistory = React.lazy(() => import('../views/clientviews/Patientmanagment/patientmedicalhistory'))
const Department =  React.lazy(() => import('../views/clientviews/deparmentmanagment/department'))
const Speciality =  React.lazy(() => import('../views/clientviews/speciality'))
const PatientList =  React.lazy(() => import('../views/clientviews/Patientmanagment/patientlist'))
const Patientfilemedical =  React.lazy(() => import('../views/clientviews/Patientmanagment/patientmedicalfile'))
const NewAppointment =  React.lazy(() => import('../views/clientviews/appointmentmanagment/addappointment'))
const PaymentAppointment =  React.lazy(() => import('../views/clientviews/appointmentmanagment/payment'))
const ReceiptPayment=  React.lazy(() => import('../views/clientviews/appointmentmanagment/receipt'))






const clientroutes = [
  { path: '/Dashboardclient', name: 'Dashboardclient', element: DashboardPage },
  { path: '/stafflist', name: 'StaffList', element: StaffList , exact: true },
  { path: '/medicalhistory', name: 'Medicalhistory', element: Medicalhistory , exact: true },
  { path: '/department', name: 'department', element: Department , exact: true },
  { path: '/speciality', name: 'Speciality', element: Speciality , exact: true },
  { path: '/patientlist', name: 'PatientList', element: PatientList , exact: true },
  { path: '/patientfilemedical/:patientId', name: 'patientfilemedical', element: Patientfilemedical , exact: true },
  { path: '/payment', name: 'PaymentAppointment', element: PaymentAppointment },
  { path: '/addappointment', name: 'NewAppointment', element: NewAppointment },
  { path: '/receiptpay', name: 'ReceiptPayment', element: ReceiptPayment },


]

export default clientroutes

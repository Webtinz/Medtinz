// ClientRoutesWithDash.js (routes avec sidebar)

import DashboardPage from '../views/clientviews/Dashboardclient'; // Page Dashboard
import PatientList from '../views/clientviews/Patientmanagment/patientlist'; // Page Patient Management
import Speciality from '../views/clientviews/speciality'; // Page Patient Management
import StaffList from '../views/clientviews/staffmanagment/stafflist'; // Page Patient Management
import NewAppointment from '../views/clientviews/appointmentmanagment/addappointment'; // Page Patient Management
import Patientfilemedical from '../views/clientviews/Patientmanagment/patientmedicalfile'; // Page Patient Management
import Medicalhistory from '../views/clientviews/Patientmanagment/patientmedicalhistory'; // Page Patient Management
import PaymentCaisse from '../views/clientviews/billingmanagement/payment'; // Page Patient Management
import ReceiptPayment from '../views/clientviews/billingmanagement/receipt'; // Page Patient Management
import Department from '../views/clientviews/deparmentmanagment/department'; // Page Patient Management








const ClientRoutesWithDash = [
  { path: '/hospitaladmin/dashboard', name: 'Dashboard', element: DashboardPage },
  { path: '/hospitaladmin/patientlist', name: 'Patient Management', element: PatientList },
  { path: '/hospitaladmin/patientfilemedical/:patientId', name: 'patientfilemedical', element: Patientfilemedical , exact: true },
  { path: '/hospitaladmin/department', name: 'department', element: Department , exact: true },
  { path: '/hospitaladmin/speciality', name: 'Speciality', element: Speciality , exact: true },
  { path: '/hospitaladmin/speciality', name: 'Speciality', element: Speciality , exact: true },
  { path: '/hospitaladmin/stafflist', name: 'StaffList', element: StaffList , exact: true },
  { path: '/hospitaladmin/addappointment', name: 'NewAppointment', element: NewAppointment , exact: true },
  { path: '/hospitaladmin/medicalhistory', name: 'Medicalhistory', element: Medicalhistory , exact: true },
  { path: '/hospitaladmin/payment', name: 'PaymentCaisse', element: PaymentCaisse },
  { path: '/hospitaladmin/receiptpay', name: 'ReceiptPayment', element: ReceiptPayment },

  // Ajoutez ici d'autres routes qui nécessitent un sidebar
];

export default ClientRoutesWithDash;


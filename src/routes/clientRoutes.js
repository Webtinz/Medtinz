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
import HospitalSetting from '../views/hospitalsetting'; // Page Patient Management
import PatientCard from '../views/clientviews/Patientmanagment/patientcard'; // Page Patient Management
import Dashboard from '../views/appointment/overviews';
import Appointments from '../views/appointment/appointment';
import AppointmentHistory from '../views/appointment/appointement_history';
import MedicalAppointments from '../views/appointment/patientDetail';
import CalendarWeekView from '../views/appointment/calendar';
import StaffDetails from '../views/clientviews/staffmanagment/user'; // Page Patient Management
import StaffSchedule from '../views/clientviews/staffmanagment/horaire'; // Page Patient Management










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
  { path: '/hospitaladmin/hospitalsetting', name: 'HospitalSetting', element: HospitalSetting },
  { path: '/patientcard/:patientId', name: 'PatientCard', element: PatientCard },
  { path: '/hospitaladmin/overviews', name: 'Overview', element: Dashboard },
  { path: '/hospitaladmin/appointment', name: 'Appointment', element: Appointments },
  { path: '/hospitaladmin/appointment_history', name: 'AppointmentHistory', element: AppointmentHistory },
  { path: '/hospitaladmin/patient_details', name: 'PatientDetail', element: MedicalAppointments },
  { path: '/hospitaladmin/appoint_calendar', name: 'AppointCalendar', element: CalendarWeekView },
  { path: '/hospitaladmin/staff_details', name: 'StaffDetails', element: StaffDetails },
  { path: '/hospitaladmin/staff_schedule', name: 'StaffSchedule', element: StaffSchedule },



  // Ajoutez ici d'autres routes qui nécessitent un sidebar
];

export default ClientRoutesWithDash;


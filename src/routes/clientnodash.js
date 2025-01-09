import React from 'react';
// ClientRoutesNoDash.js (routes sans sidebar)

import SelectRoledash from '../views/clientviews/selectroledash';
import Login from '../views/clientviews/login';
import LandingPage from '../views/landing/landing';
import Signup from '../views/authentification/SignUp';
import Admin from '../views/authentification/admin'; 
import Otp from '../views/authentification/otp'; 
import Sucess from '../views/authentification/sucess'; 
import Subscription from '../views/authentification/subscription'; 
import PlanDetail from '../views/authentification/PlanDetail'; 

const Clientroutesnodash = [
  { path: '/', name: 'LandingPage', element: LandingPage, exact: true },
  { path: '/clientlogin', name: 'clientlogin', element: Login },
  { path: '/selectroledash', name: 'SelectRoledash', element: SelectRoledash, exact: true },
  { path: '/Clientsignup', name: 'Signup', element: Signup },
  { path: '/ClientAdmin', name: 'Admin', element: Admin, exact: true },
  { path: '/Otp', name: 'Otp', element: Otp },
  { path: '/Sucess', name: 'Sucess', element: Sucess, exact: true },
  { path: '/Subscription', name: 'Subscription', element: Subscription },
  { path: '/plan/:planId', name: 'PlanDetail', element: PlanDetail, exact: true },
]

export default Clientroutesnodash;

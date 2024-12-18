import React from 'react'

// Subscription backend admin
const SelectRoledash = React.lazy(() => import('../views/clientviews/selectroledash'))
const Login = React.lazy(() => import('../views/clientviews/login'))
const Signup =  React.lazy(() => import('../views/authentification/SignUp'))
const Admin =  React.lazy(() => import('../views/authentification/admin')) 
const Otp =  React.lazy(() => import('../views/authentification/otp')) 
const Sucess =  React.lazy(() => import('../views/authentification/sucess')) 
const Subscription =  React.lazy(() => import('../views/authentification/subscription')) 
const PlanDetail =  React.lazy(() => import('../views/authentification/PlanDetail')) 

const Clientroutesnodash = [
  { path: '/clientlogin', name: 'clientlogin', element: Login },
  { path: '/selectroledash', name: 'SelectRoledash', element: SelectRoledash , exact: true },
  { path: '/Clientsignup', name: 'Signup', element: Signup },
  { path: '/ClientAdmin', name: 'Admin', element: Admin , exact: true },
  { path: '/Otp', name: 'otp', element: Otp },
  { path: '/Sucess', name: 'Sucess', element: Sucess , exact: true },
  { path: '/Subscription', name: 'Subscription', element: Subscription },
  { path: '/plan/:planId', name: 'PlanDetail', element: PlanDetail , exact: true },
]

export default Clientroutesnodash

import React from 'react'

// Subscription backend admin
const SelectRoledash = React.lazy(() => import('../views/clientviews/selectroledash'))
const Login = React.lazy(() => import('../views/clientviews/login'))

const clientroutesnodash = [
  { path: '/clientlogin', name: 'clientlogin', element: Login },
  { path: '/selectroledash', name: 'SelectRoledash', element: SelectRoledash , exact: true },

]

export default clientroutesnodash

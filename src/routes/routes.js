import React from 'react'

const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))

// Subscription backend admin
const Listplan = React.lazy(() => import('../views/subscription/list'))
const Addplan = React.lazy(() => import('../views/subscription/add'))
const Editplan = React.lazy(() => import('../views/subscription/edit'))

const routes = [
  { path: '/', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/listplan', name: 'List plan', element: Listplan , exact: true },
  { path: '/addplan', name: 'Add plan', element: Addplan , exact: true },
  { path: '/editplan/:id', name: 'Edit plan', element: Editplan , exact: true },


]

export default routes

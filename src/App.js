import React, { Suspense, useEffect } from 'react'
import {  HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'

// Importation du composant Routes qui gère les routes
import ClientRoutesComponent from './routes/clientRoutes';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/auth/Login'))
const Register = React.lazy(() => import('./views/auth/Register'))
const Page404 = React.lazy(() => import('./views/auth/Page404'))
const Page500 = React.lazy(() => import('./views/auth/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact pat="/500" name="Page 500" element={<Page500 />} />
          <Route path="/" name="Home" element={<DefaultLayout />} />

          {/* Route pour le layout de l'admin */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<DefaultLayout />} /> {/* Page par défaut */}
          </Route>

          {/* Client Routes */}
          <Route path="/*" element={<ClientRoutesComponent />} /> {/* Inclure les routes clients */}
        </Routes>
      </Suspense>
    </HashRouter>


  )
}

export default App

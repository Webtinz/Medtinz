import React from 'react'
import { ClientContent, ClientSidebar, AppFooter, ClientHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <ClientSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <div className="body flex-grow-1" style={{backgroundColor:'#DFEAF5'}}>
          <ClientContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout

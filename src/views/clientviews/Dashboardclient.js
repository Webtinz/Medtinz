import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CCol, CRow, CHeader, CContainer, CHeaderNav, CNavItem, CNavLink, CHeaderToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilMenu } from '@coreui/icons';
import '../../assets/css/mainstyle.css';
import '../../assets/css/responsive.css';


const DashboardPage = () => {
  const headerRef = useRef()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <div className="dashboard-header" >
          <div position="sticky" style={{ backgroundColor: '#DFEAF5', border: "none" }}>
            <div className='row d-flex align-items-center'>
              <div className="dashsearch-bar col-md-8" >
                <div className='row d-flex align-items-center'>
                  <div className='col-md-1 d-flex justify-content-center'>
                    <CHeaderToggler
                      onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
                      style={{ marginInlineStart: '-14px'}}
                    >
                      <CIcon icon={cilMenu} size="lg" />
                    </CHeaderToggler>
                  </div>

                  <div className="form-outline col-md-10 ">
                    <input
                      type="search"
                      id="form1"
                      className="form-control w-100"
                      style={{
                        borderRadius: '50px',
                        padding: '20px 0px',
                      }}
                    />
                    <CIcon
                      icon={cilSearch}
                      size="sm"
                      className="search-icon"
                      style={{ position: 'absolute', left: '3%', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-4 d-flex justify-content-end'>
                <CHeaderNav>
                  <CNavItem>
                    <CNavLink href="#" className="d-flex align-items-center">
                      <img src="src\assets\images\adminprofil.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                      <div>
                        <span className="ms-2">Semia BOKO</span>
                        <p className="ms-2">Admin</p>
                      </div>
                    </CNavLink>
                  </CNavItem>
                </CHeaderNav>
              </div>
            </div>
          </div>
          <div className="header-background">
            <div className="header-text px-5">
              <div className="header-date">September 12-22</div>
              <h2>Good morning, Admin Daniel</h2>
              <p>Have a nice day at work, it seems that you are <br /> returning to Daniel Bruh</p>
            </div>
          </div>

          {/* Cards section */}
          <div className="stats-cards">
            <div className="row row-cols-1 row-cols-md-3 g-5">
              <div className="col">
                <div className="card custom-card orange">
                  <div className="card-body">
                    <div className='d-flex'>
                      <div className=" textcontent ps-4">
                        <p className="percentage increase"><i class="bi bi-graph-up-arrow" style={{ color: 'green' }}></i>+8.5%</p>
                        <h5 className="text-left chiffre">30/34</h5>
                        <h5 className="text-left module">Appointments</h5>
                      </div>
                      <div className='imgcontent'>
                        <img src="src\assets\images\orange.png" alt="Consultation Icon" className="topimgcard" />
                        <br />
                        <img src="src\assets\images\orangeicon.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card custom-card purple">
                  <div className="card-body">
                    <div className='d-flex'>
                      <div className=" textcontent ps-4">
                        <p className="percentage increase"><i class="bi bi-graph-up-arrow" style={{ color: 'green' }}></i>+8.5%</p>
                        <h5 className="text-left chiffre">30/34</h5>
                        <h5 className="text-left module">Appointments</h5>
                      </div>
                      <div className='imgcontent'>
                        <img src="src\assets\images\purple.png" alt="Consultation Icon" className="topimgcard" />
                        <br />
                        <img src="src\assets\images\purple2icon.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card custom-card red">
                  <div className="card-body">
                    <div className='d-flex'>
                      <div className=" textcontent ps-4">
                        <p className="percentage increase"><i class="bi bi-graph-up-arrow" style={{ color: 'green' }}></i>+8.5%</p>
                        <h5 className="text-left chiffre">30/34</h5>
                        <h5 className="text-left module">Appointments</h5>
                      </div>
                      <div className='imgcontent'>
                        <img src="src\assets\images\presquered.png" alt="Consultation Icon" className="topimgcard" />
                        <br />
                        <img src="src\assets\images\red.png" className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCol>
    </CRow>
  );
}

export default DashboardPage;

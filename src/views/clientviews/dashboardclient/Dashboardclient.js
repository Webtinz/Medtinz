import React from 'react';
import { CHeader, CContainer, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilUser } from '@coreui/icons';
import '../../../assets/css/mainstyle.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-header" >
      <CHeader position="sticky"  style={{ backgroundColor: '#DFEAF5' }}>
        <CContainer fluid className="d-flex align-items-center">
          {/* Barre de recherche */}
          <div className="dashsearch-bar">
            <div className="form-outline ">
              <input
                type="search"
                id="form1"
                className="form-control w-100"
                style={{
                  borderRadius: '50px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  // borderColor: '#0056B3',
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

          {/* Profil utilisateur */}
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
        </CContainer>
      </CHeader>
      <div className="header-background">
        <CContainer>
          <div className="header-text">
            <div className="header-date">September 12-22</div>
            <h2>Good morning, Admin Daniel</h2>
            <p>Have a nice day at work, it seems that you are <br /> returning to Daniel Bruh</p>
          </div>
        </CContainer>
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
  );
}

export default DashboardPage;

import React, { useState, useEffect } from 'react';
import { FaBars, FaSearch } from "react-icons/fa";
import { CCol, CRow, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import '../../assets/css/mainstyle.css';
import '../../assets/css/responsive.css';
import Adminprofil from '../../assets/images/adminprofil.png'
import Dashimg1 from '../../assets/images/orange.png'
import Dashimg2 from '../../assets/images/purple.png'
import Dashimg3 from '../../assets/images/presquered.png'
import Dashicon1 from '../../assets/images/orangeicon.png'
import Dashicon2 from '../../assets/images/purple2icon.png'
import Dashicon3 from '../../assets/images/red.png'
import api from '../../service/caller';
import { ToastContainer, toast } from 'react-toastify';


const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const [UserData, setUserData] = useState([]);  

  useEffect(() => {
    const fetchLoggedUserData = async () => {
      try {
        const response = await api.get('api/usersprofile');

        setUserData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchLoggedUserData();
  }, []);
  
  // console.log('Demand profile data', UserData);

  
  // Fonction pour basculer l'état de la sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <CRow>
      <CCol xs={12}>
        <ToastContainer /> {/* Conteneur pour afficher les toasts */}
        <div className="dashboard-header">
          <div position="sticky" style={{ backgroundColor: '#DFEAF5', border: "none" }}>
            <div className='row d-flex align-items-center'>
              <div className="dashsearch-bar col-md-8">
                <div className='row d-flex align-items-center'>
                  <div className='col-md-1 d-flex align-items-center justify-centent-center'>
                    {/* Ajout du bouton pour ouvrir/fermer la sidebar */}
                    <FaBars onClick={toggleSidebar} className='sidebar-toggle-btn' />
                  </div>
                  <div className="form-outline d-flex col-md-10">
                    <input
                      type="search"
                      id="form1"
                      className="form-control w-100"
                      style={{
                        borderRadius: '50px',
                        padding: '20px 0px',
                      }}
                    />
                    <FaSearch
                      size="sm"
                      className="search-icon "
                      style={{ width: '20px', height: '20px', position: 'absolute', transform: 'translateY(-50%)', top: '7%', left: '64%' }}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-4 d-flex justify-content-end'>
                <CHeaderNav>
                  <CNavItem>
                    <CNavLink href="#" className="d-flex align-items-center">
                      <img src={Adminprofil} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                      <div>
                        <span className="ms-2">{UserData.firstname} {UserData.lastname}</span>
                        <p className="ms-2">{UserData.role?.name}</p>
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

          <div className="stats-cards">
            <div className="row row-cols-1 row-cols-md-3 g-5">
              <div className="col">
                <div className="card custom-card orange">
                  <div className="card-body">
                    <div className='d-flex'>
                      <div className=" textcontent ps-4">
                        <p className="percentage increase"><i className="bi bi-graph-up-arrow" style={{ color: 'green' }}></i>+8.5%</p>
                        <h5 className="text-left chiffre">30/34</h5>
                        <h5 className="text-left module">Appointments</h5>
                      </div>
                      <div className='imgcontent'>
                        <img src={Dashimg1} alt="Consultation Icon" className="topimgcard" />
                        <br />
                        <img src={Dashicon1} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
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
                        <p className="percentage increase"><i className="bi bi-graph-up-arrow" style={{ color: 'green' }}></i>+8.5%</p>
                        <h5 className="text-left chiffre">30/34</h5>
                        <h5 className="text-left module">Appointments</h5>
                      </div>
                      <div className='imgcontent'>
                        <img src={Dashimg2} alt="Consultation Icon" className="topimgcard" />
                        <br />
                        <img src={Dashicon2} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
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
                        <p className="percentage increase"><i className="bi bi-graph-up-arrow" style={{ color: 'green' }}></i>+8.5%</p>
                        <h5 className="text-left chiffre">30/34</h5>
                        <h5 className="text-left module">Appointments</h5>
                      </div>
                      <div className='imgcontent'>
                        <img src={Dashimg3} alt="Consultation Icon" className="topimgcard" />
                        <br />
                        <img src={Dashicon3} className='cardicon' alt="Consultation Icon" width={'50'} height={'50'} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CCol>
    </CRow >
  );
}

export default DashboardPage;

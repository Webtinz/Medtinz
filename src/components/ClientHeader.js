import React from 'react';
import { CHeader, CContainer, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilUser } from '@coreui/icons';

const ClientHeader = () => {
    return (
        <CHeader position="sticky" className="border-bottom" style={{ backgroundColor: '#DFEAF5' }}>
            <CContainer fluid className="d-flex justify-content-between align-items-center ">
                {/* Barre de recherche */}
                <div className="dashsearch-bar d-flex align-items-center">
                    <div className="form-outline">
                        <input
                            type="search"
                            id="form1"
                            className="form-control"
                            placeholder="Search..."
                            style={{
                                borderRadius: '50px',
                                padding: '10px 20px',
                                fontSize: '14px',
                                borderColor: '#0056B3',
                            }}
                        />
                        <CIcon
                            icon={cilSearch}
                            size="lg"
                            className="search-icon"
                            style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
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
    );
};

export default ClientHeader;

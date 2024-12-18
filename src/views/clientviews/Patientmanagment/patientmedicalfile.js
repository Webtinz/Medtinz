import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
    CButton,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CCardHeader,
    CTab,
    CTabContent,
    CTabList,
    CTabPanel,
    CTabs,
    CHeader, CContainer, CHeaderNav, CNavItem, CNavLink,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CFormCheck
} from '@coreui/react'
import { cilSearch } from '@coreui/icons';
import { FaArrowLeft } from "react-icons/fa";
import { BsPersonPlus, BsChevronRight, BsArrowRight } from 'react-icons/bs';
import * as icon from '@coreui/icons';
import CIcon from '@coreui/icons-react'
import '../../../assets/css/mainstyle.css';

const Patientfilemedical = () => {
    const [visible, setVisible] = useState(false);
    const [paymentoption, setpaymentoption] = useState(false);
    const [ticket, setticket] = useState(false);

    return (
        <div className="dashboard-header" >
            <CHeader position="sticky" style={{ backgroundColor: '#DFEAF5' }}>
                <CContainer fluid className="d-flex align-items-center">
                    {/* Barre de recherche */}
                    <div className="pagetittle">
                        <h4><b>Patient Management</b></h4>
                        <p>Home <BsChevronRight className='mx-2' style={{ fontSize: "12px" }} />  Dashboard <BsChevronRight style={{ fontSize: "12px" }} className='mx-2' />  <span style={{ color: '#191B1C' }}>Patient Management</span></p>
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

            <div className="Patientlist filemedical mt-2"  >
                <div className='tabsection'>
                    <CRow>
                        <CCol xs={12}>
                            <CCard className="card mb-4 p-4">
                                <CCardBody>
                                    <div className='topbtn'>
                                        <div className="retourbtn">
                                            <CButton className=" retourbtn">
                                                <FaArrowLeft /> Retour
                                            </CButton>
                                        </div>

                                        <div className='registeruserbtn ms-auto'>
                                            <CButton onClick={() => setVisible(!visible)} className="registernewbtn ms-auto d-flex align-items-center" active tabIndex={-1}>
                                                <BsPersonPlus className='mx-2' /> New Appointment
                                            </CButton>
                                        </div>

                                        {/* modal */}

                                        <CModal className='newregistermodal '
                                            alignment="center"
                                            scrollable
                                            size='lg'
                                            visible={visible}
                                            onClose={() => setVisible(false)}
                                            aria-labelledby="VerticallyCenteredScrollableExample2"
                                        >
                                            <CModalHeader>
                                                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register New Appointment</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody className='p-5'>
                                                <form>

                                                    <div className="form-group">
                                                        <label htmlFor="name">Name</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id="name"
                                                            placeholder="Casos Billal"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="department">Department</label>
                                                        <select name="department" id="department">
                                                            <option value="male">ORL</option>
                                                            <option value="female">Cardiology</option>
                                                            <option value="other">Onthology</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="birth">Name</label>
                                                        <input
                                                            type="date"
                                                            name="birth"
                                                            id="birth"
                                                            placeholder="20-12-2000"
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="triage">Triage</label>
                                                        <select name="Triage" id="Triage">
                                                            <option value="">Select Triage</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>

                                                    <div className="savenewuser form-group d-flex justify-content-center">
                                                        <CButton onClick={() => setpaymentoption(!paymentoption)} type="submit">
                                                            Continue &nbsp; <BsArrowRight />
                                                        </CButton>
                                                    </div>
                                                </form>
                                            </CModalBody>
                                        </CModal>

                                        <CModal className='paymentbycash newregistermodal'
                                            alignment="center"
                                            scrollable
                                            size='lg'
                                            visible={paymentoption}
                                            onClose={() => setpaymentoption(false)}
                                            aria-labelledby="VerticallyCenteredScrollableExample2"
                                        >
                                            <CModalHeader className='text-center'>
                                                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>New appointment</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody className='p-5'>
                                                <section className='pamentoption'>
                                                    <div className='selectpaymentoption'>
                                                        <h4>Choose payment method</h4>
                                                        <div className='momopayment'>
                                                            <input type="radio" name="momopayment" id="momopayment1" value="option1" />
                                                            <img src="src/assets/images/MoMo_Logo_RGB_Horizontal-on_LIGHT_BG 1.png" className='cardicon' alt="Consultation Icon" />
                                                        </div>

                                                        <div className='cashpayment'>
                                                            <input className="d-flex align-items-center" type="radio" name="cashpayment" id="cashpayment1" value="option1" defaultChecked />
                                                            <h3 className='cashtext'>Cash</h3>
                                                        </div>

                                                    </div>
                                                </section>

                                                <form>

                                                    <div className="form-row row">
                                                        <div className="form-group col-md-4">
                                                            <label htmlFor="devise">Choisissez la devise</label>
                                                            <select name="devise" id="devise">
                                                                <option value="XOF">XOF</option>
                                                                <option value="USD">USD</option>
                                                                <option value="EUR">EUR</option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group col-md-8">
                                                            <label htmlFor="amount">Entrez le montant a payer</label>
                                                            <input
                                                                type="tel"
                                                                name="amount"
                                                                id="amount"
                                                                placeholder="+229 01 90 00 00 00"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="motif">Motif</label>
                                                        <select name="motif" id="motif">
                                                            <option value="consultation">Consultation</option>
                                                            <option value="Operation">Operation</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group d-flex justify-content-center">
                                                        <CButton onClick={() => setticket(!ticket)} className='w-100' type="submit">
                                                            Valider &nbsp; <BsArrowRight />
                                                        </CButton>
                                                    </div>
                                                </form>
                                            </CModalBody>
                                        </CModal>

                                        {/* ticket after cash payment */}
                                        <CModal className='ticket newregistermodal'
                                            alignment="center"
                                            scrollable
                                            size='lg'
                                            visible={ticket}
                                            onClose={() => setticket(false)}
                                            aria-labelledby="VerticallyCenteredScrollableExample2"
                                        >
                                            <CModalHeader className='text-center'>
                                                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>New appointment</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody className='p-5'>
                                                <section className='modal'>

                                                    <div className='receipt'>
                                                        <div className="logo">
                                                            
                                                        </div>
                                                        <h3>Payment receipt</h3>
                                                        <div className="details">
                                                            <p><strong>Date:</strong> 12 / 12 / 2024</p>
                                                            <p><strong>Heure:</strong> 17h 31m 12s</p>
                                                            <p><strong>Motif:</strong> Consultation</p>
                                                            <p><strong>Department:</strong> Gynecology</p>
                                                            <p><strong>Payment method:</strong> Cash</p>
                                                            <p><strong>Amount:</strong> 20.000 XOF</p>
                                                            <p><strong>Lorea:</strong> Lorea</p>
                                                        </div>

                                                    </div>
                                                    <div className="mt-5 form-group d-flex justify-content-center">
                                                        <CButton className='w-100' type="submit">
                                                            Download Receipt &nbsp; <BsArrowRight />
                                                        </CButton>
                                                    </div>
                                                </section>
                                            </CModalBody>
                                        </CModal>

                                        {/* <CModal className='paymentbymomo newregistermodal'
                                            alignment="center"
                                            scrollable
                                            size='lg'
                                            visible={ticket}
                                            onClose={() => setticket(false)}
                                            aria-labelledby="VerticallyCenteredScrollableExample2"
                                        >
                                            <CModalHeader className='text-center'>
                                                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>New appointment</CModalTitle>
                                            </CModalHeader>
                                            <CModalBody className='p-5'>
                                                <section className='pamentoption'>
                                                    <div className='selectpaymentoption'>
                                                        <h4>Choose payment method</h4>
                                                        <div className='momopayment'>
                                                            <input type="radio" name="momopayment" id="momopayment1" value="option1" />
                                                            <img src="src/assets/images/MoMo_Logo_RGB_Horizontal-on_LIGHT_BG 1.png" className='cardicon' alt="Consultation Icon" />
                                                        </div>

                                                        <div className='cashpayment'>
                                                            <input className="d-flex align-items-center" type="radio" name="cashpayment" id="cashpayment1" value="option1" defaultChecked />
                                                            <h3 className='cashtext'>Cash</h3>
                                                        </div>

                                                    </div>
                                                </section>

                                                <form>

                                                    <div className="form-group">
                                                        <label htmlFor="motif">Motif</label>
                                                        <select name="motif" id="motif">
                                                            <option value="consultation">Consultation</option>
                                                            <option value="Operation">Operation</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group d-flex justify-content-center">
                                                        <CButton className='w-100' type="submit">
                                                            Valider &nbsp; <BsArrowRight />
                                                        </CButton>
                                                    </div>
                                                </form>
                                            </CModalBody>
                                        </CModal> */}
                                    </div>
                                    <div className='patientdetails'>
                                        <div className='d-flex align-items-center cardheader mb-5'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: 'green' }}></span>
                                            <h4>Medical history</h4>
                                        </div>
                                        <CRow className="my-3 patientinfo mb-5">
                                            <CCol xs={12} md={2}>
                                                <div className="flexcoldisposition">
                                                    <p>Nom :</p>
                                                    <p><b>Badoss</b></p>
                                                </div>
                                            </CCol>
                                            <CCol xs={12} md={2}>
                                                <div classname="flexcoldisposition">
                                                    <p>Prénom : </p>
                                                    <p><b>Austin Miller</b></p>
                                                </div>
                                            </CCol>
                                            <CCol xs={12} md={2}>
                                                <div classname="flexcoldisposition">
                                                    <p>Date of birth: </p>
                                                    <p><b>Dermatologist</b></p>
                                                </div>
                                            </CCol>
                                            <CCol xs={12} md={2}>
                                                <div classname="flexcoldisposition">
                                                    <p>Address : </p>
                                                    <p><b>Austin Miller</b></p>
                                                </div>
                                            </CCol>
                                            <CCol xs={12} md={2}>
                                                <div classname="flexcoldisposition">
                                                    <p>Gender :</p>
                                                    <p><b>Dermatologist</b></p>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </div>
                                    <div className='mt-5'>
                                        <div className='d-flex align-items-center cardheader'>
                                            <span className='me-3' style={{ width: '70px', height: '5px', background: 'green' }}></span>
                                            <h4>Medical history</h4>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-center' style={{ height: '300px' }}>
                                            <h4>No medical history yet</h4>
                                            <img src="src/assets/images/Group 207.png" className='cardicon' alt="Consultation Icon" width={'100'} height={'100'} />
                                        </div>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
            </div>
        </div >


    );
}

export default Patientfilemedical;

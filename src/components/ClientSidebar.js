import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    CButton,
    CCloseButton,
    CContainer,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
    CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilContrast,
    cilEnvelopeOpen,
    cilList,
    cilMenu,
    cilMoon,
    cilSun,
} from '@coreui/icons'
import { AppSidebarNav } from './AppSidebarNav'
import { BsTextParagraph } from 'react-icons/bs';
import '../assets/css/mainstyle.css';


// sidebar nav config
import clientnavigation from '../client_nav'

const ClientSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <CSidebar
            className="clientsidbar"
            colorScheme="white"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: 'set', sidebarShow: visible })
            }}
        >
            <CSidebarHeader className="d-flex align-items-center">
                <CSidebarBrand to="/">
                    <CContainer className='mt-4 mb-4'>
                        <div className='sidebartop'>
                            <img src="src\assets\images\Bright Web.png" className='cardicon' alt="Consultation Icon" />
                            <div className='ms-auto'><BsTextParagraph className='' /></div>
                        </div>
                    </CContainer>
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
                />
            </CSidebarHeader>

            <AppSidebarNav items={clientnavigation} />
            <CSidebarFooter className="footersid">
                <div className='footermenu'>
                    <h4 ><CIcon icon={cilMenu} />&nbsp;Settings</h4>
                    <h4><CIcon icon={cilMenu} />&nbsp;Logout</h4>
                </div>
                <div className='blueband'>
                    <div className='boitemed'>
                        <div>
                            <img src="src\assets\images\medocplastics.png" className='medocfooterimg' alt="Consultation Icon" />
                        </div>
                        <div>
                            <CButton className="footersidebtn me-auto">
                                Upgrade plan
                            </CButton>
                        </div>
                    </div>
                    <p>The hospital management a shortage of <br></br>medication</p>
                </div>
                {/* <CSidebarToggler
                    onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
                /> */}
            </CSidebarFooter>
        </CSidebar>
    )
}

export default React.memo(ClientSidebar)

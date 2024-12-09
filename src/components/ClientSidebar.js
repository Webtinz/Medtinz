import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
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



// sidebar nav config
import clientnavigation from '../client_nav'

const ClientSidebar = () => {
    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)

    return (
        <CSidebar
            className=""
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
                    <CContainer>
                        <div className='d-flex'>
                            <img src="src\assets\images\Bright Web.png" className='cardicon ms-auto' alt="Consultation Icon"  />
                            <CIcon icon={cilMenu} size="lg" className='me-auto' />
                        </div>
                        <br />
                    </CContainer>
                </CSidebarBrand>
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch({ type: 'set', sidebarShow: false })}
                />
            </CSidebarHeader>
            
            <AppSidebarNav items={clientnavigation} />
            <CSidebarFooter className="border-top d-none d-lg-flex">
                <CSidebarToggler
                    onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
                />
            </CSidebarFooter>
        </CSidebar>
    )
}

export default React.memo(ClientSidebar)

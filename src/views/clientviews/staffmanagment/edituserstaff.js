import React, { useState, useEffect } from 'react';
import { CModal, CModalBody, CModalFooter, CModalHeader, CButton, CFormInput } from '@coreui/react';
import api from '../../../service/caller';

const EditStaffModal = ({ visible, onClose, onStaffUpdated, user }) => {
    const [updatedUser, setUpdatedUser] = useState(user || {});

    useEffect(() => {
        if (user) {
            setUpdatedUser(user);
        } else {
            setUpdatedUser({});
        }
    }, [user, visible]);

    const handleUpdate = async () => {
        try {
            const response = await api.put(`api/updateUser/${updatedUser._id}`, updatedUser);
            onStaffUpdated(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>Edit User</CModalHeader>
            <CModalBody>
                <CFormInput
                    value={updatedUser?.firstname || ''}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, firstname: e.target.value })}
                    placeholder="First Name"
                />
                <CFormInput
                    value={updatedUser?.lastname || ''}
                    onChange={(e) => setUpdatedUser({ ...updatedUser, lastname: e.target.value })}
                    placeholder="Last Name"
                    className="mt-3"
                />
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Close
                </CButton>
                <CButton color="primary" onClick={handleUpdate}>
                    Save Changes
                </CButton>
            </CModalFooter>
        </CModal>
    );
};

export default EditStaffModal;

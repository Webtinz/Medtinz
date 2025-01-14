import React, { useState, useEffect } from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import axios from 'axios';
import '../../../assets/css/mainstyle.css';
import api from '../../../service/caller'; // Axios instance configurée
import Profilimg from  '../../../assets/images/man-438081_960_720.png';
import { FaEdit } from "react-icons/fa";

const AddStaffModal = ({ visible, onClose, onStaffAdded }) => {


    return (
        <CModal className='newregistermodal'
            alignment="center"
            scrollable
            size='lg'
            visible={visible}
            onClose={onClose}
            aria-labelledby="VerticallyCenteredScrollableExample2"
        >
            <CModalHeader>
                <CModalTitle id="VerticallyCenteredScrollableExample2" className='Titleformsmodal'>Register new user</CModalTitle>
            </CModalHeader>
            <CModalBody className='p-5'>
                <form>
                    <div className="form-group">
                        <div className="profile-photo d-flex">
                            <div className="photo-container">
                                <img src={Profilimg} alt="Profile" className="profile-image" />
                            </div>
                            <div className='photoedit'>
                                <div>
                                    <label htmlFor="file-input">
                                        <FaEdit />
                                    </label>
                                    <input type="file" id="file-input" accept="image/*" />
                                </div>
                                <p className='ms-2'>Upload profile photo (jpg, png, jpeg)</p>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Casos Billal"
                        />
                    </div>

                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="role">Role</label>
                            <select name="role" id="role">
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="doctor">Doctor</option>
                                <option value="nurse">Nurse</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="department">Department</label>
                            <select name="department" id="department">
                                <option value="">Select Department</option>
                                <option value="cardiology">Cardiology</option>
                                <option value="dermatology">Dermatology</option>
                                <option value="neurology">Neurology</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input
                                type="eamil"
                                name="email"
                                id="email"
                                placeholder="email"
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" id="gender">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>



                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="contact1">Contact 1</label>
                            <input
                                type="tel"
                                name="contact1"
                                id="contact1"
                                placeholder="+229 01 90 00 00 00"
                            />
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="contact2">Contact 2</label>
                            <input
                                type="tel"
                                name="contact2"
                                id="contact2"
                                placeholder="+229 01 90 00 00 00"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            name="address"
                            id="address"
                            placeholder="Your address here"
                        />
                    </div>

                    <div className="form-group d-flex justify-content-center">
                        <CButton color="primary" type="submit">
                            Continue &nbsp; <BsArrowRight />
                        </CButton>
                    </div>
                </form>
            </CModalBody>
        </CModal>
    );
};

export default AddStaffModal;

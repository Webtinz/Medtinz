import React, { useState, useEffect } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CModalTitle, CModalFooter } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";
import Profilimg from '../../../assets/images/man-438081_960_720.png';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../service/caller';

const animatedComponents = makeAnimated();

const EditStaffModal = ({ visible, onClose, initialData, onStaffUpdated, user }) => {
    const [formData, setFormData] = useState({
        hospital_id: "",
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        specialties: [],
        contact: {
            phone: "",
            address: ""
        },
        departementId: ""
    });

    const [Specialities, setSpecialities] = useState([]);
    const [Hospitals, setHospitals] = useState([]);
    const [Departments, setDepartments] = useState([]);
    const [Roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});
    const [updatedUser, setUpdatedUser] = useState(user || {});

    useEffect(() => {
        // Pré-remplissage des données si `initialData` est fourni
        if (initialData) {
            setFormData({
                ...initialData,
                specialties: initialData.specialties || [],
                contact: initialData.contact || { phone: "", address: "" }
            });
        }
    }, [initialData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [specialities, hospitals, departments, roles] = await Promise.all([
                    api.get('api/specialities'),
                    api.get(`api/hospitals/admin/${localStorage.getItem('access_token')}`),
                    api.get('api/departments'),
                    api.get('api/getallroles')
                ]);
                
                setSpecialities(specialities.data);
                setHospitals(hospitals.data);
                setDepartments(departments.data.data);
                setRoles(roles.data);
            } catch (error) {
                toast.error("Failed to fetch data");
            }
        };
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("contact.")) {
            const key = name.split(".")[1];
            setFormData((prevData) => ({
                ...prevData,
                contact: {
                    ...prevData.contact,
                    [key]: value
                }
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSpecialtiesChange = (selectedOptions) => {
        setFormData(prevData => ({
            ...prevData,
            specialties: selectedOptions ? selectedOptions.map(option => option.value) : []
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstname) newErrors.firstname = "Firstname is required";
        if (!formData.lastname) newErrors.lastname = "Lastname is required";
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.role) newErrors.role = "Role is required";
        if (!formData.departementId) newErrors.departementId = "Department is required";
        if (!formData.hospital_id) newErrors.hospital_id = "Hospital is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await api.put(`api/updateuser/${initialData.id}`, formData);
                toast.success("Staff updated successfully!");
                onStaffUpdated(response.data);
                onClose();
            } catch (error) {
                toast.error("Failed to update staff. Please try again.");
            }
        }
    };

    return (
        <CModal 
            className='newregistermodal'
            alignment="center"
            scrollable
            size='lg'
            visible={visible}
            onClose={onClose}
        >
            <CModalHeader>
                <CModalTitle className='Titleformsmodal'>Edit Staff</CModalTitle>
            </CModalHeader>
            <CModalBody className='p-5'>
                <form onSubmit={handleSubmit}>
                    <ToastContainer /> {/* Conteneur pour afficher les toasts */}
                    
                    {/* Profile Picture */}
                    <div className="form-group">
                        <div className="profile-photo d-flex">
                            <div className="photo-container">
                                <img src={Profilimg} alt="Profile" className="profile-image" />
                            </div>
                            <div className='photoedit'>
                                <label htmlFor="file-input">
                                    <FaEdit />
                                </label>
                                <input type="file" id="file-input" accept="image/*" />
                                <p className='ms-2'>Upload profile photo (jpg, png, jpeg)</p>
                            </div>
                        </div>
                    </div>

                    {/* Hospital Select */}
                    <div className="form-group">
                        <label htmlFor="hospital_id">Hospital</label>
                        <select
                            name="hospital_id"
                            id="hospital_id"
                            onChange={handleInputChange}
                            value={formData.hospital_id}
                        >
                            <option value="">Select Hospital</option>
                            {Hospitals.map((hospital) => (
                                <option key={hospital.id} value={hospital._id}>
                                    {hospital.hospital_name}
                                </option>
                            ))}
                        </select>
                        {errors.hospital_id && <div className="text-danger">{errors.hospital_id}</div>}
                    </div>

                    {/* Specialties */}
                    <div className="form-group">
                        <label>Specialties</label>
                        <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            isMulti
                            options={Specialities.map(option => ({
                                label: option.name,
                                value: option._id
                            }))}
                            onChange={handleSpecialtiesChange}
                            value={Specialities.filter(option =>
                                formData.specialties.includes(option._id)
                            ).map(option => ({
                                label: option.name,
                                value: option._id
                            }))}
                        />
                    </div>

                    {/* Firstname */}
                    <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="John Doe"
                            value={formData.firstname}
                            onChange={handleInputChange}
                        />
                        {errors.firstname && <div className="text-danger">{errors.firstname}</div>}
                    </div>

                    {/* Lastname */}
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="johndoe"
                            value={formData.lastname}
                            onChange={handleInputChange}
                        />
                        {errors.lastname && <div className="text-danger">{errors.lastname}</div>}
                    </div>

                    {/* Username */}
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>

                    {/* Role */}
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="role">Role</label>
                            <select
                                name="role"
                                id="role"
                                onChange={handleInputChange}
                                value={formData.role}
                            >
                                <option value="">Select Role</option>
                                {Roles.map(role => (
                                    <option key={role._id} value={role._id}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <div className="text-danger">{errors.role}</div>}
                        </div>

                        {/* Department */}
                        <div className="form-group col-md-6">
                            <label htmlFor="departementId">Department</label>
                            <select
                                name="departementId"
                                id="departementId"
                                onChange={handleInputChange}
                                value={formData.departementId}
                            >
                                <option value="">Select Department</option>
                                {Departments.map(department => (
                                    <option key={department._id} value={department._id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {errors.departementId && <div className="text-danger">{errors.departementId}</div>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-row row">
                        <div className="form-group col-md-12">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="johndoe@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                    </div>

                    {/* Password and Confirm Password */}
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password123!"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Password123!"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                        </div>
                    </div>

                    {/* Phone and Address */}
                    <div className="form-row row">
                        <div className="form-group col-md-6">
                            <label htmlFor="contact.phone">Phone</label>
                            <input
                                type="tel"
                                name="contact.phone"
                                id="contact.phone"
                                placeholder="0123456789"
                                value={formData.contact.phone}
                                onChange={handleInputChange}
                            />
                            {errors['contact.phone'] && <div className="text-danger">{errors['contact.phone']}</div>}
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="contact.address">Address</label>
                            <input
                                type="text"
                                name="contact.address"
                                id="contact.address"
                                placeholder="123 Main St"
                                value={formData.contact.address}
                                onChange={handleInputChange}
                            />
                            {errors['contact.address'] && <div className="text-danger">{errors['contact.address']}</div>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-end">
                        <CButton type="submit" className="button-sm buttonsubmit" style={{ marginTop: '15px' }}>
                            Save Changes
                        </CButton>
                    </div>
                </form>
            </CModalBody>
        </CModal>
    );
};

export default EditStaffModal;

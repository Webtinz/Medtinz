import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import { CModal, CModalHeader, CModalBody, CModalTitle, CButton } from '@coreui/react';
import { BsArrowRight } from 'react-icons/bs';
import { FaEdit } from "react-icons/fa";
import Profilimg from '../../../assets/images/man-438081_960_720.png';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import api from '../../../service/caller';
// import { toast } from 'react-toastify';  // Si vous utilisez Toast pour les notifications
import { ToastContainer, toast } from 'react-toastify';

const animatedComponents = makeAnimated();


const AddStaffModal = ({ visible, onClose, handleStaffAdded, initialData, setVisible, modalValue, handleButtonClick  }) => {
    // if (!visible) return null; // Ne montre pas le modal si `visible` est false
    const [formData, setFormData] = useState({
        hospital_id: initialData?.hospital_id || "",
        firstname: initialData?.firstname || "",
        lastname: initialData?.lastname || "",
        username: initialData?.username || "",
        email: initialData?.email || "",
        password: "",
        confirmPassword: "",
        role: initialData?.role || "",
        specialties: initialData?.specialties || [],
        contact: {
            phone: initialData?.contact?.phone || "",
            address: initialData?.contact?.address || ""
        },
        departementId: initialData?.departementId || "",
        type: initialData?.type || "", 
        civility: initialData?.civility || "", 
    });
    const [Specialities, setSpecialities] = useState([]);
    const [Hospitals, setHospitals] = useState([]);
    const [Departments, setDepartments] = useState([]);
    const [Roles, setRoles] = useState([]);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await api.get('api/specialities');
                setSpecialities(response.data);
            } catch (error) {
                toast.error("Error fetching specialities");
                console.error("Error fetching specialities:", error);
            }
        };

        const fetchRoles = async () => {
            try {
                const response = await api.get('api/getallroles');
                setRoles(response.data);
            } catch (error) {
                toast.error("Error fetching Roles");
                console.error("Error fetching Roles:", error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await api.get('api/departments');
                setDepartments(response.data.data);
            } catch (error) {
                toast.error("Error fetching Departments");
                console.error("Error fetching Departments:", error);
            }
        };

        const fetchHospitals = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await api.get(`api/hospitals/admin/${token}`);
                setHospitals(response.data);
            } catch (error) {
                toast.error("Error fetching Hospitals");
                console.error("Error fetching Hospitals:", error);
            }
        };

        fetchSpecialities();
        fetchHospitals();
        fetchDepartments();
        fetchRoles();
    }, []);
    
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstname) newErrors.firstname = "Firstname is required";
        if (!formData.type) newErrors.type = "Type is required";
        if (!formData.civility) newErrors.civility = "Civility is required";
        if (!formData.lastname) newErrors.lastname = "Lastname is required";
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.specialties) newErrors.specialties = "Specialties is required";
        // if (!formData.role) newErrors.role = "Role is required";
        if (!modalValue && !formData.role) {
            newErrors.role = "Role is required";
        }        
        if (!formData.departementId) newErrors.departementId = "Department is required";
        if (!formData.hospital_id) newErrors.hospital_id = "Hospital is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

    const handleContinue = (hospitalId, userId) => {
        const dataToSend = {
            hospital_id: hospitalId,
            _id: userId
        };
        navigate(`/hospitaladmin/staff_schedule?${new URLSearchParams(dataToSend).toString()}`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formPayload = {
                hospital_id: formData.hospital_id,
                firstname: formData.firstname,
                lastname: formData.lastname,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role ?? modalValue,
                specialties: formData.specialties,
                contact: formData.contact,
                departementId: formData.departementId,
                civility: formData.civility,
                type: formData.type
            };
            // console.log(formPayload);
            
            try {
                const response = await api.post('api/adduser', formPayload);

                // console.log(response);
                if ((response.status == 200 || response.status == 201) /*  && response.data.success */) {
                    // Succès
                    
                    toast.success("Staff registered successfully!");
                    setFormData({
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
                        departementId: "", 
                        type: "", 
                        civility: "", 
                    });
                    handleStaffAdded();  // Callback après ajout du staff
                    // response?.data?.user?._id
                    // handleContinue(response?.data?.user?.hospital_id, response?.data?.user?._id);
                    setTimeout(() => {
                      handleContinue(response?.data?.user?.hospital_id, response?.data?.user?._id);
                    }, 2000); // 2000 ms = 2 secondes

                    // onClose(); // Fermer la modal
                } else {
                    // Échec géré dans la réponse
                    toast.error(response.data.message || "Failed to register staff. Please try again.");
                }
            } catch (error) {
                toast.error(`Registration failed: ${error?.response?.data?.message || 'An unexpected error occurred. Please try again.'}`);
                console.error('Error:', error?.response|| 'No error message available.');

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
                <CModalTitle className='Titleformsmodal'>Register new staff </CModalTitle>
            </CModalHeader>
            <CModalBody className='p-5'>
                <form onSubmit={handleSubmit}>
                    {/* Profile Picture */}
                    <ToastContainer /> {/* Conteneur pour afficher les toasts */}
                    <div className="form-group">
                        <div className="profile-photo d-flex">
                            <div className="photo-container">
                                {/* <img src={Profilimg} alt="Profile" className="profile-image" /> */}
                                <img src='https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png' alt="Profile" className="profile-image" />
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
                        {/* Department */}
                        <div  className="form-group">
                        {/* <div className="form-group col-md-6"> */}
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
                        {/* Specialties */}
                        {/* <div  className={`form-group ${ modalValue === 'Allusers' ? 'col-md-6' : 'col-md-12' }`}> */}
                        <div
                            className="form-group"
                            style={{
                                marginBottom: '10px',
                                marginTop: '20px',
                                backgroundColor: '#f9f9f9',
                                position: 'relative', // Ajouté pour éviter les conflits de position
                                paddingTop: '10px' // Ajouté pour donner de l'espace au label
                            }}
                            >
                            <label
                                style={{
                                fontSize: '16px', // Taille de police pour rendre le label visible
                                color: '#333',    // Couleur explicite pour s'assurer qu'il est visible
                                position: 'absolute', // Position absolue pour éviter le chevauchement
                                top: '-10px',     // Ajuster si nécessaire pour l'alignement
                                left: '0',        // Aligné à gauche
                                }}
                            >
                                Specialties
                            </label>
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
                                styles={{
                                control: (provided) => ({
                                    ...provided,
                                    borderColor: '#0056B3',
                                    border: '2px solid #0056B3',
                                    borderRadius: '10px',
                                    minHeight: '50px',
                                }),
                                }}
                            />
                        </div>

                        <div className='row'>
                            {/* Name */}
                            <div className="form-group col-md-6">
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
                            {/* Username */}
                            <div className="form-group col-md-6">
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
                    

                    <div className='row'>
                        {/* Type */}
                        <div  className="form-group col-md-6">
                            <label htmlFor="type">Type</label>
                            <select
                                name="type"
                                id="type"
                                onChange={handleInputChange}
                                value={formData.type}
                            >
                                <option value="">Select Type</option>
                                {['Permanent','Consultant'].map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.type && <div className="text-danger">{errors.type}</div>}
                        </div>

                        {/* Civility */}
                        <div  className="form-group col-md-6">
                            <label htmlFor="civility">Civility</label>
                            <select
                                name="civility"
                                id="civility"
                                onChange={handleInputChange}
                                value={formData.civility}
                            >
                                <option value="">Select Civility</option>
                                {['M.','Mme.'].map(civility => (
                                    <option key={civility} value={civility}>
                                        {civility}
                                    </option>
                                ))}
                            </select>
                            {errors.civility && <div className="text-danger">{errors.civility}</div>}
                        </div>
                    </div>
                    <div className="form-row row">
                        {/* Role */}
                        {(!modalValue || modalValue == 'Allusers') && (
                            <div className="form-group col-md-12">
                                <label htmlFor="role">Fonction</label>
                                <select
                                    name="role"
                                    id="role"
                                    onChange={handleInputChange}
                                    value={formData.role}
                                >
                                    <option value="">Select Role</option>
                                    {Roles.map((role) => (
                                        <option key={role._id} value={role._id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <div className="text-danger">{errors.role}</div>}
                            </div>
                        )}
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
                        {/* Password */}
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
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
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
                        </div>
                    </div>
                    {/* Submit Button */}
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

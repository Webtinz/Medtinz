import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importez useNavigate
import './user.css';
import { FaArrowLeft } from "react-icons/fa";
// import tete from './image/tete.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck } from "react-icons/fa";

import api from '../../../service/caller';
// import { toast } from 'react-toastify';  // Si vous utilisez Toast pour les notifications
import { ToastContainer, toast } from 'react-toastify';

const User = () => {

    const location = useLocation();
    const [UserDetails, setUserDetails] = useState([]);
    const [UserSchedules, setUserSchedules] = useState([]);
        
    // Extraire les paramètres de l'URL
    const queryParams = new URLSearchParams(location.search);
    // const hospitalId = queryParams.get('hospital_id');
    const userId = queryParams.get('_id');
// console.log(userId);


        useEffect(() => {
            const fetchUserDetails = async () => {
                try {
                    const response = await api.get('api/users/' + userId);
                    setUserDetails(response.data);
                } catch (error) {
                    toast.error("Error fetching User Details");
                    console.error("Error fetching User Details:", error);
                }
            };
            // 
            fetchUserDetails();
        }, []); 
        
        useEffect(() => {
            const fetchUserSchedules = async () => {
                try {
                    const response = await api.get('api/schedule/' + userId);
                    setUserSchedules(response.data.data[0].schedule);
                } catch (error) {
                    toast.error("Error fetching UserSchedules");
                    console.error("Error fetching UserSchedules:", error);
                }
            };
            // 
            fetchUserSchedules();
        }, []); 

        // console.log(UserDetails);
        // console.log(UserSchedules);
        

  return (
    <div className="container user-profile p-2 divp20">
        <div className='row'>
            <div className='col-lg-2 mx-auto'>
                <button className="btn btn mb-4 toute">
                <FaArrowLeft /> Retour
                </button>
                <div className="profile-header ">
                    <div className="profile-image">
                    <img src='https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png' alt="tete" className="tete" />
                    {/* <img src={tete} alt="tete" className="tete" /> */}
                    </div>
                    
                </div>
                <div class="lateral">
                    <div class="solid-line"></div>
                    <div class="dotted-line"></div>
                </div>
            </div>
            <div className='col-lg-10'>
                <div className="profile-info  mb-5">
                <div className="row">
                    <div className="col-md-3">
                    <label>Nom:</label>
                    <p>{UserDetails?.lastname}</p>
                    </div>
                    <div className="col-md-3">
                    <label>Prénom:</label>
                    <p>{UserDetails?.firstname}</p>
                    </div>
                    <div className="col-md-3">
                    <label>Role:</label>
                    <p>{UserDetails?.role?.name}</p>
                    </div>
                    <div className="col-md-3">
                    <label>Gender:</label>
                    <p>{UserDetails?.civility}</p>
                    </div>
                </div>
                </div>
                <div className="department-section mt-4">
                <h6>Department:</h6>
                <div className="tags-container">
                    {Array.isArray(UserDetails?.departementId) && UserDetails.departementId.length > 0 ? (
                        UserDetails.departementId.map((dept) => (
                        <span key={dept._id} className="badge me-2">
                            <span className="ami px-2"><FaCheck /></span>
                            {dept.name} {/* Affiche le nom du département */}
                        </span>
                        ))
                    ) : (
                        <p>No departments available</p> // Affiche un message si aucun département n'est présent
                    )}
                </div>



                </div>

                <div className="specialties-section mt-4">
                    <h6>Specialities:</h6>
                    <div className="tags-container">
                        {Array.isArray(UserDetails?.specialties) && UserDetails.specialties.length > 0 ? (
                            UserDetails.specialties.map((speciality) => (
                            <span key={speciality._id} className="badge me-2">
                                <span className="ami px-2"><FaCheck /></span>
                                {speciality.name} {/* Affiche le nom du département */}
                            </span>
                            ))
                        ) : (
                            <p>No Specialties available</p> // Affiche un message si aucun département n'est présent
                        )}
                    </div>
                </div>

                <div className="availability-section mt-4">
            <h6>Disponibilités:</h6>
            <div className="timetable">
              <div className="row">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, index) => (
                  <div key={day} className="col-md-1 m-4 ">
                    <div className="day-label text-center">{day}</div>
                    {UserSchedules[index] && (
                      <>
                        <div className="time-slot">{UserSchedules[index].start_time}</div>
                        <div className="text-center"> - </div>
                        <div className="time-slot">{UserSchedules[index].end_time}</div>
                        <div className="text-center"> - </div>
                        <div className="time-slot">{UserSchedules[index].duration_unit} min</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

                {/* <div className="consultation-duration mt-4">
                   <h6 className='me-4'> <strong>Durée de consultation :</strong></h6>
                  <p><span className='come '>15 min</span></p> 
                </div> */}

                <div className="contact-section mt-4">
                    <h5>Contact informations</h5>
                    <div className="row">
                    <div className="col-md-4">
                        <label>E-mail:</label>
                        <p>{UserDetails?.email}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Phone:</label>
                        <p>{UserDetails?.contact?.phone}</p>
                    </div>
                    <div className="col-md-4">
                        <label>Address:</label>
                        <p>{UserDetails?.contact?.address}</p>
                    </div>
                    </div>
                </div>

                <div className="account-section mt-4">
                    <h5>Account informations</h5>
                    <div className="row">
                    <div className="col-md-6">
                        <label>Login:</label>
                        <p>{UserDetails?.email}</p>
                    </div>
                    <div className="col-md-6">
                        <label>Password:</label>
                        <p>*****************</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        
       
     

      
    </div>
  );
};

export default User;
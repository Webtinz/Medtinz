import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importez useNavigate
import './user.css';
import { FaArrowLeft } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCheck } from "react-icons/fa";
import api from '../../../service/caller';
import { ToastContainer, toast } from 'react-toastify';
// import { FaArrowLeft, FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { FaArrowLeft as ArrowLeftIcon, FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";


const User = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const [UserDetails, setUserDetails] = useState([]);
    const [UserSchedules, setUserSchedules] = useState([]);
    const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);

    // Extraire les paramètres de l'URL
    const queryParams = new URLSearchParams(location.search);

    const userId = queryParams.get('_id');

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
                if (response?.data?.data[0]?.schedules) {
                    setUserSchedules(response.data.data[0].schedules);
                }
            } catch (error) {
                toast.error("Error fetching UserSchedules");
                console.error("Error fetching UserSchedules:", error);
            }
        };
        fetchUserSchedules();
    }, [userId]);

    const handlePreviousWeek = () => {
        if (currentScheduleIndex > 0) {
            setCurrentScheduleIndex(currentScheduleIndex - 1);
        }
    };

    const handleNextWeek = () => {
        if (currentScheduleIndex < UserSchedules.length - 1) {
            setCurrentScheduleIndex(currentScheduleIndex + 1);
        }
    };

    const handleUsersList = (id) => {
        // Ajouter les données aux paramètres de l'URL
        navigate({
            pathname: '/hospitaladmin/stafflist'
        });
    }

    return (
        <div className="container user-profile p-2 divp20">
            <div className='row col-12 p-3'>
                <div className='col-lg-2 mx-auto'> 
                    <button className="btn btn mb-4 toute" onClick={handleUsersList}>
                        <FaArrowLeft /> Retour
                    </button>
                    <div className="profile-header ">
                        <div className="profile-image">
                            <img src='https://toppng.com/uploads/preview/icons-logos-emojis-user-icon-png-transparent-11563566676e32kbvynug.png' alt="tete" className="tete" />
                        </div>
                    </div>
                    <div class="lateral">
                        <div class="solid-line"></div>
                        <div class="dotted-line"></div>
                    </div>
                </div>
                <div className='col-lg-10'>
                    <div className="profile-info  mb-2">
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
                                <p className={UserDetails?.civility ?? 'text-warning'}>{UserDetails?.civility ?? 'Undefiened'}</p>
                            </div>
                            <div className="col-md-3 my-3">
                                <label>Fonction Type:</label>
                                <p className={UserDetails?.type ?? 'text-warning'}>{UserDetails?.type ?? 'Undefiened'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="department-section mt-2">
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
                    <div className="specialties-section mt-2">
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
                        {UserSchedules && UserSchedules.length > 0 ? (
    <div>
        <div className="d-flex justify-content-center align-items-center mb-3 mx-auto w-100">
            <div className="schedule-navigation d-flex justify-content-between align-items-center container">
                <button
                    className="btn btn-link me-2"
                    onClick={handlePreviousWeek}
                    disabled={currentScheduleIndex === 0}
                >
                    <FaArrowCircleLeft size={24} />
                </button>
                <span className="fw-bold">
                    Semaine du {new Date(UserSchedules[currentScheduleIndex].start_date).toLocaleDateString()} 
                    {' '}
                    au {new Date(UserSchedules[currentScheduleIndex].end_date).toLocaleDateString()}
                </span>
                <button
                    className="btn btn-link ms-2"
                    onClick={handleNextWeek}
                    disabled={currentScheduleIndex === UserSchedules.length - 1}
                >
                    <FaArrowCircleRight size={24} />
                </button>
            </div>
        </div>

        <div className="timetable">
            <div className="row">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map((day, index) => {
                    const englishDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    const daySchedule = UserSchedules[currentScheduleIndex].schedule.find(s => s.day === englishDays[index]);
                    return (
                        <div key={day} className="col-md-2 m-3 time-slotDiv">
                            <div className="day-label text-center">{day}</div>
                            {daySchedule ? (
                                <>
                                    <div className="time-slot">{daySchedule.start_time}</div>
                                    <div className="text-center"> - </div>
                                    <div className="time-slot">{daySchedule.end_time}</div>
                                    <div className="text-center"> - </div>
                                    <div className="time-slot">
                                        {daySchedule.duration_unit < 60
                                            ? `${daySchedule.duration_unit} min`
                                            : `${Math.floor(daySchedule.duration_unit / 60)}H ${daySchedule.duration_unit % 60}min`
                                        }
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-muted">Non disponible</div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
) : (
    <div className="alert alert-warning">Pas de planning pour l'instant</div>
)}

                    </div>

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
                </div>
            </div>
        </div>
    );
};
export default User;
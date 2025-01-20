import React, { useState, useRef, useEffect } from 'react';
import { Video, Mic, Camera, MonitorSmartphone, Calendar, FileText, Users, Settings, Clock, Tv, PhoneOff, X } from 'lucide-react';
import { Phone } from 'lucide-react';
import './tele.css';
import ipu from './image/ipu.png';
import pa from './image/pa.png';
import { Modal, Button } from 'react-bootstrap';
import Docteur from './docteur';
import { generateMeetingCode, generateMeetingLink, extractMeetingCode } from '../../../utils/meetingUtils';
import './App.css';
import { VideoRoom } from '../../../components/VideoRoom';

import api from '../../../service/caller';
import { ToastContainer, toast } from 'react-toastify';

const extractChannelCodeFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('channel');
};

const TeleMedicine = () => {
  const [joined, setJoined] = useState(false);
  const [showMedicalForm, setShowMedicalForm] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');
  const sidebarRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0); // Temps écoulé en secondes

  const [UserData, setUserData] = useState([]);  

  useEffect(() => {
    const fetchLoggedUserData = async () => {
      try {
        const response = await api.get('api/usersprofile');

        setUserData(response.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchLoggedUserData();
  }, []);

  useEffect(() => {
    let timer;
    if (joined) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1); // Incrémente d'une seconde
      }, 1000);
    } else {
      clearInterval(timer);
    }

    // Nettoyage de l'intervalle
    return () => clearInterval(timer);
  }, [joined]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}mn : ${String(seconds).padStart(2, '0')}s`;
  };
  const toggleMedicalForm = () => {
    setShowMedicalForm(!showMedicalForm);
  };


  const handleJoinCall = () => {
    if (!joined) {
      let randomCode = generateMeetingCode();
      // randomCode = randomCode.replace(/^\//, ''); // Supprimer le slash au début, s'il y en a
      console.log('randomCode' + randomCode);
  
      const link = generateMeetingLink(randomCode);
      
      
      setMeetingLink(link);
  
      const currentUrl = new URL(window.location.href);
      
      // Si le paramètre 'channel' n'existe pas dans l'URL, on l'ajoute
      if (!currentUrl.searchParams.has('channel')) {
        currentUrl.searchParams.set('channel', randomCode);
        window.history.pushState({}, '', currentUrl.toString());
      } else {
        console.log('Channel already exists in the URL');
      }
  
      setJoined(true);
    }
  };
  
  const copyMeetingLink = async () => {
    console.log('Lien à copier :', meetingLink); // Vérifiez la valeur ici
    try {
      if (!meetingLink) {
        toast.error('Aucun lien à copier !');
        return;
      }
      await navigator.clipboard.writeText(meetingLink);
      toast.success('Lien copié dans le presse-papiers !');
    } catch (error) {
      console.error('Erreur lors de la copie du lien :', error);
      toast.error('Impossible de copier le lien.');
    }
  };
  
  

  useEffect(() => {
    const codeChannel = extractChannelCodeFromURL();
    if (codeChannel) {
      const link = generateMeetingLink(codeChannel);
      setMeetingLink(link);
      setJoined(true);  // Set joined to true since we have a valid codeChannel
    } else {
      const code = extractMeetingCode() || generateMeetingCode();
      const link = generateMeetingLink(code);
      setMeetingLink(link);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.menu-item')) {
        setShowMedicalForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app-container">
      <ToastContainer /> {/* Conteneur pour afficher les toasts */}
      <div className="main-section">
        <div className="content-wrapper">
          <div className="conference-container">
            <div className="appointment-header">
              <div className="appointment-info">
                <h2>Appointment with</h2>
                <span className="doctor-name">Markiz Oceane Malwine</span>
                {/* <span className="doctor-name">{UserData?.firstname}</span> */}
                {/* <span className="timer">00h : 00mn : 01s</span> */}
                <span className="timer">{joined ? formatTime(elapsedTime) : '00h : 00mn : 00s'}</span>
              </div>
              <button
                className={`menu-item ${showMedicalForm ? 'active' : ''}`}
                onClick={toggleMedicalForm}
              >
                <FileText />
              </button>
            </div>

            {joined ? (
              <>
                <VideoRoom setJoined={setJoined}  />
                <div className="controls">
                  <button onClick={copyMeetingLink} className="share-link-btn btn btn-primary">
                    Copy the link
                  </button>
                </div>
              </>
            ) : (
              <div className="video-grid">
                <div className="video-item">
                  <img src={ipu} alt="Doctor" className="video-frame" />
                  <div className="participant-tag">You </div>
                </div>
                <div className="video-item">
                  <img src={pa} alt="Patient" className="video-frame" />
                  <div className="participant-tag">Patient</div>
                </div>
              </div>
            )}
            {!joined && (
              // <button onClick={handleJoinCall} className="leave-call-btn control-btn">
              //   <Phone />
              // </button>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
                  onClick={handleJoinCall}
                  className="join-call-btn control-btn"
                  style={{
                    padding: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#fff', /* Exemple de couleur de fond */
                    color: '#000', /* Couleur de texte */
                    fontSize: '20px', /* Taille de l'icône */
                  }}
                >
                  <Phone />
                </button>
              </div>

            )}
          </div>
          {/* Sidebar avec bouton de fermeture */}
          <div 
            ref={sidebarRef}
            className={`medical-form-sidebar ${showMedicalForm ? 'show' : ''}`}
          >
            <div className="medical-form-content">
              <div className="sidebar-header">
              
                <button className="close-sidebar" onClick={toggleMedicalForm}>
                <FileText />
                </button>
              </div>
              <Docteur/>
            </div>
          </div>
        </div>
        {/* <button className="ai-assistant">
          <div className="ai-icon">AI</div>
        </button> */}
      </div>
    </div>
  );
};

export default TeleMedicine;

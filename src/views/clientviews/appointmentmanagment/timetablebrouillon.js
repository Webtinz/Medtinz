import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';
import { Modal, Button } from 'react-bootstrap';
import choco from '../../../assets/images/choco.png';
import "./timetable.css";

const TimeSlot = ({ selection, onSelect, time }) => {
  const [showIcons, setShowIcons] = useState(false);

  const handleClick = () => {
    if (!selection) {
      setShowIcons(!showIcons);
    }
  };

  const getBackgroundColor = () => {
    if (selection) {
      return 'bg-pink-100';
    }
    return 'bg-green-100';
  };

  const getIcon = () => {
    if (selection === 'camera') {
      return <Camera className="w-4 h-4" />;
    }
    if (selection === 'person') {
      return <User className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div
      className={`
        relative p-2 border border-gray-200 h-12 cursor-pointer
        ${getBackgroundColor()}
        hover:opacity-80
        flex items-center justify-center timetablelast
      `}
      onClick={handleClick}
    >
      {getIcon()}

      {showIcons && !selection && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center gap-4 z-10">
          <Camera
            className="w-6 h-6 hover:text-blue-500 cursor-pointer"
            onClick={() => {
              onSelect('camera', time);
              setShowIcons(false);
            }}
          />
          <User
            className="w-6 h-6 hover:text-blue-500 cursor-pointer"
            onClick={() => {
              onSelect('person', time);
              setShowIcons(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

const CustomScheduler = () => {
  const [selections, setSelections] = useState({});
  const [currentWeek, setCurrentWeek] = useState({
    startDate: new Date(2025, 6, 10), // 10 July 2025
    endDate: new Date(2025, 6, 16),  // 16 July 2025
  });
  const [modalData, setModalData] = useState(null);
  const [showSecondModal, setShowSecondModal] = useState(false); // État pour le deuxième modal

  const timeSlots = [
    "10:00 - 10:20",
    "10:20 - 10:40",
    "10:40 - 11:00",
    "11:00 - 11:20",
    "11:20 - 11:40",
    "11:40 - 12:00"
  ];

  const days = ["Lundi", "Mardi", "Mercredi", "Vendredi", "Samedi"];

  const handleSelection = (type, time, day) => {
    const slotKey = `${day}-${time}`;
    setSelections((prev) => ({
      ...prev,
      [slotKey]: type,
    }));
    setModalData({ type, time, day }); // Set modal data
  };

  const changeWeek = (direction) => {
    setCurrentWeek((prev) => {
      const startDate = new Date(prev.startDate);
      const endDate = new Date(prev.endDate);

      if (direction === "prev") {
        startDate.setDate(startDate.getDate() - 7);
        endDate.setDate(endDate.getDate() - 7);
      } else {
        startDate.setDate(startDate.getDate() + 7);
        endDate.setDate(endDate.getDate() + 7);
      }

      return { startDate, endDate };
    });
  };

  const formatDateRange = () => {
    const { startDate, endDate } = currentWeek;
    return `${startDate.getDate()} ${startDate.toLocaleString("default", { month: "long" })} ${startDate.getFullYear()} - ${endDate.getDate()} ${endDate.toLocaleString("default", { month: "long" })}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 timetablelast">
      <div className="flex justify-between items-center mb-4">
        <button className="p-2" onClick={() => changeWeek("prev")}>&lt;</button>
        <h2 className="text-lg font-semibold">{formatDateRange()}</h2>
        <button className="p-2" onClick={() => changeWeek("next")}>&gt;</button>
      </div>

      <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1">
        <div className="font-semibold p-2">Time</div>
        {days.map((day) => (
          <div key={day} className="font-semibold p-2 text-center">{day}</div>
        ))}

        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="p-2 text-sm">{time}</div>
            {days.map((day) => (
              <TimeSlot
                key={`${day}-${time}`}
                time={time}
                selection={selections[`${day}-${time}`]}
                onSelect={(type) => handleSelection(type, time, day)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Premier Modal */}
      {modalData && (
        <div className="modal-overlay">
          <div className="modal-content1">
            <p className="modal-text">
              Create appointment for <strong>{modalData.day}</strong>, <strong>{modalData.time}</strong>?
            </p>
            <div className="modal-buttons">
              <button
                className="modal-button close"
                onClick={() => setModalData(null)}
              >
                Close
              </button>
              <button
                className="modal-button confirm"
                onClick={() => {
                  setModalData(null);
                  setShowSecondModal(true); // Ouvrir le deuxième modal
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deuxième Modal */}
      {showSecondModal && (
        <div className="modal-overlay">
          <div className="modal-content2">
            <div className="text-center vie">
              <h2 className="text-lg semibold mb-4">SUCCESS</h2>
            </div>

            <div className="immole">
              <div className="text-start">
                <p><strong>No Attribué:</strong> 0032</p>
                <p><strong>Name:</strong> Nourah ASSESS</p>
                <p><strong>Date:</strong> 12 / 12 / 2025</p>
                <p><strong>Heure:</strong> 12 : 40min</p>
                <p><strong>Type de rdv:</strong> Consultation</p>
                <p><strong>Department:</strong> Dermatology</p>
                <p><strong>Doctor:</strong> Dr. Badoss Success Rafou</p>
              </div>
              <div>
                <img src={choco} alt="choco" className="choco" />
              </div>
            </div>

            <div className="mt-4">
              <button
                className="modal-button2 confirm mx-auto"
                onClick={() => {
                  setShowSecondModal(false); // Fermer le deuxième modal
                  // Redirection ou autres actions ici
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};






export default CustomScheduler;

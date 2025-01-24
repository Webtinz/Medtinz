import React, { useState, useEffect } from 'react';
import { Camera, User } from 'lucide-react';
import { parse, addMinutes, format } from 'date-fns';
import "./timetable.css";
import choco from '../../../assets/images/choco.png';

const isTimeInSchedule = (timeSlot, startTime, endTime) => {
  const [slotStart, slotEnd] = timeSlot.split(' - ');
  const scheduleStart = parse(startTime, 'HH:mm', new Date());
  const scheduleEnd = parse(endTime, 'HH:mm', new Date());
  const slotStartTime = parse(slotStart, 'HH:mm', new Date());
  const slotEndTime = parse(slotEnd, 'HH:mm', new Date());

  return slotStartTime >= scheduleStart && slotEndTime <= scheduleEnd;
};

const TimeSlot = ({ selection, onSelect, time, isAvailable = true }) => {
  const [showIcons, setShowIcons] = useState(false);

  const handleClick = () => {
    if (!selection && isAvailable) {
      setShowIcons(!showIcons);
    }
  };

  const getBackgroundColor = () => {
    if (selection) {
      return 'bg-pink-100';
    }
    if (!isAvailable) {
      return 'bg-gray-300 opacity-50 cursor-not-allowed';
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

      {showIcons && !selection && isAvailable && (
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

const CustomScheduler = ({ doctorSchedule }) => {
  const [selections, setSelections] = useState({});
  const [currentWeek, setCurrentWeek] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [timeSlots, setTimeSlots] = useState([]);
  const [days, setDays] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showSecondModal, setShowSecondModal] = useState(false);

  useEffect(() => {
    if (doctorSchedule && doctorSchedule.length > 0) {
      const scheduleItem = doctorSchedule[0];
      
      const startDate = new Date(scheduleItem.start_date);
      const endDate = new Date(scheduleItem.end_date);
      setCurrentWeek({ startDate, endDate });

      const generateTimeSlots = () => {
        const slots = [];
        const workDays = scheduleItem.schedule
          .filter(day => day.start_time && day.end_time)
          .map(day => day.day);
        
        setDays(workDays);

        scheduleItem.schedule.forEach(daySchedule => {
          if (daySchedule.start_time && daySchedule.end_time) {
            const startTime = parse(daySchedule.start_time, 'HH:mm', new Date());
            const endTime = parse(daySchedule.end_time, 'HH:mm', new Date());
            const duration = daySchedule.duration_unit || 30;

            let currentSlot = startTime;
            while (currentSlot < endTime) {
              const slotEnd = addMinutes(currentSlot, duration);
              
              if (slotEnd <= endTime) {
                slots.push(
                  `${format(currentSlot, 'HH:mm')} - ${format(slotEnd, 'HH:mm')}`
                );
              }
              
              currentSlot = slotEnd;
            }
          }
        });

        setTimeSlots([...new Set(slots)]);
      };

      generateTimeSlots();
    }
  }, [doctorSchedule]);

  const handleSelection = (type, time, day) => {
    const slotKey = `${day}-${time}`;
    setSelections((prev) => ({
      ...prev,
      [slotKey]: type,
    }));
    setModalData({ type, time, day });
  };

  const changeWeek = (direction) => {
    setCurrentWeek((prev) => {
      const startDate = new Date(prev.startDate);
      const endDate = new Date(prev.endDate);

      startDate.setDate(startDate.getDate() + (direction === "prev" ? -7 : 7));
      endDate.setDate(endDate.getDate() + (direction === "prev" ? -7 : 7));

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

      <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-1">
        <div className="font-semibold p-2">Time</div>
        {days.map((day) => (
          <div key={day} className="font-semibold p-2 text-center">{day}</div>
        ))}

        {timeSlots.map((time) => (
          <React.Fragment key={time}>
            <div className="p-2 text-sm">{time}</div>
            {days.map((day) => {
              const scheduleItem = doctorSchedule[0];
              const isAvailable = scheduleItem.schedule.some(
                schedule => 
                  schedule.day === day && 
                  isTimeInSchedule(time, schedule.start_time, schedule.end_time)
              );

              return (
                <TimeSlot
                  key={`${day}-${time}`}
                  time={time}
                  isAvailable={isAvailable}
                  selection={selections[`${day}-${time}`]}
                  onSelect={(type) => handleSelection(type, time, day)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>


      {/* <div className="flex justify-center gap-4 mt-6">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            {num}
          </button>
        ))}
      </div> */}

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
                  setShowSecondModal(true);
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
                  setShowSecondModal(false);
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
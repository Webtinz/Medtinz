import React, { useState } from "react";
import "./calendar.css"; // Make sure to create a corresponding CSS file
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaPlus } from "react-icons/fa"; // Import an icon to add an event

const CalendarView = () => {
  const [events, setEvents] = useState([
    { title: "Event 1", date: "2025-01-30T10:00:00", textColor: "red" },
    { title: "Event 2", date: "2025-01-17T15:30:00", textColor: "blue" },
  ]);
  const [blockedDates, setBlockedDates] = useState([]); // List of blocked dates
  const [showAddEventModal, setShowAddEventModal] = useState(false); // Modal to add an event
  const [showBlockDateModal, setShowBlockDateModal] = useState(false); // Modal to block a date
  const [selectedDate, setSelectedDate] = useState(""); // Default to clicked date
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventTime, setNewEventTime] = useState(""); // Custom time

  // Function to handle date click
  const handleDateClick = (info) => {
    const clickedDate = info.date.toISOString().split("T")[0];

    // If the date is blocked, prevent interaction
    if (blockedDates.includes(clickedDate)) {
      alert(`The date ${clickedDate} is blocked. You cannot interact with it.`);
      return;
    }

    // Select the date and show add or block modal
    setSelectedDate(clickedDate);
    setShowAddEventModal(true); // Show the modal to add an event
  };

  // Add an event
  const handleAddEvent = () => {
    if (newEventTitle.trim() && selectedDate && newEventTime) {
      const eventDateTime = `${selectedDate}T${newEventTime}`;
      setEvents([
        ...events,
        { title: newEventTitle, date: eventDateTime, textColor: "green" },
      ]);
      setNewEventTitle(""); // Reset the title
      setNewEventTime(""); // Reset the time
      setShowAddEventModal(false); // Close the add modal
    }
  };

  // Block a date
  const handleBlockDate = () => {
    setBlockedDates([...blockedDates, selectedDate]);
    setShowBlockDateModal(false); // Close the block date modal after adding
  };

  return (
    <div className="">
      <h2 className="fw-bold" style={{ color: '#0056B3', fontSize: '42px', marginBottom: '70px' }}>
        Your calendar
      </h2>
    <div className="bg-white p-4 text-dark">

      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        headerToolbar={{
          start: "today",
          center: "title",
          end: "timeGridWeek,timeGridDay prev,next",
        }}
        events={events}
        dateClick={handleDateClick} // Allow clicking on a date
        height={"90vh"}
        dayCellClassNames={(info) => {
          const currentDate = info.date.toISOString().split("T")[0];
          if (blockedDates.includes(currentDate)) {
            return "blocked-date";
          }
          return "";
        }}
        // Customize cells for "Week" view
        dayRender={(info) => {
          if (info.view.type === 'timeGridWeek') {
            return (
              <>
                <div className="fc-daygrid-day-number">{info.dayNumberText}</div>
                {/* Add icon in "Week" view */}
                <div className="add-event-icon" onClick={() => handleDateClick(info)}>
                  <FaPlus size={20} color="green" />
                </div>
              </>
            );
          }
        }}
      />

      {/* Modal to add an event */}
      {showAddEventModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Event</h3>
            <p>Selected Date: {selectedDate}</p>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
            />
            <label>
              Time:
              <input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleAddEvent}>Add Event</button>
              <button onClick={() => setShowBlockDateModal(true)}>Block Date</button>
              <button onClick={() => setShowAddEventModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to block a date */}
      {showBlockDateModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Block this period</h3>
            {/* <p>Selected Date: {selectedDate}</p> */}
            <p><strong>If you choose yes, appointment won't be created for this period anymore.</strong></p>
            <div className="modal-actions d-flex justify-content-between">
              <hr/>
              <button onClick={() => setShowBlockDateModal(false)} className="bg-primary">Close</button>
              <button onClick={handleBlockDate} className="bg-dark">Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CalendarView;

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./docteur.css";

const EditableBlockList = () => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown état
  const [showCalendar, setShowCalendar] = useState(false); // Calendrier état
  const [selectedDate, setSelectedDate] = useState(new Date()); // Date sélectionnée

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Ferme le calendrier après sélection
  };

  return (
    <div className="editable-block-list">
      <div className="position-relative">
        <p
          className="py-3 fw-bold ms-5"
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
        >
          Follow-up
          <i
            className="bi bi-caret-down-fill"
            style={{ color: "#FF9800" }}
          ></i>
        </p>
      </div>

      {isOpen && (
        <div className="row">
          <div className="col-1"></div>
          <div className="col-12 col-md-5 mx-auto mb-3 align-self-center">
            <p>
              <strong>Schedule follow-up appointment (control):</strong>
            </p>
          </div>
          <div className="col-12 col-md-2 mx-auto mb-3">
            <p
              className="p-2 text-center"
              style={{
                background: "#FF980029",
                borderRadius: "5px",
              }}
            >
              <strong style={{ color: "#FF9800" }}>in 5 days</strong>
            </p>
          </div>
          <div className="col-12 col-md-2 mx-auto mb-3">
            <p
              className="p-2 text-center"
              style={{
                background: "#FF980029",
                borderRadius: "5px",
                border: "1px solid #FF9800",
              }}
            >
              <strong style={{ color: "#FF9800" }}>in 10 days</strong>
            </p>
          </div>
          <div
            className="col-12 col-md-2 mx-auto mb-3 align-self-center"
            onClick={toggleCalendar}
            style={{ cursor: "pointer" }}
          >
            <p>
              <strong>or</strong>
              <i
                className="bi bi-calendar3 ms-2 fs-3"
                style={{ color: "#FF9800" }}
              ></i>
            </p>
          </div>

          {/* Calendrier */}
          {showCalendar && (
            <div className="cale">
                <div className="w-100">
                    <div className="calendar-container">
                    <Calendar
                      onChange={onDateChange}
                      value={selectedDate}
                    />
                    </div>
                      <div className=" d-flex justify-content-center" style={{marginTop:'-20px'}}>
                          <button
                            className="btn btn-war mt-3 text-white"
                            style={{background:'#FF9800'}}
                            onClick={() => setShowCalendar(false)}
                          >
                            Apply Now
                          </button>
                      </div>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableBlockList;

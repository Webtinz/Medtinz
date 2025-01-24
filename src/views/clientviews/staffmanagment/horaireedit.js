import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import './horaire.css';
import api from '../../../service/caller';
import { ToastContainer, toast } from 'react-toastify';
import WeekSelector from './WeekSelector';

const Horaire = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultScheduleTemplate = {
    Monday: { start_time: "", end_time: "", duration_unit: 30 },
    Tuesday: { start_time: "", end_time: "", duration_unit: 30 },
    Wednesday: { start_time: "", end_time: "", duration_unit: 30 },
    Thursday: { start_time: "", end_time: "", duration_unit: 30 },
    Friday: { start_time: "", end_time: "", duration_unit: 30 },
    Saturday: { start_time: "", end_time: "", duration_unit: 30 },
    Sunday: { start_time: "", end_time: "", duration_unit: 30 },
  };

  const [scheduleWeeks, setScheduleWeeks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showhoraireModal, setShowhoraireModal] = useState(true);
  const [customDuration, setCustomDuration] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [scheduleId, setscheduleId] = useState(0);

  const queryParams = new URLSearchParams(location.search);
  const hospitalId = queryParams.get('hospital_id');
  const userId = queryParams.get('_id');

  // Fetch schedules from the database
  useEffect(() => {
    const fetchUserScheduler = async () => {
      try {
        const response = await api.get(`api/schedule/${userId}`);
        const fetchedSchedules = response?.data?.data?.[0].schedules || [];
        // console.log('fetchedSchedules _id:');

        setscheduleId(response?.data?.data?.[0]._id);

        // Map fetched data to match the expected structure of `scheduleWeeks`
        const formattedSchedules = fetchedSchedules.map((schedule) => ({
          selectedWeek: {
            start_date: schedule.start_date,
            end_date: schedule.end_date,
          },
          scheduleData: schedule.schedule.reduce((acc, daySchedule) => {
            acc[daySchedule.day] = {
              start_time: daySchedule.start_time,
              end_time: daySchedule.end_time,
              duration_unit: daySchedule.duration_unit,
            };
            return acc;
          }, { ...defaultScheduleTemplate }),
        }));

        setScheduleWeeks(formattedSchedules.length ? formattedSchedules : [
          {
            selectedWeek: { start_date: '', end_date: '' },
            scheduleData: { ...defaultScheduleTemplate },
          },
        ]);

        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching User Scheduler");
        console.error("Error fetching User Scheduler:", error);
        setIsLoading(false);
      }
    };

    fetchUserScheduler();
  }, [userId]);

  // console.log(scheduleWeeks);

  const addNewWeekSchedule = () => {
    setScheduleWeeks([
      ...scheduleWeeks,
      {
        selectedWeek: { start_date: '', end_date: '' },
        scheduleData: { ...defaultScheduleTemplate },
      },
    ]);
    setCurrentPage(scheduleWeeks.length); // Go to the new page
  };

  const removeWeekSchedule = (indexToRemove) => {
    if (scheduleWeeks.length > 1) {
      const updatedWeeks = scheduleWeeks.filter((_, index) => index !== indexToRemove);
      setScheduleWeeks(updatedWeeks);
      setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
    }
  };

  const handleTimeChange = (weekIndex, day, type, value) => {
    const newScheduleWeeks = [...scheduleWeeks];
    newScheduleWeeks[weekIndex].scheduleData[day][type] = value;
    setScheduleWeeks(newScheduleWeeks);
  };

  const handleDurationChange = (weekIndex, day, duration) => {
    const newScheduleWeeks = [...scheduleWeeks];
    newScheduleWeeks[weekIndex].scheduleData[day].duration_unit =
      duration % 5 === 0 ? duration : 30;
    setScheduleWeeks(newScheduleWeeks);
  };

  const handleDefaultDuration = (duration) => {
    setScheduleWeeks((prevWeeks) =>
      prevWeeks.map((week) => ({
        ...week,
        scheduleData: Object.keys(week.scheduleData).reduce((acc, day) => {
          acc[day] = {
            ...week.scheduleData[day],
            duration_unit: duration,
          };
          return acc;
        }, {}),
      }))
    );
    setCustomDuration(`${duration} min`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      user: userId,
      hospital_id: hospitalId,
      schedules: scheduleWeeks.map((week) => ({
        start_date: week.selectedWeek.start_date,
        end_date: week.selectedWeek.end_date,
        schedule: Object.keys(week.scheduleData).map((day) => ({
          day: day,
          start_time: week.scheduleData[day].start_time,
          end_time: week.scheduleData[day].end_time,
          duration_unit: week.scheduleData[day].duration_unit,
        })),
      })),
    };
// console.log(scheduleId);

    try {
      const response = await api.put(`api/schedule/${scheduleId}`, formData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Schedules registered successfully!');
        setTimeout(() => {
          navigate({
            pathname: '/hospitaladmin/staff_details',
            search: `?hospital_id=${response?.data?.data?.hospital_id}&_id=${response?.data?.data?.user}`,
          });
        }, 2000);
      } else {
        toast.error(response.data.message || 'Failed to register schedules.');
      }
    } catch (error) {
      toast.error(
        `Registration failed: ${
          error?.response?.data?.message || 'An unexpected error occurred.'
        }`
      );
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={showhoraireModal} backdrop="static" keyboard={false} centered size="lg">
      <Modal.Header>
        <Modal.Title className="mx-auto hius">Configure Schedules</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ToastContainer />
        <Form onSubmit={handleSubmit}>
          <div className="mb-4 p-3 border rounded">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Week {currentPage + 1} Schedule</h4>
              {scheduleWeeks.length > 1 && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeWeekSchedule(currentPage)}
                >
                  <FaTrash /> Remove
                </Button>
              )}
            </div>
            <WeekSelector
              onWeekChange={(dates) => {
                const newScheduleWeeks = [...scheduleWeeks];
                newScheduleWeeks[currentPage].selectedWeek = dates;
                setScheduleWeeks(newScheduleWeeks);
              }}
              selectedWeek={scheduleWeeks[currentPage].selectedWeek}
            />
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Jour</th>
                  <th className="text-center kul">De :</th>
                  <th>À :</th>
                  <th className="text-center kul">Durée (min)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(scheduleWeeks[currentPage].scheduleData).map((day) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>
                      <input
                        type="time"
                        value={scheduleWeeks[currentPage].scheduleData[day].start_time}
                        onChange={(e) => handleTimeChange(currentPage, day, 'start_time', e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={scheduleWeeks[currentPage].scheduleData[day].end_time}
                        onChange={(e) => handleTimeChange(currentPage, day, 'end_time', e.target.value)}
                        className="time-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={scheduleWeeks[currentPage].scheduleData[day].duration_unit}
                        onChange={(e) => handleDurationChange(currentPage, day, parseInt(e.target.value))}
                        className="time-input"
                        min="5"
                        step="5"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mb-3">
            <Button variant="outline-primary" onClick={addNewWeekSchedule}>
              <FaPlus /> Add Another Week
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              variant="primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, scheduleWeeks.length - 1))}
              disabled={currentPage === scheduleWeeks.length - 1}
            >
              Next
            </Button>
          </div>
          <Modal.Footer>
            <Button type="submit" variant="primary" className="mx-auto modify-button">
              Submit Schedules
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Horaire;

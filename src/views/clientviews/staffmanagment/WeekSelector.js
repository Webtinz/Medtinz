import React, { useState } from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WeekSelector = ({ onWeekChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay() + 1); // Lundi
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // Dimanche
    return { start, end };
  };

  const { start, end } = getWeekDates(currentDate);

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
    const { start, end } = getWeekDates(newDate);
    onWeekChange({ start_date: format(start, 'yyyy-MM-dd'), end_date: format(end, 'yyyy-MM-dd') });
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
    const { start, end } = getWeekDates(newDate);
    onWeekChange({ start_date: format(start, 'yyyy-MM-dd'), end_date: format(end, 'yyyy-MM-dd') });
  };

  return (
<div className="w-full flex justify-center">
  <div className="flex items-center justify-center gap-4 mb-4">
    <button
      onClick={handlePrevWeek}
      className="p-2 border rounded hover:bg-gray-100"
      type="button"
    >
      <ChevronLeft className="w-4 h-4" />
    </button>
    <span className="text-sm font-medium">
      {format(start, 'd MMMM yyyy')} - {format(end, 'd MMMM yyyy')}
    </span>
    <button
      onClick={handleNextWeek}
      className="p-2 border rounded hover:bg-gray-100"
      type="button"
    >
      <ChevronRight className="w-4 h-4" />
    </button>
  </div>
</div>
  );
};

export default WeekSelector;
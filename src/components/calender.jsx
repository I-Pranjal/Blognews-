import React, { useState } from 'react';


const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth}>
          <img src="/images/back.png" width={30}/>
        </button>
        <h2 className="text-xl font-bold">{currentDate.toLocaleString('default', { month: 'long' })} {year}</h2>
        <button onClick={handleNextMonth}>
        <img src="/images/next.png" width={30}/>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <div
            key={day}
            className="flex items-center justify-center p-2 border rounded-full bg-blue-50 hover:bg-blue-100 cursor-pointer"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

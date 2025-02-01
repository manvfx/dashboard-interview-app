import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarWidget = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 dark:bg-gray-600">Calendar Widget</h2>
            <Calendar onChange={setDate} value={date} />
        </div>
    );
};

export default CalendarWidget;

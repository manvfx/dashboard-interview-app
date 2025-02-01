import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartWidget = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [10, 20, 15, 30, 25],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            }
        ]
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Chart Widget</h2>
            <Line data={data} />
        </div>
    );
};

export default ChartWidget;

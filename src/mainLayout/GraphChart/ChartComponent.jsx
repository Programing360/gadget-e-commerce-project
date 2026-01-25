import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

// register
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr','May','June','July', 'Aug', 'sept','Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Orders',
        data: [50, 80, 40, 90,43, 54, 68, 49, 55, 20, 43, 10],
        backgroundColor: '#f59e0b',
        
        
      }
    ]
  };

  return <Bar data={data} />;
};

export default ChartComponent;

import {React, useContext, useEffect, useState} from 'react'
import NotFoundPage from './NotFoundPage'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';



  const data = [
    { date: '2025-01-01', likes: 120, views: 300 },
    { date: '2025-01-02', likes: 150, views: 400 },
    { date: '2025-01-03', likes: 180, views: 450 },
    { date: '2025-02-04', likes: 200, views: 500 },
    { date: '2025-02-14', likes: 230, views: 500 },
    { date: '2025-01-04', likes: 200, views: 500 },
  ];

const Archieve = () => {
  const [stat, setStat] = useState([]); 
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    getstats();
  }, []);

  const getstats = async () => {
    try{
      const response = await fetch(`${BASE_URL}/api/stats`) ;
      const data = await response.json();
      setStat(data);
      console.log(data);
    }
    catch(error){
      console.error("Error fetching the stats : ", error);
    }
  }


  return (
    <div className='min-h-96 p-6 bg-gray-100 flex flex-col items-center'>
      {/* <NotFoundPage /> */}
      <ResponsiveContainer width="100%" height={400}>
      <LineChart data={stat}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="likes" stroke="#8884d8" name="Likes" />
      </LineChart>
    </ResponsiveContainer>

    </div>
  );
}

export default Archieve

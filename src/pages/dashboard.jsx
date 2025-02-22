import React from 'react'
import Calendar from '../components/calender'
import Likes from '../components/likes'
import Archieve from './archieve'

const Dashboard = () => {
  return (
    <div className='grid md:grid-cols-3 gap-3 bg-gray-200 p-5'>
      <div className='col-span-2 bg-blue-200 rounded-xl'>
      <Archieve />
      </div>
      <div>
      <Calendar />
      <Likes />
      </div>
    </div>
  )
}

export default Dashboard

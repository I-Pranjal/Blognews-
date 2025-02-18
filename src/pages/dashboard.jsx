import React from 'react'
import Calendar from '../components/calender'
import Likes from '../components/likes'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-3 gap-3 bg-blue-100 p-5'>
      <div className='col-span-2 bg-blue-200 rounded-xl'>

      </div>
      <div>
      <Calendar />
      <Likes />
      </div>
    </div>
  )
}

export default Dashboard

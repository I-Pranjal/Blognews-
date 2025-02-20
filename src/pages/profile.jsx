import React from 'react'
import { UserInfo } from '../components/userinfo'
import { Myblogs } from '../components/myblogs'
const Profile = () => {
  return (
    <>
      <div className='grid md:grid-cols-4 grid-cols-1 gap-4'>
        <UserInfo />
        <div className='col-span-3 grid grid-rows-3 gap-3 bg-blue-gray-600 rounded-3xl m-6'>

          <div className='bg-blue-gray-400 rounded-xl mx-3 mt-3'>
            {/* // Add the component here */}
          </div>
          <div className='bg-blue-gray-400 row-span-2 rounded-xl m-3'>
            <Myblogs />
          </div>

        </div>
      </div>
    </>
  )
}

export default Profile

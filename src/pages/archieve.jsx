import {React, useContext, useEffect, useState} from 'react'
import NotFoundPage from './NotFoundPage'
import { ArchievePara1, ArchievePara2, ArchievePara3 } from '../assets/staticData';


const Archieve = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return (
    <div className='min-h-screen p-6 bg-gray-100 flex justify-center items-center' style={{fontFamily: 'verdana'}} >
      <article className='max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-4xl font-bold mb-6 text-center'>A Technological Tsunami: The Dawn of Automation</h1>
        <div className='prose lg:prose-xl'>
          <p className='mb-4 text-lg text-center'>
            <img src='./images/btimage.png' className='mx-auto' />
            {ArchievePara1}
          </p>
          <hr />
          <h2 className='text-2xl font-semibold my-4 text-center'>Jobs at a Crossroad: The Workforce Revolution</h2>
          <p className='mb-4'>
            <img src='./images/autoimage.jpg' className='md:w-[70%] mx-auto' />
           {ArchievePara2} 
          </p>
          <h2 className='text-2xl font-semibold my-4 text-center'>Embracing Tomorrow: Building a Future with Automation</h2>
          <p className='mb-4 '>
          <img src='./images/carimage.jpg' className='md:w-[70%] mx-auto' />
            {ArchievePara3}
          </p>
        </div>
      </article>
    </div>
  );
}

export default Archieve

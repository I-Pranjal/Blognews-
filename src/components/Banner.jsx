import React from 'react'
import { Carousel } from "@material-tailwind/react";

const Banner = () => {
  return (
    <div>
     <Carousel className="xl autoplay-true autoplayDelay-3000">
       <img
          src="/images/banner_5.png"
          alt="image 1"
         className="h-80 w-full object-cover"
       />
       <img
          src="/images/banner_3.png"
          alt="image 2"
         className="h-80 w-full object-cover"
       />
       <img
          src="/images/banner_4.png"
          alt="image 3"
         className="h-80 w-full object-cover"
       />
       <img
         src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
         alt="image 1"
         className="h-80 w-full object-cover"
       />
       <img
         src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
         alt="image 2"
         className="h-80 w-full object-cover"
       />
       <img
          src="/images/banner_1.png"
        //  src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
         alt="image 3"
         className="h-80 w-full object-cover"
       />
     </Carousel>
    </div>
  )
}

export default Banner

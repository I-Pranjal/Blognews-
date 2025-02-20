import {React, useContext, useState, useEffect} from 'react'
import {MyContext} from '../myprovider'

const Likes = () =>  {
  const {person} = useContext(MyContext);
  const [notifications, setNotifications] = useState([]);
  const email = person?.email || "anonymous"

  useEffect(() => {
    const getNotifications = async () => {
      try {
        console.log(email);
        const response = await fetch(`http://localhost:5000/api/notifications?email=${email}`);
        const data = await response.json();
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to get notifications', error);
      }
    };
    getNotifications();
  }, [email
  ]);
  
  return (
    <>
      <div
        class="relative flex w-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-3"
      >
        <div class="p-6">
          <div class="mb-4 flex items-center justify-between">
            <h5
              class="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
            >
              Notifications
            </h5>
            <a
              href="#"
              class="block font-sans text-sm font-bold leading-normal text-blue-500 antialiased"
            >
              View all
            </a>
          </div>
          <div class="divide-y divide-gray-200">
            {notifications.map((notification) => {
              const timeDiff = new Date() - new Date(notification.date);
              let timeAgo;
              if (timeDiff < 3600000) {
                timeAgo = `${Math.floor(timeDiff / 60000)} minutes ago`;
              } else if (timeDiff < 86400000) {
                timeAgo = `${Math.floor(timeDiff / 3600000)} hours ago`;
              } else {
                timeAgo = `${Math.floor(timeDiff / 86400000)} days ago`;
              }
              return (
                <div class="flex items-center justify-between pb-3 pt-3 last:pb-0" key={notification.id}>
                  <div class="flex items-center gap-x-3">
                    <img
                      src={notification.lbImgURL}
                      alt="Tania Andrew"
                      class="relative inline-block h-9 w-9 rounded-full object-cover object-center"
                    />
                    <div>
                      <h6
                        class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
                      >
                        {notification.lbName} liked your article
                      </h6>
                      <p
                        class="block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
                      >
                        {timeAgo}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Likes ; 

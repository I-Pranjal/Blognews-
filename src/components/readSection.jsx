import {React, useContext, useState} from 'react'
import { MyContext } from "../myprovider"


const ReadSection = ({title, author, date, content, imageURL, authorImage, like, views, authorMail }) => {

    const [likes, setLikes] = useState(like);
    const [liked, setLiked] = useState(false);
    const {person} = useContext(MyContext);
  
    const handleLikeToggle = async () => {
        try {
          if(!liked){
             await sendnotification();  // Send notification only if the blog is liked
          }
        const response = await fetch(`http://localhost:5000/blogs/${title}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ liked: !liked }), // Toggle like status
        });
  
        if (!response.ok) throw new Error("Failed to update likes");
  
        const updatedLikes = liked ? likes - 1 : likes + 1;
        setLikes(updatedLikes);
        setLiked(!liked);
      } catch (error) {
        console.error("Error updating like count:", error);
      }
    };

    const sendnotification = async () => {
        // Send post request to /api/notification to save like notification
        try {
          const response = await fetch("http://localhost:5000/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              // send these details in the body lbImgURL, lbName, mail 
                lbImgURL : person.imageURL, 
                lbName : person.name,
                mail : authorMail}),
          });
            if (!response.ok) throw new Error("Failed to send notification");   
        }
        catch (error) {
          console.error("Error sending notification:", error);
        } 
        }; 
  

return (
    <div className='h-full w-full lg:pt-20 p-6 bg-gray-100 flex flex-col items-center overflow-y-auto rounded-2xl scrollbar-hide'>
        <h1 className='text-4xl mb-6 text-center md:w-[55%]' style={{ 
            color: 'var(--color-content-primary, #121212)',
            fontFamily: 'nyt-cheltenham, cheltenham-fallback-georgia, cheltenham-fallback-noto, georgia, "times new roman", times, serif',
            fontWeight: 700,
            fontStyle: 'italic',
            lineHeight: '2.25rem',
            textAlign: 'center',
        }}>
            {title}
        </h1>
        <div className='flex justify-between items-center w-full md:w-[55%] mb-6'>
            <div className='flex items-center'>
                <img src={authorImage} alt='Author Avatar' className='w-12 h-12 rounded-full mr-4' />
                <div>
                    <p className='text-lg font-semibold'>{author}</p>
                    <p className='text-sm text-gray-500'>Published on: {date}</p>
                </div>
            </div>
            <div className='flex items-center'>
                {/* Likes  */}
                <div className="flex items-center">
                <svg
                    className={`w-6 h-6 cursor-pointer ${liked ? "text-red-500" : "text-gray-500"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => {handleLikeToggle(); }}>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="ml-1 text-gray-500">{likes}</span>
                </div>
                <div className='flex items-center mr-4'>
                    {/* Views */}
                    <svg className='w-6 h-6 text-gray-500' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13c-3.03 0-5.5-2.47-5.5-5.5s2.47-5.5 5.5-5.5 5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z' />
                    </svg>
                    <span className='ml-1 text-gray-500'>{views}</span>
                </div>
                <div className='flex items-center'>
                    {/* Share */}
                    <svg className='w-6 h-6 text-gray-500' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M18 8h-2V6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 0H8V6h4v2zm6 12H4V10h14v10z' />
                    </svg>
                    <span className='ml-1 text-gray-500'>789</span>
                </div>
            </div>
        </div>

        <hr className='w-[50%] border-t-2 border-gray-300 my-6' />
        <img src={imageURL} alt='Article related' className='w-[60%] h-auto mb-6 rounded-lg' />
        <p  className="text-lg leading-relaxed text-gray-700 text-justify md:w-[60%]"  style={{ fontFamily: "Verdana, sans-serif", whiteSpace: "pre-wrap" }}>
         {content}
        </p>

    </div>
);
}

export default ReadSection

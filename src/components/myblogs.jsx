import { List, ListItem, Card, Typography } from "@material-tailwind/react";
import {React, useContext, useEffect, useState} from 'react' ;
import { MyContext } from "../myprovider";


export function Myblogs() {
    const {person} = useContext(MyContext);
    const [blogs, setBlogs] = useState([]);
    const mail = person?.email || "anonymous";

    useEffect(() => {
        const fetchBlogs = async () => {
          try {
         const response = await fetch(`http://localhost:5000/api/myblogs?email=${mail}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setBlogs(data);
          } catch (error) {
            console.error("Failed to fetch blogs:", error);
          }
        };
    
        fetchBlogs();
      }, []);


    return (
        <Card className="w-full overflow-y-auto h-full bg-white bg-opacity-65">
            <List>
                {blogs.map((blog) => (
                    <ListItem key={blog.id} className="justify-between bg-gray-100">
                        <div className="w-1/3">
                            <Typography variant="h5" color="blue-gray" className="font-verdana font-bold">
                               {blog.heading}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="medium" color="gray" className="font-verdana font-normal">
                              {new Date(blog.date).toLocaleString()}
                            </Typography>
                        </div>
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-1">
                                <svg
                                    className={`w-6 h-6 cursor-pointer text-red-500`}
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <Typography variant="large" color="gray" className="font-verdana font-normal">
                                    {blog.likes}
                                </Typography>
                            </div>
                            <div className="flex items-center space-x-1">
                                <svg className='w-6 h-6 text-gray-900' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5 7.5-3.36 7.5-7.5-3.36-7.5-7.5-7.5zm0 13c-3.03 0-5.5-2.47-5.5-5.5s2.47-5.5 5.5-5.5 5.5 2.47 5.5 5.5-2.47 5.5-5.5 5.5z' />
                                </svg>
                                <Typography variant="large" color="gray" className="font-verdana font-normal">
                                    {blog.views ? blog.views : 0}
                                </Typography>
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

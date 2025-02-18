import React, { useContext, useEffect, useState } from 'react';
import { BlogCard } from '../components/blogcard';
import { MyContext } from '../myprovider';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { person } = useContext(MyContext);
  const mail = person?.email || "anonymous"; 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs?email=${mail}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, [mail]);

  return (
    <div className="grid grid-cols-4 gap-6 my-12 mx-4 bg-gray-200">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          imageURL={blog.imageURL}
          heading={blog.heading}
          content={blog.content}
          date={new Date(blog.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        />
      ))}
    </div>
  );
}

export default Blogs;

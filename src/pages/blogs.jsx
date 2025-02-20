import React, { useContext, useEffect, useState } from "react";
import { BlogCard } from "../components/blogcard";
import { MyContext } from "../myprovider";
import ReadSection from "../components/readSection";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { person } = useContext(MyContext);
  const mail = person?.email || "anonymous"; 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // const response = await fetch(`http://localhost:5000/api/blogs?email=${mail}`);
        const response = await fetch(`http://localhost:5000/api/blogs`);
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
  }, [mail]);

  const increaseView = async (blog) => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${blog.heading}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ view : blog.views + 1 }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      blog.views = data.views;
    } catch (error) {
      console.error("Failed to increase view:", error);
    }
  }

  return (
    <div className="w-screen mx-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12 px-4 bg-gray-200">
      {blogs.slice(0).reverse().map((blog) => (
        <BlogCard
          key={blog._id}
          imageURL={blog.imageURL}
          heading={blog.heading}
          content={blog.content}
          date={new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          onReadMore={() => {increaseView(blog); setSelectedBlog(blog);  }} // Open modal with selected blog
        />
      ))}

      {selectedBlog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 lg:px-14 lg:py-8">
        <button className="absolute top-4 right-6 text-white text-2xl" onClick={() => setSelectedBlog(null)}>✖</button>
        <ReadSection
        title = {selectedBlog.heading}
        author = { selectedBlog.authorName ? selectedBlog.authorName :  person.name}
        date = {new Date(selectedBlog.date).toLocaleDateString()}
        content = {selectedBlog.content}
        imageURL = {selectedBlog.imageURL}
        authorImage = {selectedBlog.authorImage ? selectedBlog.authorImage :  person.imageURL}
        like = {selectedBlog.likes ? selectedBlog.likes : 0}
        views = {selectedBlog.views ? selectedBlog.views : 0}
        authorMail = {selectedBlog
          ? selectedBlog.mail
          : mail}
        />
        </div>
      )}
    </div>
  );
};

export default Blogs;

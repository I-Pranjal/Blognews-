import React, { useContext, useState } from 'react';
import { Button, Input } from "@material-tailwind/react";
import { MyContext } from '../myprovider';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";

const BlogForm = () => {
  const [heading, setHeading] = useState('');
  const { person } = useContext(MyContext);
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const mail = person?.email || "anonymous";
  const [imgUpload, setImgUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (imgUpload) {
      const imageRef = ref(storage, `blogs/${mail + imgUpload.name}`);
      uploadBytes(imageRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          setImageURL(url);

          try {
            const response = await fetch('http://localhost:5000/api/blogs', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mail, heading, content, imageURL: url }),
            });

            const data = await response.json();
            console.log(data);

            // Reset form fields after successful submission
            setHeading('');
            setContent('');
            setImageURL('');
            setImgUpload(null);
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        });
      });
    } else {
      // Handle case where no image is uploaded
      try {
        const response = await fetch('http://localhost:5000/api/blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mail, heading, content, imageURL }),
        });

        const data = await response.json();
        console.log(data);

        // Reset form fields after successful submission
        setHeading('');
        setContent('');
        setImageURL('');
        setImgUpload(null);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className="h-auto w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="h-auto w-full m-20 grid grid-cols-2 gap-3">
        <div className="w-full h-80 bg-gray-200 rounded-lg">
          <textarea
            className="w-full h-80 px-10 py-4 text-lg font-thin border border-red-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="w-full h-80 bg-gray-200 rounded-lg flex p-10 flex-col items-end gap-6">
          <Input
            size="md"
            label="Title"
            required
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <Input
            type="file"
            required accept="image/*"
            onChange={(e) => setImgUpload(e.target.files[0])}
            label="Upload Image"
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <Button type="button" className="mx-8" onClick={() => {
              setHeading('');
              setContent('');
              setImageURL('');
              setImgUpload(null);
            }}>Reset</Button>
            <Button type="submit" className="mx-8">Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;

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
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (imgUpload) {
      const imageRef = ref(storage, `blogs/${mail + imgUpload.name}`);
      uploadBytes(imageRef, imgUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          setImageURL(url);

          try {
            const likes = 0, views = 0 ;
            const response = await fetch(`${BASE_URL}/api/blogs`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mail, heading, content, imageURL: url, authorName : person.name, authorImage : person.imageURL, likes, views }),
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
        const response = await fetch(`${BASE_URL}/api/blogs`, {
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

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgUpload(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="h-auto w-full flex items-center justify-center bg-gray-100 py-10 px-5">
      <form onSubmit={handleSubmit} className="h-auto w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create a New Blog</h2>
        <div className="mb-4">
          <Input
            size="md"
            label="Title"
            required
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <textarea
            className="w-full h-40 px-4 py-2 text-lg font-thin border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div 
            onClick={() => document.getElementById('image').click()}
            className="cursor-pointer border-2 border-dashed rounded-lg p-4 text-center hover:border-emerald-500 transition-colors"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded" />
            ) : (
              <div className="flex flex-col items-center space-y-2 text-gray-500">
                <span>Click to upload image</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <Button type="button" onClick={() => {
            setHeading('');
            setContent('');
            setImageURL('');
            setImgUpload(null);
            setPreview(null);
          }} className="bg-gray-700 hover:bg-red-600 text-white">Reset</Button>
          <Button type="submit" className="bg-green-400 hover:bg-green-600 text-white">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default BlogForm;
